import { map, concat } from "lodash";
import { resolveFilePath } from "./file";

/**
 * 
 * @param fileAbsolutePath 
 * @param fileCodeString 
 */
export const findImportDependency = (fileAbsolutePath: string, fileCodeString: string) => {
  var result: string[] = []
  const lines = fileCodeString.match(/import.*?["|'](.*?)["|']/g)
  if (lines) {
    const imports = map(lines, line => /import.*?["|'](.*?)["|']/g.exec(line)[1])
    const importsAbsPath = map(imports, i => resolveFilePath(fileAbsolutePath, i))
    result = concat(result, importsAbsPath)
  }
  return result;
}

/**
 * 
 * @param fileAbsolutePath 
 * @param fileCodeString 
 */
export const findExportDependency = (fileAbsolutePath: string, fileCodeString: string) => {
  const result: string[] = []

  return result;
}

/**
 * 
 * @param fileAbsolutePath 
 * @param fileCodeString 
 */
export const findAllDependency = (fileAbsolutePath: string, fileCodeString: string) => {
  const result: string[] = []

  return result;
}
