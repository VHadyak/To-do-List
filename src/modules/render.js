
import { displayTask, highlightProject } from "./dom";
import { projectArr } from "./projects";
import { taskArr } from "./tasks";
import { projectContainer } from "./dom";



export function currentProject() {
  projectContainer.addEventListener("click", (e) => {
    const project = e.target.closest(".project");
    // If project exists
    if (project) {
      highlightProject(project);
      renderContent(project);
    };
  });
};


function renderContent(project) {
  
};