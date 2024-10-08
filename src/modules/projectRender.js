// Module for rendering the filtered tasks by project selection

import { displayTask } from "./dom.js";
import { taskArr } from "./tasks.js";

// Handle filtered tasks associated with project/inbox
export function renderTaskByID(item) {
  const itemID = item.getAttribute("data-id");
  const filteredTasks = taskArr.filter(task => task.projectID === Number(itemID));     

  // Clear each task UI before displaying required tasks
  const tasks = document.querySelectorAll(".task");
  tasks.forEach(task => task.remove());
 
  // Show tasks associated with the project/Inbox
  filteredTasks.forEach(task => {
    displayTask(task);
  });
};

// Render tasks with the project/inbox click
export function renderProjectTasks(projectItem) {
  renderTaskByID(projectItem);
};

export function renderInboxTasks() {
  const inboxItem = document.querySelector("li.inbox");
  inboxItem.dataset.id = 0;  // Set "Inbox" list item to id = 0
  renderTaskByID(inboxItem);
};
