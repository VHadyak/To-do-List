
// Module for handling tasks

import { checkPath } from "./projects";

const taskArr = [];

class Task {
  constructor(title, description, date, priority, path) { 
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.path = path;
  };
};

export function createTask(title, description, date, priority, path) {
  const task = new Task(title, description, date, priority, path);
  //console.log(task);
  
  checkPath(path, task); // attach a task to the project path array that was selected
  taskArr.push(task);    // store all the tasks in taskArr
};
