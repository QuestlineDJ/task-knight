// TaskSystem.tsx
import React, { useState } from "react";

import headerLeft from "./assets/Task Knight Assets/Corner UI/emptyLevelBadge.png";
import headerRight from "./assets/Task Knight Assets/Corner UI/goldBag.png";

import character from "./assets/Task Knight Assets/Character UI & Sprites/playerCharacter_default.png";
import dragon from "./assets/Task Knight Assets/Character UI & Sprites/boss_dragon.png";
import dragon2 from "./assets/Task Knight Assets/Character UI & Sprites/boss_dragon_blue.png";
import dragon3 from "./assets/Task Knight Assets/Character UI & Sprites/boss_dragon_purple.png";

import panelBg from "./assets/Task Knight Assets/Main Panel/Task Panel/panel_tasks.png";

import btnUpDown from "./assets/Task Knight Assets/Main Panel/Task Panel/sortButton.png";
import btnAdd from "./assets/Task Knight Assets/Main Panel/Task Panel/addButton.png";

import {
  Task,
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

import {
  damageEnemy,
  setPlayerDamageFromLocalStorage,
  LoadGameData,
  setEnemyHealthFromLocalStorage,
  setGoldFromStorage,
  setImageFromStorage,
} from "./GameHelper";
import ShopTab from "./Components/ShopTab";

import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";

import "./index.css";
import "./SaveScreen.css";
import SaveWindow from "./Components/SaveWindow";

const images = [dragon, dragon2, dragon3];
const index = 0;

export default function TaskSystem() {
  const overdue_check_timeout = 30 * 1000;

  // React state variables that control showing certain task lists
  const [showEditor, setShowEditor] = useState(false);
  const [showActive, setShowActive] = useState(true);
  const [showTodayTasks, setShowTodayTasks] = useState(false);
  const [showOverdue, setShowOverdue] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [isSaveWindowOpen, setSaveWindowOpen] = useState(false);
  const [isShopWindowOpen, setShopWindowOpen] = useState(false);

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

  const [showTogglePopup, setShowTogglePopup] = useState(false);

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

  function onLoadHandler() {
    LoadGameData();

    setPlayerDamageFromLocalStorage(setDamageAmount, damageAmount);

    setEnemyHealthFromLocalStorage(setEnemyHealth);

    setGoldFromStorage(setCurrentGoldAmount);

    setImageFromStorage(setCurrentImage);
  }

  function toggleData() {
    if (showTodayTasks) {
      setShowTodayTasks(false);
      setShowOverdue(true);
    } else if (showOverdue) {
      setShowOverdue(false);
      setShowActive(true);
    } else if (showActive) {
      setShowActive(false);
      setShowTodayTasks(true);
    }
  }

  window.onload = onLoadHandler;

  // --- RENDER UI + LOGIC ---
  return (
    <div className="app-container">
      <header className="header">
        <img src={headerLeft} alt="Left Header" />
        <p>Health: {enemyHealth}</p>
        <div className="header-right">
          <span className="gold-amount">Gold: {currentGoldAmount}</span>
          <img src={headerRight} alt="Right Header" />
        </div>
      </header>

      <div className="main-content">
        <aside className="sidebar left-sidebar" />

        <section className="content">
          <div className="game-scene">
            <img src={character} alt="Character" className="character" />
            <img
              src={images[currentImage]}
              alt="Boss Sprite"
              className="dragon"
            />
          </div>

          <div className="ui-overlay">
            <img src={panelBg} alt="Panel Background" className="panel-bg" />
            <div
              className="overlay-content"
              style={{
                position: "absolute",
                top: "10%",
                left: "5%",
                width: "100%%",
                height: "80%",
                pointerEvents: "auto",
                overflow: "scroll",
                overflowX: "hidden",
              }}
            >
              {isSaveWindowOpen && <SaveWindow></SaveWindow>}
              {isShopWindowOpen && (
                <ShopTab
                  enemyHealth={enemyHealth}
                  currentGoldAmount={currentGoldAmount}
                  damageAmount={damageAmount}
                  setCurrentGoldAmount={setCurrentGoldAmount}
                  setDamageAmount={setDamageAmount}
                  currentImage={currentImage}
                  images={images}
                  setEnemyHealth={setEnemyHealth}
                  setCurrentImage={setCurrentImage}
                ></ShopTab>
              )}
              {!isSaveWindowOpen && !isShopWindowOpen && (
                <>
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
                </>
              )}
            </div>
          </div>
        </section>

        <aside className="sidebar right-sidebar">
          <img
            src={btnUpDown}
            alt="Reorder Button"
            className="button-updown"
            onClick={() => toggleData()}
          />
          <button
            className="createTask"
            type="button"
            onClick={new_task}
            style={{
              backgroundSize: "cover",
              backgroundColor: "transparent",
              width: "100%",
              placeItems: "center",
              border: "none",
              outline: "none",
            }}
          >
            <img src={btnAdd} alt="Add Task Button" className="button-add" />
          </button>
          <button onClick={() => setShopWindowOpen(!isShopWindowOpen)}>
            Shop
          </button>
          <button
            className="open-screen-button"
            onClick={() => setSaveWindowOpen(!isSaveWindowOpen)}
          >
            Toggle Save Screen
          </button>
        </aside>
      </div>
    </div>
  );
}

/*
Hi hi this was the previous showToggle stuff. I didn't want to delete it but I did want to comment it out
So here it is down here.
{showTogglePopup && (
            <div className="toggle-popup">
              <button onClick={() => setShowOverdue(!showOverdue)}>
                Toggle Overdue Tasks
              </button>
              <button onClick={() => setShowTodayTasks(!showTodayTasks)}>
                Toggle Day Tasks
              </button>
              <button onClick={() => setShowActive(!showActive)}>
                Toggle Active Tasks
              </button>
            </div>
          )}
            */
