import { useState } from "react"; // import the use state
import "./styles.css";

const handleClick = () => {
  console.log("Button clicked!");
};

function EnemyDamage() {
  let damage = 10;
  const [enemyHealth, setEnemyHealth] = useState<number>(100);
  return (
    <button
      onClick={() => setEnemyHealth((prev) => Math.max(0, prev - damage))}
      className={`medieval-button ${enemyHealth === 0 ? "red-glow" : ""}`}
    >
      damage enemy ({enemyHealth} HP)
    </button>
  );
}

export default EnemyDamage;
