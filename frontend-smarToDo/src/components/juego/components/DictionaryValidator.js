// Función para validar una palabra (solo verifica longitud)
export async function validateWord(word) {
  if (word.length !== 4) {
    return {
      isValid: false,
      messages: ['La palabra debe tener exactamente 4 letras']
    };
  }

  return {
    isValid: true,
    messages: []
  };
}

// Función para encontrar el camino más corto entre dos palabras
export async function findShortestPath(start, end, currentPath) {
  // En este modo simplificado, simplemente devolvemos el camino actual
  // ya que no tenemos un diccionario para buscar alternativas
  if (currentPath && currentPath[currentPath.length - 1] === end) {
    return currentPath;
  }
  
  return []; // No se buscarán caminos alternativos
}