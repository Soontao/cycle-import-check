import { Extension, ScanResult, ReportVO } from "./type";
import { sync } from "glob";
import { join as pathJoin, dirname, join, normalize, relative } from "path";
import { join as arrayJoin, map, isArray, isString } from "lodash";
import { readFileSync, writeFileSync } from "fs";
import { cwd } from "process";
import { tmpdir, platform } from "os";
import { exec } from "child_process";

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
export const mapAbsPathesToRelPathes = (pathes: string | string[]): string | string[] => {
  if (isString(pathes)) {
    return relative(cwd(), pathes)
  }
  if (isArray(pathes)) {
    return map(pathes, p => relative(cwd(), p))
  }
}

export const mapScanResultToReportVO = (result: ScanResult): ReportVO => {
  var rt: ReportVO = { nodes: [], links: [] }
  rt.nodes = map(result.nodes, n => ({ name: (mapAbsPathesToRelPathes(n) as string) }))
  rt.links = map(result.imports, i => ({
    source: (mapAbsPathesToRelPathes(i.fromFile) as string),
    target: (mapAbsPathesToRelPathes(i.importFile) as string),
    value: i.code,
  }))
  return rt;
}

export const writeFileToTmpDirAndOpenIt = (filename: string, content: string) => {
  const path = join(tmpdir(), filename);
  writeFileSync(path, content);
  if (platform() === "win32") {
    exec(`start ${path}`)
  } else {
    exec(`open ${path}`)
  }
}