import { useState } from "react";

function EnemyDamage() {
  let damage = 10;
  const [enemyHealth, setEnemyHealth] = useState<number>(100);
  return (
    <button
      onClick={() => setEnemyHealth((prev) => Math.max(0, prev - damage))}
    >
      damage enemy ({enemyHealth} HP)
    </button>
  );
}

export default EnemyDamage;
