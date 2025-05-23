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

import "./theme/variables.css";

import TaskForm from "./components/formulario";
import EditarTarea from "./components/EditarTarea";
import Inicio from "./pages/Inicio";
import ForgotPassword from "./pages/auth/ForgotPassword/ForgotPassword";
import Register from "./pages/auth/Register/Register";
import Login from "./pages/auth/Login/Login";
import TareasFavoritas from "./pages/TareasRealizadas/TareasFavoritas/TareasFavoritas";
import TareasHechas from "./pages/TareasRealizadas/TareasHechas/TareasHechas";
import ValidateTokenPage from "./pages/auth/ValidateTokenPage/ValidateTokenPage";
import ResetPassword from "./pages/auth/ResetPassword/ResetPassword";

setupIonicReact();
document.body.setAttribute("color-theme", "light");

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Rutas públicas */}
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/forgot-password" component={ForgotPassword} exact />
        
        {/* Rutas privadas */}
        <Route exact path="/home" component={Home} />
        <Route exact path="/Tareas" component={Tareas} />
        <Route path="/Inicio" component={Inicio} />
        <Route path="/taskForm" component={TaskForm} />
        <Route exact path="/editarTarea" component={EditarTarea} />
        <Route exact path="/tareas-hechas" component={TareasHechas} />
        <Route exact path="/tareas-favoritas" component={TareasFavoritas} />
        <Route path="/validate-token" component={ValidateTokenPage} exact />
        <Route path="/reset-password" component={ResetPassword} exact />
        {/* Redirección única para la ruta raíz */}
        <Route exact path="/">
          <Redirect to="/inicio" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;