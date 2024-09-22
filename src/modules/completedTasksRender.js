
// Render all the tasks that have been checked/marked complete

import { completedArr } from "./tasks";
import { displayTask, modifyTaskFeatures, taskContainer} from "./dom";

export function renderCompletedTasks() {
  const contentWrapper = document.querySelector(".content-wrapper");

  // Remove tasks from 'Completed' section that haven't been checked yet
  const tasks = document.querySelectorAll(".task");
  tasks.forEach(task => task.remove());

  completedArr.forEach(task => {
    displayTask(task.title, task.date, task.priority, task.id);
  });
  
  // Check if completed section has a task and delete all button
  contentWrapper.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("deleteAll")) {
      if (taskContainer.querySelector(".task")) {
        const tasks = document.querySelectorAll(".task");
        tasks.forEach(task => task.remove());
        completedArr.length = 0;
      };
    };;
  });
  // Modify task features if in 'Completed' section
  modifyTaskFeatures();
};
