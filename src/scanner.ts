import { listAllFile, readFile, allDependencies, filterNodeDependenciesImport } from "./file";
import { map, reduce, concat } from "@newdash/newdash";
import { findFileDependencies } from "./processor";
import { calculateCycleImport } from "./graph";
import { ScanResult } from "./type";

/**
 * scan a directory circular dependecy status
 *
 * @param directory
 */
export const scanDirectoryWithResult = (directory: string): ScanResult => {
  const nodeDependencies = allDependencies(directory)
  const filepathes = listAllFile(directory, ["js", "jsx", "ts", "tsx", "mjs"])
  const filesContents = map(filepathes, filepath => ({ filepath, content: readFile(filepath) }))
  const filteredImports = reduce(
    filesContents,
    (pre, file) => concat(pre, filterNodeDependenciesImport(findFileDependencies(file.filepath, file.content), nodeDependencies)),
    []
  )
  const result = calculateCycleImport(filepathes, filteredImports)
  if (result && result.length > 0) {
    return {
      haveCycle: true,
      cyclies: result,
      nodes: filepathes,
      imports: filteredImports,
    }
  } else {
    return {
      haveCycle: false,
      cyclies: [],
      nodes: filepathes,
      imports: filteredImports,
    }
  }
}
