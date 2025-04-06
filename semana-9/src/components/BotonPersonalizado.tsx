import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import './BotonPersonalizado.css';

type Props = {
  texto: string;
  onClick: () => void;
  icono?: string;
  className?: string; 
};

const BotonPersonalizado: React.FC<Props> = ({ texto, onClick, icono, className }) => {
  return (
    <IonButton className={`boton-global ${className || ''}`} onClick={onClick}>
      {icono && <IonIcon icon={icono} slot="start" />}
      {texto}
    </IonButton>
  );
};

export default BotonPersonalizado;
