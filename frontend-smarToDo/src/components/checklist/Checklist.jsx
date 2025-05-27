import { useState, useEffect } from 'react';
import { useCheck } from '../../context/contextCheck';

const Checklist = () => {
  const { listaChecklist, setListaChecklist, checklistCompletados, setChecklistCompletados } = useCheck();
  const [tasks, setTasks] = useState(listaChecklist || []);

  useEffect(() => {
    if (listaChecklist.length > 0) {
      setTasks(listaChecklist);
    }
  }, []);

  useEffect(() => {
    setListaChecklist(tasks); // Guarda toda la lista
    setChecklistCompletados(tasks.filter(task => task.completed)); // Guarda las completadas
  }, [tasks]);

  const toggleTask = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Actualizar el contexto con todas las tareas
  useEffect(() => {
    setListaChecklist(tasks); // Guardar toda la lista en el contexto
  }, [tasks]);

  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;

    // Validación para evitar tareas duplicadas
    if (
      tasks.some(
        (task) =>
          task.text.trim().toLowerCase() === newTask.trim().toLowerCase()
      )
    ) {
      alert("La tarea ya existe en el checklist. Ingresa una tarea diferente.");
      return;
    }

    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  const deleteTask = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    // Validación para evitar duplicados al editar
    if (
      tasks.some(
        (task) =>
          task.id !== id &&
          task.text.trim().toLowerCase() === editText.trim().toLowerCase()
      )
    ) {
      alert("Ya existe una tarea con ese nombre, por favor utilice un nombre diferente.");
      return;
    }
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: editText } : task
    ));
    setEditingId(null);
  };

  return (
    <div className="mx-auto p-6 bg-white transition-all">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center flex justify-center items-center gap-2">
        ✅ Mi Checklist
      </h1>

      <form onSubmit={addTask} className="mb-6 flex shadow-sm">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Añade una nueva tarea"
          className="flex-1 px-4 py-2 border border-indigo-200 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 transition-all"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Añadir
        </button>
      </form>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center justify-between p-3 border rounded-lg transition-all ${
              task.completed ? 'bg-indigo-50 border-indigo-200' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center w-full">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-300 border-indigo-300"
              />
              {editingId === task.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveEdit(task.id)}
                  className="ml-3 flex-1 px-2 py-1 border border-indigo-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-300"
                  autoFocus
                />
              ) : (
                <span
                  className={`ml-3 flex-1 ${
                    task.completed ? 'line-through text-indigo-400' : 'text-indigo-800'
                  }`}
                >
                  {task.text}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 ml-2">
              {editingId === task.id ? (
                <button
                  onClick={() => saveEdit(task.id)}
                  className="text-indigo-600 hover:text-indigo-800 p-1"
                  title="Guardar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => startEditing(task.id, task.text)}
                  className="text-indigo-400 hover:text-indigo-600 p-1"
                  title="Editar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              )}
              <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                title="Eliminar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-center text-sm text-indigo-500">
        <span className="font-medium">
          {tasks.filter(t => t.completed).length} de {tasks.length} tareas completadas
        </span>
        <div className="w-full bg-indigo-100 rounded-full h-2 mt-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full" 
            style={{ width: `${(tasks.filter(t => t.completed).length / tasks.length * 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Checklist;
