import React from "react";
import ReactDOM from "react-dom/client";
import { TaskMaster } from "./Components/TaskMaster";
import "./main.css";
import SaveWindow from "./Components/SaveWindow";

import { Task } from './TaskUtilities';

import { TaskContext } from './Components/TaskContext';
import { TaskForm } from './Components/TaskForm'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TaskContext>
      <TaskMaster/>
    </TaskContext>
    <div className="Container">
      <div className="main">
        <SaveWindow />
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
