Isotropy MongoDb Transpiler
===========================

A variable identifier called "db" is used to identify database operations.
All of this is configurable; technically proficient users should see the "Advanced" section.

Perform a database insert
```javascript
//Insert a single item
async function addTodo(title, assignee) {
  db.todos = db.todos.concat({ title, assignee });
}

//Insert a list of new items
async function addManyTodos(title, assignee) {
  const todosList = [
    { title: "get milk", assignee: "you", priority: 1 },
    { title: "buy eggs", assignee: "you", priority: 2 }
  ];
  db.todos = db.todos.concat(todosList)
}
```

Get all records
```javascript
async function getAllTodos(who) {
  return db.todos;
}
```

Query a table
```javascript
async function getTodos(who) {
  return db.todos.filter(todo => todo.assignee === who);
}
```

Query and return specific fields
```javascript
async function getTodos(who) {
  return db.todos
    .filter(todo => todo.assignee === who)
    .map(todo => ({ assignee: todo.assignee }));
}
```

Limit the number of results
```javascript
//Returns rows 10-20
async function getTodos(who) {
  return db.todos
    .filter(todo => todo.assignee === who)
    .slice(10, 20);
}
```

Order by a specific field
```javascript
async function getTodos(who) {
  return db.todos
    .filter(todo => todo.assignee === who)
    .sort((x, y) => x.assignee > y.assignee);
}
```

Update a record
```javascript
async function updateTodo(assignee, newAssignee) {
  db.todos = db.todos.map(todo => todo.assignee === assignee ? { ...todo, assignee: newAssignee } : todo);
}
```

Delete a record
```javascript
async function deleteTodo(title, assignee) {
  db.todos = db.todos.filter(todo => !(todo.assignee == assignee && todo.title === title));
}
```

Count the number of items
```javascript
async function countTodos(who) {
  return db.todos.filter(todo => todo.assignee === who).length;
}
```

Configuration in package.json

```json
{
  "isotropy": {
    "mongodb": {
      "databases": {
        "db": {
          "host": "localhost",
          "port": 19027,
          "password": "abcsfdef",
          "database": "todos-db"
        }
      }
    }
  }
}
```

Advanced
--------
You can specify multiple databases, and use identifiers other than "db".

```json
{
  "isotropy": {
    "mongodb": {
      "databases": {
        "todosDb": {
          "host": "localhost",
          "port": 19027,
          "password": "abcsfdef",
          "database": "todos-db"
        },
        "authDb": {
          "host": "localhost",
          "port": 19027,
          "password": "abcsfdef",
          "database": "auth-db"
        }
      }
    }
  }
}
```

Use it like this

```javascript
async function getTodos(who) {
  return todosDb.todos.filter(todo => todo.assignee === who);
  return authDb.users.filter(u => u.name === "jack");
}
```

An alternative if you don't want to use a global identifier (such as "db") is to use isotropy's import syntax for identifiers.
For proficient users, this is strongly recommended.

Note the "useImports" field below. If true, the transpiler will no longer honor global identifiers (such as "db").
Instead, you'll have to use the import syntax.

```json
{
  "isotropy": {
    "mongodb": {
      "useImports": true,
      "databases": {
        "todosDb": {
          "host": "localhost",
          "port": 19027,
          "password": "abcsfdef",
          "database": "todos-db"
        },
        "authDb": {
          "host": "localhost",
          "port": 19027,
          "password": "abcsfdef",
          "database": "auth-db"
        }
      }
    }
  }
}
```

You'll have to write code like this

```javascript
import db from "isotropy-db";
const todosDb = db("todosDb");
const authDb = db("authDb");

async function getTodos(who) {
  return todosDb.todos.filter(todo => todo.assignee === who);
  return authDb.users.filter(u => u.name === "jack");
}
```
