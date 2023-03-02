import { scanDirectoryWithResult } from "../src/scanner";
import { join } from "path";
import { testfile1AbsPath, testfile3AbsPath, testfile4AbsPath, testfile5AbsPath, testfile6AbsPath } from "./test.base";
import { mapScanResultToReportVO } from "../src/file";

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

  it('should support scan all projects', () => {
    for (const proj of ['', 2, 3, 4, 5, 6, 7, 8]) {
      const projName = `testproject${proj}`
      const r = mapScanResultToReportVO(scanDirectoryWithResult(join(__dirname, `./${projName}`)))
      expect(r).toMatchSnapshot(`report for project ${projName}`)
    }
  });

})
