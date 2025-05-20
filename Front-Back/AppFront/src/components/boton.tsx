import React from "react";
import { IonButton, IonIcon } from "@ionic/react";

type Props = {
  texto?: string;
  onClick: () => void;
  icono?: string;
  className?: string;
  fill?: "solid" | "outline" | "clear"; // Se agrega la opción fill
};

const Boton: React.FC<Props> = ({ texto, onClick, icono, className, fill }) => {
  return (
    <IonButton className={className} onClick={onClick} fill={fill}>
      {icono && <IonIcon icon={icono} slot="start" />}
      {texto}
    </IonButton>
  );
};

export default Boton;
