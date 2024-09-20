
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


function renderContent(projectItem) {
  const projectID = projectItem.getAttribute("data-id");
  const projectIndex = projectArr.findIndex(project => project.id === Number(projectID));
  const project = projectArr[projectIndex];

  const filteredTasks = taskArr.filter(task => task.projectID === project.id);      // Find tasks associated with projects

  // Clear each task UI before displaying required tasks
  const tasks = document.querySelectorAll(".task");
  tasks.forEach(task => {
    task.remove();
  });

  // Show tasks associated with the project
  filteredTasks.forEach(task => {
    displayTask(task.title, task.date, task.priority, task.id);
  });

  console.log(taskArr);
  console.log(projectArr);
};