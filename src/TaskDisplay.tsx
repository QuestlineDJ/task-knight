import { useState } from "react";
import { Task } from "./TaskUtilities";
import taskBanner from "./assets/Task Knight Assets/Main Panel/Task Panel/taskBackground.png";

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
          edit_handle(task);
        }}
      >
        Edit
      </button>
      <button
        type="button"
        onClick={() => {
          complete_handle(task.id);
        }}
      >
        Complete
      </button>
      <button
        type="button"
        onClick={() => {
          delete_handle(task.id);
        }}
      >
        Delete
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
          <span>Time Due: {task.due_time}</span>
          <br></br>
          {action == true ? action_buttons : null}
        </div>
      </div>
    </div>
  );
}
