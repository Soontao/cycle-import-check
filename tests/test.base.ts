import { join } from "path";

export const cwd: string = require("process").cwd();

export const testfile1AbsPath = join(cwd, "tests/testproject/d1/testfile.js")
export const testfile2AbsPath = join(cwd, "tests/testproject/d2/testfile2.js")
export const testfile3AbsPath = join(cwd, "tests/testproject/d2/d3/testfile3.js")
export const testfile4AbsPath = join(cwd, "tests/testproject/d2/d3/testfile4.js")
export const testfile5AbsPath = join(cwd, "tests/testproject/testfile5.ts")
export const testfile6AbsPath = join(cwd, "tests/testproject/d2/d3/d4/testfile6.js")

export const fileList = [
  testfile1AbsPath,
  testfile6AbsPath,
  testfile3AbsPath,
  testfile4AbsPath,
  testfile2AbsPath,
  testfile5AbsPath,
];
