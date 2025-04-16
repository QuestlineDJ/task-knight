import React, { useState } from "react";
import SaveButton from "./SaveButton";
import { defeatEnemy, increasePlayerDamage } from "../GameHelper";
import { damageEnemyShop } from "../GameHelper";

type ShopTabProps = {
  enemyHealth: number;
  currentGoldAmount: number;
  damageAmount: number;
  setCurrentGoldAmount: React.Dispatch<React.SetStateAction<number>>;
  setDamageAmount: React.Dispatch<React.SetStateAction<number>>;
  currentImage: number;
  images: string[];
  setEnemyHealth: React.Dispatch<React.SetStateAction<number>>;
  setCurrentImage: React.Dispatch<React.SetStateAction<number>>;
};

function ShopTab({
  enemyHealth,
  currentGoldAmount,
  damageAmount,
  setCurrentGoldAmount,
  setDamageAmount,
  currentImage,
  images,
  setEnemyHealth,
  setCurrentImage,
}: ShopTabProps) {
  const [isOpen, setOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    alert("You selected: ${option}");
  };

  return (
    <>
      <button className="open-screen-button" onClick={() => setOpen(!isOpen)}>
        Shop!
      </button>
      {isOpen ? (
        <div className="modal_container">
          <div className="modal">
            <p className="close-popup" onClick={() => setOpen(false)}>
              X
            </p>
            <div className="content">
              <h2>Welcome To The Shop!</h2>
              <p>Gold: {currentGoldAmount}</p>
            </div>
            <button
              className="option-button"
              onClick={() =>
                increasePlayerDamage(
                  currentGoldAmount,
                  setCurrentGoldAmount,
                  setDamageAmount,
                  damageAmount,
                  currentGoldAmount
                )
              }
            >
              Increase Damage +10 (10 Gold)
            </button>
            <p>
              <button
                className="option-button"
                onClick={() =>
                  damageEnemyShop(
                    damageAmount,
                    currentImage,
                    images,
                    setEnemyHealth,
                    setCurrentImage,
                    setCurrentGoldAmount,
                    currentGoldAmount
                  )
                }
              >
                Damage Enemy -10 (40 Gold)
              </button>
            </p>
            <button
              className="option-button"
              onClick={() =>
                defeatEnemy(
                  damageAmount,
                  currentImage,
                  images,
                  setEnemyHealth,
                  setCurrentImage,
                  setCurrentGoldAmount,
                  currentGoldAmount
                )
              }
            >
              Defeat Current Enemy (60 Gold)
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ShopTab;
