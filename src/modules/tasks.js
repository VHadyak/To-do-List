
// Module for handling tasks

const taskArr = [];

class Task {
  constructor(title, description, date, priority) {  //Priority + path
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
  };
};

const inputDate = document.querySelector("input");
const btn = document.querySelector("button");
const selectInput = document.querySelector("select");

function chooseDate() {
  const date = inputDate.value;
  return date;
};

// Low, Medium and High priority
function choosePriority() {
  const priority = selectInput.value;
  return priority;
};


function createTask() {
  // declare date chosen and parse it into task1
  const date = chooseDate()
  const priority = choosePriority();

  const task1 = new Task("Bills", "sjkdsjdjs", date, priority);
  taskArr.push(task1);

  console.log(task1);
};

export function addTask() {
  btn.addEventListener("click", () => {
    createTask();
  })
};