<template>
  <div class="todo-time__write" :style="{ width: props.setWidth + 'px'}">
    <h1 class="text-h3">Guest님,</h1>
    <div class="txt-selected-time">
      <span class="time">{{ props.startHour }}</span><span class="txt">시</span> <span class="time">{{ props.startMinute }}</span><span class="txt">분 부터</span><br />
      <span class="time">{{ props.endHour }}</span><span class="txt">시</span> <span class="time">{{ props.endMinute }}</span><span class="txt">분 까지</span><br />
      <span class="txt">할 일을 다음과 같이 등록합니다.</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  setWidth: Number,
  startHour: String,
  startMinute: String,
  endHour: String,
  endMinute: String
});

const timeWriteRef = ref(null);
</script>

<style lang="scss" scoped>
.todo-time__write {
  position: fixed;
  top: 0;
  left: 320px;
  width: 470px;  
  height: 100%;
  padding: 50px 30px 30px;
  border: 1px solid #ddd;
  border-radius: 0 25px 25px 0;
  background-color: #fff;
  transition: transform .5s;

  &.active {
    transform: translate(100%, 0);
  }

  .text-h3 {
    margin-bottom: 1rem;
  }
  .txt-selected-time {
    font-size: 3rem;
    color: $color-primary;
    font-weight: 700;
    line-height: 1.2;

    > .txt {
      opacity: .5;
    }
  }
}
</style>