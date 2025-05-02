import { useState } from "react";

import SaveButton from "./SaveButton";

import DeleteAllSavedDataButton from "./DeleteAllSavedDataButton";

import { loadFile } from "../LocalStorageManager";

import "../SaveScreen.css";

function SaveWindow() {
  return (
    <div className="scale">
      <p className="delete-all-saved-data-button">
        <DeleteAllSavedDataButton />
      </p>

      <aside className="scale heading">
        <img src="src\images\saveScreen\saved_banner.png"></img>
      </aside>

      <div className="button scale download">
        <SaveButton />
      </div>

      <input
        type="file"
        title=" "
        accept=".txt"
        className="button scale upload"
        onChange={loadFile}
      ></input>
    </div>
  );
}

export default SaveWindow;