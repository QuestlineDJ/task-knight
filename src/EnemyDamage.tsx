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
  const [checkboxes, setCheckboxes] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const handleCheckboxChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newCheckboxes = [...checkboxes];
      const wasChecked = newCheckboxes[index];

      newCheckboxes[index] = event.target.checked;
      setCheckboxes(newCheckboxes);

      setHealth((prevHealth) =>
        Math.max(0, prevHealth + (wasChecked ? 10 : -10))
      );
    };

  return (
    <div>
      <p>Health: {health}</p>
      {checkboxes.map((isChecked, index) => (
        <label key={index} style={{ display: "block", margin: "5px 0" }}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange(index)}
          />
          Damage {index + 1}
        </label>
      ))}
    </div>
  );
};

export default EnemyDamage;
