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
} from "@ionic/react";
import "./TareasHechas.css";
import { useIonViewWillEnter } from "@ionic/react";
import { trash } from "ionicons/icons";
import Boton from "../components/boton";
import { useHistory } from "react-router-dom";
import Alerta from "../components/Alerta";

interface Tarea {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  hora: string;
  realizada: boolean;
  favorita: boolean;
}

const TareasHechas: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [idAEliminar, setIdAEliminar] = useState<number | null>(null);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const history = useHistory();

  const irHome = () => {
    history.push("/Home");
  };

  useIonViewWillEnter(() => {
    const fetchTareas = async () => {
      try {
        const response = await fetch(
          "https://app-back-tareas.onrender.com/api/tareas/realizadas"
        );
        const data = await response.json();
        setTareas(data);
      } catch (error) {
        console.error("Error al cargar tareas hechas:", error);
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
        `https://https://app-back-tareas.onrender.com/api/tareas/${idAEliminar}`,
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tareas realizadas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {tareas.length > 0 ? (
          tareas.map((tarea) => (
            <IonCard key={tarea.id} className="card-tarea">
              <IonCardHeader>
                <IonCardTitle>{tarea.nombre}</IonCardTitle>
                <IonCardSubtitle>
                  {tarea.fecha} - {tarea.hora}
                </IonCardSubtitle>
              </IonCardHeader>
              <Boton
                texto=""
                onClick={() => confirmarEliminacion(tarea.id)}
                className="botones-accion"
                icono={trash}
                fill="clear"
              />
            </IonCard>
          ))
        ) : (
          <p className="parrafo">"NO HAY TAREAS REALIZADAS".</p>
        )}

        <Alerta
          isOpen={mostrarAlerta}
          onConfirm={eliminarTarea}
          onCancel={() => {
            setMostrarAlerta(false);
            setIdAEliminar(null);
          }}
          mensaje="¿Deseas eliminar esta tarea?"
        />

        <div className="boton-regresar">
          <Boton
            texto="Atrás"
            onClick={irHome}
            className="boton-formulario"
            icono=""
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TareasHechas;
