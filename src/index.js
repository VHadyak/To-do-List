import "./styles/styles.css";

import { 
  handleProjectEvents,
  handleTaskEvents,
  handleDialogEvent,
  cancelDialog } from "./modules/events";

import { currentProject, renderInboxTasks, renderTodayTasks, 
         renderTomorrowTasks, renderThisWeekTasks, renderUpcomingTasks, 
         renderCompletedTasks } from "./modules/render";

import { highlightItem } from "./modules/dom";

handleDialogEvent();
cancelDialog();

handleProjectEvents();
handleTaskEvents();
currentProject();


const sections = {
  "Inbox": () => renderInboxTasks(),
  "Today": () => renderTodayTasks(),
  "Tomorrow": () => renderTomorrowTasks(),
  "This Week": () => renderThisWeekTasks(),
  "Upcoming": () => renderUpcomingTasks(),
  "Completed": () => renderCompletedTasks(),
};

const lists = document.querySelectorAll("li");

// Render Inbox at the start
sections["Inbox"]();

// If that section li item is clicked, render that section with tasks
lists.forEach(list => {
  list.addEventListener("click", (e) => {
    const sectionName = e.target.textContent;
    const item = e.target;  // Temporary

    if (sectionName) {
      sections[sectionName]();
      highlightItem(item); // Temporary
    };
  });
});