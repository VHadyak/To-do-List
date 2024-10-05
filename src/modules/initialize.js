// Module for initializing the app 

import { handleProjectEvents, handleTaskEvents, handleDialogEvent, cancelDialog } from "./events.js";
import { loadProjects } from "./projects.js";
import { loadTasks } from "./tasks.js";
import { listItemClick, projectClick } from "./navigation.js";
import { checkIfPastDue } from "./datesRender.js";
import { sidebarCollapse } from "./dom.js";

// Initialize
export function init() {
  sidebarCollapse();
  checkIfPastDue();
  loadTasks();
  loadProjects();

  handleDialogEvent();
  cancelDialog();
  
  handleProjectEvents();
  handleTaskEvents();
  
  listItemClick();
  projectClick();
};

