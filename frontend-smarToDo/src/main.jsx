import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'
import { TareasProvider } from './context/ContextTareas.jsx';
import { CheckProvider } from './context/contextCheck.jsx';
import { NotasProvider } from './context/contextNotas.jsx';
import { EvaluacionesProvider } from "./context/EvaluacionesContext";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
       <TareasProvider>
        <CheckProvider>
          <NotasProvider> 
              <EvaluacionesProvider>
                <App />
              </EvaluacionesProvider>
          </NotasProvider>
        </CheckProvider>
      </TareasProvider>
    </AppProvider>
  </StrictMode>,
)
