import { join, normalize } from "path";
import { FileImportDescription } from "../src/type";

export const cwd: string = require("process").cwd();

export const testfile1RelativePath = normalize("tests/testproject/d1/testfile.js")
export const testfile2RelativePath = normalize("tests/testproject/d2/testfile2.js")
export const testfile3RelativePath = normalize("tests/testproject/d2/d3/testfile3.js")
export const testfile4RelativePath = normalize("tests/testproject/d2/d3/testfile4.js")
export const testfile5RelativePath = normalize("tests/testproject/testfile5.ts")
export const testfile6RelativePath = normalize("tests/testproject/d2/d3/d4/testfile6.js")

export const testfile1AbsPath = join(cwd, testfile1RelativePath)
export const testfile2AbsPath = join(cwd, testfile2RelativePath)
export const testfile3AbsPath = join(cwd, testfile3RelativePath)
export const testfile4AbsPath = join(cwd, testfile4RelativePath)
export const testfile5AbsPath = join(cwd, testfile5RelativePath)
export const testfile6AbsPath = join(cwd, testfile6RelativePath)

export const fileRelativeList = [
  testfile1RelativePath,
  testfile6RelativePath,
  testfile3RelativePath,
  testfile4RelativePath,
  testfile2RelativePath,
  testfile5RelativePath,
]

export const fileAbsList = [
  testfile1AbsPath,
  testfile6AbsPath,
  testfile3AbsPath,
  testfile4AbsPath,
  testfile2AbsPath,
  testfile5AbsPath,
];

export const testImportDescriptions: FileImportDescription[] = [
  {
    fromFile: testfile1AbsPath,
    importFile: testfile2AbsPath
  },
  {
    fromFile: testfile2AbsPath,
    importFile: testfile3AbsPath,
  },
  {
    fromFile: testfile3AbsPath,
    importFile: testfile1AbsPath
  },
  {
    fromFile: testfile4AbsPath,
    importFile: testfile1AbsPath
  }
]
