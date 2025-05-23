import config from '../components/Utility/env'; // o desde 'Utility/env' si usas aliases

const API_URL = `${config.API_URL}/usuarios`;

interface User {
  id?: number;
  email: string;
  password: string;
  username?: string;
  nombreCompleto?: string;
  fotoPerfilUrl?: string;
  token?: string; // Para manejar la respuesta del login
}

// Registro de usuario
export const register = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await fetch(`${API_URL}/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

// Login
// En tu authService.ts (login)
export const login = async (emailOrUsername: string, password: string): Promise<{user: User}> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emailOrUsername, password }),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Credenciales inválidas");
  }

  const userData = await response.json();
  
  // Guarda los datos importantes
  localStorage.setItem('userId', userData.id.toString());
  localStorage.setItem('userData', JSON.stringify(userData));
  
  return { user: userData };
};

// Función para obtener datos actualizados del perfil
export const getCurrentUserProfile = async (): Promise<User> => {
  const userId = localStorage.getItem('userId');
  if (!userId) throw new Error("Usuario no autenticado");
  
  return fetchUserProfile(Number(userId));
};

// Verificación de email
export const verifyEmail = async (token: string): Promise<void> => {
  const response = await fetch(`${API_URL}/verificar?token=${token}`);
  if (!response.ok) throw new Error("Token inválido");
};

// Recuperación de contraseña
// Recuperación de contraseña (versión mejorada)
interface ResetResponse {
  message: string;
  success?: boolean;
  token?: string;
}

// Define ApiResponse interface for resetPassword
interface ApiResponse {
  message: string;
  [key: string]: any;
}

export const requestPasswordReset = async (email: string): Promise<ResetResponse> => {
  try {
    const response = await fetch(`${API_URL}/solicitar-recuperacion`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const responseData = await response.text();

    try {
      const parsedData: ResetResponse = responseData ? JSON.parse(responseData) : {};
      
      if (!response.ok) {
        throw new Error(parsedData.message || "Error al solicitar recuperación");
      }

      return {
        message: parsedData.message || "Correo enviado exitosamente",
        success: parsedData.success ?? true,
        token: parsedData.token
      };
    } catch (parseError) {
      // Si falla el parseo JSON pero la respuesta fue exitosa
      if (response.ok) {
        return {
          message: responseData || "Correo enviado exitosamente",
          success: true
        };
      }
      throw new Error(responseData || "Error al procesar la respuesta");
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error de conexión"
    );
  }
};

// Restablecer contraseña (versión mejorada)
export const resetPassword = async (token: string, newPassword: string): Promise<{message: string}> => {
  const endpoint = `${API_URL}/restablecer-contraseña?token=${encodeURIComponent(token)}`;
  
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nuevaContraseña: newPassword }),
    });

    const responseText = await response.text();

    if (!response.ok) {
      // Intenta parsear el error como JSON, si falla usa el texto plano
      try {
        const errorData = JSON.parse(responseText);
        throw new Error(errorData.message || "Error al cambiar contraseña");
      } catch {
        throw new Error(responseText || "Error al cambiar contraseña");
      }
    }

    // Devuelve el texto plano como mensaje de éxito
    return { message: responseText };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error de conexión"
    );
  }
};
// Obtener perfil del usuario
export const fetchUserProfile = async (userId: number): Promise<User> => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/${userId}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error("Error al cargar perfil");
  return response.json();
};

// Actualizar datos básicos del perfil
export const updateUserProfile = async (
  userId: number,
  updates: { nombreCompleto?: string; email?: string }
): Promise<User> => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(updates)
  });
  if (!response.ok) throw new Error("Error al actualizar perfil");
  return response.json();
};

// Subir avatar (nueva función)
export const uploadAvatar = async (userId: number, file: File): Promise<User> => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/${userId}/avatar`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: formData
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error subiendo avatar");
  }
  return response.json();
};
// Añade esto en tu archivo authService.ts
export const validateResetToken = async (token: string): Promise<{ valid: boolean }> => {
  const response = await fetch(`${API_URL}/validar-token-recuperacion`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText.includes('message') 
      ? JSON.parse(errorText).message 
      : "Token inválido");
  }
  
  return response.json();
};