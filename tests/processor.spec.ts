import 'jest'
import { testfile2AbsPath, testfile6AbsPath, testfile3AbsPath } from "./test.base";
import { findFileDependencies, findRequireDependencies } from "../src/processor";
import { readFileSync } from "fs";
import { FileImportDescription } from '../src/type';
import { join } from 'path';

describe('processor tests', () => {

  test('should view import files paths', () => {
    const imports = findFileDependencies(testfile2AbsPath, readFileSync(testfile2AbsPath, { encoding: "utf8" }))
    const expected: FileImportDescription[] = [
      {
        code: 'import "./d3/d4/testfile6"',
        fromFile: testfile2AbsPath,
        importFile: testfile6AbsPath
      },
      {
        code: 'import "d3/testfile3"',
        fromFile: testfile2AbsPath,
        importFile: testfile3AbsPath
      }
    ]
    expect(imports).toEqual(expected)
  })

  test('should view require files path', () => {
    const Proj5File1AbsPath = join(__dirname, "./testproject5/file1.js")
    const Proj5File2AbsPath = join(__dirname, "./testproject5/file2.js")
    const deps = findRequireDependencies(Proj5File1AbsPath, readFileSync(Proj5File1AbsPath, { encoding: "utf8" }))
    expect(deps).toEqual([
      {
        fromFile: Proj5File1AbsPath,
        importFile: Proj5File2AbsPath,
        code: 'require("./file2.js")',
      }
    ])
  })


})
