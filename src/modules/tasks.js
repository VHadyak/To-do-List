
// Module for handling tasks

const taskArr = [];

class Task {
  constructor(title, description, date, priority) { 
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
  };
};

export function createTask(title, description, date, priority) {
  const task1 = new Task(title, description, date, priority);
  taskArr.push(task1);

  console.log(taskArr); 
};
