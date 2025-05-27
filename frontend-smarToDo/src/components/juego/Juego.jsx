import { useState, useEffect, useMemo } from 'react';
import GraphVisualizer from './components/GraphVisualizer';
import WordInput from './components/WordInput';
import PathDisplay from './components/PathDisplay';
import { validateWord, findShortestPath } from './components/DictionaryValidator';
import './juego.css';

function App() {
  const [startWord, setStartWord] = useState('');
  const [endWord, setEndWord] = useState('');
  const [path, setPath] = useState([]);
  const [isValidPath, setIsValidPath] = useState(false);
  const [validationMessages, setValidationMessages] = useState([]);
  const [shortestPath, setShortestPath] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const handleAddWord = async (word) => {
    // Iniciar temporizador en la primera palabra
    if (path.length === 0) {
      setStartTime(Date.now());
      setElapsedTime(0);
    }

    // No repetir palabra
    if (path.includes(word)) {
      setValidationMessages(['Esta palabra ya está en el camino']);
      return;
    }

    // Validación básica (longitud)
    const validation = await validateWord(word);
    if (!validation.isValid) {
      setValidationMessages(validation.messages);
      return;
    }

        // Validación de letras: exactamente 3 en común con la palabra de referencia (inicio o la última)
    const referenceWord = path.length > 0 ? path[path.length - 1] : startWord;
    // Contar frecuencia de letras en la palabra de referencia
    const freq = {};
    for (const char of referenceWord) {
      freq[char] = (freq[char] || 0) + 1;
    }
    // Contar letras compartidas en la nueva palabra
    let commonCount = 0;
    for (const char of word) {
      if (freq[char] > 0) {
        commonCount++;
        freq[char]--;
      }
    }
    if (commonCount !== 3) {
      setValidationMessages([`La palabra debe compartir exactamente 3 letras con "${referenceWord}" (sin importar el orden)`]);
      return;
    }

    // Agregar al camino
    const newPath = [...path, word];
    setPath(newPath);
    setValidationMessages([]);

    // Verificar finalización
    if (word === endWord) {
      setIsValidPath(true);
      calculateShortestPath(startWord, endWord, newPath);
    } else {
      setIsValidPath(false);
    }
  };

  const calculateShortestPath = async (start, end, currentPath) => {
    const shortest = await findShortestPath(start, end, [start, ...currentPath]);
    setShortestPath(shortest);
  };

  const removeLastWord = () => {
    if (path.length === 0) return;
    const newPath = path.slice(0, -1);
    setPath(newPath);
    setValidationMessages([]);
    setIsValidPath(newPath[newPath.length - 1] === endWord);
    if (newPath[newPath.length - 1] === endWord) {
      calculateShortestPath(startWord, endWord, newPath);
    }
  };

  const resetPath = () => {
    setStartTime(null);
    setElapsedTime(0);
    setPath([]);
    setIsValidPath(false);
    setValidationMessages([]);
    setShortestPath([]);
  };

  useEffect(() => {
    let interval;
    if (startTime && !isValidPath) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, isValidPath]);

  const memoizedNodes = useMemo(
    () => [startWord, ...path, endWord].filter((w, i, a) => a.indexOf(w) === i),
    [startWord, path, endWord]
  );

  const memoizedEdges = useMemo(
    () => path.map((word, i) => ({
      from: i === 0 ? startWord : path[i - 1],
      to: word
    })),
    [path, startWord]
  );

  return (
    <div className="app">
      <div className="logic-panel">
        <h1>Explorador de Grafos con Palabras</h1>
        <div className="controls">
          <div>
            <label>Palabra inicial:</label><br />
            <input
              type="text"
              value={startWord}
              onChange={e => setStartWord(e.target.value.toUpperCase())}
              maxLength="4"
            />
          </div>
          <div>
            <label>Palabra final:</label><br />
            <input
              type="text"
              value={endWord}
              onChange={e => setEndWord(e.target.value.toUpperCase())}
              maxLength="4"
            />
          </div>
          {path.length > 0 && <button id='reset-button' onClick={removeLastWord}>Eliminar último</button>}
          <button id='remove-button' onClick={resetPath}>Reiniciar</button>
        </div>
        <WordInput onAddWord={handleAddWord} disabled={isValidPath} />
        {validationMessages.length > 0 && (
          <div className="validation-messages">
            {validationMessages.map((msg, i) => (
              <p key={i} className="error">{msg}</p>
            ))}
          </div>
        )}
        <PathDisplay
          path={path}
          isValid={isValidPath}
          startWord={startWord}
          endWord={endWord}
          shortestPath={shortestPath}
          elapsedTime={elapsedTime}
        />
      </div>
      <div className="graph-panel">
        <GraphVisualizer nodes={memoizedNodes} edges={memoizedEdges} />
      </div>
    </div>
  );
}

export default App;