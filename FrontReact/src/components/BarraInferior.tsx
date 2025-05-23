import React from "react";
import "./BarraInferior.css";
import Boton from "./boton";
import BotonCerrarSesion from "./BotonCerrarSesion"; // <-- Importa aquí
import { add, checkmark, heart } from "ionicons/icons";
import { useHistory } from "react-router-dom"; // ✅ Versión 5

interface Props {
  abierto: boolean;
  onCrearTarea: (e?: React.MouseEvent) => void;
  onVerRealizadas: (e?: React.MouseEvent) => void;
}

const BarraInferior: React.FC<Props> = ({ 
  abierto, 
  onCrearTarea, 
  onVerRealizadas 
}) => {
  const history = useHistory();

  return (
    <div className={`barra-inferior ${abierto ? "activa" : ""}`}>
      <Boton
        texto="Agregar Tarea"
        onClick={onCrearTarea}
        className="boton-barra"
        icono={add}
        fill="clear"
      />
      <div className="linea"></div>
      <Boton
        texto="Favoritas"
        onClick={() => history.push("/tareas-favoritas")}
        className="boton-barra"
        icono={heart}
        fill="clear"
      />
      <Boton
        texto="Completadas"
        onClick={() => history.push("/tareas-hechas")}
        className="boton-barra"
        icono={checkmark}
        fill="clear"
      />

      {/* Aquí el botón para cerrar sesión */}
      <BotonCerrarSesion />
    </div>
  );
};

export default BarraInferior;
