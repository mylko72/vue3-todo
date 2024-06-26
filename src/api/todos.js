const todos = []

const todoStatus = {
  loading: false,
  success: false,
};

export function setStatus(item, value){
  todoStatus[item] = value;
}

export function isLoading(){
  return todoStatus.loading;
}

export function getTodos() {
	return todos;
}

export function createTodo(data) {
	todos.push(data);
  console.log('todos', getTodos());
}