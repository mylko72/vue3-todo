<template>
  <div>
    <v-row no-gutters cols="">
      <v-col cols="4">
        <ToDoTimeLine></ToDoTimeLine>
      </v-col>  
      <v-col cols="4">
        <ToDoTimeListVue class="todo-time__list"></ToDoTimeListVue>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import ToDoTimeLine from '@/views/ToDoTimeLine.vue'
import ToDoTimeListVue from '@/views/ToDoTimeList.vue';

</script>

<style lang="scss" scoped>
.main-content {
  width: 100%;
  margin-left: 320px;
  padding: 0;
}
</style>