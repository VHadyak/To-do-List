// Module for handling projects
import { displayProject, updateProjectDOM, updateSelectOptions } from "./dom";
import { taskArr } from "./tasks";

export const projectArr = JSON.parse(localStorage.getItem("projects")) || [];

let idCounter = projectArr.length > 0 ? Math.max(...projectArr.map(p => p.id)) + 1 : 0;

class Project {
  constructor(name) {
    this.name = name;                
    this.items = [];        // Create empty array for each project to store each task
    this.id = idCounter++;
  };

  addTask(task) {
    this.items.push(task);
  };
};

export function createProject(title) {
  const projectObj = new Project(title);
  projectArr.push(projectObj);
  localStorage.setItem("projects", JSON.stringify(projectArr));

  return projectObj;
};

// Add task to project/inbox path
export function checkProject(projectID, task) {
  const project = projectArr.find(project => project.id === Number(projectID));

  if (project) {
    project.addTask(task);
  } else { 
    // Add task to "Inbox" path if no project has been created
    const inbox = projectArr.find(project => project.id === 0);
    if (inbox) {
      inbox.addTask(task);
    };
  };
  localStorage.setItem("projects", JSON.stringify(projectArr));
};

export function deleteProject(item) {
  const projectUI = item.closest(".project");
  const projectId = projectUI.getAttribute("data-id");
  const index = projectArr.findIndex(i => i.id === Number(projectId));

  const filteredTasks = taskArr.filter(task => task.projectID === Number(projectId));

  filteredTasks.forEach(taskToDelete => {
    const taskIndex = taskArr.findIndex(task => task.id === taskToDelete.id);
    const taskElements = document.querySelectorAll('div.task');
    const taskElement = Array.from(taskElements).find(el => 
      el.querySelector('.task-title').textContent === taskToDelete.title &&
      el.querySelector('.date').textContent === taskToDelete.date &&
      el.querySelector('.priority').textContent === taskToDelete.priority
    );

    if (taskElement) {
      taskElement.remove();  
    };
    taskArr.splice(taskIndex, 1);  // Remove task from taskArr
  });

  // Remove project from projectArr
  projectArr.splice(index, 1);
  projectUI.remove();

  localStorage.setItem("projects", JSON.stringify(projectArr));
  localStorage.setItem("tasks", JSON.stringify(taskArr));

  idCounter = projectArr.length > 0 ? Math.max(...projectArr.map(p => p.id)) + 1 : 0;
};

export function editProject(title, projectID) {
  const index = projectArr.findIndex(project => project.id === Number(projectID));   
  const project = projectArr[index];

  project.name = title; 

  // Update path of task within project storage
  project.items.forEach(task => {
    if (task.projectID === project.id) {
      task.path = title;
    };
  });

  // Update path of task within task storage
  taskArr.forEach(task => {
    if (task.projectID === project.id) {
      task.path = title;
    };
  });
  
  localStorage.setItem("projects", JSON.stringify(projectArr));
  localStorage.setItem("tasks", JSON.stringify(taskArr));
  updateProjectDOM(title, projectID);   
};

// Load all projects that have been created, after browser refresh
export function loadProjects() {
  const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];

  projectArr.length = 0;  // Prevent duplication

  // Load default "Inbox" (only in storage) only once after browser refresh
  if (!storedProjects.some(project => project.id === 0)) {
    createProject("Inbox");
  };

  // Recreate project in order to use properties/methods after refresh
  storedProjects.forEach(projectData => {
    const project = Object.assign(new Project(projectData.name), projectData);
    projectArr.push(project);
  
    // Ignore the display of default "Inbox"
    if (projectData.id !== 0) {
      displayProject(project); 
    };
  });

  // On refresh, update path input options
  updateSelectOptions();
  // Update id counter
  idCounter = projectArr.length > 0 ? Math.max(...projectArr.map(p => p.id)) + 1 : 0;
};

// Project id error happening and pushing the whole task into id