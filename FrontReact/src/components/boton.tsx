import React, { MouseEvent } from "react";
import { IonButton, IonIcon } from "@ionic/react";

type Props = {
  texto?: string;
  onClick: (e: React.MouseEvent) => void; // Acepta evento de mouse
  icono?: string;
  className?: string;
  fill?: "solid" | "outline" | "clear";
};

const Boton: React.FC<Props> = ({ texto, onClick, icono, className, fill = "solid" }) => {
  const handleClick = (e: React.MouseEvent) => {
    onClick(e); // Pasamos el evento correctamente
  };

  return (
    <IonButton 
      className={className} 
      onClick={handleClick} 
      fill={fill}
    >
      {icono && <IonIcon icon={icono} slot="start" />}
      {texto}
    </IonButton>
  );
};

export default Boton;