<template>
  <TimeLineDate 
    @change-unit="changeView" 
    :date="dateString">
  </TimeLineDate>   

  <ToDoTimeSheet 
    @send-time-width="getTimeWidth"
    :success="isSuccess"
    :unit="selectedView" 
    :date="dateString">
  </ToDoTimeSheet>

  <TimeLineWrite
    @result-todo="resultTodo"
    @reset-todo="resetTodo"
    :setWidth="timeLineWidth"    
    v-bind="todoData">
  </TimeLineWrite>
</template>

<script setup>
import { ref, provide, inject } from 'vue';
import TimeLineDate from '@/components/TimeLineDate.vue';
import TimeLineWrite from '@/components/TimeLineWrite.vue';
import ToDoTimeSheet from '@/views/ToDoTimeSheet.vue';
import { useClock } from '@/composables/useClock';

const emits = defineEmits(['sendResultTodo']);
const todoData = inject('todoData');
const { dateString } = useClock();
const selectedView = ref('2px');
const timeLineWidth = ref(0);
const isSuccess = ref(false);
const messageKey = ref('');

provide('todoMode', messageKey);

const changeView = (view) => {
  selectedView.value = view;
}
const getTimeWidth = (width) => {
  timeLineWidth.value = width;
}
const resetTodo = () => {
  todoData.value = {
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
}
const resultTodo = (value) => {
  messageKey.value = value;
  emits('sendResultTodo', value);
}
</script>

<style lang="scss" scoped>

</style>