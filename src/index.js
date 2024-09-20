import "./styles/styles.css";
import { 
  handleTaskEvents,
  handleDialogEvent,
  cancelDialog, 
  handleProjectEvents} from "./modules/events";
import { currentProject } from "./modules/render";

handleDialogEvent();
cancelDialog();

handleProjectEvents();
handleTaskEvents();
currentProject();
