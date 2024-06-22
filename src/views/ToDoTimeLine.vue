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
    :setWidth="timeLineWidth"
    v-bind="todo">
  </TimeLineWrite>
  <!-- <TimeLineWrite
    :setWidth="timeLineWidth"
    :startHour="todo.startTime.hour"
    :startMinute="todo.startTime.minute"
    :endHour="todo.endTime.hour"
    :endMinute="todo.endTime.minute"
    :created="todo.created"
  >
  </TimeLineWrite> -->
</template>

<script setup>
import { ref, inject } from 'vue';
import TimeLineDate from '@/components/TimeLineDate.vue';
import TimeLineWrite from '@/components/TimeLineWrite.vue';
import ToDoTimeSheet from '@/views/ToDoTimeSheet.vue';
import { useClock } from '@/composables/useClock';

const todo = inject('todo');
const { dateString } = useClock();
const selectedView = ref('2px');
const timeLineWidth = ref(0);
const changeView = (view) => {
  selectedView.value = view;
}
const getTimeWidth = (width) => {
  timeLineWidth.value = width;
}
</script>

<style lang="scss" scoped>

</style>