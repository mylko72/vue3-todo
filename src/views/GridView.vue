<template>
  <div class="todo-time__sheet" ref="timeSheet">
    <div class="todo-time__grid" ref="timeLine">
      <div class="time-grid" ref="timeGrid"></div>
    </div>
    <div class="todo-time__list">
      <ul>
        <li ref="timeList" :style="{ height: calcHeight + 'px' }"></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';

const day = 24;
const minute = 2;
const hour = ref(null);
const currentY = ref(null);
const grid = ref('10px');
const fiveMinute = parseFloat(grid.value) / minute
const timeLine = ref(null);
const timeSheet = ref(null);
const timeList = ref(null);
const timeGrid = ref(null);

const calcHeight = computed(() => {
  return calcToPx(grid.value);
})

//현재 시간을 기준으로 타임라인(24시간) 생성
const createTimelist = (fetchHour) => {
  let now = new Date(),				//현재 시간을 가져오기 위한 Date 오브젝트 생성;
      cnt = 0;						    // 24시간 생성을 위한 카운트변수

  hour.value = fetchHour ?? now.getHours();   // 서버에 저장된 시간(fetchHour)이 없다면 현재 시간을 hour.value에 저장       
  currentY.value = hour.value * calcToPx(grid.value);		// 현재 시간을 px(calcToPx 함수가 반환한 값)로 연산(곱)하여 현재 px값를 구한다.
  
  for (let i = 0; i < day+1; i++) {		//현재 시간을 기준으로 24시간 생성
    if(cnt >= day+1) return;
    i %= day;	                            //나머지연산자를 이용하여 23시 이후는 0시로 초기화
    cnt++;

    timeList.value.innerHTML = "<span class='time'>"+(i < 10 ? "0": "") + i + ":00</span>";
    const cloneList = timeList.value.cloneNode(true);
    timeList.value.before(cloneList);
  }
  // $('#timelist').children().eq(0).addClass('first');
}

//타임시트 생성
const createTimeSheet = () => {
  let len = getTotalUnit(timeSheet);

  for(let i=0; i < len; i++){
    const newGrid = timeGrid.value.cloneNode(true);
    timeGrid.value.after(newGrid);
  }
}

// 60분을 px 단위로 변환
const calcToPx = (value) => {
  return parseFloat(value) * 60 / fiveMinute;
}

const getTotalUnit = (targetRef) => {	//타임시트내의 Total Unit 개수
  return targetRef.value.scrollHeight / parseFloat(grid.value);
}

onMounted(() => {
  createTimelist();
  createTimeSheet();
})

</script>

<style lang="scss" scoped>
  .todo-time__sheet {
    position: relative;
    height: 100%;
    padding: 100px 25px 50px 80px;

    .todo-time__list {
      position: absolute;
      left: 30px;
      top: 90px;

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