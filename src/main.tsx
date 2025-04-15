import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import UI from "./UI";
import { TaskMaster } from "./TaskSystem";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TaskMaster></TaskMaster>
  </React.StrictMode>
);
