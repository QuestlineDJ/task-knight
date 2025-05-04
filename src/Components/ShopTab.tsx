import React, { useState } from "react";
import SaveButton from "./SaveButton";
import { defeatEnemy, increasePlayerDamage } from "../GameHelper";
import { damageEnemyShop } from "../GameHelper";
import "../ShopTab.css";
import damagePoster from "../assets/Task Knight Assets/Main Panel/Shop Panel/damagePoster.png";

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

  var isShopOpen = false;
  return (
    <div className="scale">
      <p className="damage">
        <img
          src={damagePoster}
          onClick={() =>
            increasePlayerDamage(
              currentGoldAmount,
              setCurrentGoldAmount,
              setDamageAmount,
              damageAmount,
              currentGoldAmount
            )
          }
        ></img>
      </p>
    </div>
  );
}

export default ShopTab;
