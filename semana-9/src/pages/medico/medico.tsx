import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const Medico: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Bienvenido a la página de Medico</h2>
      </IonContent>
    </IonPage>
  );
};

export default Medico;
