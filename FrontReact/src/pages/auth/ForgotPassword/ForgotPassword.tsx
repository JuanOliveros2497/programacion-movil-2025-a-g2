import { IonButton, IonInput, IonPage, IonText, useIonRouter, IonAlert, IonLoading } from "@ionic/react";
import { useState } from "react";
import { requestPasswordReset } from "../../../services/authService";
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useIonRouter();

const handleSubmit = async () => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError('Email inválido');
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const result = await requestPasswordReset(email);
    // Maneja tanto JSON como texto plano
    if (result.success === false) {
      setError(result.message || "Error al enviar correo");
    } else {
      setSuccess(true);
    }
  } catch (error) {
    setError("Error de conexión");
  } finally {
    setLoading(false);
  }
};
  return (
    <IonPage className="forgot-password-page">
      <div className="container">
        <IonText color="primary">
          <h1 className="title">Recuperar Contraseña</h1>
          <p className="subtitle">Ingresa tu email para recibir instrucciones</p>
        </IonText>
        
        <IonInput
          placeholder="Email registrado"
          type="email"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value!)}
          className="input-field"
          autocapitalize="off"
          clearOnEdit={false}
          enterkeyhint="send"
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        />
        
        {error && (
          <IonText color="danger" className="error-message">
            <p>{error}</p>
          </IonText>
        )}
        
        <IonButton 
          expand="block" 
          onClick={handleSubmit}
          disabled={loading || !email}
          className="submit-button"
        >
          {loading ? "Enviando..." : "Enviar Instrucciones"}
        </IonButton>
        
        <IonButton 
          fill="clear" 
          onClick={() => router.push("/login")}
          className="back-button"
        >
          Volver a Iniciar Sesión
        </IonButton>

// Reemplaza el IonAlert existente por este:
<IonAlert
  isOpen={success}
  onDidDismiss={() => setSuccess(false)}
  header="¡Correo Enviado!"
  message={`Código enviado a ${email}`}
  buttons={[
    {
      text: 'Ingresar código',
      handler: () => router.push("/validate-token", "forward")
    },
    {
      text: 'Volver al login',
      role: 'cancel'
    }
  ]}
/>

      </div>
    </IonPage>
  );
};

export default ForgotPassword;