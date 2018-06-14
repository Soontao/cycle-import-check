#!/usr/bin/env node

import { parse } from "cli";
import { cwd } from "process";
import { error, log } from "console";

const wordspaceDir = cwd();

const options = parse({
  "directory": ["d", "scaned directory", "string"],
  "jsx": ["x", "scan jsx & tsx files", "boolean", false],
  "ts": ["t", "scan ts files", "boolean", false]
})

