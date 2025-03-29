import { useState, useId } from "react";
import redDot from "./images/reddot.png";
import orangeDot from "./images/orangedot.png";
import yellowDot from "./images/yellowdot.png";

import { 
   Task,
   getTimeSeconds,
   getCurrentTime,
   computeFieldDate,
   sortByPriority,
   sortByDueDate,
   createFilterTasks,
   createOverdueList
} from './TaskUtilities'

import { TaskForm } from './TaskForm'
import { TaskList } from './TaskList'

import "./index.css"

const images = [redDot, orangeDot, yellowDot];

// Import date selection from higher up UI components
export function TaskMaster() {

   // Refresh overdue task list
   // TODO: figure out optimium time
   const overdue_check_timeout = 30 * 1000;

  const [showEditor, setShowEditor] = useState(false);
  const [showActive, setShowActive] = useState(false);
   const [showTodayTasks, setShowTodayTasks] = useState(true);
   const [showOverdue, setShowOverdue] = useState(true);

  const [showComplete, setShowComplete] = useState(false);
  const [enemyHealth, setEnemyHealth] = useState<number>(100);
  const [currentImage, setCurrentImage] = useState(0);

  const [editTask, setEditTask] = useState(new Task("", 0, getCurrentTime()));
  const [prioritySort, setPrioritySort] = useState(true);

  const [activeTasks, setActiveTasks] = useState<Array<Task>>(new Array());
  const [completeTasks, setCompleteTasks] = useState<Array<Task>>(new Array());
  const [overdueTasks, setOverdueTasks] = useState<Array<Task>>(createOverdueList(activeTasks));

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

   setTimeout(() => {
      setOverdueTasks(createOverdueList(activeTasks));
   }, overdue_check_timeout);

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
    setOverdueTasks(createOverdueList(newActiveTasks))
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
    setOverdueTasks(createOverdueList(newActiveTasks));
  }

  function new_task() {
    setEditTask(new Task("", 0, getCurrentTime()));
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
    setOverdueTasks(createOverdueList(newActiveTasks));

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

       setFilterTasks(createFilterTasks(newActiveTasks, filterDate));
       setOverdueTasks(createOverdueList(newActiveTasks));

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
         onClick={() => setShowOverdue(!showOverdue)}
      >
         Toggle Overdue Tasks
      </button>
      <button
         type="button"
         onClick={() => setShowTodayTasks(!showTodayTasks)}
      >
         Toggle Day Tasks
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
      </button><hr/>
      <span>
         Sort by:
         <select
            value={prioritySort ? "P" : "H"}
            onChange={e => updateSorting(e)}>
            <option value="P">Priority</option>
            <option value="H">Due Date</option>
         </select>
      </span><br/>
      <span>
         View Tasks on day:
         <input 
            type="date"
            value={computeFieldDate(filterDate)}
            onChange={(e) =>{setFilterDate(new Date(e.target.value))}}
         /> 
      </span><hr/>
      <TaskForm callback={handleSave} task={editTask} active={showEditor} cancel_callback={cancel_editor}/>
      <TaskList
         name="Overdue Tasks"
         action={true}
         active={showOverdue}
         tasks={overdueTasks}
         delete_handle={delete_task}
         edit_handle={set_edit_task}
         complete_handle={complete_task} 
      />
      <TaskList
         name={filterName /* TaskList for task for a certain day*/}
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
