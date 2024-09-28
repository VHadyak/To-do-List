
import { renderInboxTasks, renderProjectTasks } from "./projectRender.js";
import { renderTodayTasks, renderTomorrowTasks, renderThisWeekTasks, renderUpcomingTasks } from "./datesRender.js";
import { renderCompletedTasks } from "./completedTasksRender.js";
import { highlightItem, projectContainer, showTaskBtn } from "./dom.js";

const sections = {
  "Inbox": () => renderInboxTasks(),
  "Today": () => renderTodayTasks(),
  "Tomorrow": () => renderTomorrowTasks(),
  "This Week": () => renderThisWeekTasks(),
  "Upcoming": () => renderUpcomingTasks(),
  "Completed": () => renderCompletedTasks(),
};

export function listItemClick() {
  const lists = document.querySelectorAll("li");
  // Render Inbox at the start
  window.addEventListener("DOMContentLoaded", () => {
    const inbox = Array.from(lists).find(list => list.textContent === "Inbox");
    if (inbox) {
      sections["Inbox"]();
      highlightItem(inbox);  
    };
  });
  
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
export function projectClick() {
  projectContainer.addEventListener("click", (e) => {
    const project = e.target.closest(".project");

    if (project) {
      highlightItem(project);
      renderProjectTasks(project);
      showTaskBtn();
    };
  });
};

