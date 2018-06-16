import { ReportVO } from "../type";
import { readFileSync } from "fs";
import { join } from "path";

export const generateReportHTML = (report: ReportVO) => {
  const tmpl: string = readFileSync(join(__dirname, "./index.template"), { encoding: "utf8" })
  const withData = tmpl.replace("{{data}}", JSON.stringify(report.nodes, null, 2))
  const withDataAndLink = withData.replace("{{links}}", JSON.stringify(report.links, null, 2))
  return withDataAndLink;
}