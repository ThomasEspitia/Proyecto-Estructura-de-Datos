import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Instala `uuid` con `npm install uuid`

const TareasContext = createContext();

export const TareasProvider = ({ children }) => {
  const [tareas, setTareas] = useState({
    porHacer: [
      { 
        id: uuidv4(), 
        titulo: 'Tarea atrasada', 
        descripcion: 'Subir lo pendiente antes del sábado.', 
        fechaLimite: '2025-06-01' 
      }
    ],
    haciendo: [
      { 
        id: uuidv4(), 
        titulo: 'Exposición (Pif)', 
        descripcion: 'Ir a clases para exponer el proyecto.', 
        fechaLimite: '2025-06-05'
      }
    ],
    hecho: [
      { 
        id: uuidv4(), 
        titulo: 'Cancelar cálculo 2', 
        descripcion: 'Cancelar la materia antes de perderla.', 
        fechaLimite: '2025-05-30'
      }
    ]
  });

  const [conteoTareas, setConteoTareas] = useState({
    porHacer: tareas.porHacer.length,
    haciendo: tareas.haciendo.length,
    hecho: tareas.hecho.length
  });

  return (
    <TareasContext.Provider value={{ tareas, setTareas, conteoTareas, setConteoTareas }}>
      {children}
    </TareasContext.Provider>
  );
};

export const useTareas = () => useContext(TareasContext);
