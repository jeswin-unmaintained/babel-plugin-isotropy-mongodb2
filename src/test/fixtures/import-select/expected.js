import mongodb from "isotropy-mongodb-server";

const todosDb = mongodb("todosDb", {
  todos: [],
});

async function countTodos(who) {
  return await todosDb.collection("todos").filter(todo => todo.assignee === who).length;
}
