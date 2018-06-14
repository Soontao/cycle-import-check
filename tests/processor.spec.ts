import 'jest'
import { testfile2AbsPath, testfile6AbsPath, testfile3AbsPath } from "./test.base";
import { findImportDependency } from "../src/processor";
import { readFileSync } from "fs";

describe('processor tests', () => {

  test('should view import files paths', () => {
    const imports = findImportDependency(testfile2AbsPath, readFileSync(testfile2AbsPath, { encoding: "utf8" }))
    expect(imports).toEqual([testfile6AbsPath, testfile3AbsPath])
  })

  test('should throw error import no-exist file', () => {
    expect(() => {
      findImportDependency(testfile2AbsPath, 'import "./whatvever.js"')
    }).toThrowError();
  })

})
