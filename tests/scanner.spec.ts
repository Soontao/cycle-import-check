import "jest"
import { scanDirectory } from "../src/scanner";
import { join } from "path";
import { testfile5AbsPath, testfile1AbsPath, testfile3AbsPath, testfile4AbsPath, testfile6AbsPath } from "./test.base";

describe('scanner related test', () => {

  test('should scan cycle import', () => {
    const result = scanDirectory(join(__dirname, "./testproject"))
    const expected_result = [
      [
        testfile5AbsPath,
        testfile1AbsPath
      ],
      [
        testfile3AbsPath,
        testfile4AbsPath,
        testfile6AbsPath
      ]
    ]
    expect(result).toEqual(expected_result)
  })

})
