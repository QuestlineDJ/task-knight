import React from "react";
import ReactDOM from "react-dom/client";
import { TaskMaster } from "./TaskSystem";
import EnemyDamage from "./EnemyDamage";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TaskMaster />
    <EnemyDamage />
  </React.StrictMode>
);
