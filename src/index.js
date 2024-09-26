import "./styles/styles.css";

import { handleProjectEvents, handleTaskEvents, handleDialogEvent, cancelDialog } from "./modules/events.js";
import { renderInboxTasks, renderProjectTasks } from "./modules/projectRender.js";
import { renderTodayTasks, renderTomorrowTasks, renderThisWeekTasks, renderUpcomingTasks } from "./modules/datesRender.js";
import { renderCompletedTasks } from "./modules/completedTasksRender.js";
import { highlightItem, projectContainer, showTaskBtn } from "./modules/dom.js";
import { loadProjects } from "./modules/projects.js";
import { loadTasks } from "./modules/tasks.js";

const sections = {
  "Inbox": () => renderInboxTasks(),
  "Today": () => renderTodayTasks(),
  "Tomorrow": () => renderTomorrowTasks(),
  "This Week": () => renderThisWeekTasks(),
  "Upcoming": () => renderUpcomingTasks(),
  "Completed": () => renderCompletedTasks(),
};

function listItemClick() {
  const lists = document.querySelectorAll("li");
  // Render Inbox at the start
  sections["Inbox"]();
  
  // If the section li item is clicked, render that section with tasks
  lists.forEach(list => {
    list.addEventListener("click", (e) => {
      const sectionName = e.target.textContent;
      const item = e.target;
  
      if (sectionName) {
        sections[sectionName]();
        highlightItem(item); 
      };
      if (sectionName !== "Completed") showTaskBtn();
    });
  });
};

// Render the tasks on the selected project
function projectClick() {
  projectContainer.addEventListener("click", (e) => {
    const project = e.target.closest(".project");

    if (project) {
      highlightItem(project);
      renderProjectTasks(project);
      showTaskBtn();
    };
  });
};

loadTasks();
loadProjects();

handleDialogEvent();
cancelDialog();
handleProjectEvents();
handleTaskEvents();

listItemClick();
projectClick();
