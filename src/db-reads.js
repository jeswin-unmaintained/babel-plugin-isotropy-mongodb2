import template from "babel-template";
import * as t from "babel-types";
import generate from "babel-generator";
import util from "util";
import expressions from "./parser-expressions";
import queryable from "./queryable";

/*
  The read visitor handles operations where we don't mutate the db collection.
  eg:
    selects, count, map etc.
*/

function parseCollection(path) {
  //db.todos...
  return path.isMemberExpression() && path.get("object").isIdentifier() && path.node.object.name === "db" ?
    queryable.create(path.node.property.name) :
    undefined;
}


function parseQueryables(path, then) {
  return expressions.any(
    [
      //db.todos.filter()
      () => parseCollection(path),
      //db.todos.filter().filter()
      () => parseFilter(path),
      //db.todos.map().filter()
      () => parseMap(path),
      //db.todos.map().slice()
      () => parseSlice(path),
      //db.todos.sort()
      () => parseSort(path)
    ],
    then
  );
}


function parseFilter(path) {
  return path.isCallExpression() && path.node.property.name === "filter" ?
    expressions.all(
      [
        () => parseQueryables(path.get("callee")),
        () => parseFilterParams(path.get("arguments"))
      ],
      ([query, predicate]) => queryable.filter(query, predicate)
    ) :
    undefined;
}


function parseFilterParams() {

}


function parseMap(path) {
  return path.isCallExpression() && path.node.property.name === "map" ?
    expressions.all(
      [
        () => parseQueryables(path.get("callee")),
        () => parseMapParams(path.get("arguments"))
      ],
      ([query, mapping]) => queryable.map(query, mapping)
    ) :
    undefined;
}


function parseMapParams() {

}


function parseLength(path) {
  return path.isMemberExpression() && path.get("property").isIdentifier() && path.node.property.name === "length" ?
    parseQueryables(path.get("object"), query => queryable.length(query)) :
    undefined;
}


function parseSlice(path) {
  return path.isCallExpression() && path.node.property.name === "slice" ?
    expressions.all(
      [
        () => parseQueryables(path.get("callee")),
        () => parseSliceParams(path.get("arguments"))
      ],
      ([query, slicing]) => queryable.slice(query, slicing)
    ) :
    undefined;
}

function parseSliceParams() {

}


function parseSort(path) {
  return path.isCallExpression() && path.node.property.name === "sort" ?
    expressions.all(
      [
        () => parseQueryables(path.get("callee")),
        () => parseSortParams(path.get("arguments"))
      ],
      ([query, sorting]) => queryable.sort(query, sorting)
    ) :
    undefined;
}


function parseSortParams(path) {

}


// const x = db.todos.filter(...)
function parseVariableDeclaration(path) {
  // return path.isVariableDeclaration() ?
  //   expressions.any
}
