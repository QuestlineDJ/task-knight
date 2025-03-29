export class Task {
  id: number;
  name: string;
  priority: number;
  creation_time: number;
  due_time: number;
  done_time: number;

   /**
    * Constructs a Task with a random id.
    *
    * @param name - The name of the task
    * @param priority - The priority of the task
    * @param due_time - the UNIX time at which the task is due
    *
    * @returns A constructed task object
    */
  constructor(name: string, priority: number, due_time: number) {
    this.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    this.name = name;
    this.priority = priority;
    this.creation_time = getCurrentTime();
    this.due_time = due_time;
    this.done_time = 0;
  }
}

/**
 * Turns a javascript date into UNIX timestamp
 *
 * @param date - A javascript date object
 *
 * @returns The UNIX timestamp of the date
 */
export function getTimeSeconds(date: Date) : number {
   return Math.floor(date.getTime() / 1000);
}

/**
 * Returns the current time in UNIX timestamp format
 *
 * @returns The current time in UNIX timestamp format
 */
export function getCurrentTime() : number {
   return getTimeSeconds(new Date());
}


/**
 * Create a HTML input field valid date from a date object
 *
 * @param date - The date object to translate
 * @param have_seconds - Whether to or not include seconds
 *
 * @returns A string formated in the same way as a HTML input field date or datetime excepts
 */
export function computeFieldDate(date: Date, have_seconds = false) : string {
   // Ugly but \_o_/
   var due_time_year = date.getFullYear().toString().padStart(4, "0");
   var due_time_month = (date.getMonth() + 1)
     .toString()
     .padStart(2, "0");
   var due_time_day = date.getDate().toString().padStart(2, "0");
   var due_time_hour = date.getHours().toString().padStart(2, "0");
   var due_time_minute = date.getMinutes().toString().padStart(2, "0");

   var composed_time =
     due_time_year +
     "-" +
     due_time_month +
     "-" +
     due_time_day;

   if ( have_seconds ) {
     composed_time += "T" +
        due_time_hour +
        ":" +
        due_time_minute;
   }

   return composed_time;
}

/**
 * Create a new array from given array with task being sorted by priority first and then due date
 *
 * @param array - The array contains tasks to be sorted
 *
 * @returns A sorted array of tasks by first priority and then due date
 */
export function sortByPriority(array: Array<Task>) : Array<Task> {
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

/**
 * Create a new array from given array with tasks being sorted by due date first and then priority
 *
 * @param array - The array that contains tasks to be sorted
 * 
 * @returns A sorted array of tasks by due date and then priority
 */
export function sortByDueDate(array: Array<Task>) : Array<Task> {
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

/**
 * Creates a new array with tasks that are due from the given date
 *
 * @param array - The array of tasks to filter from
 * @param day - The day to which to filter for
 *
 * @returns An array with tasks that are only due for a certain day
 */
export function createFilterTasks(array: Array<Task>, day: Date) : Array<Task> {
   var startTime = new Date(day.getTime());
   startTime.setHours(0, 0, 0);

   var endTime = new Date(day.getTime());
   endTime.setHours(23, 59, 59);

   return array.filter((element) =>{
      return getTimeSeconds(startTime) < element.due_time && element.due_time <= getTimeSeconds(endTime);
   });

}

/**
 * Create a new array with tasks that are overdue, i.e., the due date has already happened
 *
 * @param array - The array of task to search for overdue tasks
 *
 * @returns An array with tasks that are overdue
 */
export function createOverdueList(array: Array<Task>) : Array<Task> {
   var now = getTimeSeconds(new Date());

   return array.filter((element) =>{
      return now > element.due_time; 
   });
}

