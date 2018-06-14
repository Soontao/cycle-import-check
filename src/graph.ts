import { Graph, alg } from "graphlib";
import { forEach } from "lodash";
import { FileImportDescription } from "./type";

/**
 * caculate cycle import file
 * 
 * @param fileAbsPathes files absolutely path
 * @param imports each file's import
 */
export const calculateCycleImport = (fileAbsPathes: string[], imports: FileImportDescription[]) => {
  const new_graph = new Graph({ directed: true })
  new_graph.setNodes(fileAbsPathes)
  forEach(imports, i => new_graph.setEdge(i.fromFile, i.importFile))
  return alg.findCycles(new_graph)
}

