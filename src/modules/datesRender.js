// Module for rendering the filtered tasks by date

import { displayTask } from "./dom.js";
import { taskArr } from "./tasks.js";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";

// Display tasks that match selected date input
export function renderTaskByDate(dates) {
  const tasks = document.querySelectorAll(".task");
  tasks.forEach(task => task.remove());   

  // Check if it passes date as a string or array
  const dateArr = Array.isArray(dates) ? dates : [dates]; 
  
  // For each date, check if it matches with user's date selection (exclude Past Due tasks)
  dateArr.forEach(date => {
    const filterDate = taskArr.filter(task => task.date === date && task.date !== "Past Due");
    filterDate.forEach(task => {
      displayTask(task);
    });
  });
};

// Get today's tasks
export function renderTodayTasks() {
  const today = format(new Date(), "yyyy-MM-dd");
  renderTaskByDate(today);
};

// Get tomorrow's tasks
export function renderTomorrowTasks() {
  const currentDate = new Date();
  const tomorrow = format(currentDate.setDate(currentDate.getDate() + 1), "yyyy-MM-dd");
  renderTaskByDate(tomorrow);
};

// Get this week's tasks
export function renderThisWeekTasks() {
  const thisWeekArr = [];
  const currentDate = new Date();

  // Start week on Monday, and end on Sunday
  const startWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endWeek = endOfWeek(currentDate, { weekStartsOn: 1 }); 

  // Get array of dates from the current week
  for (let i = startWeek; i <= endWeek; i = addDays(i, 1)) {
    thisWeekArr.push(format(i, "yyyy-MM-dd"));
  };
  renderTaskByDate(thisWeekArr);
  return { endWeek };
};

// Get tasks that have due date longer than the current week
export function renderUpcomingTasks() {
  const upcomingArr = [];
  const currentDate = new Date();
  const endWeek = endOfWeek(currentDate, { weekStartsOn: 1 }); 

  taskArr.forEach(task => {
    if (task.date > format(endWeek, "yyyy-MM-dd")) {
      upcomingArr.push(task.date);
    };
  });
  renderTaskByDate(upcomingArr);
};

// Fetch dated tasks from date sections
export function assignDatedTasks() {
  const sectionList = document.querySelectorAll("li:not(:first-child):not(:last-child)");
  sectionList.forEach(li => {
    if (li.classList.contains("item-highlight")) {
      switch (li.textContent) {
        case "Today":
          renderTodayTasks();
          break;
        case "Tomorrow":
          renderTomorrowTasks();
          break;
        case "This Week":
          renderThisWeekTasks();
          break;
        case "Upcoming":
          renderUpcomingTasks();
          break;
      };
    };
  });
};

// Assign today's date as min attribute for date picker
function setMinDate() {
  const inputDate = document.querySelector("dialog.task-dialog input#date");

  const currentDate = format(new Date(), "yyyy-MM-dd");
  inputDate.setAttribute("min", currentDate);
};
document.addEventListener("DOMContentLoaded", setMinDate);

// Check if the task is past due 
export function checkIfPastDue() {
  const currentDate = format(new Date(), "yyyy-MM-dd");

  taskArr.forEach(task => {
    if (!task.hasOwnProperty("isOverdue")) {
      task.isOverdue = false; // Set default property to false
    };

    // Check if the task is past due
    if (task.date < currentDate) {
      const taskElement = document.querySelector(`div.task[data-id="${task.id}"]`);

      task.isOverdue = true; 
      task.date = "Past Due"; // Updates after page is refreshed 
      
      // Updates real time
      if (taskElement) {
        const name = taskElement.querySelector("div.date");
        name.textContent = "Past Due";
        name.classList.add("stylePastDue");
      };
    };
  });

  localStorage.setItem("tasks", JSON.stringify(taskArr));
};

// Check for past due dates every 1 minute
setInterval(checkIfPastDue, 60000);