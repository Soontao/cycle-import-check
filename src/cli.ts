#!/usr/bin/env node

import "colors"
import { cwd, exit as realExit, argv } from "process";
import { error, log } from "console";
import { forEach, isEmpty } from "@newdash/newdash";
import { scanDirectoryWithResult } from "./scanner";
import { join, isAbsolute } from "path";
import { mapAbsPathesToRelPathes } from "./file";

const workspaceDir = cwd();

var directory = argv[2]

if (isEmpty(directory)) {
  directory = "."
}

if (!isAbsolute(directory)) {
  directory = join(workspaceDir, directory)
}

log(`\nCircular dependency checker running at ${directory}`.green)

const exit = (code: number) => {
  log("\n")
  realExit(code)
}

try {
  const result = scanDirectoryWithResult(directory)
  if (result.haveCycle) {
    error(`Circular dependency existed in ${directory}`.red)
    forEach(result.cycleList, (cycle, index) => {
      error(`\ncycle ${index + 1}, size (${cycle.length}):${cycle.length === 1 ? " this file import itself".grey : " these files circular import each other".cyan}\n`)
      // @ts-ignore
      forEach(mapAbsPathesToRelPathes(cycle), c => error(`  ${c}`.red))
    })
    exit(1)
  } else {
    log(`Not found circular dependency in ${directory}`.green)
    exit(0)
  }
} catch (error) {
  log(error.message.red)
  exit(1)
}

