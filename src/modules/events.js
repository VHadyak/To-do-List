
// Module for handling eventListeners 

import { createProject } from "./projects";
import { createTask } from "./tasks";
import { selectPath, attachProjectToInput } from "./dom";

// 'Project' interactive elements
const projectInput = document.querySelector("div.project-dialog input#projectName");
const btnProject = document.querySelector("div.project-dialog button");

// 'Task' interactive elements
const taskInput = document.querySelector("div.task-dialog input#taskName");
const descriptionText = document.querySelector("div.task-dialog textarea#description");
const inputDate = document.querySelector("div.task-dialog input#date");
const selectPriority = document.querySelector("div.task-dialog select#priority");
const btnTask = document.querySelector("div.task-dialog button");


// Add project to an array of other projects
export function addProject() {
  btnProject.addEventListener("click", () => {
    const projectName = projectInput.value;
    createProject(projectName);

    attachProjectToInput();
  });
};

// Add task with properties to an array of tasks
export function addTask() {
  btnTask.addEventListener("click", () => {
    const taskName = taskInput.value;
    const description = descriptionText.value;
    const date = inputDate.value;
    const priority = selectPriority.value;
    const path = selectPath.value;

    createTask(taskName, description, date, priority, path);
  });
};


