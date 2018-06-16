import 'jest'
import { testfile2AbsPath, testfile6AbsPath, testfile3AbsPath } from "./test.base";
import { findFileDependencies } from "../src/processor";
import { readFileSync } from "fs";
import { FileImportDescription } from '../src/type';

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

})
