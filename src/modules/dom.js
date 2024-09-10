
import { projectArr } from "./projects";

export const selectPath = document.querySelector("div.task-dialog select#path");

// Extract each project name property value and attach it to select input value
export function attachProjectToInput() {
  const optionElement = document.createElement("option");

  projectArr.forEach((project) => {
    optionElement.value = project.name;
    optionElement.text = project.name;
  });
  selectPath.appendChild(optionElement);
};