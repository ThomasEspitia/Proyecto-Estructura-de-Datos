import { useState } from 'react';

function WordInput({ onAddWord, disabled }) {
  const [currentWord, setCurrentWord] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentWord.length === 4) {
      onAddWord(currentWord.toUpperCase());
      setCurrentWord('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="word-input">
      <label>Agregar palabra al camino:</label>
      <input 
        type="text" 
        value={currentWord} 
        onChange={(e) => setCurrentWord(e.target.value)} 
        maxLength="4"
        disabled={disabled}
      />
      <button id='boton-agregar' type="submit" disabled={disabled || currentWord.length !== 4}>
        Agregar
      </button>
    </form>
  );
}

export default WordInput;