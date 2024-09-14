import "./styles/styles.css";

import { 
  addProject, 
  removeProjectEvent,
  editProjectEvent,  
  addTask, 
  showTaskDialog, 
  cancelDialog } from "./modules/events";



cancelDialog();
addProject();
removeProjectEvent();
editProjectEvent();

showTaskDialog();
addTask();


