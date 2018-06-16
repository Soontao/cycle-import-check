import "jest"
import { generateReportHTML } from "../src/report";
import { mapScanResultToReportVO, writeFileToTmpDirAndOpenIt } from "../src/file";
import { scanDirectoryWithResult } from "../src/scanner";
import { join } from "path";
import { v4 } from "uuid";

describe('test report html', () => {

  test('should generate a html', () => {
    const html = generateReportHTML(mapScanResultToReportVO(scanDirectoryWithResult(join(__dirname, "./testproject2"))))
    expect(html)
  })

  // ignore this test for remote CI test
  
  // test('should write & open', () => {
  //   const html = generateReportHTML(mapScanResultToReportVO(scanDirectoryWithResult(join(__dirname, "./testproject2"))))
  //   writeFileToTmpDirAndOpenIt(`${v4()}.html`, html)
  // })


})
