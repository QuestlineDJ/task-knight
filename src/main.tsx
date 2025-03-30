import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TaskMaster } from "./TaskSystem";
import EnemyDamage from "./EnemyDamage";
import Background from "./Background";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="Container">
      <div className="App">
        <App />
      </div>

      <div className="tasks">
        <TaskMaster />
      </div>

      <div>
        <Background></Background>
      </div>
    </div>
  </React.StrictMode>
);

const beforeUnloadHandler = (event: any) => {
  // Recommended
  event.preventDefault();

  // Included for legacy support, e.g. Chrome/Edge < 119
  event.returnValue = true;
};

window.addEventListener("beforeunload", beforeUnloadHandler);
