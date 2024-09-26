
// Module for rendering all the tasks that have been checked/marked as complete

import { completedArr } from "./tasks.js";
import { displayTask, modifyTaskFeatures, taskContainer} from "./dom.js";

export function renderCompletedTasks() {
  const contentWrapper = document.querySelector(".content-wrapper");

  // Remove tasks from 'Completed' section that haven't been checked yet
  const tasks = document.querySelectorAll(".task");
  tasks.forEach(task => task.remove());

  completedArr.forEach(task => {
    displayTask(task);
  });
  
  // Check if completed section has a task and 'delete all' button
  contentWrapper.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("deleteAll")) {
      if (taskContainer.querySelector(".task")) {
        const tasks = document.querySelectorAll(".task");
        tasks.forEach(task => task.remove());
        completedArr.length = 0;
      };
    // Remove all completed tasks from the its storage, if 'delete all' is clicked
    localStorage.setItem("completed", JSON.stringify(completedArr));
    };
  });
  // Modify task features if in 'Completed' section
  modifyTaskFeatures();
};
