
// Module for tracking tasks with id (without id gap)

let nextId = 1;
const availableIDs = new Set();

// Get a unique id for a task
export function getNextId() {
  if (availableIDs.size > 0) {
    const id = Array.from(availableIDs)[0];
    availableIDs.delete(id);
    return id;
  };
  return nextId++;
};

// Reuse id for new task after previously deleted task
export function releaseId(id) {
  availableIDs.add(id);
};