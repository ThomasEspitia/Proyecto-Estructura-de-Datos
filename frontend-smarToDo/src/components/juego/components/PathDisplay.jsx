function PathDisplay({ path, isValid, startWord, endWord, shortestPath, elapsedTime }) {
  const pathWithStartEnd = [startWord, ...path];

  return (
    <div className="path-display">
      <h2>Camino construido</h2>
      
      {path.length === 0 ? (
        <p>Comienza agregando palabras para formar un camino desde {startWord} hasta {endWord}</p>
      ) : (
        <>
          <div className="path">
            {pathWithStartEnd.map((word, i) => (
              <div key={i} className="path-step">
                <span className="word">{word}</span>
                {i < pathWithStartEnd.length - 1 && <span className="arrow">→</span>}
              </div>
            ))}
          </div>
          <p>Pasos: {path.length}</p>
          {isValid && (
            <p className="success">¡Camino válido completado! Has llegado a {endWord}</p>
          )}
        </>
      )}
      
    {elapsedTime > 0 && ( <div className="temporizador"><p >⏱️ Tiempo transcurrido: {elapsedTime} segundos</p></div> )}

      {shortestPath.length > 0 && (
        <div className="shortest-path">
          <p>Pasos: {shortestPath.length - 1}</p>
        </div>
      )}
    </div>
  );
}

export default PathDisplay;