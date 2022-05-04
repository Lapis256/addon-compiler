import { Command } from "cliffy/command/mod.ts";

import { Project } from "../compiler/project.ts";

export class ExportCommand extends Command {
  constructor() {
    super();
    this
      .description("Export Project")
      .action(async () => {
        await new Project(Deno.cwd())
          .export();
      });
  }
}
