import { useState } from 'react';

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
        E
      </button>
      <button
        type="button"
        onClick={() => {
          complete_handle(task.id);
        }}
      >
        C
      </button>
      <button
        type="button"
        onClick={() => {
          delete_handle(task.id);
        }}
      >
        D
      </button>
    </span>
  );

  return (
    <div>
      <span>{task.name}</span>,<span>{task.priority}</span>,
      <span>{task.due_time}</span>
      {action == true ? action_buttons : null}
    </div>
  );
}
