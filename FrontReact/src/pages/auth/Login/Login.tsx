import { IonButton, IonInput, IonPage, IonText, useIonRouter } from "@ionic/react";
import { useState } from "react";
import { login } from "../../../services/authService";
import './Login.css';

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useIonRouter();

const handleLogin = async () => {
  setLoading(true);
  try {
    const { user } = await login(emailOrUsername, password); // ✅ extraemos solo el user

    // Guardamos el ID del usuario y el objeto completo
    localStorage.setItem("userId", String(user.id));
    localStorage.setItem("userData", JSON.stringify(user));

    // Redirigimos al home
    router.push("/home", "forward");
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("Ocurrió un error desconocido durante el inicio de sesión");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <IonPage className="login-page">
      <div className="container">
        <IonText color="primary"><h1>Iniciar Sesión</h1></IonText>
        
        <IonInput
          placeholder="Email o Username"
          onIonChange={(e) => setEmailOrUsername(e.detail.value!)}
          className="input-field"
        />
        
        <IonInput
          type="password"
          placeholder="Contraseña"
          onIonChange={(e) => setPassword(e.detail.value!)}
          className="input-field"
        />
        
        <IonButton 
          expand="block" 
          onClick={handleLogin} 
          disabled={loading}
        >
          {loading ? "Cargando..." : "Ingresar"}
        </IonButton>
        
        <IonButton 
          fill="clear" 
          onClick={() => router.push("/forgot-password")}
          className="link-button"
        >
          ¿Olvidaste tu contraseña?
        </IonButton>
        
        <IonButton 
          fill="clear" 
          onClick={() => router.push("/register")}
          className="link-button"
        >
          Crear cuenta nueva
        </IonButton>
      </div>
    </IonPage>
  );
};

export default Login;