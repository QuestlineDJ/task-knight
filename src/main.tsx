import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import UI from "./UI";
import TaskSystem from "./TaskSystem";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TaskSystem></TaskSystem>
  </React.StrictMode>
);
