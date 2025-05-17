import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Tareas from "./pages/Tareas/Tareas";
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.css";
import TaskForm from "./components/formulario";
import EditarTarea from "./components/EditarTarea";
import TareasHechas from "./pages/TareasHechas";
import Inicio from "./pages/Inicio";
setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Route exact path="/Tareas" component={Tareas} />
        <Route path="/Inicio" component={Inicio} />
        <Route path="/taskForm" component={TaskForm} />
        <Route exact path="/editarTarea" component={EditarTarea} />
        <Route path="/tareasHechas" component={TareasHechas} exact />
        <Route exact path="/">
          <Redirect to="/Inicio" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
