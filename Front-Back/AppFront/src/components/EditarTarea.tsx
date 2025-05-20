import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonDatetime,
  IonItem,
  IonAlert,
} from "@ionic/react";
import Boton from "./boton";
import { useHistory, useLocation } from "react-router-dom";
import "./formulario.css";

interface Task {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  hora: string;
}

interface LocationState {
  tarea?: Task;
}

const EditarTarea: React.FC = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();
  const tarea = location.state?.tarea;

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [showAlert, setShowAlert] = useState(false); // 🔔 Estado para el modal
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const MAX_NOMBRE = 50;
  const MAX_DESCRIPCION = 255;
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
  useEffect(() => {
    if (tarea) {
      setNombre(tarea.nombre);
      setDescripcion(tarea.descripcion);
      setFecha(tarea.fecha);
      setHora(tarea.hora);
    } else {
      console.warn("No se encontró la tarea a editar.");
    }
  }, [tarea]);

  const handleUpdate = async () => {
    if (!nombre || !descripcion || !fecha || !hora) {
      setShowAlert(true);
      return;
    }

    const tareaActualizada = {
      id: tarea!.id,
      nombre,
      descripcion,
      fecha,
      hora,
    };

    try {
      const response = await fetch(
        `https://app-back-tareas.onrender.com/api/tareas/${tarea!.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tareaActualizada),
        }
      );

      if (!response.ok) throw new Error("Error en la actualización");

      alert("Tarea actualizada");
      history.push("/home");
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo actualizar la tarea");
    }
  };

  if (!tarea) {
    return (
      <IonPage>
        <IonContent className="ion-padding fondo-blanco">
          <div className="formulario-container">
            <h2 className="titulo-formularios">No hay tarea para editar</h2>
            <Boton
              texto="Volver"
              onClick={() => history.push("/home")}
              className="boton-formulario"
            />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent className="ion-padding fondo-blanco">
        <div className="formulario-container">
          <h2 className="titulo-formularios">Editar tarea</h2>

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
              onClick={() => history.push("/home")}
              className="boton-formulario"
            />
            <Boton
              texto="Actualizar"
              onClick={handleUpdate}
              className="boton-formulario"
            />
          </div>
        </div>
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
      </IonContent>
    </IonPage>
  );
};

export default EditarTarea;
