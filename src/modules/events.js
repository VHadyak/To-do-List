
// Module for handling eventListeners 

import { createProject } from "./projects";

// Project elements
const projectInput = document.querySelector("div.project-dialog input#name");
const btnProject = document.querySelector("div.project-dialog button");

// Add project to an array of other projects
export function addProject() {
  btnProject.addEventListener("click", () => {
    const projectName = projectInput.value;
    createProject(projectName);
  });
};
