import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import EnemyDamage from "./EnemyDamage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <EnemyDamage></EnemyDamage>
    </div>
  );
}

export default App;
