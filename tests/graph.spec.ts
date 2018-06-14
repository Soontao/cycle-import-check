import "jest"
import { calculateCycleImport } from "../src/graph";
import { fileAbsList, testfile1AbsPath, testfile2AbsPath, testfile3AbsPath, testfile4AbsPath, testImportDescriptions } from "./test.base";

describe('graph related test', () => {

  test('should have cycle in mock data', () => {
    const result = calculateCycleImport(fileAbsList, testImportDescriptions)
    expect(result).toEqual([
      [
        testfile3AbsPath,
        testfile2AbsPath,
        testfile1AbsPath
      ]
    ])
  })

})
