// Module for navigating through list items and projects

import { renderInboxTasks, renderProjectTasks } from "./projectRender.js";
import { renderTodayTasks, renderTomorrowTasks, renderThisWeekTasks, renderUpcomingTasks } from "./datesRender.js";
import { renderCompletedTasks } from "./completedTasksRender.js";
import { highlightItem, projectContainer, showTaskBtn, getSectionTitle } from "./dom.js";

const sections = {
  "Inbox": () => renderInboxTasks(),
  "Today": () => renderTodayTasks(),
  "Tomorrow": () => renderTomorrowTasks(),
  "This Week": () => renderThisWeekTasks(),
  "Upcoming": () => renderUpcomingTasks(),
  "Completed": () => renderCompletedTasks(),
};

function renderSection(sectionName, item) {
  if (sectionName) {
    sections[sectionName]();
    highlightItem(item); 
    getSectionTitle(sectionName);
  };
};

export function listItemClick() {
  const lists = document.querySelectorAll("li");
  // First load = render 'Inbox' section. With subsequent loads, render the last clicked section
  window.addEventListener("DOMContentLoaded", () => {
    const savedSection = localStorage.getItem("selectedSection") || "Inbox"; // Store clicked section in the storage
    const sectionToRender = Array.from(lists).find(list => list.textContent === savedSection) || lists[0];

    if (sectionToRender) {
      renderSection(savedSection, sectionToRender);
    };
  });
  
  // If the section li item is clicked, render that section with tasks
  lists.forEach(list => {
    list.addEventListener("click", (e) => {
      const sectionName = e.target.textContent;
      const item = e.target;

      renderSection(sectionName, item);
      if (sectionName !== "Completed") showTaskBtn();
      localStorage.setItem("selectedSection", sectionName);
    });
  });
};

// Render the tasks on the selected project
export function projectClick() {
  projectContainer.addEventListener("click", (e) => {
    // Select that project if project element or edit button is clicked
    if (e.target && (e.target.classList.contains("project") || e.target.classList.contains("editProject"))) {
      const project = e.target.closest(".project");
      if (project) {
        const projectName = project.querySelector(".project-title").textContent;
        highlightItem(project);
        getSectionTitle(projectName);
        renderProjectTasks(project);
        showTaskBtn();
        localStorage.setItem("selectedSection", projectName);
      };
    // Jump to Inbox section if the selected project is deleted
    } else if (!document.querySelector("#clickProject").contains(e.target)) {
      const inbox = Array.from(document.querySelectorAll("li")).find(list => list.textContent === "Inbox");
      const highlight = document.querySelector(".item-highlight");

      // Jump to "Inbox" only if in the project section
      if (inbox && !highlight) {
        renderSection("Inbox", inbox);
        localStorage.setItem("selectedSection", "Inbox");
      };
    };
  });
};