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
    this.creation_time = getCurrentTime();
    this.due_time = due_time;
    this.done_time = 0;
  }
}

export function getTimeSeconds(date: Date) : number {
   return Math.floor(date.getTime() / 1000);
}

export function getCurrentTime() : number {
   return getTimeSeconds(new Date());
}

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

export function createFilterTasks(array: Array<Task>, day: Date) : Array<Task> {
   var startTime = new Date(day.getTime());
   startTime.setHours(0, 0, 0);

   var endTime = new Date(day.getTime());
   endTime.setHours(23, 59, 59);

   return array.filter((element) =>{
      return getTimeSeconds(startTime) < element.due_time && element.due_time <= getTimeSeconds(endTime);
   });

}

export function createOverdueList(array: Array<Task>) : Array<Task> {
   var now = getTimeSeconds(new Date());

   return array.filter((element) =>{
      return now > element.due_time; 
   });
}


