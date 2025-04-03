import { createContext, useReducer } from 'react';
import { Task, TaskSorting } from '../TaskUtilities'

export const ActiveTasksContext = createContext<Array<Task> | null>(null);
export const ActiveTasksDispatchContext = createContext<any|null>(null);

export const CompletedTasksContext = createContext<Array<Task> | null>(null);
export const CompletedTasksDispatchContext = createContext<any|null>(null);

export function TaskProvider({ children }:any) {
   const [ activeTasks, activeTaskDispatch ] = useReducer(taskReducer, new Array());
   const [ completedTasks, completedTaskDispatch ] = useReducer(taskReducer, new Array());

   return (
      <ActiveTasksContext.Provider value={activeTasks}>
      <ActiveTasksDispatchContext.Provider value={activeTaskDispatch}>
      <CompletedTasksContext.Provider value={completedTasks}>
      <CompletedTasksDispatchContext.Provider value={completedTaskDispatch}>
         {children}
      </CompletedTasksDispatchContext.Provider>
      </CompletedTasksContext.Provider>
      </ActiveTasksDispatchContext.Provider>
      </ActiveTasksContext.Provider>
   );
}

interface Tasks {
   tasks: Array<Task>
   sortBy: TaskSorting
   
}

function taskReducer(tasks: Array<Task>, action:any) : Array<Task> {
   switch ( action.type ) {
      case 'add': {
         return [...tasks, action.task]; //TODO sort
      }

      case 'edit': {
         var newTasks = tasks.filter((element)=> element.id != action.task.id);
         return [...tasks, action.task ];

      }

      case 'delete': {
         var newTasks = tasks.filter((element)=> element.id != action.task.id);
         return newTasks;
      }

      case 'changeSort': {
         //TODO: implement
         return tasks;
      }

      case 'load': {
         //TODO: implement
         return tasks;
      }

      default: {
         console.warn("Unknown active task dispatch");
         return tasks;
      }
   }

   return tasks;
}

