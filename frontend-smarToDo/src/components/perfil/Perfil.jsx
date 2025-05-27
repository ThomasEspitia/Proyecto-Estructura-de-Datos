// components/perfil/Perfil.jsx
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useEvaluaciones } from "../../context/EvaluacionesContext";

const Perfil = ({ onLogout }) => {
  const { userData } = useContext(AppContext);
  const { evaluaciones, setEvaluaciones } = useEvaluaciones();

  // Horario de clases de ejemplo
  const horarioClases = [
    { materia: "Estructura de Datos", hora: "Lunes 8:00-10:00", aula: "410" },
    { materia: "Paradigmas de Programación", hora: "Martes 10:00-12:00", aula: "C-105" },
    { materia: "Elementos de la teoría de la computación", hora: "Miércoles 14:00-16:00", aula: "F-101" },
    { materia: "Cálculo 2", hora: "Jueves 8:00-10:00", aula: "D-410" }
  ];

  // Estados para manejo del formulario para agregar evaluación
  const [nuevaEvaluacion, setNuevaEvaluacion] = useState({
    materia: "",
    tipo: "",
    fecha: ""
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // Estados para edición de evaluaciones
  const [editIndex, setEditIndex] = useState(null);
  const [editEvaluacion, setEditEvaluacion] = useState({
    materia: "",
    tipo: "",
    fecha: ""
  });

  // Manejo de cambios para nuevo registro
  const handleNewEvaluacionChange = (e) => {
    const { name, value } = e.target;
    setNuevaEvaluacion((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para agregar una evaluación
  const handleAddEvaluacion = (e) => {
    e.preventDefault();
    if (!nuevaEvaluacion.materia || !nuevaEvaluacion.tipo || !nuevaEvaluacion.fecha) {
      alert("Complete todos los campos para agregar una evaluación.");
      return;
    }

    // Evitar evaluaciones duplicadas
    const duplicate = evaluaciones.some(
      (ev) =>
        ev.materia.trim().toLowerCase() === nuevaEvaluacion.materia.trim().toLowerCase() &&
        ev.tipo.trim().toLowerCase() === nuevaEvaluacion.tipo.trim().toLowerCase() &&
        ev.fecha.trim() === nuevaEvaluacion.fecha.trim()
    );
    if (duplicate) {
      alert("La evaluación ya existe. Por favor, ingrese una evaluación diferente.");
      return;
    }

    setEvaluaciones([nuevaEvaluacion, ...evaluaciones]);
    setNuevaEvaluacion({ materia: "", tipo: "", fecha: "" });
    setShowAddForm(false);
  };

  // Manejo de eliminación de evaluación
  const handleEliminarEvaluacion = (index) => {
    if (window.confirm("¿Estás seguro de eliminar esta evaluación?")) {
      setEvaluaciones(evaluaciones.filter((_, i) => i !== index));
    }
  };

  // Manejo para iniciar edición
  const handleEditarEvaluacion = (index) => {
    setEditIndex(index);
    setEditEvaluacion(evaluaciones[index]);
  };

  // Actualizar los cambios en el formulario de edición
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEvaluacion((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Guardar los cambios de la evaluación editada
  const handleSaveEdit = (index) => {
    if (!editEvaluacion.materia || !editEvaluacion.tipo || !editEvaluacion.fecha) {
      alert("Complete todos los campos para editar la evaluación.");
      return;
    }
    // Validar duplicados (excluyendo la evaluación en edición)
    const duplicate = evaluaciones.some((ev, i) => {
      return (
        i !== index &&
        ev.materia.trim().toLowerCase() === editEvaluacion.materia.trim().toLowerCase() &&
        ev.tipo.trim().toLowerCase() === editEvaluacion.tipo.trim().toLowerCase() &&
        ev.fecha.trim() === editEvaluacion.fecha.trim()
      );
    });
    if (duplicate) {
      alert("Ya existe una evaluación con estos datos, por favor ingrese otra.");
      return;
    }
    const updatedList = evaluaciones.map((ev, i) =>
      i === index ? editEvaluacion : ev
    );
    setEvaluaciones(updatedList);
    setEditIndex(null);
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Encabezado con foto y datos básicos */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-5xl text-white font-bold shadow-lg">
          {userData?.initials || "Usuario"}
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            {userData?.name || "Usuario"}
          </h1>
          <p className="text-blue-600 font-medium mb-2">
            Estudiante de: {userData?.career || "Usuario"}
          </p>
          <div className="flex justify-center md:justify-start gap-3">
            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
              Semestre 3
            </span>
            <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
              Presencial
            </span>
          </div>
        </div>
      </div>

      {/* Sección principal en dos columnas */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Información Académica */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-blue-500">🎓</span> Información Académica
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between pb-2 border-b border-gray-100">
              <span className="font-medium text-gray-600">Correo:</span>
              <span className="text-gray-800">{userData?.email || "Usuario"}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-gray-100">
              <span className="font-medium text-gray-600">
                Facultad:
              </span>
              <span className="text-gray-800">Ingeniería</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-gray-100">
              <span className="font-medium text-gray-600">
                Programa:
              </span>
              <span className="text-gray-800">
                {userData?.career || "Usuario"}
              </span>
            </div>
            <div className="flex justify-between pb-2 border-b border-gray-100">
              <span className="font-medium text-gray-600">
                Promedio:
              </span>
              <span className="text-gray-800">4.2/5.0</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">
                Créditos aprobados:
              </span>
              <span className="text-gray-800">85/150</span>
            </div>
          </div>
        </div>

        {/* Horario de Clases */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-blue-500">🕒</span> Horario de Clases
          </h2>
          <div className="space-y-3">
            {horarioClases.map((clase, index) => (
              <div key={index} className="pb-2 border-b border-gray-100 last:border-0">
                <p className="font-medium text-gray-800">{clase.materia}</p>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{clase.hora}</span>
                  <span>Aula: {clase.aula}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botón para mostrar/ocultar el formulario de agregar evaluación */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
        >
          {showAddForm ? "Cancelar" : "Agregar Evaluación"}
        </button>
      </div>

      {/* Formulario para registrar una nueva evaluación */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-blue-500">➕</span> Registrar Evaluación
          </h2>
          <form onSubmit={handleAddEvaluacion}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Materia
                </label>
                <input
                  type="text"
                  name="materia"
                  value={nuevaEvaluacion.materia}
                  onChange={handleNewEvaluacionChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo
                </label>
                <input
                  type="text"
                  name="tipo"
                  value={nuevaEvaluacion.tipo}
                  onChange={handleNewEvaluacionChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha
                </label>
                <input
                  type="date"
                  name="fecha"
                  value={nuevaEvaluacion.fecha}
                  onChange={handleNewEvaluacionChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              Agregar Evaluación
            </button>
          </form>
        </div>
      )}

      {/* Próximas Evaluaciones */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-blue-500">📝</span> Próximas Evaluaciones
        </h2>
        <div className="space-y-3">
          {evaluaciones.map((evaluacion, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start gap-4 pb-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4 w-full">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  {evaluacion.tipo === "Parcial"
                    ? "✏️"
                    : evaluacion.tipo === "Taller"
                    ? "📋"
                    : "📂"}
                </div>
                {editIndex === index ? (
                  <div className="flex-1">
                    <input
                      type="text"
                      name="materia"
                      value={editEvaluacion.materia}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded mb-2"
                      placeholder="Materia"
                    />
                    <input
                      type="text"
                      name="tipo"
                      value={editEvaluacion.tipo}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded mb-2"
                      placeholder="Tipo"
                    />
                    <input
                      type="date"
                      name="fecha"
                      value={editEvaluacion.fecha}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded mb-2"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveEdit(index)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors text-sm"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{evaluacion.materia}</p>
                    <p className="text-sm text-gray-600">
                      {evaluacion.tipo} &bull; {evaluacion.fecha}
                    </p>
                  </div>
                )}
              </div>
              {editIndex !== index && (
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button
                    onClick={() => handleEditarEvaluacion(index)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminarEvaluacion(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Asignatura Destacada */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span className="text-blue-500">🌟</span> Asignatura Destacada
        </h2>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center text-2xl">
            📊
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Estructura de Datos</h3>
            <p className="text-gray-600 mb-2">Prof. Diana Carolina • Salon 401</p>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-gray-600">Promedio actual</p>
                <p className="font-bold text-blue-600">4.5/5.0</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Próxima evaluación</p>
                <p className="font-bold text-blue-600">Martes 27 May (Parcial)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botón de acción: Cerrar sesión */}
      <button
        onClick={onLogout}
        className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2"
      >
        <span>🚪</span> Cerrar sesión
      </button>
    </div>
  );
};

export default Perfil;
