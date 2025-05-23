import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { useIonViewWillEnter } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { pencil, trash, heart, heartOutline, arrowBack } from "ionicons/icons";
import config from '../../../components/Utility/env'; // o desde 'Utility/env' si usas aliases
import "../../Home.css";
import Boton from "../../../components/boton";
import Alerta from "../../../components/Alerta";
import BarraInferior from "../../../components/BarraInferior";
import ModalTarea from "../../../components/ModalTarea";
import { fetchConHeaders } from "../../../components/Utility/fetchConHeaders";

interface Tarea {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  hora: string;
  realizada: boolean;
  favorita: boolean;
  usuarioId: number;
}

const TareasHechas: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [idAEliminar, setIdAEliminar] = useState<number | null>(null);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<Tarea | null>(null);
  const history = useHistory();

  useIonViewWillEnter(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      history.push("/login");
      return;
    }

    const fetchTareas = async () => {
      try {
        const response = await fetchConHeaders(`${config.API_URL}/tareas/usuario/${userId}`);
        if (!response.ok) throw new Error("Error al cargar tareas");
        const data = await response.json();
        setTareas(data.filter((t: Tarea) => t.realizada));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTareas();
  });

  const toggleFavorito = async (tarea: Tarea) => {
    const tareaActualizada = { ...tarea, favorita: !tarea.favorita };
    try {
      const response = await fetch(`${config.API_URL}/tareas/${tarea.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tareaActualizada),
      });
      if (!response.ok) throw new Error("Error al actualizar");
      setTareas(tareas.map(t => t.id === tarea.id ? tareaActualizada : t));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const marcarComoNoRealizada = async (tarea: Tarea) => {
    const tareaActualizada = { ...tarea, realizada: false };
    try {
      const response = await fetch(`${config.API_URL}/tareas/${tarea.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tareaActualizada),
      });
      if (!response.ok) throw new Error("Error al actualizar");
      setTareas(tareas.filter(t => t.id !== tarea.id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const eliminarTarea = async () => {
    if (idAEliminar === null) return;
    try {
      const response = await fetch(`${config.API_URL}/tareas/${idAEliminar}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar");
      setTareas(tareas.filter(t => t.id !== idAEliminar));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setMostrarAlerta(false);
      setIdAEliminar(null);
    }
  };

  const mostrarDescripcionTarea = (tarea: Tarea) => {
    setTareaSeleccionada(tarea);
    setModalVisible(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <div className="header-container">
          {/* Botón de retroceso con icono */}
      <IonButton
        fill="clear"
        onClick={() => history.goBack()}
        className="back-button"
        style={{ minWidth: 0, width: 40, height: 40, marginRight: 8 }}
      >
        <IonIcon icon={arrowBack} slot="icon-only" style={{ fontSize: 28 }} />
      </IonButton>
          <h2 className="titulo">Tareas Completadas</h2>
        </div>
      </IonHeader>

      <IonContent className="ion-padding">
        {tareas.map((tarea) => (
          <IonCard key={tarea.id} className="card-tarea">
            <div className="contenido-card">
              <label className="checkbox-realizada-container">
                <input
                  type="checkbox"
                  checked={tarea.realizada}
                  onChange={() => marcarComoNoRealizada(tarea)}
                  className="checkbox-realizada"
                />
                <span className="checkmark"></span>
              </label>

              <div className="info-tarea" onClick={() => mostrarDescripcionTarea(tarea)}>
                <IonCardHeader>
                  <IonCardTitle>{tarea.nombre}</IonCardTitle>
                  <IonCardSubtitle>{tarea.fecha} - {tarea.hora}</IonCardSubtitle>
                </IonCardHeader>
              </div>

              <div className="botones-acciones">
                <Boton
                  texto=""
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorito(tarea);
                  }}
                  icono={tarea.favorita ? heart : heartOutline}
                  className={`boton-favorito ${tarea.favorita ? "icono-rojo" : ""}`}
                  fill="clear"
                />

                <Boton
                  texto=""
                  onClick={(e) => {
                    e.stopPropagation();
                    history.push("/editarTarea", { tarea });
                  }}
                  className="boton-accion"
                  icono={pencil}
                  fill="clear"
                />

                <Boton
                  texto=""
                  onClick={(e) => {
                    e.stopPropagation();
                    setIdAEliminar(tarea.id);
                    setMostrarAlerta(true);
                  }}
                  className="boton-accion"
                  icono={trash}
                  fill="clear"
                />
              </div>
            </div>
          </IonCard>
        ))}

        <Alerta
          isOpen={mostrarAlerta}
          onConfirm={eliminarTarea}
          onCancel={() => {
            setMostrarAlerta(false);
            setIdAEliminar(null);
          }}
          mensaje="¿Deseas eliminar esta tarea?"
        />

        <ModalTarea
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          tarea={tareaSeleccionada}
        />

        <BarraInferior 
          abierto={false}
          onCrearTarea={() => history.push("/taskForm")}
          onVerRealizadas={() => {}}
        />
      </IonContent>
    </IonPage>
  );
};

export default TareasHechas;
