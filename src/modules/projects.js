
// Module for handling projects

export const projectArr = []; 
class Project {
  constructor(name) {
    this.name = name;                
    this.items = [];      // Create empty array for each project to store each task
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
export function checkPath(path, task) {
  const project = projectArr.find(p => p.name === path);    

  // If they match, attach the task to corresponding path
  if (project) {
    project.addTask(task);
    console.log(project);
  };
};





