import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Medico from './pages/medico/medico'; 
import Enfermero from './pages/enfermero/enfermero';
import Recepcionista from './pages/recepcionista/recepcionista';
import Paciente from './pages/paciente/paciente';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* ✅ Cada ruta debe ir separada */}
        <Route exact path="/home" component={Home} />
        <Route exact path="/recepcionista" component={Recepcionista} />
        <Route exact path="/enfermero" component={Enfermero} />
        <Route exact path="/paciente" component={Paciente} />
        <Route exact path="/medico" component={Medico} />

        {/* ✅ Redireccionar la raíz ("/") a "/home" */}
        <Route exact path="/">
          <Redirect to="/home" /> 
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;

