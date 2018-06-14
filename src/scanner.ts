import { listAllFile, readFile } from "./file";
import { map, reduce, concat } from "lodash";
import { findFileDependencies } from "./processor";
import { calculateCycleImport } from "./graph";

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

export const scanDirectoryWithResult = (directory: string) => {
  const result = scanDirectory(directory);
  if (result && result.length > 0) {
    return {
      haveCycle: true,
      cyclies: result
    }
  } else {
    return {
      haveCycle: false,
      cyclies: []
    }
  }
}