import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonDatetime,
  IonAlert,
  IonTextarea,
  IonItem
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import Boton from "./boton";
import "./formulario.css";
import config from './Utility/env'; // o desde 'Utility/env' si usas aliases

const TaskForm: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showLengthAlert, setShowLengthAlert] = useState(false);
  const [error, setError] = useState("");
  const MAX_NOMBRE = 50;
  const MAX_DESCRIPCION = 255;
  const history = useHistory();

  const handleNombreChange = (e: CustomEvent) => {
    const valor = e.detail.value || '';
    if (valor.length > MAX_NOMBRE) {
      setShowLengthAlert(true);
      setError(`Máximo ${MAX_NOMBRE} caracteres permitidos`);
      return;
    }
    setNombre(valor);
    setError("");
  };

  const handleDescripcionChange = (e: CustomEvent) => {
    const valor = e.detail.value || '';
    if (valor.length > MAX_DESCRIPCION) {
      setShowLengthAlert(true);
      setError(`Máximo ${MAX_DESCRIPCION} caracteres permitidos`);
      return;
    }
    setDescripcion(valor);
    setError("");
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      history.push('/login');
      return;
    }

    if (!nombre || !descripcion || !fecha) {
      setShowAlert(true);
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const tareaData = {
        nombre,
        descripcion,
        fecha: fecha.split('T')[0], // Formato YYYY-MM-DD
        hora: hora || new Date(fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        realizada: false,
        favorita: false,
        usuario: { id: Number(userId) } // Estructura que espera tu backend Spring
      };

      const response = await fetch(`${config.API_URL}/tareas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tareaData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al guardar la tarea");
      }

      setShowSuccessAlert(true);
      // Limpiar formulario
      setNombre("");
      setDescripcion("");
      setFecha("");
      setHora("");
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error("Error al crear tarea:", err);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding fondo-blanco">
        <div className="formulario-container">
          <h2 className="titulo-formularios">Agregar tarea</h2>

          <IonInput
            value={nombre}
            placeholder="Nombre"
            onIonChange={handleNombreChange}
            className="campo-custom"
            maxlength={MAX_NOMBRE}
            clearOnEdit={false}
          />

          <IonTextarea
            value={descripcion}
            placeholder="Descripción"
            onIonChange={handleDescripcionChange}
            className="campo-custom"
            rows={4}
            maxlength={MAX_DESCRIPCION}
          />

                    <IonItem className="ion-margin-vertical">
            <IonDatetime
              presentation="date"
              value={fecha}
              onIonChange={(e) => setFecha(e.detail.value as string)}
              className="calendario-claro"
            />
          </IonItem>
          <IonInput
            placeholder="Hora"
            type="time"
            value={hora}
            onIonChange={(e) => setHora(e.detail.value as string)}
            className="campo-custom"
          />
          {error && !showAlert && !showLengthAlert && (
            <div className="error-message">{error}</div>
          )}

          <div className="botones-formulario">
            <Boton
              texto="Cancelar"
              onClick={() => history.push("/home")}
              className="boton-secundario"
              fill="outline"
            />
            <Boton
              texto="Guardar"
              onClick={handleSubmit}
              className="boton-primario"
              fill="solid"
            />
          </div>
        </div>

        {/* Alerta campos requeridos */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Campos requeridos"
          message="Todos los campos marcados son obligatorios"
          buttons={['Entendido']}
          cssClass="custom-alert"
        />

        {/* Alerta éxito */}
        <IonAlert
          isOpen={showSuccessAlert}
          onDidDismiss={() => {
            setShowSuccessAlert(false);
            history.push("/home");
          }}
          header="¡Éxito!"
          message="La tarea se ha creado correctamente"
          buttons={['Continuar']}
          cssClass="custom-alert success-alert"
        />

        {/* Alerta límite caracteres */}
        <IonAlert
          isOpen={showLengthAlert}
          onDidDismiss={() => setShowLengthAlert(false)}
          header="Límite excedido"
          message={`El nombre no puede superar ${MAX_NOMBRE} caracteres y la descripción ${MAX_DESCRIPCION} caracteres`}
          buttons={['Aceptar']}
          cssClass="custom-alert"
        />
      </IonContent>
    </IonPage>
  );
};

export default TaskForm;