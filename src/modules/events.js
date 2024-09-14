
// Module for handling eventListeners 
import { createProject, deleteProject, editProject } from "./projects";
import { createTask } from "./tasks";
import { selectPath, updateSelectOptions, displayProject, projectContainer } from "./dom";

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

let isEditMode = false;
let projectId = null;

// Add project to an array of other projects
export function addProject() {
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
    resetForm();
    clearInputs();
  });
};

export function removeProjectEvent() {
  projectContainer.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("deleteProject")) {
      deleteProject(e.target);
      updateSelectOptions();
    };
  });
};

// Inside task edit
export function editProjectEvent() {
  projectContainer.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("editProject")) {
      const project = e.target.closest('.project');
      if (project) {
        projectId = project.getAttribute("data-id");   // Get unique id of each dynamic project
        showDialog();
        isEditMode = true;
        btnProject.textContent = "Edit"; // TEMPORARY
      };
    };
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
    taskDialog.close();
    clearInputs();
  });
};

// Handle modal cancel
export function cancelDialog() {
  const cancelBtn = document.querySelectorAll("button.cancel");
  cancelBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      projectDialog.close();
      taskDialog.close();
      resetForm();
    });
  });
};

function resetForm() {
  isEditMode = false;
  btnProject.textContent = "Create Project";    // TEMPORARY
  projectId = null;
};

function showDialog() {
  projectDialog.showModal();
};
// Show project dialog when "Add Project" clicked
clickProjectBtn.addEventListener("click", showDialog);
 
// Handle task modal(show) 
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
