import { useState, useId } from "react";
import redDot from "./images/reddot.png";
import orangeDot from "./images/orangedot.png";
import yellowDot from "./images/yellowdot.png";

import "./App.css";

const images = [redDot, orangeDot, yellowDot];

function get_current_time(): number {
  return Math.floor(Date.now() / 1000);
}

export class Task {
  id: number;
  name: string;
  priority: number;
  creation_time: number;
  due_time: number;
  done_time: number;

  constructor(name: string, priority: number, due_time: number) {
    this.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    this.name = name;
    this.priority = priority;
    this.creation_time = get_current_time();
    this.due_time = due_time;
    this.done_time = 0;
  }
}

function sortByPriority(array: Array<Task>) : Array<Task> {
   // Copy array into new object
   var newArray = [...array];
   newArray.sort((a,b) =>{
      if ( a.priority != b.priority ) {
         return a.priority > b.priority ? -1 : 1;
      } else if ( a.due_time != b.due_time ) {
         return a.due_time < b.due_time ? -1 : 1; 
      } else {
         return 0;
      }
   });

   return newArray;
}

function sortByDueDate(array: Array<Task>) : Array<Task> {
   var newArray = [...array];
   newArray.sort((a, b) => {
      if ( a.due_time != b.due_time ) {
         return a.due_time < b.due_time ? -1 : 1;
      } else if ( a.priority != b.priority ) {
         return a.priority > b.priority ? -1 : 1;
      } else {
         return 0;
      }
   });

   return newArray;
}

function getTimeSeconds(date: Date) : number {
   return Math.floor(date.getTime() / 1000);
}

function createFilterTasks(array: Array<Task>, day: Date) : Array<Task> {
   var startTime = new Date(day.getTime());
   startTime.setHours(0, 0, 0);

   var endTime = new Date(day.getTime());
   endTime.setHours(23, 59, 59);

   return array.filter((element) =>{
      console.log(getTimeSeconds(startTime) < element.due_time && element.due_time <= getTimeSeconds(endTime))
      return getTimeSeconds(startTime) < element.due_time && element.due_time <= getTimeSeconds(endTime);
   });

}

// Import date selection from higher up UI components
export function TaskMaster() {
  const [showEditor, setShowEditor] = useState(false);
  const [showActive, setShowActive] = useState(false);
   const [showTodayTasks, setShowTodayTasks] = useState(true);
  const [showComplete, setShowComplete] = useState(false);
  const [enemyHealth, setEnemyHealth] = useState<number>(100);
  const [currentImage, setCurrentImage] = useState(0);

  const [editTask, setEditTask] = useState(new Task("", 0, get_current_time()));
  const [prioritySort, setPrioritySort] = useState(true);

  const [activeTasks, setActiveTasks] = useState<Array<Task>>(new Array());
  const [completeTasks, setCompleteTasks] = useState<Array<Task>>(new Array());
  const [overdueTasks, setOverdueTasks] = useState<Array<Task>>(new Array());

  const [filterDate, setFilterDate] = useState(new Date());
  const [ filterTasks, setFilterTasks ] = useState(createFilterTasks(activeTasks, filterDate))

   let filterName = filterDate.toLocaleDateString() + " Tasks";

  function damageEnemy() {
    setEnemyHealth((prev) => {
      const newHealth = Math.max(0, prev - 10);
      console.log("Updated Health: ", newHealth);

      if (newHealth === 0 && currentImage < images.length - 1) {
        setTimeout(() => {
          setCurrentImage((prevIndex) => prevIndex + 1);
          setEnemyHealth(100);
        }, 500);
      }
      return newHealth;
    });
  }

  function handleSave(task: Task) {
    // Do not save tasks with no names
   if ( task.name == "" ) {
      setShowEditor(false);
      return;
   }

    if (activeTasks.find((element) => element.id == task.id) != undefined) {
      setShowEditor(false);
      return;
    }

    var newActiveTasks = activeTasks.concat([task]);
    if ( prioritySort ) {
      newActiveTasks = sortByPriority(newActiveTasks);
   } else {
      newActiveTasks = sortByDueDate(newActiveTasks);
   }

    setActiveTasks(newActiveTasks);
    setFilterTasks(createFilterTasks(newActiveTasks, filterDate));
    setShowEditor(false);
  }

  function set_edit_task(task: Task) {
    setEditTask(task);
    setShowEditor(true);
  }

  function delete_task(taskid: number) {
    var newActiveTasks = activeTasks.filter((task) => task.id != taskid);
    setActiveTasks(newActiveTasks);
    setFilterTasks(createFilterTasks(newActiveTasks, filterDate));
  }

  function new_task() {
    setEditTask(new Task("", 0, get_current_time()));
    setShowEditor(true);
  }

   function cancel_editor() {
      setShowEditor(false)
   }

  function complete_task(taskid: number) {
    var completed_task = activeTasks.find((element) => element.id == taskid);
    if (completed_task == undefined) {
      return;
    }

    var newActiveTasks = activeTasks.filter((task) => task.id != taskid);
    var newCompleteTasks = [completed_task].concat(completeTasks);

    if (newCompleteTasks.length > 100) {
      newCompleteTasks = newCompleteTasks.slice(0, newCompleteTasks.length - 1);
    }

    setFilterTasks(createFilterTasks(newActiveTasks, filterDate));

    damageEnemy();

    setActiveTasks(newActiveTasks);
    setCompleteTasks(newCompleteTasks);
  }

   // Do not know the event type
   function updateSorting(e:any) {
      var sort = e.target.value == "P";
      if ( sort ) {
         var newActiveTasks = sortByPriority(activeTasks);
      } else {
         var newActiveTasks = sortByDueDate(activeTasks);
      }
      setPrioritySort(sort);
      setActiveTasks(newActiveTasks);
   }

  return (
    <div>
      <div>
        <p>Health: {enemyHealth}</p>
        {enemyHealth > 0 ? (
          <img src={images[currentImage]} alt="Enemy Indicator" />
        ) : currentImage < images.length - 1 ? (
          <p>Next enemy coming up....</p>
        ) : (
          <p>All enemies defeated!</p>
        )}
      </div>
      <button
         type="button"
         onClick={() => setShowTodayTasks(!showTodayTasks)}
      >
         Toggle Today's Tasks
      </button>
      <button type="button" onClick={() => setShowActive(!showActive)}>
        Toggle Active Tasks
      </button>
      <button type="button" onClick={() => setShowComplete(!showComplete)}>
        Toggle Complete Tasks
      </button>
      <button
        type="button"
        onClick={() => {
          new_task();
        }}
      >
        Create New Task
      </button>
      <span>
         Sort by:
         <select
            value={prioritySort ? "P" : "H"}
            onChange={e => updateSorting(e)}>
            <option value="P">Priority</option>
            <option value="H">Due Date</option>
         </select>
      </span>
      <TaskForm callback={handleSave} task={editTask} active={showEditor} cancel_callback={cancel_editor}/>
      <TaskList
         name={filterName}
         action={true}
         active={showTodayTasks}
         tasks={filterTasks}
         delete_handle={delete_task}
         edit_handle={set_edit_task}
         complete_handle={complete_task}
      />
      <TaskList
        name="Active Tasks"
        action={true}
        active={showActive}
        tasks={activeTasks}
        delete_handle={delete_task}
        edit_handle={set_edit_task}
        complete_handle={complete_task}
      />
      <TaskList
        name="Complete Tasks"
        action={false}
        active={showComplete}
        tasks={completeTasks}
      />
    </div>
  );
}

function TaskList({
  name,
  action,
  active,
  tasks,
  delete_handle,
  edit_handle,
  complete_handle,
}: any) {
  if (active != true) {
    return <></>;
  }

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
      <h1>{name}</h1>
      <div>{list_of_tasks}</div>
    </div>
  );
}

function TaskDisplay({
  task,
  action,
  delete_handle,
  edit_handle,
  complete_handle,
}: any) {
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

function TaskForm({ callback, task, active, cancel_callback }: any) {
  if (active == false) {
    return <></>;
  }

  const [name, setName] = useState(task.name);
  const [priority, setPriority] = useState(task.priority);

  // Ugly but \_o_/
  var due_time_raw = new Date(task.due_time * 1000);
  var due_time_year = due_time_raw.getFullYear().toString().padStart(4, "0");
  var due_time_month = (due_time_raw.getMonth() + 1)
    .toString()
    .padStart(2, "0");
  var due_time_day = due_time_raw.getDate().toString().padStart(2, "0");
  var due_time_hour = due_time_raw.getHours().toString().padStart(2, "0");
  var due_time_minute = due_time_raw.getMinutes().toString().padStart(2, "0");

  var composed_time =
    due_time_year +
    "-" +
    due_time_month +
    "-" +
    due_time_day +
    "T" +
    due_time_hour +
    ":" +
    due_time_minute;
  const [due, setDue] = useState(composed_time);

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
