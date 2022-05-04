import { Command } from "cliffy/command/mod.ts";

export class InitCommand extends Command {
  constructor() {
    super();
    this.description("Initialize Project");
  }
}
