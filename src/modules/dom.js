
import { projectArr } from "./projects";

export const projectContainer = document.querySelector("div#project-container");
export const taskContainer = document.querySelector("div#task-container");

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

let projectCounter = 1;  // !!! Start with 1 to ignore default Inbox path

// Display project UI
export function displayProject(projectName) {
  const projectEl = document.createElement("div");
  const projectTitle = document.createElement("div");
  const projectBtnWrapper = document.createElement("div");
  const deleteProjectBtn = document.createElement("button");
  const editProjectBtn = document.createElement("button");

  projectBtnWrapper.classList.add("project-btn-wrapper");
  deleteProjectBtn.classList.add("deleteProject");
  editProjectBtn.classList.add("editProject");

  projectEl.classList.add("project");                
  projectTitle.classList.add("project-title");

  // Attach unique id to each newly created project
  projectCounter = assignId(projectEl, "data-id", projectCounter);
 
  projectTitle.textContent = projectName;
  editProjectBtn.textContent = "Edit";  // Temporary
  deleteProjectBtn.textContent = "X";   // Temporary

  projectBtnWrapper.appendChild(editProjectBtn);   
  projectBtnWrapper.appendChild(deleteProjectBtn);  

  projectEl.appendChild(projectTitle);
  projectEl.appendChild(projectBtnWrapper);

  projectContainer.appendChild(projectEl);
};

export function displayTask(taskName, date, priority, id) {
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
  checkBox.value = taskTitle;

  checkBox.classList.add("checkTask");
  taskBtnWrapper.classList.add("task-btn-wrapper");
  deleteTaskBtn.classList.add("deleteTask");
  editTaskBtn.classList.add("editTask");

  infoWrapper.classList.add("wrap-content");
  taskEl.classList.add("task");
  taskTitle.classList.add("task-title");
  dateText.classList.add("date");
  priorityText.classList.add("priority");

  taskEl.dataset.id = id;

  taskTitle.textContent = taskName;
  dateText.textContent = date;
  priorityText.textContent = priority;

  deleteTaskBtn.textContent = "X";    // Temporary
  editTaskBtn.textContent = "Edit";   // Temporary

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
};

// Highlight the selected project
export function highlightProject(selectedProject) {
  const projects = document.querySelectorAll(".project");
  projects.forEach(project => {
    project.classList.remove("project-highlight");
  });
  selectedProject.classList.add("project-highlight");
};

// Assign unique id 
function assignId(element, attr, counter) {
  const id = counter++;
  element.setAttribute(attr, id);
  return counter;
};
