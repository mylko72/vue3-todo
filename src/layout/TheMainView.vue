<template>
  <v-col cols="5">
    <div class="todo-current__date">
      <v-row no-gutters justify-sm="center">
        <h2 class="text-h4 py-10">{{ dateString }}</h2>
      </v-row>
    </div>
    <ToDoTimeGrid class="mt-5"></ToDoTimeGrid>
  </v-col>  
</template>

<script setup>
import ToDoTimeGrid from '@/views/ToDoTimeGrid.vue';
import { useClock } from '@/composables/useClock';

const { dateString } = useClock();
</script>

<style lang="scss" scoped>
  .todo-current__date {
    position:sticky;
    left: 0;
    top: 0;
    z-index: 10;
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