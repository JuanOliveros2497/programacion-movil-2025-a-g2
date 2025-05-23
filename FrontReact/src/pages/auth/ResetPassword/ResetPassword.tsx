import { IonButton, IonInput, IonPage, IonText, useIonRouter, IonAlert, IonLoading } from "@ionic/react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { resetPassword, validateResetToken } from "../../../services/authService";
import './ResetPassword.css';

const ResetPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlToken = queryParams.get('token') || "";

  const [token, setToken] = useState(urlToken);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(!!urlToken);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useIonRouter();

  useEffect(() => {
  if (!urlToken) return;

  const validateToken = async () => {
    try {
      setValidating(true);
      await validateResetToken(urlToken); // Asume que lanza error si no es válido
    } catch (err) {
      setError(err instanceof Error ? err.message : "Código inválido");
    } finally {
      setValidating(false);
    }
  };
  
  validateToken();
}, [urlToken]);

const handleSubmit = async () => {
  if (newPassword !== confirmPassword) {
    setError("Las contraseñas no coinciden");
    return;
  }

  if (newPassword.length < 6) {
    setError("La contraseña debe tener al menos 6 caracteres");
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const result = await resetPassword(token, newPassword);
    setSuccess(true);
    console.log(result.message); // "Contraseña restablecida con éxito"
  } catch (error) {
    setError(error instanceof Error ? error.message : "Error al cambiar contraseña");
  } finally {
    setLoading(false);
  }
};

  return (
    <IonPage className="reset-password-page">
      <div className="container">
        <IonText color="primary">
          <h1>Nueva Contraseña</h1>
          {urlToken && (
            <p className="subtitle">Establece una nueva contraseña para tu cuenta</p>
          )}
        </IonText>
        
        {!urlToken && (
          <IonInput
            placeholder="Código de recuperación"
            value={token}
            onIonChange={(e) => setToken(e.detail.value!)}
            className="input-field"
            disabled={validating || loading}
          />
        )}
        
        <IonInput
          placeholder="Nueva contraseña"
          type="password"
          value={newPassword}
          onIonChange={(e) => setNewPassword(e.detail.value!)}
          className="input-field"
          disabled={validating || loading}
        />
        
        <IonInput
          placeholder="Confirmar contraseña"
          type="password"
          value={confirmPassword}
          onIonChange={(e) => setConfirmPassword(e.detail.value!)}
          className="input-field"
          disabled={validating || loading}
        />
        
        {error && (
          <IonText color="danger" className="error-message">
            {error}
          </IonText>
        )}
        
        <IonButton 
          expand="block" 
          onClick={handleSubmit}
          disabled={
            validating || 
            loading || 
            (!urlToken && !token) || 
            !newPassword || 
            !confirmPassword
          }
        >
          {validating ? "Validando código..." : 
           loading ? "Procesando..." : 
           "Cambiar Contraseña"}
        </IonButton>

        <IonAlert
          isOpen={success}
          onDidDismiss={() => router.push("/login", "root")}
          header="Éxito"
          message="Contraseña cambiada correctamente. Ahora puedes iniciar sesión."
          buttons={['OK']}
        />

        <IonLoading 
          isOpen={validating || loading}
          message={validating ? "Validando código..." : "Procesando..."}
        />
      </div>
    </IonPage>
  );
};

export default ResetPassword;