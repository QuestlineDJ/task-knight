<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SaveWindow from './Components/SaveWindow';
=======
import Message from "./Message";
import BackgroundGrid from "./ReactComponents/BackgroundGrid";
import Background from "./assets/Task Knight Assets/Background Assets/background_plains.png";
>>>>>>> parent of 65f4c14 (Basic Ass task board)

function App() {
  const [count, setCount] = useState(0)

  return (
<<<<<<< HEAD
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div><SaveWindow /> </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
=======
    <div>
      <BackgroundGrid></BackgroundGrid>
>>>>>>> parent of 65f4c14 (Basic Ass task board)
    </div>
  )
}

export default App
