
// Module for handling tasks

import { checkPath } from "./projects";

let idCounter = 0;

const taskArr = [];

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
  console.log(task);
  
  checkPath(path, task); // attach a task to the project path array that was selected
  taskArr.push(task);    // store all the tasks in taskArr
  console.log(taskArr);
};

export function deleteTask(item) {
  const taskUI = item.closest(".task");  // Select element with task class
  const taskID = taskUI.getAttribute("data-id");
  const index = taskArr.findIndex(i => i.id === Number(taskID));

  if (index !== -1) {
    taskArr.splice(index, 1);
  };
  taskUI.remove();
  console.log(taskArr);
};

export function editTask() {
  console.log("Edit Task");
};