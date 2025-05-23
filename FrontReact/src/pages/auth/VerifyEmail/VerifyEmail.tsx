import { IonPage, useIonRouter } from "@ionic/react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { verifyEmail } from "../../../services/authService";

const VerifyEmail = () => {
  const { token } = useParams<{ token: string }>();
  const router = useIonRouter();

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(token);
        alert("¡Cuenta verificada con éxito!");
        router.push("/login");
      } catch (error) {
        if (error instanceof Error) {
          alert("Error al verificar: " + error.message);
        } else {
          alert("Error al verificar: Error desconocido");
        }
      }
    };
    verify();
  }, [token, router]);

  return <IonPage>Cargando...</IonPage>;
};

export default VerifyEmail;