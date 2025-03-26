### Juan Esteban Oliveros Duran
### Charith Nikool Chavarro Meneses 
### Daniel Stiven Poveda Cante
# Componente:

## Descripción
- Un componente es una unidad reutilizable de código que encapsula una parte específica de la interfaz de usuario y su lógica. Generalmente, incluye una estructura HTML, estilos CSS y lógica en JavaScript o TypeScript. Los componentes permiten construir aplicaciones modulares y escalables.

- Un componente es una parte de una aplicación que combina código y diseño para mostrar algo en la pantalla. Es como un bloque de construcción que se puede reutilizar en diferentes partes de la aplicación.

- Por ejemplo, un botón, una tarjeta de usuario o un formulario pueden ser componentes.
---

## ¿Para qué sirve un componente?

- Reutilización: Se pueden utilizar en diferentes partes de la aplicación sin necesidad de reescribir código.

- Mantenimiento: Facilita la actualización y depuración del código, ya que cada componente tiene una función específica.

- Modularidad: Separa la lógica de la aplicación en partes independientes, lo que mejora la organización del código.

- Escalabilidad: Ayuda a estructurar aplicaciones grandes dividiéndolas en pequeños bloques funcionales.



---
## ¿Cómo se usa en cada framework?

#### **Angular**
- En Angular, un componente tiene tres partes:
    - HTML (estructura visual).
    - CSS (diseño).
    - TypeScript (lógica). 
#### **React**
- En React, un componente es una función o una clase que devuelve elementos visuales. 
    - CSS (diseño).
    - JSX (HTML + JS) → Define la estructura.
#### **Vue con Ionic**
- En Vue, un componente tiene tres secciones:
    - Template → Vista
    - Script → Logica
    - Style → Estilos


---

## ¿Cuándo no es recomendable usar un componente?
- **Cuando es demasiado simple:** Si solo contiene una línea de código, no justifica la creación de un componente.

- **Si no se reutiliza:** Si solo se usa en un único lugar y no mejora la organización del código.

- **Si introduce demasiada complejidad:** Demasiados componentes pueden hacer que el código sea más difícil de mantener.

- **Cuando genera demasiada fragmentación:** Dividir en componentes muy pequeños sin necesidad puede hacer más difícil seguir el flujo de la aplicación.


# Componente Persona
## Persona.tsx
```tsx
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


```
## Persona.types.ts
```ts
export type PersonaProps = {
    tipo: string;
    nombre: string;
    apellido: string;
    documento: string;
    fechaNacimiento: string;
    direccion: string;
    telefono: string;
    correo: string;
  };
```
## Persona.module.css
```css
.container {
    border: 1px solid #ccc;
    padding: 15px;
    border-radius: 8px;
    margin: 10px;
    width: 300px;
    text-align: left;
    background-color: #e11a1a;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  }
```
# Componente Home
## Home.tsx
```tsx 
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


  