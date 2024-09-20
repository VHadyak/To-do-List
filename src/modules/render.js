
import { displayTask, highlightItem } from "./dom";
import { projectArr } from "./projects";
import { taskArr } from "./tasks";
import { projectContainer } from "./dom";

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

  console.log("Inbox");
};



export function renderTodayTasks() {
  console.log("Today");
}

export function renderTomorrowTasks() {
  console.log("Tomorrow");
};

export function renderThisWeekTasks() {
  console.log("This Week");
};

export function renderUpcomingTasks() {
  console.log("Upcoming");
};





export function renderCompletedTasks() {
  console.log("Completed");
};