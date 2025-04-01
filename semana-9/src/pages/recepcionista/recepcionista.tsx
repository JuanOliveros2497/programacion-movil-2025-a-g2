import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const Recepcionista: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Pciente</h2>
      </IonContent>
    </IonPage>
  );
};

export default Recepcionista;