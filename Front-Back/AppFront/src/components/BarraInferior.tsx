import React from "react";
import "./BarraInferiror.css";
import Boton from "./boton";
import { useHistory } from "react-router";
import { add, checkmark } from "ionicons/icons";
type Props = {
  abierto: boolean;
};

const BarraInferior: React.FC<Props> = ({ abierto }) => {
  const history = useHistory();

  const TareasHechas = () => {
    history.push("/TareasHechas");
  };
  const irTareas = () => {
    history.push("/Tareas");
  };

  return (
    <div className={`barra-inferior ${abierto ? "activa" : ""}`}>
      <Boton
        texto="Agregar Tarea"
        onClick={irTareas}
        className="boton-barra"
        icono={add}
      />
      <div className="linea"></div>
      <Boton
        texto="Tareas Hechas"
        onClick={TareasHechas}
        className="boton-barra"
        icono={checkmark}
      />
    </div>
  );
};

export default BarraInferior;
