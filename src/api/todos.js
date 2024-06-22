const todos = [
  {
    id: '',
    theDate : '',
    startTime: {hour: 0, minute: 0},
    endTime:  {hour: 0, minute: 0},
    startPoint: 0,
    endPoint: 0,
    timeRange: 0,
    title: '',
    content: '',
    complete: false,
    created: false
  }
]

export function getTodos() {
	return todos;
}

export function createTodo(data) {
	todos.push(data);
  console.log('todos', getTodos());
}