import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { useTareas } from '../../context/ContextTareas';

const RegistrarTareas = () => {
  const { tareas, setTareas, setConteoTareas } = useTareas();

  // Estado para el formulario de nueva tarea
  const [nuevaTarea, setNuevaTarea] = useState({
    titulo: '',
    descripcion: '',
    fechaLimite: ''
  });

  // Estado para la tarea en edición (si corresponde)
  const [editingTask, setEditingTask] = useState(null);

  // Actualizar el conteo de tareas al cambiar la lista
  useEffect(() => {
    setConteoTareas({
      porHacer: tareas.porHacer.length,
      haciendo: tareas.haciendo.length,
      hecho: tareas.hecho.length,
    });
  }, [tareas, setConteoTareas]);

  // Agregar tarea (con validaciones de campos completos y duplicidad)
  const agregarTarea = () => {
    if (!nuevaTarea.titulo || !nuevaTarea.descripcion || !nuevaTarea.fechaLimite) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Evitar tareas duplicadas usando el título (sin distinguir mayúsculas o espacios)
    const allTasks = [
      ...tareas.porHacer,
      ...tareas.haciendo,
      ...tareas.hecho,
    ];
    const tareaExistente = allTasks.some(
      (t) =>
        t.titulo.trim().toLowerCase() === nuevaTarea.titulo.trim().toLowerCase()
    );
    if (tareaExistente) {
      alert("La tarea ya existe. Por favor, ingrese un título diferente.");
      return;
    }

    const nueva = {
      id: uuidv4(),
      ...nuevaTarea,
    };

    setTareas((prev) => ({
      ...prev,
      porHacer: [nueva, ...prev.porHacer],
    }));

    setNuevaTarea({ titulo: '', descripcion: '', fechaLimite: '' });
  };

  // Mover tarea de una columna a otra
  const moverTarea = (id, desde, hacia) => {
    setTareas((prev) => {
      const nuevaLista = { ...prev };
      const tareaMovida = nuevaLista[desde].find((t) => t.id === id);
      if (!tareaMovida) return prev;
      nuevaLista[desde] = nuevaLista[desde].filter((t) => t.id !== id);
      nuevaLista[hacia] = [tareaMovida, ...nuevaLista[hacia]];
      return nuevaLista;
    });
  };

  // Eliminar tarea
  const eliminarTarea = (id, columna) => {
    if (confirm("¿Eliminar esta tarea?")) {
      setTareas((prev) => ({
        ...prev,
        [columna]: prev[columna].filter((t) => t.id !== id),
      }));
    }
  };

  // Drag & Drop: iniciar el arrastre
  const handleDragStart = (e, tarea, columnaOrigen) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ id: tarea.id, from: columnaOrigen })
    );
  };

  // Permitir drop (previene el comportamiento por defecto)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Soltar la tarea en la columna destino
  const handleDrop = (e, targetColumna) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    if (!data) return;
    const { id, from } = JSON.parse(data);
    if (from === targetColumna) return;
    moverTarea(id, from, targetColumna);
  };

  // Inicia la edición de una tarea (coloca los datos de la tarea en modo edición)
  const iniciarEdicion = (tarea) => {
    setEditingTask(tarea);
  };

  // Guardar los cambios de la tarea editada
  const guardarEdicion = () => {
    if (
      !editingTask.titulo ||
      !editingTask.descripcion ||
      !editingTask.fechaLimite
    ) {
      alert("Complete todos los campos para editar la tarea.");
      return;
    }
    // Validar duplicados, excluyendo la tarea que se edita
    const allTasks = [
      ...tareas.porHacer,
      ...tareas.haciendo,
      ...tareas.hecho,
    ];
    const duplicate = allTasks.some(
      (t) =>
        t.id !== editingTask.id &&
        t.titulo.trim().toLowerCase() === editingTask.titulo.trim().toLowerCase()
    );
    if (duplicate) {
      alert("Ya existe una tarea con ese título, ingrese uno diferente.");
      return;
    }

    setTareas((prev) => ({
      porHacer: prev.porHacer.map((t) =>
        t.id === editingTask.id ? editingTask : t
      ),
      haciendo: prev.haciendo.map((t) =>
        t.id === editingTask.id ? editingTask : t
      ),
      hecho: prev.hecho.map((t) =>
        t.id === editingTask.id ? editingTask : t
      ),
    }));
    setEditingTask(null);
  };

  // Renderiza cada columna (estado de la tarea)
  const renderColumn = (titulo, estado, nombre, items) => {
    const colorMap = {
      porHacer: {
        border: "border-fuchsia-300",
        bg: "bg-fuchsia-100",
        text: "text-fuchsia-700",
      },
      haciendo: {
        border: "border-blue-400",
        bg: "bg-blue-50",
        text: "text-blue-700",
      },
      hecho: {
        border: "border-teal-200",
        bg: "bg-teal-50",
        text: "text-teal-600",
      },
    };

    return (
      <div
        className={`w-full bg-white rounded-lg shadow-sm border ${colorMap[estado].border} flex flex-col`}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, nombre)}
      >
        <div
          className={`flex items-center px-4 py-3 border-b ${colorMap[estado].border} ${colorMap[estado].bg} rounded-t-lg`}
        >
          <div
            className={`w-3 h-3 rounded-full ${colorMap[estado].border.replace(
              "border",
              "bg"
            )} mr-2`}
          ></div>
          <h2 className={`text-md font-medium ${colorMap[estado].text}`}>
            {titulo}
          </h2>
          <span className="ml-auto bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full">
            {items.length}
          </span>
        </div>
        <div
          className="flex flex-col gap-3 p-3 overflow-y-auto"
          style={{ minHeight: "200px" }}
        >
          {items.length === 0 ? (
            <div className="text-center text-indigo-300 py-4 text-sm">
              No hay tareas aquí
            </div>
          ) : (
            items.map((tarea, index) => (
              <div
                key={`${tarea.id}-${index}`}
                draggable={
                  !editingTask || (editingTask && editingTask.id !== tarea.id)
                }
                onDragStart={(e) => handleDragStart(e, tarea, nombre)}
                className="bg-white border border-indigo-50 p-3 rounded-lg shadow-xs hover:shadow-sm transition-all"
              >
                {editingTask && editingTask.id === tarea.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingTask.titulo}
                      onChange={(e) =>
                        setEditingTask({
                          ...editingTask,
                          titulo: e.target.value,
                        })
                      }
                      className="mb-2 w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-indigo-300"
                      placeholder="Título"
                    />
                    <input
                      type="text"
                      value={editingTask.descripcion}
                      onChange={(e) =>
                        setEditingTask({
                          ...editingTask,
                          descripcion: e.target.value,
                        })
                      }
                      className="mb-2 w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-indigo-300"
                      placeholder="Descripción"
                    />
                    <input
                      type="date"
                      value={editingTask.fechaLimite}
                      onChange={(e) =>
                        setEditingTask({
                          ...editingTask,
                          fechaLimite: e.target.value,
                        })
                      }
                      className="mb-2 w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-indigo-300"
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={guardarEdicion}
                        className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-sm transition-colors"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingTask(null)}
                        className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 text-sm transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="font-medium text-gray-900">
                      {tarea.titulo}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {tarea.descripcion}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">
                      Fecha límite: {tarea.fechaLimite}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      {nombre !== "porHacer" && (
                        <button
                          onClick={() =>
                            moverTarea(
                              tarea.id,
                              nombre,
                              nombre === "hecho" ? "haciendo" : "porHacer"
                            )
                          }
                          className="text-indigo-400 hover:text-indigo-600 p-1 transition-colors"
                          title="Mover a la izquierda"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                      )}
                      {nombre !== "hecho" && (
                        <button
                          onClick={() =>
                            moverTarea(
                              tarea.id,
                              nombre,
                              nombre === "porHacer" ? "haciendo" : "hecho"
                            )
                          }
                          className="text-indigo-400 hover:text-indigo-600 p-1 transition-colors"
                          title="Mover a la derecha"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={() => iniciarEdicion(tarea)}
                        className="text-indigo-400 hover:text-indigo-600 p-1 transition-colors"
                        title="Editar"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => eliminarTarea(tarea.id, nombre)}
                        className="text-indigo-400 hover:text-red-500 p-1 ml-auto transition-colors"
                        title="Eliminar"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-indigo-800 mb-4">
        📝 Tablero de Tareas
      </h1>
      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Título de la tarea"
          value={nuevaTarea.titulo}
          onChange={(e) =>
            setNuevaTarea({ ...nuevaTarea, titulo: e.target.value })
          }
          className="flex-1 px-3 py-2 text-sm rounded border border-indigo-200 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={nuevaTarea.descripcion}
          onChange={(e) =>
            setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })
          }
          className="flex-1 px-3 py-2 text-sm rounded border border-indigo-200 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300"
        />
<input
  type="date"
  placeholder="Fecha límite"
  value={nuevaTarea.fechaLimite}
  onChange={(e) =>
    setNuevaTarea({ ...nuevaTarea, fechaLimite: e.target.value })
  }
  className="flex-1 w-full px-3 py-2 text-sm rounded border border-indigo-200 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300"
/>
        <button
          onClick={agregarTarea}
          className="bg-indigo-600 text-white px-4 py-2 text-sm rounded hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Agregar
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderColumn("Por Hacer", "porHacer", "porHacer", tareas.porHacer)}
        {renderColumn("Haciendo", "haciendo", "haciendo", tareas.haciendo)}
        {renderColumn("Hecho", "hecho", "hecho", tareas.hecho)}
      </div>
    </div>
  );
};

export default RegistrarTareas;
