import React, { useState, useEffect } from 'react';
import './App.css';
import words from './assets/words';

function App() {
  const [puzzle, setPuzzle] = useState(() => words[Math.floor(Math.random() * words.length)]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [userGuess, setUserGuess] = useState('');
  const [wrongGuesses, setWrongGuesses] = useState([]);

  useEffect(() => {
    // This will set a new puzzle word when the component mounts
    // And could be used to reset the game
    setPuzzle(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
    setWrongGuesses([]);
  }, []);

  const handleUserInput = (event) => {
    event.preventDefault();
    if (userGuess.trim() && !guessedLetters.includes(userGuess)) {
      setGuessedLetters([...guessedLetters, userGuess]);

      if (!puzzle.includes(userGuess)) {
        setWrongGuesses([...wrongGuesses, userGuess]);
        if (wrongGuesses.length + 1 >= 6) { // +1 because we're about to add the current wrong guess
          alert("Game Over. The word was: " + puzzle);
          // Reset for a new game
          setPuzzle(words[Math.floor(Math.random() * words.length)]);
          setGuessedLetters([]);
          setWrongGuesses([]);
        }
      }
    } else {
      alert("Letter already guessed or invalid input.");
    }
    setUserGuess('');
  };

  const displayPuzzle = puzzle.split('').map((letter, i) => (
    guessedLetters.includes(letter) ? letter : "_"
  )).join(' ');

  const wrongLetters = wrongGuesses.join(', ');

  return (
    <>
      <div className='puzzle-container'>
        <h2>Puzzle: {displayPuzzle}</h2>
      </div>

      <div className='userGuess'>
        <form className='userInput' onSubmit={handleUserInput}>
          <input
            type="text"
            placeholder='guess a letter'
            value={userGuess}
            maxLength="1"
            onChange={(e) => setUserGuess(e.target.value)}
          />
          <button type='submit'>Submit Guess</button>
        </form>
      </div>

      <div className='wrong-guesses'>
        <h3>Wrong Guesses: {wrongLetters}</h3>
      </div>
    </>
  );
}

export default App;
