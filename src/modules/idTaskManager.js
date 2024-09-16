
let nextId = 1;
const availableIds = new Set();

// Get a unique id for a task
export function getNextId() {
  if (availableIds.size > 0) {
    const id = Array.from(availableIds)[0];
    availableIds.delete(id);
    return id;
  };
  return nextId++;
};

// Reuse id for new task after previously deleted task
export function releaseId(id) {
  availableIds.add(id);
};