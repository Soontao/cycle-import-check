function init() {
  const a = require("file2");
  a();
}

export * from "./file2"

export {b} from "./file2"

import c, {d} from "./file2"; import {e} from "./file2"

import * as H from "./file2"

import j from "./file2"

export function failsWithRegexBecauseItLooksLikeExportFrom() { return String.fromCharCode(0 + "./file2");}

init();b();c();d();e();H();j(); // use variables to avoid lint warnings
