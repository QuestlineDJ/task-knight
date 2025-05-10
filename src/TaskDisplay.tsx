import { useState } from "react";
import { Task } from "./TaskUtilities";
import taskBanner from "./assets/Task Knight Assets/Main Panel/Task Panel/taskBackground.png";

import editButton from "./assets/Task Knight Assets/Main Panel/Task Panel/edit_button.png";
import completeButton from "./assets/Task Knight Assets/Main Panel/Task Panel/complete_button.png";
import trashButton from "./assets/Task Knight Assets/Main Panel/Task Panel/trash_button.png";

/**
 * Create react component that display a task
 */
export function TaskDisplay({
  task,
  action,
  delete_handle,
  edit_handle,
  complete_handle,
}: any) {
  // Create the buttons that allow for editing, deleting, and completing
  let action_buttons = (
    <span>
      <button
        type="button"
        onClick={() => {
          complete_handle(task.id);
        }}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          margin: 0,
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget.firstChild as HTMLImageElement).style.filter =
            "brightness(1.2)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget.firstChild as HTMLImageElement).style.filter =
            "brightness(1)";
        }}
      >
        <img
          src={completeButton}
          alt="Complete Task"
          style={{ width: "30px", height: "30px", background: "transparent" }}
        />
      </button>
      <button
        type="button"
        onClick={() => {
          edit_handle(task);
        }}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          margin: 0,
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget.firstChild as HTMLImageElement).style.filter =
            "brightness(1.2)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget.firstChild as HTMLImageElement).style.filter =
            "brightness(1)";
        }}
      >
        <img
          src={editButton}
          alt="Edit Task"
          style={{ width: "30px", height: "30px", background: "transparent" }}
        />
      </button>
      <button
        type="button"
        onClick={() => {
          delete_handle(task.id);
        }}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          margin: 0,
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget.firstChild as HTMLImageElement).style.filter =
            "brightness(1.2)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget.firstChild as HTMLImageElement).style.filter =
            "brightness(1)";
        }}
      >
        <img
          src={trashButton}
          alt="Delete Task"
          style={{ width: "30px", height: "30px", background: "transparent" }}
        />
      </button>
    </span>
  );

  return (
    <div>
      <div className="task-item">
        <img src={taskBanner} alt="TaskBanner" className="task-banner"></img>
        <div
          className="task-text"
          style={{
            position: "absolute",
            width: "90%",
            height: "80%",
            pointerEvents: "auto",
          }}
        >
          <span>{task.name}</span>
          <br></br>
          <span>Priority: {task.priority}</span>
          <br></br>
          <span>Time Due: {new Date(task.due_time * 1000).toDateString()}</span>
          <br></br>
          {action == true ? action_buttons : null}
        </div>
      </div>
    </div>
  );
}
