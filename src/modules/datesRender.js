
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
  
  // For each date, check if it matches with user's date selection
  dateArr.forEach(date => {
    const filterDate = taskArr.filter(task => task.date === date);

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
  const { endWeek } = renderThisWeekTasks();

  taskArr.forEach(task => {
    if (task.date > format(endWeek, "yyyy-MM-dd")) {
      upcomingArr.push(task.date);
    };
  });
  renderTaskByDate(upcomingArr);
};
