#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("cli");
const process_1 = require("process");
const wordspaceDir = process_1.cwd();
const options = cli_1.parse({
    "directory": ["d", "scaned directory", "string"],
    "jsx": ["x", "scan jsx & tsx files", "boolean", false],
    "ts": ["t", "scan ts files", "boolean", false]
});
