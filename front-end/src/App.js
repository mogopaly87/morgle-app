import logo from './logo.svg';
import './App.css';
import Board from './component/Board';
import Keyboard from './component/Keyboard';
import { createContext, useEffect, useState } from 'react';
import { boardDefault, generateWordSet } from './Words';
import GameOver from './component/GameOver';
import axios from 'axios';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0})
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([])
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false})
  const [correctWord, setCorrectWord] = useState('')

  

  useEffect(() => {
    const loadWords = async () => {
      const wordBankArr = [];
      let tempCorrectWord;

      const response = await axios.get(`/api`);
      const booksData = response.data;
      for await(let item of booksData) {
    
        delete item._id
        wordBankArr.push(Object.values(item))
    }
        tempCorrectWord = wordBankArr[0][Math.floor(Math.random() * wordBankArr[0].length)]

        let newWordSet = new Set(wordBankArr[0])
        setWordSet(newWordSet)
        setCorrectWord(tempCorrectWord)
      }
    loadWords();
  }, [])

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1})
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1})
  }

  const onEnter = () => {
    if (currAttempt.letterPos !==5) return;
    
    let currWord = "";
    for (let i = 0; i < 5; i++){
      currWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0})
    } else {
      alert("Word Not Found")
    }

    if (currWord === correctWord.toUpperCase()){
      // console.log(correctWord)
      setGameOver({gameOver: true, guessedWord: true})
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver({gameOver: true, guessedWord: false})
      return;
    }
  };
  return (
    <div className="App">
      <nav>
        <h1>Morgle</h1>
      </nav>
      <AppContext.Provider 
          value={{board, 
                  setBoard,
                  currAttempt,
                  setCurrAttempt,
                  onDelete,
                  onSelectLetter,
                  onEnter,
                  correctWord,
                  setDisabledLetters,
                  disabledLetters,
                  setGameOver,
                  gameOver}}>
        <div className="game">
          <Board/>
          {gameOver.gameOver ? <GameOver /> : <Keyboard/>}
        </div>
      </AppContext.Provider>
      
    </div>
  );
}

export default App;
