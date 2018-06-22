import { listAllFile, readFile } from "./file";
import { map, reduce, concat } from "lodash";
import { findFileDependencies } from "./processor";
import { calculateCycleImport } from "./graph";
import { ScanResult } from "./type";

export const scanDirectory = (directory: string) => {
  const filepathes = listAllFile(directory, ["js", "jsx", "ts", "tsx", "mjs"])
  const filesContents = map(filepathes, filepath => ({ filepath, content: readFile(filepath) }))
  const fileImports = reduce(
    filesContents,
    (pre, file) => concat(pre, findFileDependencies(file.filepath, file.content)),
    []
  )
  return calculateCycleImport(filepathes, fileImports)
}

/**
 * scan a directory circular dependecy status
 * 
 * @param directory 
 */
export const scanDirectoryWithResult = (directory: string): ScanResult => {
  const filepathes = listAllFile(directory, ["js", "jsx", "ts", "tsx", "mjs"])
  const filesContents = map(filepathes, filepath => ({ filepath, content: readFile(filepath) }))
  const fileImports = reduce(
    filesContents,
    (pre, file) => concat(pre, findFileDependencies(file.filepath, file.content)),
    []
  )
  const result = calculateCycleImport(filepathes, fileImports)
  if (result && result.length > 0) {
    return {
      haveCycle: true,
      cyclies: result,
      nodes: filepathes,
      imports: fileImports,
    }
  } else {
    return {
      haveCycle: false,
      cyclies: [],
      nodes: filepathes,
      imports: fileImports,
    }
  }
}