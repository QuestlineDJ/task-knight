import { useState } from "react"; // import the use state
import "./styles.css";

// This function handles my basic button example
/*const handleClick = () => {
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
}*/

const EnemyDamage = () => {
  const [health, setHealth] = useState(100);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setHealth((prevHealth) => Math.max(0, prevHealth - 10));
    }
    setIsChecked(event.target.checked);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        Damage Element
      </label>
      <p>Health: {health}</p>
    </div>
  );
};

export default EnemyDamage;
