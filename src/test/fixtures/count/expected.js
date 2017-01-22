import __mongodb from "isotropy-mongodb-server";

async function countTodos(who) {
  return await __mongodb("db").collection("todos").find({ assignee: who }).count();
}
