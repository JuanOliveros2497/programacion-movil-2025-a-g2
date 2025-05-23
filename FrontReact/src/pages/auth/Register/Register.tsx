import { IonButton, IonInput, IonPage, IonText, useIonRouter, IonAlert, IonSpinner } from "@ionic/react";
import { useState } from "react";
import { register } from "../../../services/authService";
import './Register.css';

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    nombreCompleto: ""
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successAlert, setSuccessAlert] = useState(false);
  const router = useIonRouter();

  const handleRegister = async () => {
    // Validaciones básicas
    if (!user.username.trim()) {
      setError("El nombre de usuario es requerido");
      return;
    }
    if (!user.email.includes('@')) {
      setError("Por favor ingresa un email válido");
      return;
    }
    if (user.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (user.password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await register(user);
      setSuccessAlert(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message.includes("email") 
          ? "El email ya está registrado" 
          : error.message.includes("username") 
            ? "El nombre de usuario ya existe" 
            : error.message);
      } else {
        setError("Ocurrió un error desconocido durante el registro");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage className="register-page">
      <div className="container">
        <IonText color="primary">
          <h1>Crear Cuenta</h1>
        </IonText>

        {/* Campos del formulario */}
        <IonInput
          placeholder="Nombre completo"
          value={user.nombreCompleto}
          onIonChange={(e) => setUser({...user, nombreCompleto: e.detail.value!})}
          className="input-field"
        />

        <IonInput
          placeholder="Nombre de usuario"
          value={user.username}
          onIonChange={(e) => setUser({...user, username: e.detail.value!})}
          className="input-field"
        />

        <IonInput
          placeholder="Email"
          type="email"
          value={user.email}
          onIonChange={(e) => setUser({...user, email: e.detail.value!})}
          className="input-field"
        />

        <IonInput
          type="password"
          placeholder="Contraseña"
          value={user.password}
          onIonChange={(e) => setUser({...user, password: e.detail.value!})}
          className="input-field"
        />

        <IonInput
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onIonChange={(e) => setConfirmPassword(e.detail.value!)}
          className="input-field"
        />

        {/* Mensaje de error */}
        {error && (
          <div className="error-message">
            <IonText color="danger">{error}</IonText>
          </div>
        )}

        {/* Botón de registro */}
        <IonButton 
          expand="block" 
          onClick={handleRegister}
          disabled={loading || !user.username || !user.email || !user.password || !confirmPassword}
        >
          {loading ? (
            <>
              <IonSpinner name="crescent" /> Registrando...
            </>
          ) : "Crear cuenta"}
        </IonButton>

        <IonButton 
          fill="clear" 
          onClick={() => router.push("/login")}
          className="link-button"
        >
          ¿Ya tienes cuenta? Inicia sesión
        </IonButton>

        {/* Alerta de éxito */}
        <IonAlert
          isOpen={successAlert}
          onDidDismiss={() => {
            setSuccessAlert(false);
            router.push("/login", "back");
          }}
          header="Registro Exitoso"
          message="¡Por favor verifica tu correo electrónico para activar tu cuenta!"
          buttons={['Entendido']}
        />
      </div>
    </IonPage>
  );
};

export default Register;