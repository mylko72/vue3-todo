<template>
  <TimeLineDate @change-unit="changeView" :date="dateString"></TimeLineDate>   
  <ToDoTimeSheet :unit="selectedView" :date="dateString"></ToDoTimeSheet>
  <TimeLineWrite 
      :startHour="todo.startTime.hour"
      :startMinute="todo.startTime.minute"
      :endHour="todo.endTime.hour"
      :endMinute="todo.endTime.minute">
  </TimeLineWrite>
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
const changeView = (view) => {
  selectedView.value = view;
}
</script>

<style lang="scss" scoped>

</style>