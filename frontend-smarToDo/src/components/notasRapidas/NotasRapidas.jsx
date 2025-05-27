import { useState, useEffect } from 'react';
import { useNotas } from '../../context/contextNotas';

function NotasRapidas() {
  const { notasGuardadas, setNotasGuardadas } = useNotas();
  const [nota, setNota] = useState('');
  const [notas, setNotas] = useState(notasGuardadas || []); // Cargar notas guardadas
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [notaEditada, setNotaEditada] = useState('');

  const agregarNota = () => {
    if (nota.trim() === '') return;

    // Validación para evitar notas duplicadas
    if (
      notas.some(
        (n) =>
          n.texto.trim().toLowerCase() === nota.trim().toLowerCase()
      )
    ) {
      alert("La nota ya existe. Ingresa una nota diferente.");
      return;
    }

    const nuevaNota = { texto: nota, fecha: new Date() };
    setNotas([nuevaNota, ...notas]);
    setNota('');
  };

  const eliminarNota = (index) => {
    if (confirm('¿Eliminar esta nota?')) {
      setNotas(notas.filter((_, i) => i !== index));
    }
  };

  const copiarNota = (texto) => {
    navigator.clipboard.writeText(texto);
    alert('Nota copiada al portapapeles 📋');
  };

  const empezarEdicion = (index) => {
    setEditandoIndex(index);
    setNotaEditada(notas[index].texto);
  };

  const guardarEdicion = () => {
    // Validación para evitar notas duplicadas al editar, excluyendo la nota que se está editando
    if (
      notas.some(
        (n, i) =>
          i !== editandoIndex &&
          n.texto.trim().toLowerCase() === notaEditada.trim().toLowerCase()
      )
    ) {
      alert("Ya existe una nota con ese texto, por favor ingresa uno diferente.");
      return;
    }
    const nuevasNotas = [...notas];
    nuevasNotas[editandoIndex].texto = notaEditada;
    setNotas(nuevasNotas);
    setEditandoIndex(null);
    setNotaEditada('');
  };

  useEffect(() => {
    if (notas.length === 0) {
      setNotas([
        {
          texto: 'Reggaeton, champán-pán-pán-pán-pán-pán',
          fecha: new Date(),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    setNotasGuardadas(notas); // Guardar las notas en el contexto
  }, [notas, setNotasGuardadas]);

  return (
    <div className="p-6 min-h-screen text-indigo-900">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700 flex items-center gap-2">
        <span className="text-indigo-600">📝</span> Notas Rápidas
      </h1>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <textarea
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          placeholder="Escribe una nota rápida..."
          rows={3}
          className="p-3 w-full border border-indigo-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all"
        />
        <button
          onClick={agregarNota}
          className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-indigo-200 whitespace-nowrap"
        >
          Agregar Nota
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notas.map((n, index) => (
          <div
            key={index}
            className="bg-white border border-indigo-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            {editandoIndex === index ? (
              <>
                <textarea
                  value={notaEditada}
                  onChange={(e) => setNotaEditada(e.target.value)}
                  rows={3}
                  className="p-2 mb-3 border border-indigo-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-indigo-300"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={guardarEdicion}
                    className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-sm transition-colors"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditandoIndex(null)}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-sm transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="whitespace-pre-wrap mb-3 text-indigo-900">{n.texto}</p>
                <div className="flex justify-between items-center text-sm text-indigo-500">
                  <span className="text-xs">
                    {new Date(n.fecha).toLocaleString()}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copiarNota(n.texto)}
                      className="hover:text-indigo-700 transition-colors"
                      title="Copiar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </button>
                    <button
                      onClick={() => empezarEdicion(index)}
                      className="hover:text-indigo-700 transition-colors"
                      title="Editar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => eliminarNota(index)}
                      className="hover:text-red-600 transition-colors"
                      title="Eliminar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {notas.length === 0 && (
        <p className="text-indigo-400 mt-6 text-center flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          No hay notas aún. ¡Escribe algo!
        </p>
      )}
    </div>
  );
}

export default NotasRapidas;
