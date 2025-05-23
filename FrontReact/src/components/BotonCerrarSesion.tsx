import React from "react";
import { useHistory } from "react-router-dom";
import Boton from "./boton"; // ajusta la ruta según tu proyecto
import { logOut } from "ionicons/icons";

const BotonCerrarSesion: React.FC = () => {
  const history = useHistory();

  const cerrarSesion = () => {
    localStorage.removeItem("userId");
    history.push("/login");
  };

  return (
    <Boton
      texto="Cerrar Sesión"
      onClick={cerrarSesion}
      icono={logOut}  // aquí debe ser "icono", no "Icon"
      fill="clear"
      className="boton-barra" // o la clase que uses para estilos similares
    />
  );
};

export default BotonCerrarSesion;
