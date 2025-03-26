import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Persona from '../components/Persona';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista de Personas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Persona
          tipo="Cliente"
          nombre="Juan"
          apellido="Pérez"
          documento="12345678"
          fechaNacimiento="1990-05-20"
          direccion="Calle Falsa 123"
          telefono="123-456-7890"
          correo="juan@example.com"
        />
        <Persona
          tipo="Empleado"
          nombre="Ana"
          apellido="Gómez"
          documento="87654321"
          fechaNacimiento="1985-10-15"
          direccion="Avenida Siempre Viva 742"
          telefono="098-765-4321"
          correo="ana@example.com"
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
