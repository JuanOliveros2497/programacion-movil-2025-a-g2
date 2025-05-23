import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonIcon,
  IonAlert,
  IonModal,
  IonToast,
} from "@ionic/react";
import { useIonViewWillEnter } from "@ionic/react";
import { pencil, trash, heart, heartOutline, menuOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import Boton from "../components/boton";
import BarraInferior from "../components/BarraInferior";
import Alerta from "../components/Alerta";
import ModalTarea from "../components/ModalTarea";
import "./Home.css";
import { fetchConHeaders } from "../components/Utility/fetchConHeaders";
import config from '../components/Utility/env'; // o desde 'Utility/env' si usas aliases
import { c } from "vitest/dist/reporters-5f784f42";


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

const Home: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [idAEliminar, setIdAEliminar] = useState<number | null>(null);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<Tarea | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const history = useHistory();

  // Cargar tareas del usuario actual
  useIonViewWillEnter(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      history.push('/login');
      return;
    }

    const fetchTareas = async () => {
      try {
        const response = await fetchConHeaders(`${config.API_URL}/tareas/usuario/${userId}`);
        if (!response.ok) throw new Error("Error al cargar tareas");
        const data = await response.json();
        setTareas(data.filter((t: Tarea) => !t.realizada)); // Solo tareas no realizadas
      } catch (error) {
        console.error("Error:", error instanceof Error ? error.message : String(error));
      }
    };

    fetchTareas();
  });

  // Navegación
  const irACrearTarea = () => history.push("/taskForm");
  const irATareasHechas = () => history.push("/TareasHechas");
  const toggleBarra = () => setAbierto(!abierto);

  // Funciones de tareas
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
      console.error("Error:", error instanceof Error ? error.message : String(error));
    }
  };

  const marcarComoRealizada = async (tarea: Tarea) => {
    const tareaActualizada = { ...tarea, realizada: true };
    try {
      const response = await fetch(`${config.API_URL}/tareas/${tarea.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tareaActualizada),
      });
      if (!response.ok) throw new Error("Error al actualizar");
      setTareas(tareas.filter(t => t.id !== tarea.id));
      setShowToast(true); // mostrar alerta
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : String(error));
    }
  };


  const eliminarTarea = async () => {
    if (idAEliminar === null) return;
    try {
      const response = await fetch(`${config.API_URL}/tareas/${idAEliminar}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Error al eliminar");
      setTareas(tareas.filter(t => t.id !== idAEliminar));
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : String(error));
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
          <Boton
            icono={menuOutline}
            onClick={toggleBarra}
            className="boton-toggle"
          />
          <h2 className="titulo">Tareas</h2>
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
                onChange={() => marcarComoRealizada(tarea)}
                className="checkbox-realizada"
                />
              <span className="checkmark"></span>
            </label>

              <div className="info-tarea" onClick={() => mostrarDescripcionTarea(tarea)}>
                <IonCardHeader>
                  <IonCardTitle>{tarea.nombre}</IonCardTitle>
                  <IonCardSubtitle>
                    {tarea.fecha} - {tarea.hora}
                  </IonCardSubtitle>
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
        <IonToast
                isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="¡Tarea marcada como realizada!"
          duration={2500}
          position="bottom"
          cssClass="mi-toast-rosa"
          buttons={[
            {
              text: 'Cerrar',
              role: 'cancel',
              handler: () => setShowToast(false)
            }
          ]}
        />
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
          abierto={abierto}
          onCrearTarea={irACrearTarea}
          onVerRealizadas={irATareasHechas}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;