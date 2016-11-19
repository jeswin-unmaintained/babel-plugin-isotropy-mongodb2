Update a record
```javascript
async function updateTodo(assignee, newAssignee) {
  const matchingItem = db.todos.find(todo => todo.assignee === assignee);
  db.todos = db.todos.map(todo => todo === matchingItem ? { assignee: newAssignee, ...todo } : todo);
}
```

```json
{
  "body": [{
    "0": {
      "type": "VariableDeclaration",
      "declarations": {
        "0": {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "matchingItem"
          },
          "init": {
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
                  "operator": "===",
                  "right": {
                    "type": "Identifier",
                    "name": "assignee"
                  }
                }
              }
            }
          }
        }
      },
      "kind": "const"
    },
    "1": {
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
              "name": "map"
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
                "type": "ConditionalExpression",
                "test": {
                  "type": "BinaryExpression",
                  "left": {
                    "type": "Identifier",
                    "name": "todo"
                  },
                  "operator": "===",
                  "right": {
                    "type": "Identifier",
                    "name": "matchingItem"
                  }
                },
                "consequent": {
                  "type": "ObjectExpression",
                  "properties": {
                    "0": {
                      "type": "ObjectProperty",
                      "method": false,
                      "key": {
                        "type": "Identifier",
                        "name": "assignee"
                      },
                      "value": {
                        "type": "Identifier",
                        "name": "newAssignee"
                      }
                    },
                    "1": {
                      "type": "SpreadProperty",
                      "argument": {
                        "type": "Identifier",
                        "name": "todo"
                      }
                    }
                  }
                },
                "alternate": {
                  "type": "Identifier",
                  "name": "todo"
                }
              }
            }
          }
        }
      }
    }
  }]
}
```
