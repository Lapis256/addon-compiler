import { JSZip } from "jszip/mod.ts";

import { Config, parseConfig } from "./config.ts";
import { Pack } from "./pack.ts";

const BASE_DIR = Deno.env.get("LOCALAPPDATA") + "/Packages/";

export class Project {
  config: Config;
  workDir: string;
  packs: Pack[];
  isDevelopment: boolean;

  constructor(path: string) {
    this.workDir = path;
    this.config = parseConfig(path + "/project.json");
    this.isDevelopment = this.config.export.development;
    this.packs = this.config.packs.map((pack) =>
      new Pack(pack.path, pack.type)
    );
  }

  // deno-lint-ignore no-unused-vars
  async build(outputDir: string) {
    const zip = new JSZip();
    for (const pack of this.packs) {
      zip.addFile(
        pack.type + ".mcpack",
        await pack.build(
          !this.isDevelopment,
          !this.isDevelopment,
        ),
      );
    }
    await zip.writeZip("test.mcaddon");
  }

  async export() {
    for (const pack of this.packs) {
      await pack.export(this.baseDir);
    }
  }

  get baseDir() {
    return BASE_DIR + this.#getAppName() + "/LocalState/games/com.mojang/";
  }

  #getAppName(): string {
    if (this.config.export.type === "release") {
      return "Microsoft.MinecraftUWP_8wekyb3d8bbwe";
    }
    return "Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe";
  }
}
