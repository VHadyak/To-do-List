
// Module for handling eventListeners 

import { createProject, deleteProject } from "./projects";
import { createTask } from "./tasks";
import { selectPath, updateSelectOptions, displayProject, projectContainer } from "./dom";

// 'Project' interactive elements
const projectInput = document.querySelector("dialog.project-dialog input#projectName");
const btnProject = document.querySelector("dialog.project-dialog button#createProject");
const clickProjectBtn = document.querySelector("button#clickProject");
const projectDialog = document.querySelector("dialog.project-dialog");

// 'Task' interactive elements
const taskInput = document.querySelector("dialog.task-dialog input#taskName");
const descriptionText = document.querySelector("dialog.task-dialog textarea#description");
const inputDate = document.querySelector("dialog.task-dialog input#date");
const selectPriority = document.querySelector("dialog.task-dialog select#priority");
const btnTask = document.querySelector("dialog.task-dialog button#createTask");
const clickTaskBtn = document.querySelector("button#clickTask");
const taskDialog = document.querySelector("dialog.task-dialog");

// Add project to an array of other projects
export function addProject() {
  createProject("Inbox"); 

  btnProject.addEventListener("click", () => {
    const projectName = projectInput.value;
    if (projectName.length < 1) {
      // import some dom to display errors
      return;
    }
    createProject(projectName);
    displayProject(projectName);
    updateSelectOptions();
    projectDialog.close();
    clearInputs();
  });
};

export function removeProject() {
  projectContainer.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("deleteProject")) {
      deleteProject(e.target);
    };
  });
};

// if project exists trigger edit function and event

// Add task with properties to an array of tasks
export function addTask() {
  btnTask.addEventListener("click", () => {
    const taskName = taskInput.value;
    const description = descriptionText.value;
    const date = inputDate.value;
    const priority = selectPriority.value;
    const path = selectPath.value;

    createTask(taskName, description, date, priority, path);
    taskDialog.close();
    clearInputs();
  });
};

export function cancelDialog() {
  const cancelBtn = document.querySelectorAll("button.cancel");
  cancelBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      projectDialog.close()
      taskDialog.close();
    });
  });
};

export function showProjectDialog() {
  clickProjectBtn.addEventListener("click", () => {
    projectDialog.showModal();
  });
}; 

export function showTaskDialog() {
  clickTaskBtn.addEventListener("click", () => {
    taskDialog.showModal();
  });
}; 

function clearInputs() {
  projectInput.value = "";
  taskInput.value = "";
  descriptionText.value = "";
  inputDate.value = "";
  selectPriority.value = "";
  selectPath.value = "Inbox";
};
