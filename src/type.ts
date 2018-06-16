
/**
 * allowed file extensions
 */
export type Extension = "js" | "ts" | "tsx" | "jsx" | "mjs"

export type Cycle = string[];

export interface FileImportDescription {
  /**
   * the file import other file
   */
  fromFile: string;
  /**
   * the file are imported
   */
  importFile: string;
  /**
   * import statement
   */
  code?: string;
}

export interface ScanResult {
  /**
   * wether these files have cycle dependency
   */
  haveCycle: boolean;
  cyclies?: Cycle[];
  nodes?: string[];
  imports?: FileImportDescription[];
}

export interface ReportVO {
  nodes: {
    name: string
  }[];
  links: {
    source: string;
    target: string;
    value?: string;
  }[]
}