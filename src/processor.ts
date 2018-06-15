import { reduce, concat, map } from "lodash";
import { resolveFilePath } from "./file";
import { FileImportDescription } from "./type";

/**
 * findFileDependencies
 * 
 * @param fileAbsolutePath 
 * @param fileCodeString 
 */
export const findFileDependencies = (fileAbsolutePath: string, fileCodeString: string) => {
  return concat(
    findImportDependencies(fileAbsolutePath, fileCodeString),
    findExportDependencies(fileAbsolutePath, fileCodeString)
  )
}

export const findImportDependencies = (fileAbsolutePath: string, fileCodeString: string) => {
  var result: FileImportDescription[] = []
  const lines = fileCodeString.match(/import.*?["|'](.*?)["|']/g)
  if (lines) {
    const imports = map(lines, line => /import.*?["|'](.*?)["|']/g.exec(line)[1])
    const importsAbsPath: FileImportDescription[] = reduce(imports, (pre, i) => {
      const importFile = resolveFilePath(fileAbsolutePath, i)
      // ignore node_module import
      if (importFile) {
        return concat(pre, {
          fromFile: fileAbsolutePath,
          importFile
        })
      } else {
        return pre;
      }

    }, [])
    result = concat(result, importsAbsPath)
  }
  return result;
}

export const findExportDependencies = (fileAbsolutePath: string, fileCodeString: string) => {
  var result: FileImportDescription[] = []
  const lines = fileCodeString.match(/[export].*?from.*?["|'](.*?)["|']/g)
  if (lines) {
    const imports = map(lines, line => /[export].*?from.*?["|'](.*?)["|']/g.exec(line)[1])
    const importsAbsPath: FileImportDescription[] = reduce(imports, (pre, i) => {
      const importFile = resolveFilePath(fileAbsolutePath, i)
      // ignore node_module import
      if (importFile) {
        return concat(pre, {
          fromFile: fileAbsolutePath,
          importFile
        })
      } else {
        return pre;
      }

    }, [])
    result = concat(result, importsAbsPath)
  }
  return result;
}
