import Immutable from "immutable";
import * as babylon from "babylon";

function buildCollection(source, config) {
  return config.identifiers ?
    `__mongodb("${source.identifier}").collection("${source.collection}")` :
    `${source.identifier}.collection("${source.collection}")`;
}

function buildCount(source, config) {
  return "count()";
}

function buildFilter() {
  return "find()";
}

function buildMap() {
  return "map()";
}

function buildSlice(source, config) {
  return `slice(${source.from}, ${source.to})`;
}

function buildSort(source, config) {
  const fields = source.fields.map(i => `${i.field}: ${i.ascending}`).join(", ")
  return `sort({${fields}})`;
}

function buildDbStatment(source, config, precedingDbStatement) {
  const builders = [
    [() => source.type === "query" && source.db, buildCollection],
    [() => source.type === "value" && source.property === "length", buildCount],
    [() => source.type === "query" && source.method === "filter", buildFilter],
    [() => source.type === "query" && source.method === "map", buildMap],
    [() => source.type === "query" && source.method === "slice", buildSlice],
    [() => source.type === "query" && source.method === "sort", buildSort],
  ];

  const result = Immutable.Seq(builders)
    .filter(([predicate]) => predicate())
    .map(([predicate, builder]) => builder(source, config))
    .find(i => i);

  if (!result) {
    throw new Error(`Unknown database statement ${JSON.stringify(source)}.`)
  }

  return precedingDbStatement ? `${precedingDbStatement}.${result}` : result;
}


export default function transformStatement(analysis, config) {
  return analysis.source ?
    buildDbStatment(analysis, config, transformStatement(analysis.source, config)) :
    buildDbStatment(analysis, config);
}
