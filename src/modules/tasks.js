
// Module for handling tasks
import { displayTask, updateTaskDOM } from "./dom.js";
import { checkProject } from "./projects.js";
import { projectArr } from "./projects.js";
import { getNextId, releaseId } from "./idTaskManager.js";

export const taskArr = JSON.parse(localStorage.getItem("tasks")) || [];
export const completedArr = JSON.parse(localStorage.getItem("completed")) || [];  // Array for storing completed tasks
class Task {
  constructor(title, description, date, priority, path, projectID = 0) { 
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.path = path;
    this.id = getNextId();
    // Use this for handling identical named projects. If task id NaN, then assign 0
    this.projectID = isNaN(Number(projectID)) ? 0 : Number(projectID); 
  };
};

export function createTask(title, description, date, priority, path, projectID) {
  const task = new Task(title, description, date, priority, path, projectID);
  checkProject(projectID, task);     // Check if project exists or not while creating a task
  taskArr.push(task);           
  localStorage.setItem("tasks", JSON.stringify(taskArr));
  return task;
};

export function deleteTask(item) {
  const taskUI = item.closest(".task"); 
  const taskID = Number(taskUI.dataset.id);
  const taskIndex = taskArr.findIndex(task => task.id === taskID);
  const task = taskArr[taskIndex];

  taskArr.splice(taskIndex, 1);
  deleteFromProjectArr(task, taskID);

  taskUI.remove();
  localStorage.setItem("tasks", JSON.stringify(taskArr));
};

export function editTask(title, description, date, priority, path, newProjectID, taskID) {
  const projectContainer = document.querySelector("#project-container");
  const hasProject = projectContainer.querySelector(".project"); 

  const index = taskArr.findIndex(task => task.id === Number(taskID));
  const task = taskArr[index];

  task.title = title;
  task.description = description;
  task.date = date;
  task.priority = priority;
  task.path = path;

  // Handle the case where edited task is not yet in the newly created project
  if (task.projectID !== newProjectID) {
    const newProject = projectArr.find(project => project.id === Number(newProjectID));
    const oldProject = projectArr.find(project => project.id === task.projectID);
    
    // Remove task from old project after changing task path
    if (oldProject && hasProject) {
      const taskIndexInOldProject = oldProject.items.findIndex(t => t.id === Number(taskID))
      if (taskIndexInOldProject !== -1) {
        oldProject.items.splice(taskIndexInOldProject, 1);
      };
    };
    // Add the edited task to the new project
    if (newProject) {
      if (!newProject.items.some(project => project.id === Number(taskID))) {
        newProject.addTask(task);
        task.projectID = Number(newProjectID);
      };
    };
  };
  releaseId(task); // Reuse ids
  updateTaskDOM(title, date, priority, taskID);
  localStorage.setItem("tasks", JSON.stringify(taskArr));
  localStorage.setItem("projects", JSON.stringify(projectArr));
};

// Track tasks that have been completed/marked
export function markAsCompleteTask(checkbox) {
  const taskUI = checkbox.closest(".task");
  const taskID = Number(taskUI.dataset.id);
  const taskIndex = taskArr.findIndex(task => task.id === Number(taskID));
  const taskObj = taskArr[taskIndex];
  
  if (checkbox.checked) {
    completedArr.push(taskObj);
    taskUI.remove();
  };

  deleteFromProjectArr(taskObj, taskID);
  taskArr.splice(taskIndex, 1);                             
  localStorage.setItem("tasks", JSON.stringify(taskArr));
  localStorage.setItem("completed", JSON.stringify(completedArr));
};

// If project/inbox has the task, remove that task from storages
function deleteFromProjectArr(taskObj, taskID) {
  const projectIndex = projectArr.findIndex(p => p.id === taskObj.projectID);
  if (projectIndex !== -1) {
    const project = projectArr[projectIndex];
    const projectTaskIndex = project.items.findIndex(task => task.id === taskID);
    project.items.splice(projectTaskIndex, 1);
  };
  localStorage.setItem("tasks", JSON.stringify(taskArr));
  localStorage.setItem("projects", JSON.stringify(projectArr));
};

// Load all tasks that have been created, after browser refresh
export function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  taskArr.length = 0;
  
  storedTasks.forEach(taskData => {
    const task = Object.assign(new Task(), taskData);
    taskArr.push(task);
    displayTask(task); 
  });
};