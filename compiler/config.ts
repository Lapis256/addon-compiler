import * as jsonc from "jsonc-parser/";

import { PackType } from "../types/pack.ts";

interface PackConfig {
  path: string;
  type: PackType;
}

interface ExportConfig {
  type: "release" | "preview";
  development: boolean;
}

export interface Config {
  name: string;
  author: string;
  export: ExportConfig;
  packs: PackConfig[];
}

export function parseConfig(path: string): Config {
  const json = Deno.readTextFileSync(path);
  return jsonc.parse(json);
}
