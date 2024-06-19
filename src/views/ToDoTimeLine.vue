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
const selectedView = ref('2px');
const changeView = (view) => {
  selectedView.value = view;
}
</script>

<style lang="scss" scoped>

</style>