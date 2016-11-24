Delete a record
```javascript
async function deleteTodo(title, assignee) {
  db.todos = db.todos.filter(todo =>
    todo !== db.todos.find(todo => todo.assignee == assignee && todo.title === title)
  );
}
```

```json
{
  "type": "ExpressionStatement",
  "expression": {
    "type": "AssignmentExpression",
    "operator": "=",
    "left": {
      "type": "MemberExpression",
      "object": {
        "type": "Identifier",
        "name": "db"
      },
      "property": {
        "type": "Identifier",
        "name": "todos"
      }
    },
    "right": {
      "type": "CallExpression",
      "callee": {
        "type": "MemberExpression",
        "object": {
          "type": "MemberExpression",
          "object": {
            "type": "Identifier",
            "name": "db"
          },
          "property": {
            "type": "Identifier",
            "name": "todos"
          }
        },
        "property": {
          "type": "Identifier",
          "name": "filter"
        }
      },
      "arguments": {
        "0": {
          "type": "ArrowFunctionExpression",
          "id": {},
          "generator": false,
          "expression": true,
          "async": false,
          "params": {
            "0": {
              "type": "Identifier",
              "name": "todo"
            }
          },
          "body": {
            "type": "BinaryExpression",
            "left": {
              "type": "Identifier",
              "name": "todo"
            },
            "operator": "!==",
            "right": {
              "type": "CallExpression",
              "callee": {
                "type": "MemberExpression",
                "object": {
                  "type": "MemberExpression",
                  "object": {
                    "type": "Identifier",
                    "name": "db"
                  },
                  "property": {
                    "type": "Identifier",
                    "name": "todos"
                  }
                },
                "property": {
                  "type": "Identifier",
                  "name": "find"
                }
              },
              "arguments": {
                "0": {
                  "type": "ArrowFunctionExpression",
                  "id": {},
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": {
                    "0": {
                      "type": "Identifier",
                      "name": "todo"
                    }
                  },
                  "body": {
                    "type": "LogicalExpression",
                    "left": {
                      "type": "BinaryExpression",
                      "left": {
                        "type": "MemberExpression",
                        "object": {
                          "type": "Identifier",
                          "name": "todo"
                        },
                        "property": {
                          "type": "Identifier",
                          "name": "assignee"
                        }
                      },
                      "operator": "==",
                      "right": {
                        "type": "Identifier",
                        "name": "assignee"
                      }
                    },
                    "operator": "&&",
                    "right": {
                      "type": "BinaryExpression",
                      "left": {
                        "type": "MemberExpression",
                        "object": {
                          "type": "Identifier",
                          "name": "todo"
                        },
                        "property": {
                          "type": "Identifier",
                          "name": "title"
                        }
                      },
                      "operator": "===",
                      "right": {
                        "type": "Identifier",
                        "name": "title"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```
