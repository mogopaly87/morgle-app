import logo from './logo.svg';
import './App.css';
import Board from './component/Board';
import Keyboard from './component/Keyboard';

function App() {
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <Board/>
      <Keyboard/>
    </div>
  );
}

export default App;
