import template from "babel-template";
import * as t from "babel-types";
import generate from "babel-generator";
import util from "util";
import * as expressions from "./parser-expressions";
import * as queryable from "./queryable";

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


/*
  Any expression on which you can chain more methods.

  //db.todos.filter()
  //db.todos.filter().filter()
  //db.todos.map().filter()
  //db.todos.map().slice()
  //db.todos.sort()
*/

export function parseQueryables(path, then) {
  return expressions.any(
    [
      () => parseCollection(path),
      () => parseFilter(path),
      () => parseMap(path),
      () => parseSlice(path),
      () => parseSort(path)
    ],
    then
  );
}


/*
  db.todos.filter().length
  or generally, a property accessor you attach at the end of a queryable chain.
  No more chanining is possible.
*/

export function parsePostQueryables(path, then) {
  return expressions.any(
    [
      () => parseLength(path)
    ],
    then
  )
}


/*
  db.todos.filter(...)
*/

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


/*
  db.todos.map(...)
*/

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


/*
  db.todos.filter(...).slice(...)
*/

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


/*
  db.todos.filter(...).sort(...)
*/

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


/*
  db.todos.filter(...).length
*/

function parseLength(path) {
  return path.isMemberExpression() && path.get("property").isIdentifier() && path.node.property.name === "length" ?
    parseQueryables(path.get("object"), query => queryable.length(query)) :
    undefined;
}
