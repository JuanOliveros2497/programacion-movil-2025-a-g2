import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { useHistory } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestión de Personal Médico </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
     
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="small">Gestion </IonTitle>
          </IonToolbar>

        </IonHeader>
        <IonButton className="boton-pequeno" routerLink="/medico">
           Médico
          </IonButton>
          <IonButton className="boton-pequeno" routerLink="/enfermero">
          enfermero
          </IonButton>
          <IonButton className="boton-pequeno" routerLink="/paciente">
          paciente
          </IonButton>
          <IonButton className="boton-pequeno-R" routerLink="/recepcionista">
          recepcionista
          </IonButton>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
