const operatorMapping = {
  "===": "$eq",
  "!==": "$ne",
  ">": "$gt",
  ">=": "$gte",
  "<": "$lt",
  "<=": "$lte",
}

function analyzeBinaryExpression(expr, path) {
  const mongoOp = operatorMapping[expr.operator];
  if (expr.type === "BinaryExpression") {

  } else if (expr.type === "CallExpression") {

  } else {
    throw new Error(`Unknown binary expression. ${expr.type} was not expected.`)
  }
}

function analyzeLogicalExpression(expr, result) {
  //if (expr.operator === "&&" && previousOperator === "&&") ?
}

export default function(expr) {

}
