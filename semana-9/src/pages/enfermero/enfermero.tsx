import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const Enfermero: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <div>
    <h2>Bienvenido a la página de Médico</h2>
  </div>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>enfermero</h2>
      </IonContent>
    </IonPage>
  );
};

export default Enfermero;