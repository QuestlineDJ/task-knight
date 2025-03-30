import React from "react";
import ReactDOM from "react-dom/client";
import { TaskMaster } from "./TaskSystem";
import SaveWindow from './Components/SaveWindow';
import './index.css';
import './TaskSystem.css';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="TaskSystem"/><TaskMaster />
    <SaveWindow />
    
  </React.StrictMode>
);


const beforeUnloadHandler = (event: any) => {
  // Recommended
  event.preventDefault();

  // Included for legacy support, e.g. Chrome/Edge < 119
  event.returnValue = true;
};

function onLoadHandler()
{
  //loadTasks();
}

window.onload = onLoadHandler;

window.addEventListener("beforeunload", beforeUnloadHandler);
