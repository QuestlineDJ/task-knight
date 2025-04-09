import React from "react";
import ReactDOM from "react-dom/client";
import { TaskMaster } from "./TaskSystem";
import "./main.css";
import SaveWindow from "./Components/SaveWindow";
import ShopTab from "./Components/ShopTab";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="Container">
      <div className="main">
        <SaveWindow />
      </div>

      <div className="tasks">
        <TaskMaster />
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
