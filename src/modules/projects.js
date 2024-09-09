
// Module for handling projects

//const btn = document.querySelector("button");
//const input = document.querySelector("input");

export const projectArr = []; // update arr after addProject()

class Project {
  constructor(name) {
    this.name = name;                
  };
};

function createProject() {
  //const name1 = input.value;

  const projectTest = new Project("Vlad");
  projectArr.push(projectTest);
};

createProject();
createProject();

// ADD PROJECT TO THE ARRAY ON CLICK
//export function addProject() {
  //btn.addEventListener("click", () => {
    //createProject();
  //});
//};





