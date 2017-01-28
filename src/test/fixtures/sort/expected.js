import __mongodb from "isotropy-mongodb-server";
async function sortTodos(who) {
  return await __mongodb("db").collection("todos").sort({ assignee: true });
}
