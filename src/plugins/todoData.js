import { ref } from "vue";

export default {
	install(app, options) {
    const $todoData = ref({
      id: '',
      theDate : '',
      startTime: {hour: 0, minute: 0},
      endTime:  {hour: 0, minute: 0},
      startPoint: 0,
      endPoint: 0,
      timeRange: 0,
      todo: '',
      memo: '',
      complete: false,
      created: false    
    });

    app.provide('todoData', $todoData);
  }
}