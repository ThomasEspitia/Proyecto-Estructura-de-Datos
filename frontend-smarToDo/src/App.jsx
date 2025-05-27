import { useState, useEffect, useContext } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import RegistrarTareas from "./components/registrarTareas/RegistrarTareas";
import NotasRapidas from "./components/notasRapidas/NotasRapidas";
import Checklist from "./components/checklist/Checklist";
import Pomodoro from "./components/pomodoro/Pomodoro";
import Dashboard from "./components/dashboard/Dashboard";
import Perfil from "./components/perfil/Perfil";
import Juego from "./components/juego/Juego";

import { AppContext, AppProvider } from "./context/AppContext";

const App = () => {
  // Estado para los datos del login
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // Manejador de cambios en los inputs de login
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Modificamos handleLoginSubmit para que acepte opcionalmente credenciales directas
  const handleLoginSubmit = async (e, credentials = null) => {
    if (e && e.preventDefault) e.preventDefault();
    // Usamos las credenciales pasadas o el estado loginData
    const credToUse = credentials || loginData;
    try {
      const response = await fetch("https://b29e-181-237-232-90.ngrok-free.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credToUse),
      });

      if (response.ok) {
        const userInfo = await response.json();
        setUserData(userInfo);
        setIsLoggedIn(true);
        setShowLoginForm(false);
      } else {
        alert("Credenciales incorrectas, intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      alert("Ocurrió un problema al conectarse con el servidor.");
    }
  };

  // Función para logearse como invitado sin esperar la actualización del estado
  const handleGuestLogin = () => {
    const guestCredentials = {
      email: "ssalamanca@poligran.edu.co",
      password: "ssalamanca"
    };
    // Actualizamos el estado para mostrar las credenciales en los inputs, pero además pasamos guestCredentials directamente
    setLoginData(guestCredentials);
    handleLoginSubmit({ preventDefault: () => {} }, guestCredentials);
  };

  // Obtenemos el contexto de usuario
  const { userData, setUserData } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null); // Limpiar los datos del usuario al cerrar sesión
    setActiveTab("dashboard");
    setLoginData({ email: "", password: "" });
  };

    const components = {
      dashboard: <Dashboard />,
      tareas: <RegistrarTareas />,
      pomodoro: <Pomodoro />,
      notas: <NotasRapidas />,
      checklist: <Checklist />,
      juego: <Juego />,
      perfil: <Perfil onLogout={handleLogout} />, // 🔹 Se mantiene pero ahora recibe datos del contexto
    };

    const tabs = [
      { id: "dashboard", icon: "🎯", label: "Dashboard" },
      { id: "tareas", icon: "📝", label: "Tareas" },
      { id: "checklist", icon: "✅", label: "Checklist" },
      { id: "pomodoro", icon: "⏱️", label: "Pomodoro" },
      { id: "notas", icon: "📋", label: "Notas" },
      { id: "juego", icon: "🎮", label: "Juego" },
    ];






  if (!isLoggedIn) {
      return (
        <div className="landing-page">
          {/* Fondo animado */}
          <div className="bg-animation">
            <div className="stars"></div>
            <div className="stars2"></div>
            <div className="stars3"></div>
          </div>

          <header className="landing-header">
            <div className="logo-container">
              <h1 className="landing-logo">Smar<span>ToDo</span></h1>
            </div>
            <button 
              className="login-btn-header"
              onClick={() => setShowLoginForm(true)}
            >
              Iniciar Sesión
            </button>
          </header>
          
          <main className="landing-main">
            <section className="hero-section">
              <div className="hero-content">
                <h2>
                  <span className="highlight">Optimiza</span> tu tiempo,{" "}
                  <span className="highlight">maximiza</span> tu rendimiento
                </h2>
                <p className="hero-description">
                  La herramienta definitiva para estudiantes del <strong>Politécnico Grancolombiano</strong> que quieren organizar sus tareas, 
                  gestionar proyectos y mejorar su productividad con técnicas comprobadas.
                </p>
                <p className="hero-description">Puedes entrar al repositorio de este proyecto dando click <strong><a target="_blank" href="https://github.com/ThomasEspitia/Proyecto-Estructura-de-Datos" className="link-repositorio">AQUI</a></strong></p>
                
                
                <div className="cta-buttons">
                  <button 
                    className="primary-btn"
                    onClick={() => setShowLoginForm(true)}
                  >
                    Comenzar ahora
                  </button>
                </div>
                
                <div className="features-grid">
                  <div className="feature-card">
                    <div className="feature-icon">⏱️</div>
                    <h3>Técnica Pomodoro</h3>
                    <p>Gestiona tu tiempo con intervalos de trabajo efectivos</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">📝</div>
                    <h3>Listas inteligentes</h3>
                    <p>Tareas organizadas por prioridad y fecha</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">📊</div>
                    <h3>Seguimiento</h3>
                    <p>Analiza tu progreso semanal</p>
                  </div>
                </div>
              </div>
            </section>
          </main>

{showLoginForm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="relative bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
      <button 
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
        onClick={() => setShowLoginForm(false)}
      >
        &times;
      </button>
      
      <div className="hero-content">
        <h2 className="text-3xl font-bold text-indigo-800 mb-2">Iniciar Sesión</h2>
        <p className="text-lg text-gray-600 mb-4">
          Ingresa tus credenciales para acceder a <span className="highlight">SmarToDo</span>.
        </p>
        <div className="mb-4">
        </div>
        
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="block text-base font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
              placeholder="correo@poligran.edu.co"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-base font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button type="submit" className="primary-btn w-full py-2 mt-3 mb-5">
            Acceder a mi cuenta
          </button>
                    <button 
            onClick={handleGuestLogin}
            className="primary-btn w-full py-2"
          >
            Entrar como Invitado
          </button>
        </form>
      </div>
    </div>
  </div>
)}



        </div>
      );
    } 







    // Resto de tu aplicación (el código original que ya tenías)
    return (
      
  <div className='contenedor-mayor'>
        <div className="app-container">
          {/* Header superior para móvil */}
          <header className="mobile-header">
            <button 
              className="menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menú"
            >
              <span className={`menu-icon ${isMenuOpen ? 'open' : ''}`}></span>
            </button>
            <h1 className="app-title">SmarToDo</h1>
            <div 
              className="user-avatar"
              onClick={() => setActiveTab('perfil')}
              style={{ cursor: 'pointer' }}
            >
              <span>{userData?.initials || "Usuario"}</span>
            </div>
          </header>

          {/* Menú lateral */}
          <aside className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
            <nav className="nav-menu">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMenuOpen(false);
                  }}
                >
                  <span className="nav-icon">{tab.icon}</span>
                  <span className="nav-label">{tab.label}</span>
                </button>
              ))}
              
              {/* Botón de perfil en el sidebar */}
              <button
                className={`nav-item ${activeTab === 'perfil' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('perfil');
                  setIsMenuOpen(false);
                }}
              >
                <span className="nav-icon">👤</span>
                <span className="nav-label">Mi Perfil</span>
              </button>
            </nav>

            <div className="user-info mb-20">
              <div 
                className="user-avatar large"
                onClick={() => setActiveTab('perfil')}
                style={{ cursor: 'pointer' }}
              >
                <span>{userData?.initials || "Usuario"}</span>
              </div>
              <div className="user-details">
                <h3>{userData?.name || "Usuario"}</h3>
                <p>Excelente Estudiante 👌</p>
              </div>
            </div>
          </aside>

          {/* Overlay para móvil */}
          {isMenuOpen && isMobile && (
            <div 
              className="menu-overlay"
              onClick={() => setIsMenuOpen(false)}
            />
          )}

          {/* Contenido principal */}
          <main className="main-content">
            {components[activeTab] || <div>Selecciona una opción</div>}
          </main>

          {/* Barra inferior para móvil */}
          {isMobile && (
            <footer className="mobile-footer">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`footer-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-label">{tab.label}</span>
                </button>
              ))}

              {/* Botón de perfil en el footer móvil */}
              <button
                className={`footer-tab ${activeTab === 'perfil' ? 'active' : ''}`}
                onClick={() => setActiveTab('perfil')}
              >
                <span className="tab-icon">👤</span>
                <span className="tab-label">Perfil</span>
              </button>
            </footer>
          )}
        </div>
      </div>
    

    );
  };

export default App
