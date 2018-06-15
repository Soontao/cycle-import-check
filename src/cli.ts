#!/usr/bin/env node

import "colors"
import { cwd, exit, argv } from "process";
import { error, log } from "console";
import { forEach } from "lodash";
import { scanDirectoryWithResult } from "./scanner";
import { join, isAbsolute } from "path";
import { absPathesToRelativePathes } from "./file";

const wordspaceDir = cwd();

var directory = argv[2]

if (!directory) {
  directory = "."
}

if (!isAbsolute(directory)) {
  directory = join(wordspaceDir, directory)
}

const result = scanDirectoryWithResult(directory)

if (result.haveCycle) {
  error(`Import cycle founded in ${directory}`.red)
  forEach(result.cyclies, (cycle, index) => {
    error(`\ncycle ${index + 1}, size (${cycle.length}):\n`)
    forEach(absPathesToRelativePathes(cycle), c => error(`  ${c}`.red))
  })
  error("\n")
  exit(1)
} else {
  log(`Congratulation, no import cycle founded in ${directory}`.green)
  exit(0)
}