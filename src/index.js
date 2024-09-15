import "./styles/styles.css";

import { 
  handleProjectEvents,
  handleTaskEvents,
  handleDialogEvent,
  cancelDialog } from "./modules/events";

handleProjectEvents();
handleTaskEvents();

handleDialogEvent();
cancelDialog();
