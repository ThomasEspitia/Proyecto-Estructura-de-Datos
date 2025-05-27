// src/context/EvaluacionesContext.js
import { createContext, useContext, useState } from 'react';

const EvaluacionesContext = createContext();

export const EvaluacionesProvider = ({ children }) => {
  const [evaluaciones, setEvaluaciones] = useState([
    { materia: "Estructura de Datos", tipo: "Parcial", fecha: "27 mayo 2025" },
    { materia: "Cálculo 2", tipo: "Quiz", fecha: "30 mayo 2025" },
    { materia: "Paradigmas de Programación", tipo: "Parcial", fecha: "29 mayo 2025" }
  ]);

  return (
    <EvaluacionesContext.Provider value={{ evaluaciones, setEvaluaciones }}>
      {children}
    </EvaluacionesContext.Provider>
  );
};

export const useEvaluaciones = () => useContext(EvaluacionesContext);
