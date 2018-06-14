import { listAllFile, resolveFilePath } from "../src/file";
import 'jest'
import { fileList, testfile2AbsPath, testfile5AbsPath } from "./test.base";

describe('file list & resolve tests', () => {

  test('should list all files', () => {
    const files = listAllFile("tests/testproject", ["js", "ts"])
    expect(files).toEqual(fileList)
  })

  test('should resolve path', () => {
    const path = resolveFilePath(testfile5AbsPath, "d2/testfile2.js")
    expect(path).toEqual(testfile2AbsPath)
  })

})
