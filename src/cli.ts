#!/usr/bin/env node

import "colors"
import { cwd, exit, argv } from "process";
import { error, log } from "console";
import { forEach } from "lodash";
import { scanDirectoryWithResult } from "./scanner";
import { join, isAbsolute } from "path";
import { mapAbsPathesToRelPathes } from "./file";

const workspaceDir = cwd();

var directory = argv[2]

if (!directory) {
  directory = "."
}

if (!isAbsolute(directory)) {
  directory = join(workspaceDir, directory)
}

const banner = `Circular dependency checker running at ${directory}`.grey

log(banner)

const result = scanDirectoryWithResult(directory)

if (result.haveCycle) {
  error(`Circular dependency existed in ${directory}`.red)
  forEach(result.cyclies, (cycle, index) => {
    error(`\ncycle ${index + 1}, size (${cycle.length}):${cycle.length === 1 ? " this file import itself".grey : " these files circular import each other".cyan}\n`)
    forEach(mapAbsPathesToRelPathes(cycle), c => error(`  ${c}`.red))
  })
  exit(1)
} else {
  log(`Not found circular dependency in ${mapAbsPathesToRelPathes(directory)}`.green)
  exit(0)
}