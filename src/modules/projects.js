// Module for handling projects
import { updateProjectDOM } from "./dom";
import { taskArr } from "./tasks";

let idCounter = 0;

export const projectArr = []; 
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
  console.log(projectArr);
};

// Make sure project name matches with path selected in task dialog
export function checkPath(projectID, task) {
  const project = projectArr.find(project => project.id === Number(projectID));
  if (project) {
    project.addTask(task);
  };
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

  console.log(taskArr);
  console.log(projectArr);
};


export function editProject(title, projectID) {
  const index = projectArr.findIndex(project => project.id === Number(projectID));   
  const project = projectArr[index];

  project.name = title;   // Change project name in projectArr
 
  updateProjectDOM(title, projectID);   

  console.log(taskArr);
  console.log(projectArr);
};
