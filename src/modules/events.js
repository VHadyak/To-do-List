
// Module for handling eventListeners 

import { createProject, deleteProject, editProject } from "./projects.js";
import { createTask, deleteTask, editTask, markAsCompleteTask } from "./tasks.js";
import { updateSelectOptions, 
         displayProject, displayTask, 
         projectContainer, taskContainer } from "./dom.js";

// 'Project' interactive elements
const clickProjectBtn = document.querySelector("button#clickProject"); // Create project btn variable (no modal)
const projectInput = document.querySelector("dialog.project-dialog input#projectName");
const btnProject = document.querySelector("dialog.project-dialog button#createProject");
const projectDialog = document.querySelector("dialog.project-dialog");

// 'Task' interactive elements
const clickTaskBtn = document.querySelector("button#clickTask"); // Create task btn variable (no modal)
const btnTask = document.querySelector("dialog.task-dialog button#createTask");
const taskInput = document.querySelector("dialog.task-dialog input#taskName");
const descriptionText = document.querySelector("dialog.task-dialog textarea#description");
const inputDate = document.querySelector("dialog.task-dialog input#date");
const selectPath = document.querySelector("select#path");
const selectPriority = document.querySelector("dialog.task-dialog select#priority");
const taskDialog = document.querySelector("dialog.task-dialog");

let isEditMode = false;
let projectId = null;
let editingTaskId = null;

// Create/Edit project modal btn event
function addProject() {
  btnProject.addEventListener("click", () => {
    const projectName = projectInput.value;

    if (isEditMode) {
      editProject(projectName, projectId);
    } else {
      const newProject = createProject(projectName);
      displayProject(newProject);
    };

    updateSelectOptions();
    projectDialog.close();
    resetForm("Project");
    clearInputs();
  });
};

function removeProjectEvent() {
  projectContainer.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("deleteProject")) {
      deleteProject(e.target);
      updateSelectOptions();
    };
  });
};

// // Edit project btn (no modal) 
function editProjectEvent() {
  projectContainer.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("editProject")) {
      const project = e.target.closest('.project');
      if (project) {
        showDialog("Project");
        isEditMode = true;                        // !!!
        btnProject.textContent = "Edit";          // !!!
        projectId = project.getAttribute("data-id");
      };
    };
  });
};

// Create/Edit task modal btn event
function addTask() {
  btnTask.addEventListener("click", () => {
    const taskName = taskInput.value;
    const description = descriptionText.value;
    const date = inputDate.value;
    const priority = selectPriority.value;
    const path = selectPath.value;
    const projectID = selectPath.selectedOptions[0].id; 

    if (isEditMode && editingTaskId !== null) {
      editTask(taskName, description, date, priority, path, projectID, editingTaskId);
    } else {
      const newTask = createTask(taskName, description, date, priority, path, projectID);
      displayTask(newTask); 
    };
 
    taskDialog.close();
    resetForm("Task");
    clearInputs();
  });
};

function removeTaskEvent() {
  taskContainer.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("deleteTask")) {
      deleteTask(e.target);
    };
  });
};

// Edit task btn (no modal) 
function editTaskEvent() {
  taskContainer.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("editTask")) {
      const task = e.target.closest(".task");
      if (task) {
        editingTaskId = Number(task.dataset.id); // Set the task ID for editing
        showDialog("Task");
        isEditMode = true;
        btnTask.textContent = "Edit";
      };
    };
  });
};

// Handle checkbox event
function markTaskEvent() {
  taskContainer.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("checkTask")) {
      markAsCompleteTask(e.target);
    };
  });
};

export function handleProjectEvents() {
  addProject();
  removeProjectEvent();
  editProjectEvent();
};

export function handleTaskEvents() {
  addTask();
  removeTaskEvent();
  editTaskEvent();
  markTaskEvent();
};

// Handle modal cancel
export function cancelDialog() {
  const cancelBtn = document.querySelectorAll("button.cancel");
  cancelBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      projectDialog.close();
      taskDialog.close();
      resetForm();
      clearInputs();
    });
  });
};

function showDialog(str) {
  if (str === "Project") {
    projectDialog.showModal();
  } else if (str === "Task") {
    taskDialog.showModal();
  };
};

// Show Modal once starter button is pressed
export function handleDialogEvent() {
  clickProjectBtn.addEventListener("click", () => {
    showDialog("Project");
  });
  clickTaskBtn.addEventListener("click", () => {
    showDialog("Task");
  });
};

function resetForm(str) {
  isEditMode = false;
  projectId = null;
  btnProject.textContent = (str === "Project" || !str) ? "Create Project" : btnProject.textContent;
  btnTask.textContent = (str === "Task" || !str) ? "Create Task" : btnTask.textContent;
};

function clearInputs() {
  projectInput.value = "";
  taskInput.value = "";
  descriptionText.value = "";
  inputDate.value = "";
  selectPriority.value = "";
  selectPath.value = "Inbox";
};
