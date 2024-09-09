
// Module for handling projects

export const projectArr = []; // update arr after addProject()

class Project {
  constructor(name) {
    this.name = name;                
  };
};

function createProject() {
  //const projectTitle = textInput.value;

  const projectTest = new Project("Vlad");
  projectArr.push(projectTest);
};

createProject();
createProject();

// Export createProject() later and import to eventListener/DOM Module

// ADD PROJECT TO THE ARRAY ON CLICK
//function addProject() {
  //btn.addEventListener("click", () => {
    //createProject();
  //});
//};





