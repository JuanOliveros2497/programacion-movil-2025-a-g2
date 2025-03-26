import React from "react";
import { PersonaProps } from "./Persona.types";
import styles from "./Persona.module.css";

const Persona: React.FC<PersonaProps> = ({ tipo, nombre, apellido, documento, fechaNacimiento, direccion, telefono, correo }) => {
  return (
    <div className={styles.container}>
      <h2>{tipo}: {nombre} {apellido}</h2>
      <p><strong>Documento:</strong> {documento}</p>
      <p><strong>Fecha de Nacimiento:</strong> {fechaNacimiento}</p>
      <p><strong>Dirección:</strong> {direccion}</p>
      <p><strong>Teléfono:</strong> {telefono}</p>
      <p><strong>Correo:</strong> {correo}</p>
    </div>
  );
};

export default Persona;
