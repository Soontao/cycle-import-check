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
    findExportDependencies(fileAbsolutePath, fileCodeString),
    findRequireDependencies(fileAbsolutePath, fileCodeString),
  )
}

/**
 * for find require() function dependencies
 * 
 * @param fileAbsolutePath 
 * @param fileCodeString 
 */
export const findRequireDependencies = (fileAbsolutePath: string, fileCodeString: string) => {
  var result: FileImportDescription[] = [];
  const requireStatements = fileCodeString.match(/require\(['|"](.*?)['|"]\)/g);
  if (requireStatements) {
    const requires = reduce(requireStatements, (pre, line) => {
      const regResult = /require\(['|"](.*?)['|"]\)/.exec(line);
      const requireCode = regResult[0]
      const requireRelativePath = regResult[1];
      const requireFile = resolveFilePath(fileAbsolutePath, requireRelativePath);
      if (requireFile) {
        return concat(pre, {
          fromFile: fileAbsolutePath,
          importFile: requireFile,
          code: requireCode,
        })
      } else {
        return pre
      }
    }, [])
    result = concat(result, requires)
  }
  return result;
}

/**
 * for find import keyword denpendencies
 * 
 * @param fileAbsolutePath 
 * @param fileCodeString 
 */
export const findImportDependencies = (fileAbsolutePath: string, fileCodeString: string) => {
  var result: FileImportDescription[] = []
  const importLines = fileCodeString.match(/import.*?["|'](.*?)["|']/g)
  if (importLines) {
    const imports: FileImportDescription[] = reduce(importLines, (pre, line) => {
      const result = /import.*?["|'](.*?)["|']/.exec(line)
      const importStatementCode = result[0]
      const importRelativePath = result[1]
      const importFile = resolveFilePath(fileAbsolutePath, importRelativePath)
      // ignore node_module import
      if (importFile) {
        return concat(pre, {
          fromFile: fileAbsolutePath,
          importFile,
          code: importStatementCode,
        })
      } else {
        return pre;
      }
    }, [])
    result = concat(result, imports)
  }
  return result;
}

/**
 * for find export keyword dependencies
 * 
 * @param fileAbsolutePath 
 * @param fileCodeString 
 */
export const findExportDependencies = (fileAbsolutePath: string, fileCodeString: string) => {
  var result: FileImportDescription[] = []
  const lines = fileCodeString.match(/export.*?from.*?["|'](.*?)["|']/g)
  if (lines) {
    const exportsLines: FileImportDescription[] = reduce(lines, (pre, line) => {

      const result = /export.*?from.*?["|'](.*?)["|']/.exec(line)
      const exportStatementCode = result[0]
      const exportRelativePath = result[1]

      const importFile = resolveFilePath(fileAbsolutePath, exportRelativePath)
      // ignore node_module import
      if (importFile) {
        return concat(pre, {
          fromFile: fileAbsolutePath,
          importFile,
          code: exportStatementCode
        })
      } else {
        return pre;
      }
    }, [])
    result = concat(result, exportsLines)
  }
  return result;
}
