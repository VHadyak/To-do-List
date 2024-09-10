
// Module for handling projects

export const projectArr = []; 
class Project {
  constructor(name) {
    this.name = name;                
  };
};

export function createProject(title) {
  const projectObj = new Project(title);
  projectArr.push(projectObj);
  
  console.log(projectArr);     // Update projectArr after button was clicked
};






