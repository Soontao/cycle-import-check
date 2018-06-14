import { listAllFile, resolveFilePath, absPathesToRelativePathes } from "../src/file";
import 'jest'
import { testfile2AbsPath, testfile5AbsPath, fileAbsList, fileRelativeList } from "./test.base";

describe('file list & resolve tests', () => {

  test('should list all files', () => {
    const files = listAllFile("tests/testproject", ["js", "ts"])
    expect(files).toEqual(fileAbsList)
  })

  test('should resolve path', () => {
    const path = resolveFilePath(testfile5AbsPath, "d2/testfile2.js")
    expect(path).toEqual(testfile2AbsPath)
  })

  test('should file relative convert', () => {
    const r = absPathesToRelativePathes(fileAbsList)
    expect(r).toEqual(fileRelativeList)
  })


})
