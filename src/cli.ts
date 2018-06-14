#!/usr/bin/env node

import { parse } from "cli";
import { cwd, exit } from "process";
import { error, log } from "console";
import { forEach } from "lodash";
import { scanDirectoryWithResult } from "./scanner";
import { join } from "path";

const wordspaceDir = cwd();

const options = parse({
  "directory": ["d", "scaned directory", "string"]
})

const result = scanDirectoryWithResult(join(wordspaceDir, options.directory))

if (result.haveCycle) {
  error(`Import cycle founded in ${options.directory}`)
  forEach(result.cyclies, (cycle, index) => {
    error(`cycle ${index}`)
    forEach(cycle, error)
    error("\n")
  })
  exit(1)
} else {
  log(`No import cycle founded in ${options.directory}`)
  exit(0)
}