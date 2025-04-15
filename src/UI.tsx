import React from "react";
import { useState } from "react";

// Image imports (placeholders - replace with your own)
import headerLeft from "./assets/Task Knight Assets/Corner UI/emptyLevelBadge.png";
import headerRight from "./assets/Task Knight Assets/Corner UI/goldBag.png";

import character from "./assets/Task Knight Assets/Character UI & Sprites/playerCharacter_default.png";
import dragon from "./assets/Task Knight Assets/Character UI & Sprites/boss_dragon.png";

import panelBg from "./assets/Task Knight Assets/Main Panel/Task Panel/panel_tasks.png";
import listItemBg from "./assets/Task Knight Assets/Main Panel/Task Panel/taskBackground.png";

import btnUpDown from "./assets/Task Knight Assets/Main Panel/Task Panel/sortButton.png";
import btnAdd from "./assets/Task Knight Assets/Main Panel/Task Panel/addButton.png";

const tasks: string[] = [
  "Take Out the Trash",
  "Clean Container",
  "Replace Bag",
  "Finish Doing Laundry",
  "Finish Math Homework",
];

type UIProps = {
  newTask: React.Dispatch<React.SetStateAction<number>>;
};
function UI({ newTask }: UIProps) {
  return (
    <div className="app-container">
      <header className="header">
        <img src={headerLeft} alt="Left Header" />
        <img src={headerRight} alt="Right Header" />
      </header>

      <div className="main-content">
        <aside className="sidebar left-sidebar" />

        <section className="content">
          <div className="game-scene">
            <img src={character} alt="Character" className="character" />
            <img src={dragon} alt="Dragon" className="dragon" />
          </div>

          <div className="ui-overlay">
            <img src={panelBg} alt="Panel Background" className="panel-bg" />
            <div className="task-list">
              {tasks.map((task, index) => (
                <div key={index} className="task-item">
                  <img
                    src={listItemBg}
                    alt="Task Background"
                    className="list-item-bg"
                  />
                  <span className="task-text">{task}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="sidebar right-sidebar">
          <img src={btnUpDown} alt="Reorder Button" className="button-updown" />
          <button
            className="createTask"
            type="button"
            style={{
              backgroundSize: "cover",
              backgroundColor: "transparent",
              width: "100%",
              placeItems: "center",
              border: "none",
              outline: "none",
            }}
          >
            <img src={btnAdd} alt="Add Task Button" className="button-add" />
          </button>
        </aside>
      </div>
    </div>
  );
}

export default UI;
