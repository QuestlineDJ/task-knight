import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import UI from "./UI";
import TaskSystem from "./TaskSystem";
import { loadedFromFile } from "./LocalStorageManager";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TaskSystem></TaskSystem>
  </React.StrictMode>
);

const beforeUnloadHandler = (event: any) => {
  //If saved data was loaded from file, ask to save data before leaving

  if (loadedFromFile) {
    // Recommended

    event.preventDefault();

    // Included for legacy support, e.g. Chrome/Edge < 119

    event.returnValue = true;
  }
};

window.addEventListener("beforeunload", beforeUnloadHandler);