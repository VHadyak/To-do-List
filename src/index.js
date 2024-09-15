import "./styles/styles.css";
import { projectContainer } from "./modules/dom";
import { 
  handleProjectEvents,
  handleTaskEvents,
  handleDialogEvent,
  cancelDialog } from "./modules/events";
import { currentProject } from "./modules/render";

handleDialogEvent();
cancelDialog();
handleProjectEvents();
handleTaskEvents();

// Click on the current project
function clickProject() {
  projectContainer.addEventListener("click", (e) => {
    currentProject(e);
  });
}
clickProject();