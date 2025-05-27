import { useState, useEffect, useContext } from 'react';
import { AppContext } from "../../context/AppContext";
import { useTareas } from '../../context/ContextTareas';
import { useCheck } from '../../context/contextCheck';
import { useNotas } from '../../context/contextNotas';
import { useEvaluaciones } from '../../context/EvaluacionesContext';

const Dashboard = () => {
  const { checklistCompletados } = useCheck();
  const { conteoTareas, tareas } = useTareas();
  const { notasGuardadas } = useNotas();
  const { evaluaciones } = useEvaluaciones();
  const { userData } = useContext(AppContext);

  // Cálculo dinámico de productividad
  const calcularProductividad = () => {
    const totalTareas = tareas.porHacer.length + tareas.haciendo.length + tareas.hecho.length;
    const progresoTareas = totalTareas > 0 ? tareas.hecho.length / totalTareas : 0;
    const progresoChecklists = checklistCompletados.length > 0 ? checklistCompletados.length / 5 : 0;
    const progresoNotas = notasGuardadas.length > 0 ? notasGuardadas.length / 10 : 0;

    const productividad = 
      (progresoTareas * 0.5) + 
      (progresoChecklists * 0.3) + 
      (progresoNotas * 0.2);

    return Math.min(Math.floor(productividad * 100), 100);
  };

  const [productividad, setProductividad] = useState(calcularProductividad());

  useEffect(() => {
    setProductividad(calcularProductividad());
  }, [tareas, checklistCompletados, notasGuardadas]);

  // Configuración del indicador circular
  const radio = 40;
  const circunferencia = 2 * Math.PI * radio;
  const offset = circunferencia - (productividad / 100) * circunferencia;

  return (
    <div className="pb-10 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r mb-5 from-indigo-600 to-purple-600 px-6 pt-8 pb-6 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-indigo-100">Hola, {userData?.name || "Usuario"}!</h1>
            <p className="text-indigo-100/90 text-sm pt-1">Tu progreso de hoy</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-500/20 text-indigo-100 px-3 py-1 rounded-full text-sm flex items-center">
              🔥 Día {5} • {productividad}%
            </div>
          </div>
        </div>
      </div>

      {/* Sección de métricas principales */}
      <div className="px-6 -mt-8">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Tarjeta de productividad */}
          <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100/50">
            <div className="flex wrap justify-between flex-wrap items-center">
              <div className="relative">
                <svg className="transform -rotate-90 w-24 h-24">
                  <circle
                    cx="48"
                    cy="48"
                    r={radio}
                    className="stroke-current text-gray-200"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r={radio}
                    className="stroke-current text-indigo-500"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={circunferencia}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-indigo-600">
                    {productividad}%
                  </span>
                </div>
              </div>
              <div className="flex-1 pl-4">
                <h3 className="text-lg font-semibold text-gray-800">Productividad</h3>
                <p className="text-sm text-gray-600 mt-2">
                  {productividad >= 90 ? '¡Rendimiento máximo! 🚀' : 
                   productividad >= 75 ? '¡Buen progreso! 💪' : 
                   '¡Tú puedes! 💡'}
                </p>
              </div>
            </div>
          </div>

          {/* Tarjeta de enfoque */}
          <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100/50">
            <div className="flex justify-between flex-wrap items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Tareas activas</h3>
                <p className="text-3xl font-bold text-purple-600 mt-">
                  {tareas.haciendo.length}
                </p>
                <p className="text-sm text-gray-600 mt-2">En progreso actualmente</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 mt-4 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📌</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de progreso de tareas */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Progreso de Tareas</h2>
        <div className="grid grid-cols-3 gap-3">
          {/* Tarjeta Por Hacer */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100/50">
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-fuchsia-100 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-xl">⏳</span>
                </div>
                <p className="text-xl font-bold text-fuchsia-600">{tareas.porHacer.length}</p>
              </div>
              <p className="text-xs text-gray-500">Por hacer</p>
            </div>
          </div>

          {/* Tarjeta En Progreso */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100/50">
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-xl">🚧</span>
                </div>
                <p className="text-xl font-bold text-blue-600">{tareas.haciendo.length}</p>
              </div>
              <p className="text-xs text-gray-500">En progreso</p>
            </div>
          </div>

          {/* Tarjeta Completadas */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100/50">
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-xl">✅</span>
                </div>
                <p className="text-xl font-bold text-teal-600">{tareas.hecho.length}</p>
              </div>
              <p className="text-xs text-gray-500">Completadas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen de actividad */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Resumen de Actividad</h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100/50 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl">✅</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{checklistCompletados.length}</p>
            <p className="text-xs text-gray-500">Checklists completados</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100/50 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl">📚</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">{notasGuardadas.length}</p>
            <p className="text-xs text-gray-500">Recursos guardados</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100/50 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl">⏱️</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">{Math.floor(tareas.hecho.length * 25)}</p>
            <p className="text-xs text-gray-500">Minutos trabajados</p>
          </div>
        </div>
      </div>

      {/* Próximas Evaluaciones */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Próximas Evaluaciones</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="space-y-3">
            {evaluaciones.map((evalItem, index) => (
              <div
                key={index}
                className="flex items-center gap-4 pb-3 border-b border-gray-100 last:border-0"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  {evalItem.tipo === "Parcial"
                    ? "✏️"
                    : evalItem.tipo === "Taller"
                    ? "📋"
                    : "📂"}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{evalItem.materia}</p>
                  <p className="text-sm text-gray-600">
                    {evalItem.tipo} &bull; {evalItem.fecha}
                  </p>
                </div>
                <span className="text-sm font-medium text-blue-600">Próximo</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="px-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-indigo-600 p-4 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-center">
              <span className="text-2xl mr-2">📅</span>
              <span className="font-medium">
                Tareas pendientes: {tareas.porHacer.length}
              </span>
            </div>
          </div>
          <div className="bg-purple-600 p-4 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-center">
              <span className="text-2xl mr-2">📘</span>
              <span className="font-medium">
                Notas creadas: {notasGuardadas.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
