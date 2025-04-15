import React, { useState } from "react";
import SaveButton from "./SaveButton";
import { increasePlayerDamage } from "../GameHelper";
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
                  damageAmount
                )
              }
            >
              Increase Damage +10
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
                Damage Enemy
              </button>
            </p>
            <button
              className="option-button"
              onClick={() =>
                increasePlayerDamage(
                  currentGoldAmount,
                  setCurrentGoldAmount,
                  setDamageAmount,
                  damageAmount
                )
              }
            >
              Damage + 10
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ShopTab;
