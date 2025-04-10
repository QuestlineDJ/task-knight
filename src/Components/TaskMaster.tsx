import { useState, useContext, useReducer } from 'react';
import { TaskForm } from './TaskForm'

import { displayReducer, Task } from '../TaskUtilities'

export function TaskMaster() {
   const overdue_check_timeout = 30 * 1000;

   const [ editor, editorDispatch ] = useReducer(displayReducer, false);

   var task = new Task("", 0);

   return (
      <>
         <button onClick={()=>editorDispatch({type: "show"})}>Show Editor</button>
         <hr/>
         <TaskForm task={task} formDispatch={editorDispatch} active={editor}/>
      </>
   );
}
