import "jest"
import { scanDirectoryWithResult } from "../src/scanner";
import { join } from "path";

describe('scanner related test', () => {

  test('should not scan cycle import', () => {
    const result = scanDirectoryWithResult(join(__dirname, "./testproject2"))
    expect(result.haveCycle).toEqual(false)
  })


})
