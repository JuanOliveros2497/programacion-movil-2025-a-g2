import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonDatetime,
  IonAlert,
} from "@ionic/react";
import Boton from "./boton";
import { useHistory } from "react-router-dom";
import "./formulario.css";

const TaskForm: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [showAlert, setShowAlert] = useState(false); // 🔔 Estado para el modal
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const MAX_NOMBRE = 50;
  const MAX_DESCRIPCION = 255;
  const history = useHistory();
  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    if (valor.length > MAX_NOMBRE) {
      setShowModal(true);
    } else {
      setNombre(valor);
    }
  };

  const handleDescripcionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const valor = e.target.value;
    if (valor.length > MAX_DESCRIPCION) {
      setShowModal(true);
    } else {
      setDescripcion(valor);
    }
  };
  const irBack = () => {
    history.push("/home");
  };

  const handleSubmit = async () => {
    if (!nombre || !descripcion || !fecha || !hora) {
      setShowAlert(true); // Mostrar alerta si falta algún campo
      return;
    }

    const tareaData = { nombre, descripcion, fecha, hora };

    try {
      const response = await fetch(
        "https://app-back-tareas.onrender.com/api/tareas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tareaData),
        }
      );

      if (!response.ok) throw new Error("Error en la solicitud");

      setShowSuccessAlert(true);
      setNombre("");
      setDescripcion("");
      setFecha("");
      setHora("");
      history.push("/home");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar la tarea");
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding fondo-blanco">
        <div className="formulario-container">
          <h2 className="titulo-formularios">Agregar tarea</h2>

          <div className="campo-custom">
            <input
              type="text"
              value={nombre}
              onChange={handleNombreChange}
              placeholder="Nombre"
            />
          </div>

          <div className="campo-custom">
            <textarea
              value={descripcion}
              onChange={handleDescripcionChange}
              placeholder="Descripción"
            ></textarea>
          </div>

          <IonItem className="ion-margin-vertical">
            <IonDatetime
              className="calendario-claro"
              presentation="date"
              value={fecha}
              onIonChange={(e) => setFecha(e.detail.value as string)}
            />
          </IonItem>

          <div className="campo-custom">
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
          </div>

          <div className="botones-formulario">
            <Boton
              texto="Cancelar"
              onClick={irBack}
              className="boton-formulario"
            />
            <Boton
              texto="Agregar"
              onClick={handleSubmit}
              className="boton-formulario"
            />
          </div>
        </div>

        {/* Modal de alerta */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          message="Por favor, llena todos los campos antes de continuar."
          buttons={[
            {
              text: "OK",
              role: "cancel",
              cssClass: "custom-ok-button",
            },
          ]}
          cssClass="custom-alert"
        />
        <IonAlert
          isOpen={showSuccessAlert}
          onDidDismiss={() => setShowSuccessAlert(false)}
          message="¡Tarea creada exitosamente!"
          buttons={[
            {
              text: "OK",
              cssClass: "custom-ok-button",
              handler: () => history.push("/home"),
            },
          ]}
          cssClass="custom-alert"
        />
      </IonContent>
    </IonPage>
  );
};

export default TaskForm;
