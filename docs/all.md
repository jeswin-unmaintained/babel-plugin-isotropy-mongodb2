Get all records
```javascript
async function getAllTodos(who) {
  return db.todos;
}
```

```json
{
  "type": "ReturnStatement",
  "argument": {
    "type": "MemberExpression",
    "object": {
      "type": "Identifier",
      "name": "db"
    },
    "property": {
      "type": "Identifier",
      "name": "todos"
    }
  }
}
```
