
import { handleProjectEvents, handleTaskEvents, handleDialogEvent, cancelDialog } from "./events.js";
import { loadProjects } from "./projects.js";
import { loadTasks } from "./tasks.js";
import { listItemClick, projectClick } from "./navigation.js";

// Initialize
export function init() {
  loadTasks();
  loadProjects();
  
  handleDialogEvent();
  cancelDialog();
  
  handleProjectEvents();
  handleTaskEvents();
  
  listItemClick();
  projectClick();
};

