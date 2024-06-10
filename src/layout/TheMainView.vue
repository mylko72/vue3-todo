<template>
  <v-col cols="5">
    <div class="todo-current__date">
      <v-row no-gutters justify-sm="center">
        <h2 class="text-h4 mt-10">{{ dateString }}</h2>
      </v-row>
      <v-row justify-sm="end">
        <v-col cols="5">
          <v-select
            v-model="select"
            :items="selectItems" 
            item-title="view"
            item-value="unit"
            density="comfortable" 
            label="보기옵션">     
          </v-select>
        </v-col>
      </v-row>
    </div>
    <ToDoTimeGrid class="mt-5" :unit="select.unit"></ToDoTimeGrid>
  </v-col>  
</template>

<script setup>
import ToDoTimeGrid from '@/views/ToDoTimeGrid.vue';
import { useClock } from '@/composables/useClock';
import { ref } from '@vue/reactivity';

const { dateString } = useClock();

const selectItems = ref([
  {view: '1x', unit: '2px'},
  {view: '2x', unit: '4px'},
  {view: '3x', unit: '6px'},
]);
const select = ref(
  selectItems.value[0]
);
</script>

<style lang="scss" scoped>
  .todo-current__date {
    position:sticky;
    left: 0;
    top: 0;
    z-index: 10;
    padding: 0 25px;
    background-color: #fff;

    h2 {
      font-weight: 700;
      color: $color-primary;
    }
  }
  .main-content {
    margin-left: 320px;
  }
</style>