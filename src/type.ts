
/**
 * package.json type
 */
export interface PackageJson {
  name: string;
  dependencies: { [depName: string]: string };
  devDependencies: { [devDepName: string]: string };
  peerDependencies: { [peerDepName: string]: string };
}
/**
 * allowed file extensions
 */
export type Extension = "js" | "ts" | "tsx" | "jsx" | "mjs"

/**
 * circular dependent files
 */
export type Cycle = string[];

/**
 * A description about one file 'imported' another module file
 */
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

/**
 * tool's scna result
 */
export interface ScanResult {
  /**
   * wether these files have cycle dependency
   */
  haveCycle: boolean;
  cyclies?: Cycle[];
  nodes?: string[];
  imports?: FileImportDescription[];
}

/**
 * report view object, for report view
 */
export interface ReportVO {
  /**
   * scnaed files
   */
  nodes: {
    name: string
  }[];
  /**
   * files' deps
   */
  links: {
    source: string;
    target: string;
    value?: string;
  }[]
}