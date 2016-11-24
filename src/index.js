/* @flow */
import dbReads from "./db-reads";
import dbWrites from "./db-writes";

function parse(path, parsers) {
  for (const parser of parsers) {
    const result = parser(path);
    if (result) {
      return path.replaceWith(result.path);
    }
  }
  path.skip();
}


export default function () {
  return {

    //Writes will be an ExpressionStatement.
    //  eg (delete): db.todos = db.todos.filter(todo => todo !== db.todos.find(todo => todo.assignee == assignee && todo.title === title))

    //Reads can be assignments as well
    //  eg: foo.bar = db.todos.filter(...)

    ExpressionStatement(path) {
      parse(path, [
        dbWrites.parseExpressionStatement,
        dbReads.parseExpressionStatement
      ]);
    },

    //We support only reads here.
    // eg: const x = db.todos.filter(...)

    //As of now, we dont allow writes in VariableDeclaration
    //  const x = db.todos.concat(...)
    //  db.todos = x;
    //  Maybe v2.

    VariableDeclaration(path) {
      parse(path, [dbReads.parseVariableDeclaration]);
    },

    //These will always be reads
    //  eg: return db.todos.filter(...)

    ReturnStatement(path) {
      parse(path, [dbReads.parseReturnStatement]);
    },

    //These will always be reads.
    //CallExpressions under db writes would have been handled in ExpressionStatement

    CallExpression(path) {
      parse(path, [dbReads.parseCallExpression]);
    }

  }
}
