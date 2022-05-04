import { expandGlob } from "fs/mod.ts";
import { extname, normalize, resolve } from "path/mod.ts";

import * as jsonc from "jsonc-parser/";
import { Language, minify } from "minifier/mod.ts";

interface FileEntry {
  name: string;
  path: string;
}

function absolutePathToRelativePath(baseDir: string, path: string): string {
  return normalize(path.replace(resolve(baseDir), "./"));
}

export function canMinify(file: string) {
  return [".js", ".json"].includes(extname(file));
}

export async function* getFiles(
  dir: string,
  excludeTS: boolean,
): AsyncIterable<FileEntry> {
  for await (
    const { isSymlink, path } of expandGlob("**/*", {
      root: dir,
      includeDirs: false,
    })
  ) {
    if (isSymlink) continue;
    if (excludeTS && extname(path) === ".ts") continue;

    const name = absolutePathToRelativePath(dir, path);
    yield { name, path };
  }
}

export async function readMinifiedText(path: string) {
  const text = await Deno.readTextFile(path);
  switch (extname(path)) {
    case ".json":
      return JSON.stringify(jsonc.parse(text));
    case ".js":
      return minify(Language.JS, text);
    default:
      return text;
  }
}

export async function remove(path: string, recursive = false) {
  try {
    await Deno.remove(path, { recursive });
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) return;
    throw error;
  }
}
