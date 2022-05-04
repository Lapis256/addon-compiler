import { copy } from "fs/mod.ts";
import { resolve } from "path/mod.ts";

import { JSZip } from "jszip/mod.ts";

import { PackType } from "../types/pack.ts";
import {
  canMinify,
  getFiles,
  readMinifiedText,
  remove,
} from "../utils/file.ts";

export class Pack {
  path: string;
  type: PackType;

  constructor(path: string, type: PackType) {
    this.path = path;
    this.type = type;
  }

  async build(minify = false, excludeTS = false) {
    const zip = new JSZip();

    for await (const { path, name } of getFiles(this.path, excludeTS)) {
      zip.addFile(
        name,
        canMinify(name) && minify
          ? await readMinifiedText(path)
          : await Deno.readFile(path),
      );
    }

    return zip.generateAsync({ type: "uint8array" });
  }

  async export(outputBase: string) {
    const dest = outputBase +
      (this.type === "behavior"
        ? "development_behavior_packs"
        : "development_resource_packs") +
      "/testtt";
    await remove(dest, true);
    await copy(
      resolve(this.path),
      dest,
      { overwrite: true },
    );
  }
}
