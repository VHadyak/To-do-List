// Module for manipulating DOM

import { projectArr } from "./projects.js";
import { taskArr } from "./tasks.js";
import { renderProjectTasks } from "./projectRender.js";

import actionImg from "../assets/images/actions.svg";

export const projectContainer = document.querySelector("div#project-container");
export const taskContainer = document.querySelector("div#task-container");
const createTaskBtn = document.querySelector("#clickTask");
const contentWrapper = document.querySelector("div.content-wrapper");

// Update options/paths to select input
export function updateSelectOptions() {
  const selectPath = document.querySelector("dialog.task-dialog select#path");
  selectPath.innerHTML = ""; 
  
  projectArr.forEach((project) => {
    const optionElement = document.createElement("option");
    optionElement.value = project.name;
    optionElement.id = project.id;
    optionElement.textContent = project.name;
    selectPath.appendChild(optionElement);
  });
};

// In Completed section, display tasks without Edit, Delete and Create buttons
export function modifyTaskFeatures() {
  const buttons = document.querySelectorAll(".deleteTask, .editTask");
  const checkboxes = document.querySelectorAll(".checkTask");
  let deleteAllBtn = document.querySelector(".deleteAll");
 
  // Check if delete all button exists
  if (!deleteAllBtn) {
    deleteAllBtn = document.createElement("button");
    deleteAllBtn.classList.add("deleteAll");
    deleteAllBtn.textContent = "Delete All";

    if (contentWrapper && createTaskBtn) {
      contentWrapper.insertBefore(deleteAllBtn, createTaskBtn);  // Insert before the 'Create Task' button
    };
  } else {
    deleteAllBtn.style.display = "block"; 
  };

  checkboxes.forEach(checkbox => {
    checkbox.checked = true;
    checkbox.disabled = true;
  });

  buttons.forEach(btn => {
    btn.remove();
  });

  if (createTaskBtn) {
    createTaskBtn.style.display = "none";
  };
};

// Hide "delete", show "create" btn when switched off from "Completed section"
export function showTaskBtn() {
  const deleteAllBtn = document.querySelector(".deleteAll");
  if (createTaskBtn) {
    createTaskBtn.style.display = "block"; 
  };
  if (deleteAllBtn) {
    deleteAllBtn.style.display = "none";
  };
};

// Display project UI
export function displayProject(project) {
  const projectEl = document.createElement("div");
  const projectTitle = document.createElement("div");

  projectEl.classList.add("project");                
  projectTitle.classList.add("project-title");
  projectEl.setAttribute("data-id", project.id);
  projectTitle.textContent = project.name;

  const { wrapper, menu } = dropUpDOM();

  const deleteProjectBtn = document.createElement("button");
  const editProjectBtn = document.createElement("button");
  deleteProjectBtn.classList.add("deleteProject");
  editProjectBtn.classList.add("editProject");
  editProjectBtn.textContent = "Edit";
  deleteProjectBtn.textContent = "Delete"; 

  menu.appendChild(editProjectBtn);
  menu.appendChild(deleteProjectBtn);

  projectEl.appendChild(projectTitle);
  projectEl.appendChild(wrapper);

  projectContainer.appendChild(projectEl);

  jumpToProject(projectEl, projectTitle.textContent);
};

export function getProjectValue(projectId) {
  const project = projectArr.find(p => p.id === Number(projectId));
  const name = project.name;
  return name;
};

export function getTaskValues(taskId) {
  const task = taskArr.find(task => task.id === taskId);
  const { title, description, date, priority, path } = task;
  
  return {
    title, description, date, priority, path
  };
};

// Display task UI
export function displayTask(task) {
  const taskEl = document.createElement("div");
  const infoWrapper = document.createElement("div");
  const deleteTaskBtn = document.createElement("button");
  const editTaskBtn = document.createElement("button");
  const taskBtnWrapper = document.createElement("div");
  const checkBox = document.createElement("input");

  const taskTitle = document.createElement("div");
  const dateText = document.createElement("div");
  const priorityText = document.createElement("div");

  checkBox.type = "checkbox";
  checkBox.name = "task";

  checkBox.classList.add("checkTask");
  taskBtnWrapper.classList.add("task-btn-wrapper");
  deleteTaskBtn.classList.add("deleteTask");
  editTaskBtn.classList.add("editTask");

  infoWrapper.classList.add("wrap-content");
  taskEl.classList.add("task");
  taskTitle.classList.add("task-title");
  dateText.classList.add("date");
  priorityText.classList.add("priority");

  taskEl.setAttribute("data-id", task.id);
  
  taskTitle.textContent = task.title;
  dateText.textContent = task.date;
  priorityText.textContent = task.priority;

  deleteTaskBtn.textContent = "X";    // Temporary
  editTaskBtn.textContent = "Edit"; 

  taskBtnWrapper.appendChild(editTaskBtn);
  taskBtnWrapper.appendChild(deleteTaskBtn);

  infoWrapper.appendChild(checkBox);
  infoWrapper.appendChild(taskTitle);
  infoWrapper.appendChild(dateText);
  infoWrapper.appendChild(taskBtnWrapper);

  taskEl.appendChild(infoWrapper);
  taskEl.appendChild(priorityText);

  taskContainer.appendChild(taskEl);
};

// Update project and task dom based on editing
export function updateProjectDOM(title, projectID) {
  const projectElement = document.querySelector(`div.project[data-id="${projectID}"]`);   // Retrieve unique id from dynamically created project
  const projectName = projectElement.querySelector("div.project div.project-title");  

  projectName.textContent = title;
};

export function updateTaskDOM(title, date, priority, taskID) {
  const taskElement = document.querySelector(`div.task[data-id="${taskID}"]`);            // Retrieve unique id from dynamically created task
  const taskName = taskElement.querySelector("div.task-title");
  const dateText = taskElement.querySelector("div.date");
  const priorityText = taskElement.querySelector("div.priority");

  taskName.textContent = title;
  dateText.textContent = date;
  priorityText.textContent = priority;

  taskContainer.appendChild(taskElement);
};

// Highlight the selected project/sidebar section (Temporary)
export function highlightItem(selectedItem) {
  const items = document.querySelectorAll(".project, li");
  items.forEach(item => item.classList.remove("item-highlight"));
  selectedItem.classList.add("item-highlight");
};

export function getSectionTitle(title) {
  const sectionTitle = document.querySelector("div#section-title");
  sectionTitle.textContent = title;
};

// Render the project that was recently created
export function jumpToProject(project, projectName) {
  highlightItem(project);
  getSectionTitle(projectName);
  renderProjectTasks(project);
  showTaskBtn();
};

function dropUpDOM() {
  const imgAction = document.createElement("img");
  imgAction.src = actionImg;
  imgAction.classList.add("action-img");

  const dropUpWrapper = document.createElement("div");
  const toggleBtn = document.createElement("button");
  const dropUpMenu = document.createElement("div");

  dropUpWrapper.classList.add("drop-up-wrapper");
  toggleBtn.classList.add("btn-drop-up-toggle");
  toggleBtn.id = "drop-up-menu-btn";
  dropUpMenu.classList.add("drop-up-menu");

  toggleBtn.setAttribute("type", "button");
  toggleBtn.setAttribute("data-toggle", "dropdown");
  toggleBtn.setAttribute("aria-expanded", "false");

  toggleBtn.appendChild(imgAction);
  dropUpWrapper.appendChild(toggleBtn);
  dropUpWrapper.appendChild(dropUpMenu);

  return { wrapper: dropUpWrapper, menu: dropUpMenu };
};

// Drop Up Menu 
export function dropUpMenuHandler() {
  projectContainer.addEventListener("click", (e) => {
    const toggleBtn = e.target.closest(".btn-drop-up-toggle");

    if (toggleBtn) {
      const project = toggleBtn.closest(".project");

      if (project) {
        const dropUpMenu = project.querySelector(".drop-up-menu");
        const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";

        // Avoid menu overlaps
        const allDropUpMenus = projectContainer.querySelectorAll(".drop-up-menu");
        allDropUpMenus.forEach(menu => {
          if (menu !== dropUpMenu) {
            menu.style.display = "none";
            const otherToggleBtn = menu.previousElementSibling;
            if (otherToggleBtn) {
              otherToggleBtn.setAttribute("aria-expanded", "false"); 
            };
          };
        });
        
        // Toggle the visibility of the drop-up menu
        toggleBtn.setAttribute("aria-expanded", !isExpanded);
        dropUpMenu.style.display = isExpanded ? "none" : "flex";
        e.stopPropagation();
      };
    } else {
      // Close menu if edit btn is clicked
      hideMenu();
    };  
  });

  // Close menu if document element outside menu is clicked
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".btn-drop-up-toggle") && !e.target.closest(".drop-up-menu")) {
      hideMenu();
    };
  });
};

function hideMenu() {
  const openMenus = projectContainer.querySelectorAll(".drop-up-menu");
  openMenus.forEach(menu => {
    menu.style.display = "none";
    const associatedToggleBtn = menu.previousElementSibling;
    if (associatedToggleBtn) {
      associatedToggleBtn.setAttribute("aria-expanded", "false");
    };
  });
};