// Module for handling tasks

import { displayTask, updateTaskDOM } from "./dom.js";
import { checkProject, projectArr } from "./projects.js";
import { getNextId } from "./idTaskManager.js";

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
  
  removeTaskUI(taskID);
  localStorage.setItem("tasks", JSON.stringify(taskArr));
};

function updateTaskData(task, title, description, date, priority, path) {
  task.title = title;
  task.description = description;
  task.date = date;
  task.priority = priority;
  task.path = path;
};

// Remove task UI with assigned date if current date section doesn't match user's input
function handleDateChange(task, oldDate, li) {
  li.forEach(item => {
    if (item.classList.contains("item-highlight")) {
      if (oldDate !== task.date) {
        removeTaskUI(task.id);
      };
    };
  });
};

function updateTaskUI(taskID, title, date, priority) {
  const taskUI = document.querySelector(`.task[data-id="${taskID}"]`);
  if (taskUI) {
    updateTaskDOM(title, date, priority, taskID);
  };
};

function removeTaskUI(taskID) {
  const taskUI = document.querySelector(`.task[data-id='${taskID}']`);
  if (taskUI) {
    taskUI.remove();
  };
};

// Date section has a highlighter
function isDateSectionHighlighted(li) {
  const highlightedSections = Array.from(li).filter(item => item.classList.contains("item-highlight"));
  return highlightedSections.length > 0;
};

// Update task
export function editTask(title, description, date, priority, path, newProjectID, taskID) {
  const index = taskArr.findIndex(task => task.id === Number(taskID));
  const task = taskArr[index];
  const oldProjectID = task.projectID;
  const oldDate = task.date;

  updateTaskData(task, title, description, date, priority, path);

  const li = document.querySelectorAll("li:not(:first-child):not(:last-child)"); // Get only date sections
  const isSectionHighlighted = isDateSectionHighlighted(li);

  manageTask(task, newProjectID, oldProjectID, isSectionHighlighted);
  handleDateChange(task, oldDate, li);
  
  updateTaskUI(taskID, title, date, priority);
  
  localStorage.setItem("tasks", JSON.stringify(taskArr));
  localStorage.setItem("projects", JSON.stringify(projectArr));
};

// Remove task UI/object if there are no matches with the project
function manageTask(task, newProjectID, oldProjectID, isHighlighted) {
  const projectContainer = document.querySelector("#project-container");
  const hasProject = projectContainer.querySelector(".project");
  
  if (task.projectID !== newProjectID) {
    const newProject = projectArr.find(project => project.id === Number(newProjectID));
    const oldProject = projectArr.find(project => project.id === task.projectID);

    // Don't display Task UI if path of task doesn't match with currently selected project
    if (!isHighlighted) {     // If project is highlighted and not other section
      if (oldProjectID !== Number(newProjectID) || oldProject.name !== task.path) {
        removeTaskUI(task.id);
      };
    };

    // Remove from old project
    if (oldProject && hasProject) {
      const taskIndexInOldProject = oldProject.items.findIndex(t => t.id === Number(task.id));
      if (taskIndexInOldProject !== -1) {
        oldProject.items.splice(taskIndexInOldProject, 1);
      };
    };

    // Add to new project
    if (newProject && !newProject.items.some(project => project.id === Number(task.id))) {
      newProject.addTask(task);
      task.projectID = Number(newProjectID);
    };
  };
};


// Track tasks that have been completed/marked
export function markAsCompleteTask(checkbox) {
  const taskUI = checkbox.closest(".task");
  const taskID = Number(taskUI.dataset.id);
  const taskIndex = taskArr.findIndex(task => task.id === Number(taskID));
  const taskObj = taskArr[taskIndex];
  
  if (checkbox.checked) {
    completedArr.push(taskObj);
    checkbox.disabled = true; 
    setTimeout(() => {
      taskUI.remove();
    }, 300);
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