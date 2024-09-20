
import { displayTask, highlightProject } from "./dom";
import { projectArr } from "./projects";
import { taskArr } from "./tasks";
import { projectContainer } from "./dom";

// Track the current project click
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

// Render tasks with the project click
function renderContent(projectItem) {
  const projectID = projectItem.getAttribute("data-id");

  // Find tasks associated with projects
  const filteredTasks = taskArr.filter(task => task.projectID === Number(projectID));     

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