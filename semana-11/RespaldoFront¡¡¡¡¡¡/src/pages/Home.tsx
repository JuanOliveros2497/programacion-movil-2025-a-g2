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
} from "@ionic/react";
import { useIonViewWillEnter } from "@ionic/react";
import { pencil, trash, heart, heartOutline } from "ionicons/icons";
import "./Home.css";
import Boton from "../components/boton";
import { useHistory } from "react-router-dom";
import BarraInferior from "../components/BarraInferior";
import { menuOutline } from "ionicons/icons"; // Icono del botón
import Alerta from "../components/Alerta";
import ModalTarea from "../components/ModalTarea";

interface Tarea {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  hora: string;
  realizada: boolean;
  favorita: boolean;
}

const Home: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [idAEliminar, setIdAEliminar] = useState<number | null>(null);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [abierto, setAbierto] = useState(false); // Estado para controlar la barra inferior
  const [tareaSeleccionada, setTareaSeleccionada] = useState<Tarea | null>(
    null
  ); // Estado para la tarea seleccionada
  const [modalVisible, setModalVisible] = useState<boolean>(false); // Estado para controlar la visibilidad del modal
  const history = useHistory();

  const irTareas = () => {
    history.push("/taskForm");
  };

  const toggleFavorito = async (tarea: Tarea) => {
    const tareaActualizada = { ...tarea, favorita: !tarea.favorita };

    try {
      const response = await fetch(
        `http://localhost:8081/api/tareas/${tarea.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tareaActualizada),
        }
      );

      if (!response.ok) throw new Error("Error al actualizar tarea");

      setTareas((prevTareas) =>
        prevTareas.map((t) => (t.id === tarea.id ? tareaActualizada : t))
      );
    } catch (error) {
      console.error("Error al marcar como favorita:", error);
    }
  };

  const TareasHechas = () => {
    history.push("/TareasHechas");
  };

  const toggleBarra = () => {
    setAbierto(!abierto); // Cambiar el estado de la barra
  };

  useIonViewWillEnter(() => {
    const fetchTareas = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/tareas/no-realizadas"
        );
        const data = await response.json();
        setTareas(data);
      } catch (error) {
        console.error("Error al cargar las tareas:", error);
      }
    };

    fetchTareas();
  });

  const confirmarEliminacion = (id: number) => {
    setIdAEliminar(id);
    setMostrarAlerta(true);
  };

  const eliminarTarea = async () => {
    if (idAEliminar === null) return;

    try {
      const response = await fetch(
        `http://localhost:8081/api/tareas/${idAEliminar}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setTareas(tareas.filter((t) => t.id !== idAEliminar));
      } else {
        console.error("No se pudo eliminar la tarea");
      }
    } catch (error) {
      console.error("Error eliminando la tarea:", error);
    }

    setMostrarAlerta(false);
    setIdAEliminar(null);
  };

  const marcarComoRealizada = async (tarea: Tarea) => {
    const tareaActualizada = { ...tarea, realizada: true };

    try {
      const response = await fetch(
        `http://localhost:8081/api/tareas/${tarea.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tareaActualizada),
        }
      );

      if (!response.ok) throw new Error("Error al actualizar tarea");

      setTareas((prevTareas) => prevTareas.filter((t) => t.id !== tarea.id));
    } catch (error) {
      console.error("Error al marcar como realizada:", error);
    }
  };

  const mostrarDescripcionTarea = (tarea: Tarea) => {
    setTareaSeleccionada(tarea);
    setModalVisible(true); // Abrir el modal
  };

  const cerrarModal = () => {
    setModalVisible(false); // Cerrar el modal
    setTareaSeleccionada(null);
  };

  const confirmarEliminar = (id: number) => {
    setIdAEliminar(id);
    setMostrarAlerta(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <div className="header-container">
          <Boton
            texto=""
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
              <input
                type="radio"
                onChange={() => marcarComoRealizada(tarea)}
                className="radio-tarea"
              />

              <div className="info-tarea">
                <IonCardHeader>
                  <IonCardTitle onClick={() => mostrarDescripcionTarea(tarea)}>
                    {tarea.nombre}
                  </IonCardTitle>
                  <IonCardSubtitle>
                    {tarea.fecha} - {tarea.hora}
                  </IonCardSubtitle>
                </IonCardHeader>
              </div>

              <div className="botones-acciones">
                <Boton
                  texto=""
                  onClick={() => toggleFavorito(tarea)}
                  icono={tarea.favorita ? heart : heartOutline}
                  className={`boton-favorito ${
                    tarea.favorita ? "icono-rojo" : ""
                  }`}
                  fill="clear"
                />

                <Boton
                  texto=""
                  onClick={() => history.push("/editarTarea", { tarea })}
                  className="boton-accion"
                  icono={pencil}
                  fill="clear"
                />
                <Boton
                  texto=""
                  onClick={() => confirmarEliminacion(tarea.id)}
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

        {/* Modal para mostrar la descripción de la tarea */}
        <ModalTarea
          isOpen={modalVisible}
          onClose={cerrarModal}
          tarea={tareaSeleccionada}
        />

        {/* Pasamos el estado 'abierto' como prop a BarraInferior */}
        <BarraInferior abierto={abierto} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
