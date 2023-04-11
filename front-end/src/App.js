import logo from './logo.svg';
import './App.css';
import Board from './component/Board';
import Keyboard from './component/Keyboard';
import { createContext, useEffect, useState } from 'react';
import { boardDefault, generateWordSet } from './Words';
import axios from 'axios';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0})
  const [wordSet, setWordSet] = useState(new Set())

  const correctWord = "RIGHT";

  useEffect(() => {
    const loadWords = async () => {
      const wordBankArr = [];
      const response = await axios.get(`/api`);
      const booksData = response.data;
      for await(const item of booksData) {
        wordBankArr.push(item['aback'])
        }
      
        let newWordSet = new Set(wordBankArr)
        setWordSet(newWordSet)
        
      }
    loadWords();
    // generateWordSet().then((words) => {
    //   setWordSet(words.wordSet)
    // })
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
    setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0})
  }
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider 
          value={{board, 
                  setBoard,
                  currAttempt,
                  setCurrAttempt,
                  onDelete,
                  onSelectLetter,
                  onEnter,
                  correctWord}}>
        <div className="game">
          <Board/>
          <Keyboard/>
        </div>
      </AppContext.Provider>
      
    </div>
  );
}

export default App;
