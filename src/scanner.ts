import { listAllFile, readFile, allDependencies, filterNodeDependenciesImport } from "./file";
import { map, reduce, concat } from "@newdash/newdash";
import { findFileDependencies } from "./processor";
import { calculateCycleImport } from "./graph";
import { ScanResult } from "./type";

/**
 * scan a directory circular dependency status
 *
 * @param directory please use the absolute path
 */
export const scanDirectoryWithResult = (directory: string): ScanResult => {
  const nodeDependencies = allDependencies(directory)
  const filePath = listAllFile(directory, ["js", "jsx", "ts", "tsx", "mjs"])
  const filesContents = map(filePath, filepath => ({ filepath, content: readFile(filepath) }))
  const filteredImports = reduce(
    filesContents,
    (pre, file) => concat(pre,
      filterNodeDependenciesImport(
        findFileDependencies(file.filepath, file.content),
        nodeDependencies
      )
    ),
    []
  )
  const result = calculateCycleImport(filePath, filteredImports)
  if (result && result.length > 0) {
    return {
      haveCycle: true,
      cycleList: result,
      nodes: filePath,
      imports: filteredImports,
    }
  } else {
    return {
      haveCycle: false,
      cycleList: [],
      nodes: filePath,
      imports: filteredImports,
    }
  }
}
