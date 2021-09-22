import { resolveFilePath } from "./file";
import { FileImportDescription } from "./type";
import {parse} from "@babel/parser";
import traverse from "@babel/traverse";

/**
 * findFileDependencies
 *
 * @param fileAbsolutePath
 * @param fileCodeString
 */
export const findFileDependencies = (fileAbsolutePath: string, fileCodeString: string) => {
  const result: FileImportDescription[] = []
  try {
    const ast = parse(fileCodeString, {
      sourceType: "unambiguous",
      plugins: [
        "typescript",
        "jsx"
      ]
    })
    traverse(ast, {
      ImportDeclaration: (p) => {
        const {node} = p;
        if (node.source) {
          const sourceFile = resolveFilePath(fileAbsolutePath, node.source.value)
          if (sourceFile) {
            result.push({
              fromFile: fileAbsolutePath,
              importFile: sourceFile,
              code: fileCodeString.slice(node.start, node.end)
            })
          }
        }
      },
      ExportNamedDeclaration: (p) => {
        const {node} = p;
        if (node.source) {
          const sourceFile = resolveFilePath(fileAbsolutePath, node.source.value)
          if (sourceFile) {
            result.push({
              fromFile: fileAbsolutePath,
              importFile: sourceFile,
              code: fileCodeString.slice(node.start, node.end)
            })
          }
        }
      },
      ExportAllDeclaration: (p) => {
        const {node} = p;
        if (node.source) {
          const sourceFile = resolveFilePath(fileAbsolutePath, node.source.value)
          if (sourceFile) {
            result.push({
              fromFile: fileAbsolutePath,
              importFile: sourceFile,
              code: fileCodeString.slice(node.start, node.end)
            })
          }
        }
      },
      CallExpression: (p) => {
        const {node} = p;
        if (node.callee.type === "Identifier" && node.callee.name === "require") {
          if (node.arguments.length >= 1 && node.arguments[0].type === "StringLiteral") {
            const sourceFile = resolveFilePath(fileAbsolutePath, node.arguments[0].value)
            if (sourceFile) {
              result.push({
                fromFile: fileAbsolutePath,
                importFile: sourceFile,
                code: fileCodeString.slice(node.start, node.end)
              })
            }
          }
        }
      }
    });
  } catch (error) {
    console.log("Error while parsing", fileAbsolutePath);
    throw error;
  }

  return result;
}
