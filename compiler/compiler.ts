import { Project } from "./project.ts";

export class Compiler {
  project: Project;
  constructor(workDir: string) {
    this.project = new Project(workDir);
  }

  compile() {
  }

  watch() {
  }

  build() {
  }
}
