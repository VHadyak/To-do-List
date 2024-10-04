// Module for initializing the app 

import { handleProjectEvents, handleTaskEvents, handleDialogEvent, cancelDialog } from "./events.js";
import { loadProjects } from "./projects.js";
import { loadTasks } from "./tasks.js";
import { listItemClick, projectClick } from "./navigation.js";
import { checkIfPastDue } from "./datesRender.js";

// Initialize
export function init() {
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

