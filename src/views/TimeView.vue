<template>
  <div class="todo-time__area">
    <v-img :width="48" :height="48" src="/assets/images/ico-time.png"></v-img>
    <span class="txt-date mt-3">{{ dateString }}</span>
    <span class="txt-time">{{ timeString }} <sup>{{ ampm }}</sup></span>
  </div>
</template>

<script setup>
import { useClock } from '@/composables/useClock';

const { dateString, timeString, ampm } = useClock();

</script>

<style lang="scss" scoped>
  .todo-time__area {
    display: flex;
    flex-direction: column;
    align-items: center;

    .txt-date {
      font-size: 1.5rem;
    }
    .txt-time {
      position: relative;
      min-width: 210px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: -0.5rem;
      padding-right: 25px;
      font-size: 3.5rem;

      sup {
        position: absolute;
        right: 0;
        top: 1.5rem;
        font-size: 1rem;
      }
    }
  }

</style>