import __mongodb from "isotropy-mongodb-server";
async function getTodos(who) {
  return await __mongodb("db").collection("todos").find($or:[]);
}
