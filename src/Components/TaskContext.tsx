import { createContext, useReducer } from 'react';
import { TaskCollection, TaskSorting, taskReducer } from '../TaskUtilities'

export const ActiveTasksContext = createContext<TaskCollection | null>(null);
export const ActiveTasksDispatchContext = createContext<any|null>(null);

export const CompletedTasksContext = createContext<TaskCollection | null>(null);
export const CompletedTasksDispatchContext = createContext<any|null>(null);

export function TaskContext({children}:any) {
   const [ activeTasks, activeTasksDispatch ] = useReducer(taskReducer, {
      sortBy: TaskSorting.ByPriority,
      tasks: new Array()
   });

   const [ completedTasks, completedTasksDispatch ] = useReducer(taskReducer, {
      sortBy: TaskSorting.ByPriority,
      tasks: new Array()
   });

   return (
      <ActiveTasksContext.Provider value={activeTasks}>
      <ActiveTasksDispatchContext.Provider value={activeTasksDispatch}>

      <CompletedTasksContext.Provider value={completedTasks}>
      <CompletedTasksDispatchContext.Provider value={completedTasksDispatch}>
         {children}
      </CompletedTasksDispatchContext.Provider>
      </CompletedTasksContext.Provider>

      </ActiveTasksDispatchContext.Provider>
      </ActiveTasksContext.Provider>
   );

}
