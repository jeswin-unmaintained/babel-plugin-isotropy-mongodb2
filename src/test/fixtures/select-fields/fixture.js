async function getTodos(who) {
  return db.todos
    .filter(todo => todo.assignee === who)
    .map(todo => ({ mainAssignee: todo.assignee }));
}
