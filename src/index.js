import "./styles/styles.css";

import { 
  handleProjectEvents,
  addTask, 
  removeTaskEvent,
  showTaskDialog, 
  cancelDialog } from "./modules/events";



handleProjectEvents();

addTask();
removeTaskEvent();

showTaskDialog();
cancelDialog();
