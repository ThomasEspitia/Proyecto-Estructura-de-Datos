import { createContext, useContext, useState } from 'react';

const CheckContext = createContext();

export const CheckProvider = ({ children }) => {
  const [listaChecklist, setListaChecklist] = useState([
    { id: 1, text: 'Recuperar Panamá', completed: false },
    { id: 2, text: 'Comprender un recibo de luz', completed: true },
    { id: 3, text: 'Salir de Latinoamérica', completed: false },
    { id: 4, text: 'Encontrar el amor', completed: false },
    { id: 5, text: 'Derrocar a Nicolás Maduro', completed: false },
    { id: 6, text: 'Dormir 8 horas almenos un día a la semana', completed: true }
  ]);

  const [checklistCompletados, setChecklistCompletados] = useState([]); // ¡Asegúrate de que está aquí!

  return (
    <CheckContext.Provider value={{ listaChecklist, setListaChecklist, checklistCompletados, setChecklistCompletados }}>
      {children}
    </CheckContext.Provider>
  );
};

export const useCheck = () => useContext(CheckContext);
