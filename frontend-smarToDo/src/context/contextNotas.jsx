import { createContext, useContext, useState } from 'react';

const NotasContext = createContext();

export const NotasProvider = ({ children }) => {
  const [notasGuardadas, setNotasGuardadas] = useState([{texto: 'Reggaeton, champán-pán-pán-pán-pán-pán', fecha: new Date()}]);

  return (
    <NotasContext.Provider value={{ notasGuardadas, setNotasGuardadas }}>
      {children}
    </NotasContext.Provider>
  );
};

export const useNotas = () => useContext(NotasContext);
