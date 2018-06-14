import { map, concat } from "lodash";
import { resolveFilePath } from "./file";
import { FileImportDescription } from "./type";

/**
 * findFileDependencies
 * 
 * @param fileAbsolutePath 
 * @param fileCodeString 
 */
export const findFileDependencies = (fileAbsolutePath: string, fileCodeString: string) => {
  var result: FileImportDescription[] = []
  const lines = fileCodeString.match(/[import|export].*?["|'](.*?)["|']/g)
  if (lines) {
    const imports = map(lines, line => /[import|export].*?["|'](.*?)["|']/g.exec(line)[1])
    const importsAbsPath: FileImportDescription[] = map(imports, i => ({
      fromFile: fileAbsolutePath,
      importFile: resolveFilePath(fileAbsolutePath, i)
    }))
    result = concat(result, importsAbsPath)
  }
  return result;
}

