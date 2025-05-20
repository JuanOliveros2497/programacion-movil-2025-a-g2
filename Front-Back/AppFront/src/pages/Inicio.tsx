import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import "./Inicio.css";
import Boton from "../components/boton";
import { useHistory } from "react-router-dom";

const Inicio: React.FC = () => {
  const history = useHistory();
  const irHome = () => {
    history.push("/Home");
  };

  return (
    <IonPage>
      <div className="inicio-app">
        <img src="/c.png" alt="Descripción" className="imagen-personalizada" />
        <p className="parrafo">
          "Organiza tu día con facilidad. Esta app te ayuda a crear, gestionar y
          completar tus tareas de forma eficiente.".
        </p>
      </div>
      <div className="contenedor-boton">
        <Boton
          texto="INICIAR TAREAS"
          onClick={irHome}
          className="boton-inicio"
          icono=""
        />
      </div>
    </IonPage>
  );
};

export default Inicio;
