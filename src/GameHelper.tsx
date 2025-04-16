import { setLocalStorage, getAllLocalStorage, getAllMappedLocalStorage, getLocalStorage } from "./LocalStorageManager";

export class GameData {
  gold: number;
  attack: number;
  bossHealth: number;

  /**
   * @param gold The amount of gold the player has
   * @param attack The amount of damage the player does per attack
   * @param bossHealth The amount of health the boss has
   */
  constructor(gold: number, attack: number, bossHealth: number)
  {
    this.gold = gold;
    this.attack = attack;
    this.bossHealth = bossHealth;
  }
}

export function saveGameDataToStorage(gameData: GameData) {
   var storage = {
      gold: gameData.gold,
      attack: gameData.attack,
      bossHealth: gameData.bossHealth
   };

   console.log(getKey(), JSON.stringify(storage));
   setLocalStorage(getKey(), JSON.stringify(storage));
}

export function LoadGameDataFromStorage() : GameData
{
  var data = getAllMappedLocalStorage();

   data.forEach((value, key) =>{
      if ( key === getKey()) {
        console.log("FOUND");
         // Discard prefix
         var data: GameData  = JSON.parse(value);
         console.log(data);
         gameData = data;
         return new GameData(data.gold, data.attack, data.bossHealth);
      }
   });
   return new GameData(0, 10, 100);
}

function getKey() { return "game.data" };

var gameData: GameData;

export function LoadGameData()
{
  LoadGameDataFromStorage();
}

export function setPlayerDamageFromLocalStorage(setDamageAmount: React.Dispatch<React.SetStateAction<number>>, damage: number)
{
  setDamageAmount(gameData.attack);
  damage = gameData.attack;
  console.log(gameData.attack);
}

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
    gameData.attack = damageAmount;
    setLocalStorage(getKey(), JSON.stringify(gameData));
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
    gameData.gold = newGold;
    setLocalStorage(getKey(), JSON.stringify(gameData));
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
        setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
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
      newHealth = Math.max(0, prev - damageAmount);
      setCurrentGoldAmount((prevGold) => prevGold - 40);
      console.log("Updated Health: ", newHealth);
    }

    if (newHealth === 0 && currentImage < images.length) {
      setTimeout(() => {
        setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
        setEnemyHealth(100);
        giveGold(setCurrentGoldAmount);
      }, 500);
    }
    //setLocalStorage("bossHealth", newHealth as any as string);
    return newHealth;
  });
}

export function defeatEnemy(
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
    if (currentGoldAmount >= 60) {
      newHealth = 0;
      setCurrentGoldAmount((prevGold) => prevGold - 60);
      console.log("Updated Health: ", newHealth);
    }

    if (newHealth === 0 && currentImage < images.length) {
      setTimeout(() => {
        setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
        setEnemyHealth(100);
        giveGold(setCurrentGoldAmount);
      }, 500);
    }
    gameData.bossHealth = newHealth;
    setLocalStorage(getKey(), JSON.stringify(gameData));
    return newHealth;
  });
}