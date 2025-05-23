// src/components/Alerta.tsx
import React from "react";
import { IonModal, IonButton } from "@ionic/react";
import "./Alertas.css"; // tu estilo de modal aquí

interface AlertaProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  mensaje?: string;
}

const Alerta: React.FC<AlertaProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  mensaje,
}) => {
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onCancel}
      className="modal-centro"
      showBackdrop={true}
      backdropDismiss={true}
    >
      <div className="contenido-modal-eliminar">
        <h2>Eliminar tarea</h2>
        <p>{mensaje || "¿Está seguro que desea eliminar?"}</p>
        <div className="botones-modal">
          <IonButton color="danger" onClick={onCancel}>
            No
          </IonButton>
          <IonButton color="success" onClick={onConfirm}>
            SI
          </IonButton>
        </div>
      </div>
    </IonModal>
  );
};

export default Alerta;
