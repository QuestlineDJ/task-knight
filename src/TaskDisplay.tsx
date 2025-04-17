import { useState } from "react";
import { Task } from "./TaskUtilities";

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
      <span>{task.name}</span>
      <br></br>
      <span>Priority: {task.priority}</span>
      <br></br>
      <span>Time Due: {task.due_time}</span>
      <br></br>
      {action == true ? action_buttons : null}
    </div>
  );
}
