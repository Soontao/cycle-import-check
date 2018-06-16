

export type Extension = "js" | "ts" | "tsx" | "jsx" | "mjs"

export interface FileImportDescription {
  fromFile: string;
  importFile: string;
}