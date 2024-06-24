<template>
  <TimeLineDate 
    @change-unit="changeView" 
    :date="dateString">
  </TimeLineDate>   

  <ToDoTimeSheet 
    @send-time-width="getTimeWidth"
    :unit="selectedView" 
    :date="dateString">
  </ToDoTimeSheet>

  <TimeLineWrite
    @reset-created="resetCreated"
    :setWidth="timeLineWidth"    
    v-bind="todoData">
  </TimeLineWrite>
</template>

<script setup>
import { ref, inject } from 'vue';
import TimeLineDate from '@/components/TimeLineDate.vue';
import TimeLineWrite from '@/components/TimeLineWrite.vue';
import ToDoTimeSheet from '@/views/ToDoTimeSheet.vue';
import { useClock } from '@/composables/useClock';

const todoData = inject('todoData');
const { dateString } = useClock();
const selectedView = ref('2px');
const timeLineWidth = ref(0);
const changeView = (view) => {
  selectedView.value = view;
}
const getTimeWidth = (width) => {
  timeLineWidth.value = width;
}
const resetCreated = () => {
  todoData.value.startTime.hour = 0;
  todoData.value.startTime.minute = 0;
  todoData.value.endTime.hour = 0;
  todoData.value.endTime.minute = 0;
  todoData.value.created = false;
}
</script>

<style lang="scss" scoped>

</style>