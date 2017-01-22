module.exports = {
  type: "value",
  property: "length",
  source: {
    type: "query",
    method: "filter",
    predicate: {
      type: "BinaryExpression",
      left: {
        type: "MemberExpression",
        object: {
          type: "Identifier",
          name: "todo"
        },
        property: {
          type: "Identifier",
          name: "assignee"
        }
      },
      operator: "===",
      right: {
        type: "Identifier",
        name: "who"
      }
    },
    source: {
      type: "query",
      db: "todosDb",
      collection: "todos"
    }
  }
}
