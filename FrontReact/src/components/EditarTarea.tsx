import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonDatetime,
  IonItem,
  IonAlert,
  IonInput,
  IonTextarea
} from "@ionic/react";
import Boton from "./boton";
import { useHistory, useLocation } from "react-router-dom";
import styles from './EditarTarea.module.css';
import config from './Utility/env';

interface Tarea {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  nota: string;
  hora: string;
  favorita: boolean;
  realizada: boolean;
  usuario: {
    id: number;
  };
}

interface LocationState {
  tarea?: Tarea;
}

const EditarTarea: React.FC = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();
  const tarea = location.state?.tarea;

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nota, setNota] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
  const [favorita, setFavorita] = useState(false);
  const [realizada, setRealizada] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const MAX_NOMBRE = 50;
  const MAX_DESCRIPCION = 255;

  useEffect(() => {
    return () => {
      setShowSuccessAlert(false);
      setShowAlert(false);
    };
  }, []);

  useEffect(() => {
    if (tarea) {
      setNombre(tarea.nombre);
      setDescripcion(tarea.descripcion);
      setFecha(tarea.fecha);
      setHora(tarea.hora);
      setNota(tarea.nota);
      setFavorita(tarea.favorita);
      setRealizada(tarea.realizada);
    }
  }, [tarea]);

  const handleUpdate = async () => {
    if (!nombre || !descripcion || !fecha || !hora) {
      setErrorMessage("Por favor, completa todos los campos obligatorios.");
      setShowAlert(true);
      return;
    }

    try {
      const tareaActualizada = {
        id: tarea!.id,
        nombre,
        descripcion,
        fecha,
        hora,
        favorita,
        realizada,
        nota,
        usuario: {
          id: tarea!.usuario.id
        }
      };

      const response = await fetch(
        `${config.API_URL}/tareas/${tarea!.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tareaActualizada),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la actualización");
      }

      setShowSuccessAlert(true);
      
    } catch (error: unknown) {
      console.error("Error:", error);
      setErrorMessage(`No se pudo actualizar la tarea: ${
        error instanceof Error ? error.message : "Error desconocido"
      }`);
      setShowAlert(true);
    }
  };

  if (!tarea) {
    return (
      <IonPage>
        <IonContent className={`ion-padding ${styles.fondo}`}>
          <div className={styles.container}>
            <h2 className={styles.titulo}>No hay tarea para editar</h2>
            <Boton
              texto="Volver"
              onClick={() => history.push("/home")}
              className={styles.boton}
            />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent className={`ion-padding ${styles.fondo}`}>
        <div className={styles.container}>
          <h2 className={styles.titulo}>Editar tarea</h2>

          <div className={styles.campo}>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
              maxLength={MAX_NOMBRE}
              className={styles.input}
            />
            <small className={styles.contador}>{nombre.length}/{MAX_NOMBRE} caracteres</small>
          </div>

          <div className={styles.campo}>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción"
              maxLength={MAX_DESCRIPCION}
              className={`${styles.input} ${styles.textarea}`}
            ></textarea>
            <small className={styles.contador}>{descripcion.length}/{MAX_DESCRIPCION} caracteres</small>
          </div>
          <div className={styles.campo}>
            <textarea
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              placeholder="Nota (opcional)"
              maxLength={MAX_DESCRIPCION}
              className={`${styles.input} ${styles.textarea}`}
            ></textarea>
            <small className={styles.contador}>{descripcion.length}/{MAX_DESCRIPCION} caracteres</small>
          </div>

          <IonItem className={styles.datetimeItem}>
            <IonDatetime
              presentation="date"
              value={fecha}
              min={today}
              className={styles.datetime}
              onIonChange={(e) => {
                const value = e.detail.value;
                if (typeof value === 'string') {
                  setFecha(value.split('T')[0]);
                } else if (Array.isArray(value)) {
                  setFecha(value[0]?.split('T')[0] || "");
                }
              }}
            />
          </IonItem>

          <div className={styles.campo}>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              step="300"
              className={styles.input}
            />
          </div>
          <div className={styles.botones}>
            <Boton
              texto="Cancelar"
              onClick={() => history.push("/home")}
              className={styles.boton}
            />
            <Boton
              texto="Actualizar"
              onClick={handleUpdate}
              className={`${styles.boton} ${styles.botonPrincipal}`}
            />
          </div>
        </div>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          message={errorMessage}
          buttons={["OK"]}
          cssClass={styles.alertaError}
        />

        <IonAlert
          isOpen={showSuccessAlert}
          onDidDismiss={() => setShowSuccessAlert(false)}
          header="¡Tarea Actualizada!"
          message="Los cambios se guardaron correctamente"
          buttons={[
            {
              text: 'Volver al inicio',
              handler: () => {
                setShowSuccessAlert(false);
                history.push("/home");
              },
              cssClass: styles.alertButtonConfirm
            },
            {
              text: 'Seguir editando',
              handler: () => setShowSuccessAlert(false),
              cssClass: styles.alertButtonCancel
            }
          ]}
          cssClass={styles.alertaExito}
        />
      </IonContent>
    </IonPage>
  );
};

export default EditarTarea;