import React, { useState } from "react";
import SaveButton from "./SaveButton";
import { increasePlayerDamage } from "../GameHelper";

type ShopTabProps = {
  enemyHealth: number;
  currentGoldAmount: number;
  damageAmount: number;
  setCurrentGoldAmount: React.Dispatch<React.SetStateAction<number>>;
  setDamageAmount: React.Dispatch<React.SetStateAction<number>>;
};

function ShopTab({
  enemyHealth,
  currentGoldAmount,
  damageAmount,
  setCurrentGoldAmount,
  setDamageAmount,
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
              Damage + 10
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ShopTab;
