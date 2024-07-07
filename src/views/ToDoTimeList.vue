<template>
  <v-sheet>
    <h1 class="text-h4 text-center">오늘의 할일 목록</h1>

    <div v-if="todoLists.length">
      <v-timeline class="time-lists" align="start" side="end">
        <v-timeline-item
          v-for="todoList in todoLists"
          dot-color="pink"
          size="small"
          :key="todoList.id"
        >
          <div class="d-flex">
            <strong class="me-4">
              {{ todoList.startTime.hour }}:{{ todoList.startTime.hour }}~{{ todoList.endTime.hour }}:{{ todoList.endTime.hour }}
            </strong>
            <div>
              <strong>{{ todoList.todo }}</strong>
              <div class="text-caption">
                {{ todoList.memo }}
              </div>
            </div>
          </div>
        </v-timeline-item>

        <v-timeline-item
          dot-color="teal-lighten-3"
          size="small"
        >
          <div class="d-flex">
            <strong class="me-4">3-4pm</strong>
            <div>
              <strong>Design Stand Up</strong>
              <div class="text-caption mb-2">
                Hangouts
              </div>
            </div>
          </div>
        </v-timeline-item>

        <v-timeline-item
          dot-color="pink"
          size="small"
        >
          <div class="d-flex">
            <strong class="me-4">12pm</strong>
            <div>
              <strong>Lunch break</strong>
            </div>
          </div>
        </v-timeline-item>

        <v-timeline-item
          dot-color="teal-lighten-3"
          size="small"
        >
          <div class="d-flex">
            <strong class="me-4">9-11am</strong>
            <div>
              <strong>Finish Home Screen</strong>
              <div class="text-caption">
                Web App
              </div>
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </div>
    <div v-else>
      등록된 할일 목록이 없습니다.
    </div>
  </v-sheet>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { inject, onMounted } from 'vue';
import { getTodos } from '@/api/todos';

const props = defineProps({
  mode: String
})

const todoLists = computed(() => {
  if(props.mode === 'success'){
    return getTodos();
  }else{
    return [];
  }
});

</script>

<style lang="scss" scoped>
.todo-time__list {
  height: auto;
  position: sticky;
  left: 0;
  top: 0;
  padding: 45px 30px;
  border-left: 1px solid #ddd;

  .time-lists {
    margin-top: 30px
  }
}
</style>