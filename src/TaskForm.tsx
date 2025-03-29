import { useState } from "react";
import { computeFieldDate } from "./TaskUtilities"

/**
 * Create the task form for editing task
 */
export function TaskForm({ callback, task, active, cancel_callback }: any) {
  if (active == false) {
    return <></>;
  }

   // Task fields state variables
  const [name, setName] = useState(task.name);
  const [priority, setPriority] = useState(task.priority);
  const [due, setDue] = useState(computeFieldDate(new Date(task.due_time * 1000), true));

  return (
    <div>
      <label>
        Name:{" "}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Priority:{" "}
        <input
          type="number"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
        />
      </label>
      <br />
      <label>
        Due Date:{" "}
        <input
          type="datetime-local"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />
      </label>
      <br />
      <button
        type="button"
        onClick={() => {
          task.name = name;
          task.priority = priority;
          task.due_time = Math.floor(Date.parse(due) / 1000);
          callback(task);
        }}
      >
        Save
      </button>
      <button
         type="button"
         onClick={cancel_callback}
      >
         Cancel
      </button>
    </div>
  );
}
