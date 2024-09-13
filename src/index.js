import "./styles/styles.css";

import { 
  addProject, 
  addTask, 
  removeProject, 
  showProjectDialog, 
  showTaskDialog, 
  cancelDialog } from "./modules/events";


showProjectDialog();
showTaskDialog();
removeProject();
addProject();
addTask();
cancelDialog();

