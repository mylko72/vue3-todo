<template>
  <v-col cols="3" class="position-fixed top-0 bottom-0">
    <v-sheet class="d-flex flex-column align-center py-10" height="100%" color="info">
      <h1 class="text-h3">Time Capsule</h1>
      <p class="text-subtitle-1 text-weight-bold mt-2">할 일을 기록하다.</p>
      <v-divider vertical="" class="mx-auto mb-5"></v-divider>
      <div class="todo-time__area">
        <v-img :width="48" :height="48" src="/assets/images/ico-time.png"></v-img>
        <span class="time mt-3">05/28/2024</span>
        <span class="date">12:13:16</span>
      </div>
      <v-divider vertical="" class="mx-auto mb-5"></v-divider>
      <v-card width="200" height="80" rounded="10" density="" class="todo-list__bx">
        <v-list width="170" class="mx-auto">
          <v-list-item density="" title="할 일">
            <template #append>
              <span>00 건</span>
            </template>
          </v-list-item>
          <v-list-item density="" title="완 료">
            <template #append>
              <span>00 건</span>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
      <v-divider></v-divider>
      <v-container>
        <v-row class="my-20" justify="center">
          <v-col cols="4">
            <v-btn outlined>저장</v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn>취소</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-col>  
</template>

<script setup>

</script>

<style lang="scss" scoped>
  .text-h3 {
    font-weight: 700;
  }
  .todo-time__area {
    display: flex;
    flex-direction: column;
    align-items: center;

    .time {
      font-size: 1.5rem;
    }
    .date {
      font-size: 3.5rem;
    }
  }
  .todo-list__bx {
    flex: 0 0 80px;
  }
</style>