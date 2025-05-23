import React from "react";
import { IonModal, IonButton } from "@ionic/react";
import "./ModalTarea.css";
interface Tarea {
  nombre: string;
  descripcion: string;
}

interface ModalTareaProps {
  isOpen: boolean;
  onClose: () => void;
  tarea: Tarea | null;
}

const ModalTarea: React.FC<ModalTareaProps> = ({ isOpen, onClose, tarea }) => {
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      className="modal-centroTarea"
    >
      <div className="modal-contenidoTarea">
        {tarea && (
          <>
            <h2>{tarea.nombre}</h2>
            <p>{tarea.descripcion}</p>
            <IonButton className="boton-accionTarea" onClick={onClose}>
              Cerrar
            </IonButton>
          </>
        )}
      </div>
    </IonModal>
  );
};

export default ModalTarea;
