import { scanDirectoryWithResult } from "../src/scanner";
import { join } from "path";
import { testfile1AbsPath, testfile3AbsPath, testfile4AbsPath, testfile5AbsPath, testfile6AbsPath } from "./test.base";

describe('scanner related test', () => {

  test('should not scan cycle import', () => {
    const result = scanDirectoryWithResult(join(__dirname, "./testproject2"))
    expect(result.haveCycle).toEqual(false)
  })

  test('should scan cycles in result', () => {
    const result = scanDirectoryWithResult(join(__dirname, "./testproject"))
    expect(result.haveCycle).toEqual(true)
    expect(result.cycleList?.[0]).toStrictEqual([
      testfile5AbsPath,
      testfile1AbsPath,
    ])
    expect(result.cycleList?.[1]).toStrictEqual([
      testfile3AbsPath,
      testfile4AbsPath,
      testfile6AbsPath,
    ])
  })

})
