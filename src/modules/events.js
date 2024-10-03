// Module for handling eventListeners 

import { createProject, deleteProject, editProject } from "./projects.js";
import { createTask, deleteTask, editTask, markAsCompleteTask } from "./tasks.js";
import { updateSelectOptions, displayProject, projectContainer, 
         taskContainer, getProjectValue, getTaskValues, 
         handleProjectDropUp, handleTaskDropUp } from "./dom.js";
import { renderTaskByID } from "./projectRender.js";
import { assignDatedTasks } from "./datesRender.js";
import { format } from "date-fns";

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

    if (projectName.length === 0) return;
    
    if (isEditMode) {
      editProject(projectName, projectId);
    } else {
      const newProject = createProject(projectName);
      displayProject(newProject);
    };

    localStorage.setItem("selectedProject", projectName);
    updateSelectOptions();
    closeDialog(projectDialog);
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
        isEditMode = editMode(btnProject, isEditMode);
        projectId = project.getAttribute("data-id");
        
        // Fetch the name of the project in input field
        projectInput.value = getProjectValue(projectId);
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

    if (!taskName || !description || !date || !priority) return;

    if (isEditMode && editingTaskId !== null) {
      editTask(taskName, description, date, priority, path, projectID, editingTaskId);
    } else {
      createTask(taskName, description, date, priority, path, projectID);
      
      // Assign task's UI to certain path on click
      if (projectID) {
        const currentProject = document.querySelector(`[data-id="${projectID}"]`);
        if (currentProject && currentProject.classList.contains("item-highlight")) {
          renderTaskByID(currentProject);
        };
      };

      // Assign task's UI to certain date section on click
      assignDatedTasks();
    };  

    closeDialog(taskDialog);
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
        isEditMode = editMode(btnTask, isEditMode);

        // Fetch the task values
        const taskValues = getTaskValues(editingTaskId);

        if (taskValues) {
          taskInput.value = taskValues.title;
          descriptionText.value = taskValues.description;
          inputDate.value = taskValues.date;
          selectPriority.value = taskValues.priority;
          defaultPath();
        }; 
      };
    };
  });
};

// Handle checkbox event
function markTaskEvent() {
  taskContainer.addEventListener("click", (e) => {
    const customCheckbox = e.target.closest(".custom-checkbox");
    // If custom checkbox clicked
    if (customCheckbox) {
      // Look for native checkbox
      const checkbox = customCheckbox.parentNode.querySelector(".checkTask");

      if (checkbox) {
        checkbox.checked = !checkbox.checked; // Toggle the checkbox
        markAsCompleteTask(checkbox); 
      };
    };
  });
};

export function handleProjectEvents() {
  addProject();
  handleProjectDropUp();
  removeProjectEvent();
  editProjectEvent();
};

export function handleTaskEvents() {
  addTask();
  handleTaskDropUp();
  removeTaskEvent();
  editTaskEvent();
  markTaskEvent();
};

function closeDialog(element) {
  element.close();
  element.style.display = "none";
};

// Handle modal cancel
export function cancelDialog() {
  const cancelBtn = document.querySelectorAll("button.cancel");
  cancelBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      closeDialog(projectDialog);
      closeDialog(taskDialog);
      resetForm();
      clearInputs();
    });
  });
};

function showDialog(str) {
  if (str === "Project") {
    projectDialog.style.display = "flex";
    projectDialog.showModal();
  } else if (str === "Task") {
    taskDialog.style.display = "flex";
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
    defaultPath();  // Assign path in select input based on currently selected project
    defaultDate();  // Assign date in input based on "Today"/"Tomorrow" sections
  });
};

function defaultPath() {
  const currentProject = document.querySelector(".item-highlight");
  if (currentProject) {
    const projectID = currentProject.getAttribute("data-id");
    const selectPath = document.querySelector("dialog.task-dialog select#path");

    // Handle project duplicate names
    const optionToSelect = Array.from(selectPath.options).find(option => 
      option.id === projectID
    );
    if (optionToSelect) {
      selectPath.value = optionToSelect.value; 
      selectPath.selectedIndex = optionToSelect.index;
    };
  };
};

function defaultDate() {
  const sectionList = document.querySelectorAll("li:not(:first-child):not(:last-child)");
  const dateSection = Array.from(sectionList).filter(item => item.classList.contains("item-highlight"));
  const inboxSection = document.querySelector("li.inbox");

  dateSection.forEach(item => {
    switch (item.textContent) {
      case "Today":
        inputDate.value = format(new Date(), "yyyy-MM-dd");
        break;
      case "Tomorrow":
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        inputDate.value = format(tomorrow, "yyyy-MM-dd");
        break;
    };
  });
  if (inboxSection.classList.contains("item-highlight")) {
    inputDate.value = format(new Date(), "yyyy-MM-dd");
  };
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

function editMode(btn, mode) {
  if (btn) {
    btn.textContent = "Edit";
    return true;
  };
  return mode;
};
