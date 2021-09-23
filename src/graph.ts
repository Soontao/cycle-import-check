import { Graph, alg } from "graphlib";
import { forEach } from "@newdash/newdash";
import { FileImportDescription } from "./type";

/**
 * calculate cycle import file
 *
 * @param fileAbsPathList files absolutely path
 * @param imports each file's import
 */
export const calculateCycleImport = (fileAbsPathList: string[], imports: FileImportDescription[]) => {
  const new_graph = new Graph({ directed: true })
  new_graph.setNodes(fileAbsPathList)
  forEach(imports, i => new_graph.setEdge(i.fromFile, i.importFile))
  return alg.findCycles(new_graph)
}

