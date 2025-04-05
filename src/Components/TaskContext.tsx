import { createContext, useReducer } from 'react';
import { Task, TaskSorting } from '../TaskUtilities'

export const ActiveTasksContext = createContext<TaskCollection | null>(null);
export const ActiveTasksDispatchContext = createContext<any|null>(null);

export const CompletedTasksContext = createContext<TaskCollection | null>(null);
export const CompletedTasksDispatchContext = createContext<any|null>(null);

export function TaskProvider({ children }:any) {
   const [ activeTasks, activeTaskDispatch ] = useReducer(taskReducer, initialTaskCollection());
   const [ completedTasks, completedTaskDispatch ] = useReducer(taskReducer, initialTaskCollection());

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

interface TaskCollection {
   tasks: Array<Task>
   sortBy: TaskSorting
}

function initialTaskCollection() : TaskCollection {
   return {
      sortBy: TaskSorting.ByDueDate,
      tasks: new Array<Task>()
   };
}

function taskReducer(taskCollection: TaskCollection, action:any) : TaskCollection {
   switch ( action.type ) {
      case 'add': {
         return {
            sortBy: taskCollection.sortBy,
            tasks: [...taskCollection.tasks, action.task] //TODO: sort
         };
      }

      case 'edit': {
         var newTasks = taskCollection.tasks.filter((element)=> element.id != action.task.id);
         return {
            sortBy: taskCollection.sortBy,
            tasks: [...taskCollection.tasks, action.task ]
         };
      }

      case 'delete': {
         var newTasks = taskCollection.tasks.filter((element)=> element.id != action.task.id);
         return { 
            sortBy: taskCollection.sortBy,
            tasks: newTasks
         };
      }

      case 'changeSort': {
         //TODO: implement
         return taskCollection;
      }

      case 'load': {
         //TODO: implement
         return taskCollection;
      }

      default: {
         console.warn("Unknown active task dispatch");
         return taskCollection;
      }
   }

   return taskCollection;
}

