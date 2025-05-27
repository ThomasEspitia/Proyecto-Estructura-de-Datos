import { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaRedo, FaCog, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const Pomodoro = () => {
  // Configuración inicial
  const [settings, setSettings] = useState({
    trabajo: 25 * 60,
    descansoCorto: 5 * 60,
    descansoLargo: 15 * 60,
    rondasParaDescansoLargo: 4,
    sonido: true,
    notificaciones: true
  });

  // Estado del Pomodoro
  const [tiempo, setTiempo] = useState(settings.trabajo);
  const [activo, setActivo] = useState(false);
  const [modo, setModo] = useState('Trabajo');
  const [ronda, setRonda] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [muted, setMuted] = useState(false);
  const [autoStart, setAutoStart] = useState(false);

  const audioRef = useRef(null);
  const notificationRef = useRef(null);

  // Efecto para manejar el temporizador
  useEffect(() => {
    let intervalo = null;

    if (activo && tiempo > 0) {
      intervalo = setInterval(() => {
        setTiempo((t) => t - 1);
      }, 1000);
    } else if (tiempo === 0) {
      clearInterval(intervalo);
      handleTiempoTerminado();
    }

    return () => clearInterval(intervalo);
  }, [activo, tiempo]);

  // Efecto para reproducir sonidos y solicitar permisos de notificación
  useEffect(() => {
    if (settings.sonido && !muted) {
      audioRef.current = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
    }
    
    if (settings.notificaciones && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, [settings, muted]);

  const handleTiempoTerminado = () => {
    if (settings.sonido && !muted && audioRef.current) {
      audioRef.current.play();
    }

    if (settings.notificaciones && Notification.permission === 'granted') {
      new Notification(`Pomodoro: ${modo} completado`, {
        body: modo === 'Trabajo' ? '¡Es hora de un descanso!' : '¡Volvamos al trabajo!',
        icon: 'https://cdn-icons-png.flaticon.com/512/3572/3572730.png'
      });
    }

    if (modo === 'Trabajo') {
      const esDescansoLargo = ronda % settings.rondasParaDescansoLargo === 0;
      const nuevoModo = esDescansoLargo ? 'Descanso Largo' : 'Descanso Corto';
      const nuevoTiempo = esDescansoLargo ? settings.descansoLargo : settings.descansoCorto;
      
      setModo(nuevoModo);
      setTiempo(nuevoTiempo);
      setRonda((r) => r + 1);
    } else {
      setModo('Trabajo');
      setTiempo(settings.trabajo);
    }

    setActivo(autoStart);
  };

  // Función para formatear el tiempo en mm:ss
  const formatearTiempo = (segundos) => {
    const m = Math.floor(segundos / 60).toString().padStart(2, '0');
    const s = (segundos % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const toggleTimer = () => {
    setActivo(!activo);
  };

  const resetTimer = () => {
    setActivo(false);
    setModo('Trabajo');
    setTiempo(settings.trabajo);
    setRonda(1);
  };

  // Manejo de cambios en la configuración:
  // Convertimos a segundos los valores ingresados para trabajo, descansoCorto y descansoLargo.
  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    let newValue = parseInt(value);
    if (isNaN(newValue)) return;
    if (["trabajo", "descansoCorto", "descansoLargo"].includes(name)) {
      newValue = newValue * 60; // Convertir de minutos a segundos
    }
    setSettings({
      ...settings,
      [name]: newValue
    });
  };

  const applySettings = () => {
    resetTimer();
    setShowSettings(false);
    setTiempo(settings.trabajo);
  };

  // Calcula el porcentaje de progreso para la barra de progreso
  const getProgress = () => {
    const totalTime = modo === 'Trabajo' ? settings.trabajo : 
                      modo === 'Descanso Corto' ? settings.descansoCorto : 
                      settings.descansoLargo;
    return ((totalTime - tiempo) / totalTime) * 100;
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  return (
    <div className="mx-auto p-8 bg-white">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-indigo-700">⏱️ Pomodoro</h2>
        <div className="flex space-x-2">
          <button 
            onClick={toggleMute}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            aria-label={muted ? 'Activar sonido' : 'Silenciar'}
          >
            {muted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="Configuración"
          >
            <FaCog />
          </button>
        </div>
      </div>

      {/* Configuración */}
      {showSettings && (
        <div className="mb-6 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Configuración</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trabajo (min)</label>
              <input
                type="number"
                name="trabajo"
                value={settings.trabajo / 60}
                onChange={handleSettingsChange}
                className="w-full p-2 border rounded"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descanso corto (min)</label>
              <input
                type="number"
                name="descansoCorto"
                value={settings.descansoCorto / 60}
                onChange={handleSettingsChange}
                className="w-full p-2 border rounded"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descanso largo (min)</label>
              <input
                type="number"
                name="descansoLargo"
                value={settings.descansoLargo / 60}
                onChange={handleSettingsChange}
                className="w-full p-2 border rounded"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rondas para descanso largo</label>
              <input
                type="number"
                name="rondasParaDescansoLargo"
                value={settings.rondasParaDescansoLargo}
                onChange={handleSettingsChange}
                className="w-full p-2 border rounded"
                min="1"
              />
            </div>
          </div>
          <div className="mt-3 flex items-center">
            <input
              type="checkbox"
              id="autoStart"
              checked={autoStart}
              onChange={() => setAutoStart(!autoStart)}
              className="mr-2"
            />
            <label htmlFor="autoStart" className="text-sm text-gray-700">
              Auto-iniciar siguiente ronda
            </label>
          </div>
          <button
            onClick={applySettings}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Aplicar
          </button>
        </div>
      )}

      {/* Temporizador */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg">
            Modo: <span className="font-semibold">{modo}</span>
          </p>
          <p className="text-sm bg-gray-200 px-2 py-1 rounded">
            Ronda: {ronda}/{settings.rondasParaDescansoLargo}
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${getProgress()}%` }}
          ></div>
        </div>

        <div className="text-6xl font-mono text-center my-6">
          {formatearTiempo(tiempo)}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleTimer}
            className={`px-6 py-3 rounded-full text-white flex items-center ${
              activo ? "bg-red-600 hover:bg-red-700" : "bg-indigo-600 hover:bg-blue-700"
            } transition-colors`}
          >
            {activo ? (
              <>
                <FaPause className="mr-2" /> Pausar
              </>
            ) : (
              <>
                <FaPlay className="mr-2" /> Iniciar
              </>
            )}
          </button>
          <button
            onClick={resetTimer}
            className="px-4 py-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors flex items-center"
          >
            <FaRedo className="mr-2" /> Reiniciar
          </button>
        </div>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center">
        <div className="text-lg font-medium text-gray-600">
          <p>
            Próximo:{" "}
            {modo === "Trabajo"
              ? (ronda % settings.rondasParaDescansoLargo === 0 ? "Descanso Largo" : "Descanso Corto")
              : "Trabajo"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
