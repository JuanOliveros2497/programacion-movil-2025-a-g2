import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import BotonPersonalizado from '../../components/BotonPersonalizado';
import { logOutOutline } from 'ionicons/icons';

const Enfermero: React.FC = () => {
  const history = useHistory();
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    correo: '',
    especialidad: '',
    licencia: '',
  });

  const manejarCambio = (e: CustomEvent, campo: string) => {
    const valor = (e.target as HTMLInputElement).value;
    setFormulario({ ...formulario, [campo]: valor });
  };

  const manejarEnvio = () => {
    console.log('Formulario enviado:', formulario);
    // Aquí puedes hacer una petición a tu backend
  };

  const irAHome = () => {
    history.push('/');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <BotonPersonalizado
          texto="Back"
          onClick={irAHome}
          className="boton-back"
        />
          <IonTitle>Registro Enfermero</IonTitle>
        </IonToolbar>
      
      </IonHeader>
      <IonContent className="ion-padding">

        <IonItem>
          <IonLabel position="stacked">Nombre</IonLabel>
          <IonInput
            value={formulario.nombre}
            onIonInput={(e) => manejarCambio(e, 'nombre')}
            required
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Apellido</IonLabel>
          <IonInput
            value={formulario.apellido}
            onIonInput={(e) => manejarCambio(e, 'apellido')}
            required
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Edad</IonLabel>
          <IonInput
            type="number"
            value={formulario.edad}
            onIonInput={(e) => manejarCambio(e, 'edad')}
            required
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Correo Electrónico</IonLabel>
          <IonInput
            type="email"
            value={formulario.correo}
            onIonInput={(e) => manejarCambio(e, 'correo')}
            required
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Area de atencion</IonLabel>
          <IonInput
            value={formulario.especialidad}
            onIonInput={(e) => manejarCambio(e, 'especialidad')}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Turno Asignado</IonLabel>
          <IonInput
            value={formulario.licencia}
            onIonInput={(e) => manejarCambio(e, 'licencia')}
            required
          />
        </IonItem>

        <BotonPersonalizado
          texto="Guardar"
          icono={logOutOutline}
          onClick={manejarEnvio}
          className="boton-formulario"
        />

      </IonContent>
    </IonPage>
  );
};

export default Enfermero;