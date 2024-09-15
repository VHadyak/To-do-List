import "./styles/styles.css";

import { 
  handleProjectEvents,
  handleTaskEvents,
  handleDialogEvent,
  cancelDialog } from "./modules/events";

handleDialogEvent();
cancelDialog();

handleProjectEvents();
handleTaskEvents();


