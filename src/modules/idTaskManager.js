// Module for tracking tasks with id 

// Get a unique id for a task
export function getNextId() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const existingIds = storedTasks.map(task => task.id);

  // Check if there duplicate ids
  let newId;
  do {
    newId = Math.floor(Math.random() * 10000); 
  } while (existingIds.includes(newId));

  return newId; 
};
