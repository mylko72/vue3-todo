const todos = []

export function getTodos() {
	return todos;
}

export function getTodoById(id) {
  return todos[id];
}

export function createTodo(data) {
	todos.push(data);
  console.log('todos', getTodos());
}