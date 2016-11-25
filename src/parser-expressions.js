/*
  Returns an array of results of all conditions are met.
*/

export function all(expressions, then) {
  let results;

  for (const expr of expressions) {
    const result = expr();
    if (typeof result !== "undefined") {
      results.push(result);
    } else {
      return then ? then() : undefined;
    }
  }

  return then ? then(results) : results;
}


/*
  Returns the first expression that returns a value
*/

export function any(expressions, then) {
  for (const expr of expressions) {
    const result = expr();
    if (typeof result !== "undefined") {
      return then ? then(result) : result;
    }
  }

  return then ? then() : undefined;
}
