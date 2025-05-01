import {
  setLocalStorage,
  getAllLocalStorage,
  getAllMappedLocalStorage,
  getLocalStorage,
} from "./LocalStorageManager";

export class GameData {
  gold: number;

  attack: number;

  bossHealth: number;

  currentImage: number;

  /**

   * @param gold The amount of gold the player has

   * @param attack The amount of damage the player does per attack

   * @param bossHealth The amount of health the boss has

   */

  constructor(
    gold: number,
    attack: number,
    bossHealth: number,
    currentImage: number
  ) {
    this.gold = gold;

    this.attack = attack;

    this.bossHealth = bossHealth;

    this.currentImage = currentImage;
  }
}

export function saveGameDataToStorage(gameData: GameData) {
  var storage = {
    gold: gameData.gold,

    attack: gameData.attack,

    bossHealth: gameData.bossHealth,

    currentImage: gameData.currentImage,
  };

  console.log(getKey(), JSON.stringify(storage));

  setLocalStorage(getKey(), JSON.stringify(storage));
}

export function LoadGameDataFromStorage(): GameData {
  var data = getAllMappedLocalStorage();

  var dataFound = false;

  data.forEach((value, key) => {
    if (key === getKey()) {
      // Discard prefix

      var data: GameData = JSON.parse(value);

      gameData = data;

      dataFound = true;

      return;
    }
  });

  if (dataFound) {
    console.log("GAME DATA FOUND");

    return new GameData(
      gameData.gold,
      gameData.attack,
      gameData.bossHealth,
      gameData.currentImage
    );
  } else {
    console.log("GAME DATA NOT FOUND");

    return new GameData(0, 10, 100, 0);
  }
}

function getKey() {
  return "game.data";
}

var gameData: GameData;

/**


 * MUST BE CALLED FIRST THING ON PAGE LOAD


 * Grabs the game data from the local storage


 */

export function LoadGameData() {
  //Gets the game data from the local storage

  gameData = LoadGameDataFromStorage();
}

/**


 * Grabs the player damage from the local storage


 */

export function setPlayerDamageFromLocalStorage(
  setDamageAmount: React.Dispatch<React.SetStateAction<number>>,
  damage: number
) {
  setDamageAmount(gameData.attack);
}

/**


 * Grabs the enemy health from the local storage


 */

export function setEnemyHealthFromLocalStorage(
  setEnemyHealth: React.Dispatch<React.SetStateAction<number>>
) {
  setEnemyHealth(gameData.bossHealth);
}

/**


 * Grabs the amount of gold the player has obtained from the local storage


 */

export function setGoldFromStorage(
  setCurrentGoldAmount: React.Dispatch<React.SetStateAction<number>>
) {
  setCurrentGoldAmount(gameData.gold);
}

/**


 * Grabs the boss image from the local storage


 */

export function setImageFromStorage(
  setCurrentImage: React.Dispatch<React.SetStateAction<number>>
) {
  setCurrentImage(gameData.currentImage);
}

/**


 * Saves the current game data from the local storage


 */

function sendGameDataToLocalStorage() {
  setLocalStorage(getKey(), JSON.stringify(gameData));
}

/**


 * Increases the amount the player deals per hit


 * @param currentGoldAmount - the current amount of gold the player has


 * @param setCurrentGoldAmount - the React method that changes the gold the player has


 * @param setDamageAmount - the React method that changes how much damage the player deals per hit


 * @param damageAmount - the amount of damage the player currently deals


 * @param goldAmount - the amount of gold the player currently has


 */

export function increasePlayerDamage(
  currentGoldAmount: number,

  setCurrentGoldAmount: React.Dispatch<React.SetStateAction<number>>,

  setDamageAmount: React.Dispatch<React.SetStateAction<number>>,

  damageAmount: number,

  goldAmount: number
) {
  //If the player has enough gold to buy the upgrade

  if (currentGoldAmount >= 10) {
    //Uses React method to increase the damage amount

    setDamageAmount((prev) => prev + 10);

    //Uses React method to decrease the player's gold by 10

    setCurrentGoldAmount((prevGold) => prevGold - 10);

    //DEBUG

    console.log(
      "Increased damage by 10. New damage amount: ",

      damageAmount + 10
    );

    damageAmount += 10;

    goldAmount -= 10;

    //Saves data in gameData

    gameData.gold = goldAmount;

    gameData.attack = damageAmount;

    //Saves game data into local storage

    sendGameDataToLocalStorage();
  } else {
    //Not enough gold.

    console.log("Not enough gold");
  }
}

/**


 * Gives gold to the player


 * @param setCurrentGoldAmount - React method that sets the player's current gold


 */

export function giveGold(
  setCurrentGoldAmount: React.Dispatch<React.SetStateAction<number>>
) {
  //Sets current gold to the previous value + 10

  setCurrentGoldAmount((prev) => {
    const newGold = Math.max(0, prev + 10);

    console.log("Updated Gold:", newGold);

    //Saves gold into local storage

    gameData.gold = newGold;

    sendGameDataToLocalStorage();

    return newGold;
  });
}

/**


 * Damages the enemy


 * @param damageAmount - the amount of damage the enemy taken


 * @param currentImage - the image index of the current boss


 * @param images - the Array[] of all enemy images


 * @param setEnemyHealth - the React method to set the enemy health


 * @param setCurrentImage - the React method to change the enemy image


 * @param setCurrentGoldAmount - the React method to change how much gold the player has


 */

export function damageEnemy(
  damageAmount: number,

  currentImage: number,

  images: string[],

  setEnemyHealth: React.Dispatch<React.SetStateAction<number>>,

  setCurrentImage: React.Dispatch<React.SetStateAction<number>>,

  setCurrentGoldAmount: React.Dispatch<React.SetStateAction<number>>
) {
  //Decreases enemy health by the damageAmount

  setEnemyHealth((prev) => {
    const newHealth = Math.max(0, prev - damageAmount);

   console.log(gameData);
    gameData.bossHealth = newHealth; //Saves health into gameData

    sendGameDataToLocalStorage();

    console.log("Updated Health: ", newHealth);

    //If boss died

    if (newHealth === 0 && currentImage < images.length) {
      setTimeout(() => {
        setCurrentImage((prevIndex) => (prevIndex + 1) % images.length); //Sets the next boss image

        setEnemyHealth(100); //Refresh boss HP

        currentImage = (currentImage + 1) % images.length;

        //Saves game data into local storage

        gameData.bossHealth = 100; //Resets boss HP in game data

        gameData.currentImage = currentImage; //Saves current image index into game Data

        sendGameDataToLocalStorage();

        giveGold(setCurrentGoldAmount);
      }, 100);
    }

    return newHealth;
  });
}

/**


 * Deals damage to the enemy boss from the shop


 * @param damageAmount - the amount of damage the enemy taken


 * @param currentImage - the image index of the current boss


 * @param images - the Array[] of all enemy images


 * @param setEnemyHealth - the React method to set the enemy health


 * @param setCurrentImage - the React method to change the enemy image


 * @param setCurrentGoldAmount - the React method to change how much gold the player has


 * @param currentGoldAmount - how much gold the player has currently


 */

export function damageEnemyShop(
  damageAmount: number,

  currentImage: number,

  images: string[],

  setEnemyHealth: React.Dispatch<React.SetStateAction<number>>,

  setCurrentImage: React.Dispatch<React.SetStateAction<number>>,

  setCurrentGoldAmount: React.Dispatch<React.SetStateAction<number>>,

  currentGoldAmount: number
) {
  //Decreases enemy health by the damageAmount

  setEnemyHealth((prev) => {
    let newHealth = prev;

    //Makes sure the player can afford it

    if (currentGoldAmount >= 40) {
      newHealth = Math.max(0, prev - damageAmount);

      setCurrentGoldAmount((prevGold) => prevGold - 40);

      currentGoldAmount -= 40;

      //Saves game data into local storage

      gameData.bossHealth = newHealth;

      gameData.gold = currentGoldAmount;

      sendGameDataToLocalStorage();

      console.log("Updated Health: ", newHealth);
    }

    //If enemy died

    if (newHealth === 0 && currentImage < images.length) {
      setTimeout(() => {
        setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);

        setEnemyHealth(100); //Reset HP

        currentImage = (currentImage + 1) % images.length;

        //Updates and saves game data into local storage

        gameData.bossHealth = 100;

        gameData.currentImage = currentImage;

        sendGameDataToLocalStorage();

        giveGold(setCurrentGoldAmount);
      }, 500);
    }

    return newHealth;
  });
}

/**


 * Called when an enemy is defeated??


 * @param damageAmount - the amount of damage the enemy taken


 * @param currentImage - the image index of the current boss


 * @param images - the Array[] of all enemy images


 * @param setEnemyHealth - the React method to set the enemy health


 * @param setCurrentImage - the React method to change the enemy image


 * @param setCurrentGoldAmount - the React method to change how much gold the player has


 * @param currentGoldAmount - how much gold the player has currently


 */

export function defeatEnemy(
  damageAmount: number,

  currentImage: number,

  images: string[],

  setEnemyHealth: React.Dispatch<React.SetStateAction<number>>,

  setCurrentImage: React.Dispatch<React.SetStateAction<number>>,

  setCurrentGoldAmount: React.Dispatch<React.SetStateAction<number>>,

  currentGoldAmount: number
) {
  //Decreases enemy health by damageAmount

  setEnemyHealth((prev) => {
    let newHealth = prev;

    if (currentGoldAmount >= 60) {
      newHealth = 0;

      setCurrentGoldAmount((prevGold) => prevGold - 60);

      //Updates and saves game data into local storage

      gameData.bossHealth = newHealth;

      sendGameDataToLocalStorage();

      console.log("Updated Health: ", newHealth);
    }

    //If enemy died

    if (newHealth === 0 && currentImage < images.length) {
      setTimeout(() => {
        setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);

        currentImage = (currentImage + 1) % images.length;

        setEnemyHealth(100); //Resets HP

        //Updates and saves game data into local storage

        gameData.currentImage = currentImage;

        gameData.bossHealth = 100;

        sendGameDataToLocalStorage();

        giveGold(setCurrentGoldAmount);
      }, 500);
    }

    return newHealth;
  });
}
