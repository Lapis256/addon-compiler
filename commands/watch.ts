import { Command } from "cliffy/command/mod.ts";

export class WatchCommand extends Command {
  constructor() {
    super();
    this.description("Watch Project");
  }
}
