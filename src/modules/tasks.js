
// Module for handling tasks

const taskArr = [];

class Task {
  constructor(title, description, date, priority, path) { 
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.path = path;
  };

  /* 
  checkPath() {
    if (this.path !== "Inbox") {
      console.log("Inbox path was NOT selected");
    } else {
      console.log("Inbox path was selected");
    };
  };
  */
};

export function createTask(title, description, date, priority, path) {
  const task1 = new Task(title, description, date, priority, path);
  //task1.checkPath();
  taskArr.push(task1);

  console.log(taskArr); 
};
