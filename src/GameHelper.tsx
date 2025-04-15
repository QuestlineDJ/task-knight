export function increasePlayerDamage(
  currentGoldAmount: number,
  setCurrentGoldAmount: React.Dispatch<React.SetStateAction<number>>,
  setDamageAmount: React.Dispatch<React.SetStateAction<number>>,
  damageAmount: number
) {
  if (currentGoldAmount >= 10) {
    setDamageAmount((prev) => prev + 10);
    setCurrentGoldAmount((prevGold) => prevGold - 10);
    console.log(
      "Increased damage by 10. New damage amount: ",
      damageAmount + 10
    );
    //setLocalStorage("currentDamage", damageAmount as any as string);
  } else {
    console.log("Not enough gold");
  }
}

export function giveGold(
  setCurrentGoldAmount: React.Dispatch<React.SetStateAction<number>>
) {
  setCurrentGoldAmount((prev) => {
    const newGold = Math.max(0, prev + 10);
    console.log("Updated Gold:", newGold);
    //setLocalStorage("gold", newGold as any as string);
    return newGold;
  });
}

export function damageEnemy(
  damageAmount: number,
  currentImage: number,
  images: string[],
  setEnemyHealth: React.Dispatch<React.SetStateAction<number>>,
  setCurrentImage: React.Dispatch<React.SetStateAction<number>>,
  setCurrentGoldAmount: React.Dispatch<React.SetStateAction<number>>
) {
  setEnemyHealth((prev) => {
    const newHealth = Math.max(0, prev - damageAmount);
    console.log("Updated Health: ", newHealth);

    if (newHealth === 0 && currentImage < images.length) {
      setTimeout(() => {
        setCurrentImage((prevIndex) => prevIndex + 1);
        setEnemyHealth(100);
        giveGold(setCurrentGoldAmount);
      }, 500);
    }
    //setLocalStorage("bossHealth", newHealth as any as string);
    return newHealth;
  });
}

export function damageEnemyShop(
  damageAmount: number,
  currentImage: number,
  images: string[],
  setEnemyHealth: React.Dispatch<React.SetStateAction<number>>,
  setCurrentImage: React.Dispatch<React.SetStateAction<number>>,
  setCurrentGoldAmount: React.Dispatch<React.SetStateAction<number>>,
  currentGoldAmount: number
) {
  setEnemyHealth((prev) => {
    let newHealth = prev;
    if (currentGoldAmount >= 40) {
      const newHealth = Math.max(0, prev - damageAmount);
      console.log("Updated Health: ", newHealth);
    }

    if (newHealth === 0 && currentImage < images.length) {
      setTimeout(() => {
        setCurrentImage((prevIndex) => prevIndex + 1);
        setEnemyHealth(100);
        giveGold(setCurrentGoldAmount);
      }, 500);
    }
    //setLocalStorage("bossHealth", newHealth as any as string);
    return newHealth;
  });
}
