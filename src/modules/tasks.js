
// Module for handling tasks
import { updateTaskDOM } from "./dom";
import { checkPath } from "./projects";

let idCounter = 0;

export const taskArr = [];
class Task {
  constructor(title, description, date, priority, path) { 
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.path = path;
    this.id = idCounter++;
  };
};

export function createTask(title, description, date, priority, path) {
  const task = new Task(title, description, date, priority, path);
  
  checkPath(path, task); // attach a task to the project path array that was selected
  taskArr.push(task);    // store all the tasks in taskArr
  console.log(taskArr);
};

export function deleteTask(item) {
  const taskUI = item.closest(".task");  // Select element with task class
  const taskID = taskUI.getAttribute("data-id");
    
  const index = taskArr.findIndex(task => task.id === Number(taskID));
  
  if (index !== -1) {
    taskArr.splice(index, 1);
  };
  console.log(taskArr);
  taskUI.remove();
};

export function editTask(title, description, date, priority, path, taskID) {
  const index = taskArr.findIndex(task => task.id === Number(taskID));
  
  if (index !== -1) {
    taskArr[index].title = title;
    taskArr[index].description = description;
    taskArr[index].date = date;
    taskArr[index].priority = priority;
    taskArr[index].path = path;

    updateTaskDOM(title, date, priority, taskID);
  };

  console.log(taskArr);
};