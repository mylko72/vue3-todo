<template>
  <div class="todo-time__sheet" ref="timeSheetRef">
    <div class="todo-time__grid">
      <div class="time-grid" v-for="n in getTotalGrid" ref="timeGridRef"></div>
    </div>
    <div class="todo-time__list">
      <ul>
        <li v-for="i in day" :key="i" ref="timeListRef" :style="{ height: calcHeight + 'px' }">
          <span class='time'>{{ setTimeList(i) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';

const day = 24;
const minute = 2;
const timeLineGrid = ref({
  currentTime: null,
  currentScollY: 0,
  gridGap: '10px',
  fiveMinute: 0
})

const calcHeight = computed(() => {
  return calcToPx(timeLineGrid.value.gridGap);
});

const getTotalGrid = computed(() => {
  timeLineGrid.value.fiveMinute = parseFloat(timeLineGrid.value.gridGap) / minute;
  return day * (60/timeLineGrid.value.fiveMinute);
});

const setTimeList = (i) => {
    const idx = i - 1;
    return `${(idx < 10 ? "0": "") + idx}:00`;
};

//현재 시간 가져오기
const getCurrentTime = (fetchHour) => {
  let now = new Date();			//현재 시간을 가져오기 위한 Date 오브젝트 생성;

  timeLineGrid.value.currentTime = fetchHour ?? now.getHours();   // 서버에 저장된 시간(fetchHour)이 없다면 현재 시간을 timeLineGrid.value.currentTime에 저장       
  timeLineGrid.value.currentScollY = timeLineGrid.value.currentTime * calcToPx(timeLineGrid.value.gridGap);		// 현재 시간을 px(calcToPx 함수가 반환한 값)로 연산(곱)하여 현재 px값를 구한다.  

  setTimeout(() => {
    window.scrollTo(0, timeLineGrid.value.currentScollY);
  }, 500);
}

// 60분을 px 단위로 변환
const calcToPx = (gridGap) => {
  // timeLineGrid.value.fiveMinute = parseFloat(gridGap) / minute;
  return parseFloat(gridGap) * 60 / timeLineGrid.value.fiveMinute;
}

onMounted(() => {
  getCurrentTime();
})

</script>

<style lang="scss" scoped>
  .todo-time__sheet {
    position: relative;
    height: 100%;
    padding: 0 25px 50px 80px;

    .todo-time__list {
      position: absolute;
      left: 30px;
      top: -10px;

      li {
        font-size: 16px;
        color: #666;
      }
    }

    .time-grid {
      width: 100%;
      height: 10px;
      border-top: 1px dotted #dfe5ba;
    }    
  }
</style>