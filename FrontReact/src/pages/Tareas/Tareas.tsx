import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

import TaskForm from "../../components/formulario";
const Tareas: React.FC = () => {
  const history = useHistory();
  const irA = () => {
    history.push("/home");
  };

  return (
    <IonPage>
      <IonContent>
        <TaskForm></TaskForm>
      </IonContent>
    </IonPage>
  );
};

export default Tareas;
