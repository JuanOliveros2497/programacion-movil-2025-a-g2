import { IonContent, IonHeader, IonPage,IonCard, IonTitle, IonToolbar, IonCardHeader,
  IonCardTitle,
  IonCardContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Home.css';
import React from 'react';
import { sendOutline } from 'ionicons/icons';
import BotonPersonalizado from '../components/BotonPersonalizado';
import { logOutOutline } from 'ionicons/icons';

const manejarCerrarSesion = () => {
  console.log("Cerrando sesión");
};

const Home: React.FC = () => {
  const history = useHistory();

  const irAMedico = () => {
    history.push('/medico');
  };

  const irAEnfermero = () => {
    history.push('/enfermero');
  };

  const irAPaciente = () => {
    history.push('/paciente');
  };
  const irARecepcionista = () => {
    history.push('/paciente');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Juan Esteban Oliveros Duran </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="small">Juan Esteban Oliveros Duran </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard className ="card-principal">
          <IonCardHeader>
            <IonCardTitle>
              <p className="texto-centrado">GESTIÓN DE PERSONAL MÉDICO</p>

            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
        
        <BotonPersonalizado
          texto="Enfermero"
          icono={logOutOutline}
          onClick={irAEnfermero}
          className="centrado-pantalla"
        />
        <BotonPersonalizado
          texto="Medico"
          icono={logOutOutline}
          onClick={irAMedico}
          className="centrado-pantalla"
        />
         <BotonPersonalizado
          texto="Paciente"
          icono={logOutOutline}
          onClick={irAPaciente}
          className="centrado-pantalla"
        />
         <BotonPersonalizado
          texto="Recepcionista"
          icono={logOutOutline}
          onClick={irARecepcionista}
           className="centrado-pantalla"
        />
          </IonCardContent>
        </IonCard>

       
      </IonContent>
    </IonPage>
  );
};

export default Home;
