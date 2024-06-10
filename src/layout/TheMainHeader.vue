<template>
  <v-col cols="3" class="position-fixed top-0 bottom-0">
    <v-sheet class="d-flex flex-column align-center py-10" height="100%" color="info">
      <h1 class="text-h3">Time Capsule</h1>
      <p class="text-subtitle-1 text-weight-bold mt-2">할 일을 기록하다.</p>
      <v-divider vertical="" class="mx-auto mb-5"></v-divider>
      <ToDoCurrentTime></ToDoCurrentTime>
      <!-- <div class="todo-time__area">
        <v-img :width="48" :height="48" src="/assets/images/ico-time.png"></v-img>
        <span class="time mt-3">05/28/2024</span>
        <span class="date">12:13:16</span>
      </div> -->
      <v-divider vertical="" class="mx-auto mb-5"></v-divider>
      <v-card width="200" height="80" density rounded="10" class="todo-list__bx">
        <v-list width="170" class="mx-auto">
          <v-list-item density title="할 일">
            <template #append>
              <span>00 건</span>
            </template>
          </v-list-item>
          <v-list-item density title="완 료">
            <template #append>
              <span>00 건</span>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
      <v-divider></v-divider>
      <div class="todo-btn__area mt-10">
        <v-btn size="large" outlined color="indigo-darken-3">저장</v-btn>
        <v-btn size="large" color="grey-lighten-2">취소</v-btn>
      </div>
    </v-sheet>
  </v-col>  
</template>

<script setup>
import ToDoCurrentTime from '@/views/ToDoCurrentTime.vue'
</script>

<style lang="scss" scoped>
  .main-header {
    max-width: 320px;
  }

  .text-h3 {
    font-weight: 700;
  }
  .todo-list__bx {
    flex: 0 0 80px;
  }
  .todo-btn__area {
    display: inline-flex;
    justify-content: space-between;

    button {
      margin: 0 10px;
    }
  }
</style>