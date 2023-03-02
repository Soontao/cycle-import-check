import { testfile2AbsPath, testfile6AbsPath, testfile3AbsPath } from "./test.base";
import { findFileDependencies } from "../src/processor";
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
        code: 'import "./d3/testfile3"',
        fromFile: testfile2AbsPath,
        importFile: testfile3AbsPath
      }
    ]
    expect(imports).toEqual(expected)
  })

  test('should view require files path', () => {
    const Proj5File1AbsPath = join(__dirname, "./testproject5/file1.js")
    const Proj5File2AbsPath = join(__dirname, "./testproject5/file2.js")
    const deps = findFileDependencies(Proj5File1AbsPath, readFileSync(Proj5File1AbsPath, { encoding: "utf8" }))
    expect(deps).toEqual([
      {
        fromFile: Proj5File1AbsPath,
        importFile: Proj5File2AbsPath,
        code: 'require("./file2.js")',
      }
    ])
  })

  test('should parse minified code correctly', () => {
    // this gave false positives in the old regex / non-babel processor implementation, because it contains a string that looks like export from but isn't
    const Proj6MinifiedAbsPath = join(__dirname, "./testproject6/util/base64.js")
    const deps = findFileDependencies(Proj6MinifiedAbsPath, readFileSync(Proj6MinifiedAbsPath, { encoding: "utf8" }))
    expect(deps).toHaveLength(0);
  });

  test('should support import() function', () => {
    const path = join(__dirname, "./testproject/d5/testfile7.mjs")
    const deps = findFileDependencies(path, readFileSync(path, { encoding: "utf8" }))
    expect(deps).toHaveLength(1)
  });

  test('should be able to parse a variety of different kinds of imports', () => {
    const Proj7File1AbsPath = join(__dirname, "./testproject7/file1.js")
    const Proj7File2AbsPath = join(__dirname, "./testproject7/file2.js")
    const deps = findFileDependencies(Proj7File1AbsPath, readFileSync(Proj7File1AbsPath, { encoding: "utf8" }))
    expect(deps).toEqual([
      {
        fromFile: Proj7File1AbsPath,
        importFile: Proj7File2AbsPath,
        code: 'require("file2")'
      },
      {
        fromFile: Proj7File1AbsPath,
        importFile: Proj7File2AbsPath,
        code: 'export * from "./file2"'
      },
      {
        fromFile: Proj7File1AbsPath,
        importFile: Proj7File2AbsPath,
        code: 'export {b} from "./file2"'
      },
      {
        fromFile: Proj7File1AbsPath,
        importFile: Proj7File2AbsPath,
        code: 'import c, {d} from "./file2";'
      },
      {
        fromFile: Proj7File1AbsPath,
        importFile: Proj7File2AbsPath,
        code: 'import {e} from "./file2"'
      },
      {
        fromFile: Proj7File1AbsPath,
        importFile: Proj7File2AbsPath,
        code: 'import * as H from "./file2"'
      },
      {
        fromFile: Proj7File1AbsPath,
        importFile: Proj7File2AbsPath,
        code: 'import j from "./file2"'
      }
    ]);
  });

})
