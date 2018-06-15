import { Extension } from "./type";
import { sync } from "glob";
import { join as pathJoin, dirname, join, normalize, relative } from "path";
import { join as arrayJoin, map } from "lodash";
import { readFileSync } from "fs";
import { cwd } from "process";

require.extensions[".ts"] = require.extensions[".js"]
require.extensions[".jsx"] = require.extensions[".js"]
require.extensions[".tsx"] = require.extensions[".js"]
require.extensions[".mjs"] = require.extensions[".js"]

const { resolve } = require

export const listAllFile = (dir: string, ext: Extension[] = []) => {
  return sync(pathJoin(dir, `./**/*.{${arrayJoin(ext, ",")}}`), {
    realpath: true,
    ignore: [
      "**/node_modules/**"
    ]
  })
}

export const readFile = (absolutePath: string) => {
  return readFileSync(absolutePath, { encoding: "utf8" })
}

/**
 * will throw error if file not exist
 * 
 * @param fromFileAbsolutePath 
 * @param importFileRelativePath 
 */
export const resolveFilePath = (fromFileAbsolutePath: string, importFileRelativePath: string) => {
  const dir = dirname(fromFileAbsolutePath);
  const targetPath = join(dir, importFileRelativePath);
  try {
    return normalize(resolve(targetPath));
  } catch (error) {
    // can not resolve import file
    return ""
  }
}

/**
 * map absolute path to relative path
 * @param pathes 
 */
export const mapAbsPathesToRelPathes = (pathes: string[]) => {
  return map(pathes, p => relative(cwd(), p))
}