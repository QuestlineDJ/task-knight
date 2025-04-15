import { useState, useId, SetStateAction } from "react";
import redDragon from "./images/boss_dragon.png";
import blueDragon from "./images/boss_dragon_blue.png";
import purpleDragon from "./images/boss_dragon_purple.png";
import { setLocalStorage } from "./LocalStorageManager";
import addTaskButton from "./assets/Task Knight Assets/Main Panel/Task Panel/addButton.png";
import taskBoard from "./assets/Task Knight Assets/Main Panel/Task Panel/panel_tasks.png";

import {
  Task,
  getTimeSeconds,
  getCurrentTime,
  computeFieldDate,
  sortByPriority,
  sortByDueDate,
  createFilterTasks,
  createOverdueList,
  TaskType,
  saveTaskToStorage,
  deleteTaskInStorage,
  getActiveTasksFromStorage,
  getCompleteTasksFromStorage,
} from "./TaskUtilities";
import { increasePlayerDamage, giveGold, damageEnemy } from "./GameHelper";
import ShopTab from "./Components/ShopTab";

import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";

import "./index.css";
import UI from "./UI";

const images = [redDragon, blueDragon, purpleDragon];

// Import date selection from higher up UI components
export function TaskMaster() {
  // Refresh overdue task list
  // TODO: figure out optimium time
  const overdue_check_timeout = 30 * 1000;

  // React state variables that control showing certain task lists
  const [showEditor, setShowEditor] = useState(false);
  const [showActive, setShowActive] = useState(false);
  const [showTodayTasks, setShowTodayTasks] = useState(true);
  const [showOverdue, setShowOverdue] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  // React state variables that control enemy
  const [enemyHealth, setEnemyHealth] = useState<number>(100);
  const [currentImage, setCurrentImage] = useState(0);

  // React state variables that control gold given to the user
  const [currentGoldAmount, setCurrentGoldAmount] = useState<number>(0);

  // React state variable that controls the players damage
  const [damageAmount, setDamageAmount] = useState<number>(10);

  // React state that hold the current task in the TaskForm
  const [editTask, setEditTask] = useState(new Task("", 0, getCurrentTime()));

  // React state that deterines what sorting to do on tasks
  const [prioritySort, setPrioritySort] = useState(true);

  // React state for non-dupelicate tasks lists
  const [activeTasks, setActiveTasks] = useState<Array<Task>>(
    getActiveTasksFromStorage
  );
  const [completeTasks, setCompleteTasks] = useState<Array<Task>>(
    getCompleteTasksFromStorage
  );

  // React state that determines which day to filter for
  const [filterDate, setFilterDate] = useState(new Date());

  // React state the hold a view of tasks
  const [overdueTasks, setOverdueTasks] = useState<Array<Task>>(
    createOverdueList(activeTasks)
  );
  const [filterTasks, setFilterTasks] = useState(
    createFilterTasks(activeTasks, filterDate)
  );

  // The name for the filtered tasks
  let filterName = filterDate.toLocaleDateString() + " Tasks";

  // Set a refresh peroid to detech tasks to become overdue
  setTimeout(() => {
    setOverdueTasks(createOverdueList(activeTasks));
  }, overdue_check_timeout);

  /**
   * A function that handles saving a task from the TaskForm into task lists
   *
   * @param task - The task to be saved from TaskForm
   */
  function handleSave(task: Task) {
    // Do not save tasks with no names
    if (task.name == "") {
      setShowEditor(false);
      return;
    }

    // No need to insert a task that already exists, i.g., when editing tasks that exist
    if (activeTasks.find((element) => element.id == task.id) != undefined) {
      setShowEditor(false);
      saveTaskToStorage(task, TaskType.Active);
      //TODO: update dervied lists from edited element
      return;
    }

    // Add task to active task list
    var newActiveTasks = activeTasks.concat([task]);

    // Sort task based on user preference
    if (prioritySort) {
      newActiveTasks = sortByPriority(newActiveTasks);
    } else {
      newActiveTasks = sortByDueDate(newActiveTasks);
    }

    // Update react states
    setActiveTasks(newActiveTasks);
    setFilterTasks(createFilterTasks(newActiveTasks, filterDate));
    setOverdueTasks(createOverdueList(newActiveTasks));
    setShowEditor(false);

    saveTaskToStorage(task, TaskType.Active);
  }

  /**
   * Set the editTask and show the editor
   *
   * @param task - the task to edit, can be either pre-existing or new
   */
  function set_edit_task(task: Task) {
    setEditTask(task);
    setShowEditor(true);
  }

  /**
   * Deletes a task from lists and refreshs react states
   */
  function delete_task(taskid: number) {
    var newActiveTasks = activeTasks.filter((task) => task.id != taskid);

    deleteTaskInStorage(taskid, TaskType.Active);

    setActiveTasks(newActiveTasks);
    setFilterTasks(createFilterTasks(newActiveTasks, filterDate));
    setOverdueTasks(createOverdueList(newActiveTasks));
  }

  /**
   * Creates new task and shows the editor
   */
  function new_task() {
    setEditTask(new Task("", 0, getCurrentTime()));
    setShowEditor(true);
  }

  /**
   * Cancels the adding of the task by hiding the editor
   */
  function cancel_editor() {
    setShowEditor(false);
  }

  /**
   * Completes a task by moving it from activeTasks to completeTasks. Updates associated dervied task lists
   */
  function complete_task(taskid: number) {
    // Ensure the task we are trying to complete exists
    var completed_task = activeTasks.find((element) => element.id == taskid);
    if (completed_task == undefined) {
      return;
    }

    // Transfer tasks from active to complete
    var newActiveTasks = activeTasks.filter((task) => task.id != taskid);
    var newCompleteTasks = [completed_task].concat(completeTasks);

    if (newCompleteTasks.length > 100) {
      var task_to_delete = newCompleteTasks[newCompleteTasks.length - 1];
      newCompleteTasks = newCompleteTasks.slice(0, newCompleteTasks.length - 1);

      deleteTaskInStorage(task_to_delete.id, TaskType.Complete);
    }

    //Update dervied task lists
    setFilterTasks(createFilterTasks(newActiveTasks, filterDate));
    setOverdueTasks(createOverdueList(newActiveTasks));

    damageEnemy(
      damageAmount,
      currentImage,
      images,
      setEnemyHealth,
      setCurrentImage,
      setCurrentGoldAmount
    );

    setActiveTasks(newActiveTasks);
    setCompleteTasks(newCompleteTasks);

    deleteTaskInStorage(completed_task.id, TaskType.Active);
    saveTaskToStorage(completed_task, TaskType.Complete);
  }

  /**
   * A function which updates react states when user changes sort by priorty
   *
   * @param e - change event generated by react when changing form select element
   */
  function updateSorting(e: React.ChangeEvent<HTMLSelectElement>) {
    var sort = e.target.value == "P";
    if (sort) {
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
        <UI newTask={new_task}></UI>
        <ShopTab
          enemyHealth={enemyHealth}
          currentGoldAmount={currentGoldAmount}
          damageAmount={damageAmount}
          setCurrentGoldAmount={setCurrentGoldAmount}
          setDamageAmount={setDamageAmount}
        ></ShopTab>
        <p>Gold: {currentGoldAmount}</p>
        <p>
          <button
            type="button"
            onClick={() =>
              increasePlayerDamage(
                currentGoldAmount,
                setCurrentGoldAmount,
                setDamageAmount,
                damageAmount
              )
            }
          >
            Increase Damage +10: Requires 10 Gold
          </button>
        </p>
        {enemyHealth > 0 ? (
          <img src={images[currentImage]} alt="Enemy Indicator" />
        ) : currentImage < images.length - 1 ? (
          <p>Next enemy coming up....</p>
        ) : (
          <p>All enemies defeated!</p>
        )}
      </div>

      <div className="TaskBoard">
        <button type="button" onClick={() => setShowOverdue(!showOverdue)}>
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
          className="createTask"
          type="button"
          style={{
            backgroundSize: "cover",
            backgroundColor: "transparent",
            width: "112px",
            height: "105px",
            placeItems: "center",
            border: "none",
            outline: "none",
          }}
          onClick={() => new_task()}
        >
          <img
            src={addTaskButton}
            style={{ width: "100%", height: "100%", placeItems: "center" }}
          ></img>
        </button>
      </div>

      <hr />
      <span>
        Sort by:
        <select
          value={prioritySort ? "P" : "H"}
          onChange={(e) => updateSorting(e)}
        >
          <option value="P">Priority</option>
          <option value="H">Due Date</option>
        </select>
      </span>
      <br />
      <span>
        View Tasks on day:
        <input
          type="date"
          value={computeFieldDate(filterDate)}
          onChange={(e) => {
            setFilterDate(new Date(e.target.value));
          }}
        />
      </span>
      <hr />
      <TaskForm
        callback={handleSave}
        task={editTask}
        active={showEditor}
        cancel_callback={cancel_editor}
      />
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
