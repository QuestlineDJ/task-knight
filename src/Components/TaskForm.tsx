import { useState, useContext } from 'react';
import { ActiveTasksDispatchContext } from './TaskContext';
import { computeFieldDate } from '../TaskUtilities';

export function TaskForm({task, formDispatch, active}:any) {
   if ( !active ) {
      return (<></>);
   }

   const [name, setName] = useState(task.name);;
   const [priority, setPriority] = useState(task.priority);
   const [due, setDue] = useState(computeFieldDate(new Date(task.due_time * 1000), true));

   const taskDispatch = useContext(ActiveTasksDispatchContext);

   return (
      <>
         <label>
            Name:{" "}
            <input type="text" value={name} onChange={(e)=> setName(e.target.value)} />
         </label><br/>
         <label>
            Priority:{" "}
            <input type="number"value={priority} onChange={(e)=> setPriority(e.target.value)}/>
         </label><br/>
         <label>
            Due Date:{" "}
            <input type="datetime-local" value={due} onChange={(e)=> setDue(e.target.value)}/>
         </label><br/>
         <button type="button" onClick={()=>{
            var newTask = task.copy();
            task.name = name;
            task.priority = priority;
            task.due = due;
            taskDispatch({type: 'add', task: newTask});
            formDispatch({type: 'hide'});
            
         }}>Save</button>
         <button type="button" onClick={()=>{
            formDispatch({ type: "hide"});
         }}>Cancel</button>
      </>
   );
}
