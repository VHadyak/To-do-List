
// Module for handling eventListeners 
import { createProject, deleteProject, editProject } from "./projects";
import { createTask, deleteTask, editTask } from "./tasks";
import { selectPath, updateSelectOptions, displayProject, displayTask, projectContainer, taskContainer } from "./dom";

// 'Project' interactive elements
export const projectInput = document.querySelector("dialog.project-dialog input#projectName");
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

export let isEditMode = false;
let projectId = null;
let taskId = null;

// Create/Edit project modal btn event
function addProject() {
  createProject("Inbox"); 

  btnProject.addEventListener("click", () => {
    const projectName = projectInput.value;
    if (projectName.length < 1) {
      // import some dom to display errors
      return;
    };

    if (isEditMode) {
      editProject(projectName, projectId);
    } else {
      createProject(projectName);
      displayProject(projectName);
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
        projectId = project.getAttribute("data-id");   // Get unique id of each dynamic project
        showDialog("Project");
        isEditMode = true;                        // !!!
        btnProject.textContent = "Edit";          // !!!
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
    // checkbox for markup
  
    if (isEditMode) {
      editTask(taskName, description, date, priority, path, taskId);
    } else {
      createTask(taskName, description, date, priority, path);
      displayTask(taskName, date, priority);
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
        taskId = task.getAttribute("data-id");
        showDialog("Task"); 
        isEditMode = true;              // !!!
        btnTask.textContent = "Edit";   // !!!
      };
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
