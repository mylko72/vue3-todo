const todos = []

export function getTodos() {
	return todos;
}

export function createTodo(data) {
	todos.push(data);
  console.log('todos', getTodos());
}