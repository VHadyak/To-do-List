
import { projectArr } from "./projects";

export const selectPath = document.querySelector("dialog.task-dialog select#path");
export const projectContainer = document.querySelector("div.project-container");

// Update options/paths to select input
export function updateSelectOptions() {
  selectPath.innerHTML = ''; 
  
  projectArr.forEach((project) => {
    const optionElement = document.createElement("option");
    optionElement.value = project.name;
    optionElement.textContent = project.name;
    selectPath.appendChild(optionElement);
  });
};

let idCounter = 1;  // !!! Start with 1 to ignore default Inbox path

// Display project UI
export function displayProject(projectName) {
  const projectEl = document.createElement("div");
  const projectTitle = document.createElement("div");
  const deleteProjectBtn = document.createElement("button");
  const editProjectBtn = document.createElement("button");

  deleteProjectBtn.classList.add("deleteProject");
  editProjectBtn.classList.add("editProject");

  projectEl.classList.add("project");
  projectTitle.classList.add("project-title");

  // Attach unique id to each newly created project
  assignId(projectEl, "data-id");
 
  projectTitle.textContent = projectName;
  editProjectBtn.textContent = "Edit";  // Temporary
  deleteProjectBtn.textContent = "X";   // Temporary

  projectEl.appendChild(projectTitle);
  projectEl.appendChild(editProjectBtn);
  projectEl.appendChild(deleteProjectBtn);
  
  projectContainer.appendChild(projectEl);
};

// Assign unique id
function assignId(element, attr) {
  const id = idCounter++;
  element.setAttribute(attr, id);
};
