import { Task } from "./TaskUtilities";
import { TaskDisplay } from "./TaskDisplay";
import taskBanner from "./assets/Task Knight Assets/Main Panel/Task Panel/taskBackground.png";

/**
 * Create react component that holds a list of tasks
 */
export function TaskList({
  name,
  action,
  active,
  tasks,
  delete_handle,
  edit_handle,
  complete_handle,
}: any) {
  // Do not display the list if requested not to
  if (active != true) {
    return <></>;
  }

  // Create react components for each task
  const list_of_tasks = tasks.map((task: Task) => (
    <TaskDisplay
      key={task.id}
      task={task}
      action={action}
      delete_handle={delete_handle}
      edit_handle={edit_handle}
      complete_handle={complete_handle}
    />
  ));

  return (
    <div>
      <div>
        <h1>{name}</h1>
      </div>

      <div>{list_of_tasks}</div>
    </div>
  );
}
