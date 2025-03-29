import React from "react";
import ReactDOM from "react-dom/client";
import { TaskMaster } from "./TaskSystem";
import App from "./App";
import SaveWindow from './Components/SaveWindow';
import EnemyDamage from "./EnemyDamage";
import './index.css'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TaskMaster />
    <SaveWindow />
    
  </React.StrictMode>
);


const beforeUnloadHandler = (event: any) => {
  // Recommended
  event.preventDefault();

  // Included for legacy support, e.g. Chrome/Edge < 119
  event.returnValue = true;
};

window.addEventListener("beforeunload", beforeUnloadHandler);
