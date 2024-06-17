<template>
  <v-col cols="5">
    <div class="todo-current__date">
      <v-row no-gutters align-sm="center" justify-sm="center">
        <v-col cols="9">
          <v-row no-gutters="">
            <v-btn class="todo-btn__left" height="39" variant="plain">
              <v-icon icon="arrow_circle_left"></v-icon>
            </v-btn>
            <h2 class="text-h4">{{ dateString }}</h2>
            <v-btn class="todo-btn__right" variant="plain">
              <v-icon icon="arrow_circle_right"></v-icon>
            </v-btn>
          </v-row>
        </v-col>  
        <v-col cols="3">
          <v-select
            v-model="selectedView"
            :items="selectItems" 
            item-title="view"
            item-value="unit"
            density="compact"
            variant="outlined"
            class="mt-5"
            label="보기옵션">     
          </v-select>
        </v-col>
      </v-row>
    </div>
    <ToDoTimeSheet class="mt-5" :unit="selectedView" :date="dateString"></ToDoTimeSheet>
  </v-col>  
</template>

<script setup>
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

</script>

<style lang="scss" scoped>
  .todo-current__date {
    position:sticky;
    left: 0;
    top: 0;
    z-index: 10;
    padding: 30px 25px;
    background-color: #fff;

    h2 {
      font-weight: 700;
      color: $color-primary;
      line-height: 36px;
    }
  }

  .todo-btn__left, .todo-btn__right {
    .v-icon {
      font-size: 32px;
    }
  }
  .main-content {
    margin-left: 320px;
  }
</style>