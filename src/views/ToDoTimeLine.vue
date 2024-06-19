<template>
  <TimeLineDate @change-unit="changeView" :date="dateString"></TimeLineDate>   
  <ToDoTimeSheet class="mt-5" :unit="selectedView" :date="dateString"></ToDoTimeSheet>
</template>

<script setup>
import TimeLineDate from '@/components/TimeLineDate.vue';
import ToDoTimeSheet from '@/views/ToDoTimeSheet.vue';
import { useClock } from '@/composables/useClock';
import { ref } from '@vue/reactivity';

const { dateString } = useClock();
const selectItems = ref([
  {view: '1x', unit: '2px'},
  {view: '2x', unit: '4px'},
  {view: '3x', unit: '6px'},
]);
const selectedView = ref(selectItems.value[0].unit);
const changeView = (view) => {
  selectedView.value = view;
}
</script>

<style lang="scss" scoped>

</style>