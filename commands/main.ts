import { Command } from "cliffy/command/mod.ts";

import { BuildCommand } from "./build.ts";
// import { ExportCommand } from "./export.ts";
// import { WatchCommand } from "./watch.ts";
// import { InitCommand } from "./init.ts";

import { version } from "../version.ts";

export class MainCommand extends Command {
  constructor() {
    super();
    this.name("addon_compiler")
      .description("Compiler")
      .command("build", new BuildCommand())
      // .command("export", new ExportCommand())
      // .command("watch", new WatchCommand())
      // .command("init", new InitCommand())
      .version(version);
  }

  async parse(args: string[]) {
    if (args.length <= 0) {
      args = ["--help"];
    }
    return await super.parse(args);
  }
}
