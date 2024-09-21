import "./styles/styles.css";

import { handleProjectEvents, handleTaskEvents, handleDialogEvent, cancelDialog } from "./modules/events";
import { renderInboxTasks, renderProjectTasks } from "./modules/projectRender";
import { renderTodayTasks, renderTomorrowTasks, renderThisWeekTasks, renderUpcomingTasks } from "./modules/datesRender";
import { highlightItem, projectContainer } from "./modules/dom";

const sections = {
  "Inbox": () => renderInboxTasks(),
  "Today": () => renderTodayTasks(),
  "Tomorrow": () => renderTomorrowTasks(),
  "This Week": () => renderThisWeekTasks(),
  "Upcoming": () => renderUpcomingTasks(),
  //"Completed": () => renderCompletedTasks(),
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
    });
  });
};

function projectClick() {
  projectContainer.addEventListener("click", (e) => {
    const project = e.target.closest(".project");

    if (project) {
      highlightItem(project);
      renderProjectTasks(project);
    };
  });
};

handleDialogEvent();
cancelDialog();
handleProjectEvents();
handleTaskEvents();

listItemClick();
projectClick();
