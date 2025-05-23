import { IonButton, IonInput, IonPage, IonText, useIonRouter, IonLoading } from "@ionic/react";
import { useState } from "react";
import { validateResetToken } from "../../../services/authService";
import './ValidateToken.css'; // Crea este archivo CSS

const ValidateTokenPage = () => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useIonRouter();

  const handleValidate = async () => {
    if (!token.trim()) {
      setError("Por favor ingresa el código");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { valid } = await validateResetToken(token);
      if (valid) {
        router.push(`/reset-password?token=${encodeURIComponent(token)}`, "forward");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error validando token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage className="validate-token-page">
      <div className="container">
        <IonText color="primary">
          <h1>Verificar Código</h1>
          <p>Ingresa el código de 6 dígitos recibido por email</p>
        </IonText>
        
        <IonInput
          placeholder="Ej: A1B2C3"
          value={token}
          onIonChange={(e) => setToken(e.detail.value!)}
          className="input-field"
          clearOnEdit={false}
        />
        
        {error && <IonText color="danger">{error}</IonText>}
        
        <IonButton 
          expand="block" 
          onClick={handleValidate}
          disabled={loading}
        >
          {loading ? "Validando..." : "Continuar"}
        </IonButton>
        
        <IonLoading isOpen={loading} />
      </div>
    </IonPage>
  );
};

export default ValidateTokenPage;