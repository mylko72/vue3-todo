<template>
  <div>
    <v-row no-gutters cols="">
      <v-col cols="6">
        <ToDoTimeLine @send-result-todo="getResultTodo"></ToDoTimeLine>
      </v-col>  
      <v-col cols="6">
        <ToDoTimeList :mode="resultMode" class="todo-time__list"></ToDoTimeList>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import ToDoTimeLine from '@/views/ToDoTimeLine.vue'
import ToDoTimeList from '@/views/ToDoTimeList.vue';
import { ref } from 'vue';

const resultMode = ref('');

const getResultTodo = (value) => {
  resultMode.value = value;
}

</script>

<style lang="scss" scoped>
.main-content {
  width: 100%;
  margin-left: 320px;
  padding: 0;
}
</style>