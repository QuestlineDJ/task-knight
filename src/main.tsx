import React from "react";
import ReactDOM from "react-dom/client";
import { TaskMaster } from "./TaskSystem";
import EnemyDamage from "./EnemyDamage";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TaskMaster/>
  </React.StrictMode>
);


const beforeUnloadHandler = (event: any) => {
  // Recommended
  event.preventDefault();

  // Included for legacy support, e.g. Chrome/Edge < 119
  event.returnValue = true;
};

window.addEventListener("beforeunload", beforeUnloadHandler);
