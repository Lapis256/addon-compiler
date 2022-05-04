import { Command } from "cliffy/command/mod.ts";

import { Project } from "../compiler/project.ts";

export class BuildCommand extends Command {
  constructor() {
    super();
    this
      .description("Build Addon")
      .action(async () => {
        await new Project(Deno.cwd())
          .build("");
      });
  }
}
