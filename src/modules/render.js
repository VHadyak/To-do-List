
import { displayTask, highlightItem } from "./dom";
import { projectArr } from "./projects";
import { taskArr } from "./tasks";
import { projectContainer } from "./dom";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";

// Track the current project click
export function currentProject() {
  projectContainer.addEventListener("click", (e) => {
    const project = e.target.closest(".project");
    // If project exists
    if (project) {
      highlightItem(project);
      renderProjectTasks(project);
    };
  });
};

// Handle filtered tasks associated with project/inbox
function renderTaskByID(item) {
  const itemID = item.getAttribute("data-id");
  // Find tasks associated with projects/Inbox
  const filteredTasks = taskArr.filter(task => task.projectID === Number(itemID));     

  // Clear each task UI before displaying required tasks
  const tasks = document.querySelectorAll(".task");
  tasks.forEach(task => {
    task.remove();
  });
 
  // Show tasks associated with the project/Inbox
  filteredTasks.forEach(task => {
    displayTask(task.title, task.date, task.priority, task.id);
  });
};

// Render tasks with the project click (for "Projects" and "Inbox" sections)
function renderProjectTasks(projectItem) {
  renderTaskByID(projectItem);
  console.log(taskArr);
  console.log(projectArr);
};

export function renderInboxTasks() {
  const inboxItem = document.querySelector("li.inbox");
  inboxItem.dataset.id = 0;   
  renderTaskByID(inboxItem);
};



// Display tasks that match selected date input
function renderTaskByDate(dates) {
  const tasks = document.querySelectorAll(".task");
  tasks.forEach(task => {
    task.remove();
  });

  // Check if it passes date as string or array
  const dateArr = Array.isArray(dates) ? dates : [dates];

  // For each date, check if it matches with user's date selection
  dateArr.forEach(date => {
    const filterDate = taskArr.filter(task => task.date === date);

    filterDate.forEach(task => {
      displayTask(task.title, task.date, task.priority, task.id);
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

  // Get array of dates from this week
  for (let i = startWeek; i <= endWeek; i = addDays(i, 1)) {
    thisWeekArr.push(format(i, "yyyy-MM-dd"));
  };

  renderTaskByDate(thisWeekArr);
  
  return { endWeek };
};

export function renderUpcomingTasks() {
  const upcomingArr = [];
  const { endWeek } = renderThisWeekTasks();
  const formattedEndWeek = format(endWeek, "yyyy-MM-dd");

  taskArr.forEach(task => {
    if (task.date > formattedEndWeek) {
      upcomingArr.push(task.date);
    };
  });

  renderTaskByDate(upcomingArr);
};





export function renderCompletedTasks() {
  console.log("Completed");
};