
import { highlightProject } from "./dom";

export function currentProject(e) {
  const project = e.target.closest(".project");
  // If project exists
  if (project) {
    console.log("project click");
    highlightProject(project);
  };
};
