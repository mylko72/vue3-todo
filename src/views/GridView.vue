<template>
  <div class="todo-time__sheet" ref="timeSheet">
    <div class="todo-time__grid" ref="timeLine">

    </div>
    <div class="todo-time__list" id="time-list">

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';

let now = null;
const day = 24;
const minute = 2;;
const baseTime = ref(null);
const grid = ref(10);
const fiveMinute = grid.value / minute
const timeLine = ref(null);
const timeSheet = ref(null);

const createTimelist = (data) => {
  let self = this,	
      d = new Date(),				//현재 시간을 가져오기 위한 Date 오브젝트 생성;
      n = 0;						// 24시간 생성을 위한 카운트변수
        
  now = (data && data.time) ? data.time : d.getHours();		//현재 시간을 가져오거나 서버에 저장된 시간을 가져와서 now변수에 저장
  baseTime.value = now * calcToPx();							// now*1hour(120px) 값을 타임시트의 기준(baseTime) pixel로 설정하여 baseTime 변수에 저장

  for (let i = now; i < (day+2); i++) {		//현재 시간을 기준으로 24시간 생성
    if(n >= (day+2)) break;
    i %= day;	//나머지연산자를 이용하여 23시 이후는 0시로 초기화
    n++;

    const list = document.createElement('li');
    list.innerHTML = "<a href='#'>"+(i < 10 ? "0": "") + i + ":00</a>";
    document.querySelector('#time-list').appendChild(list);
  }
  // $('#timelist').children().eq(0).addClass('first');
}

const createTimeSheet = (targetRef) => {
  let self = this,
      len = getTotalUnit(timeSheet),
      timeline = targetRef;

  console.log('timeLine', timeline.value);

  for(let i=0;i<len;i++){
    const divElem = document.createElement('div');
    divElem.className = 'unit';
    timeline.value.appendChild(divElem);
  }
}

const calcToPx = () => {
  return grid.value * 60/fiveMinute;
}

const getTotalUnit = (targetRef) => {	//타임시트내의 Total Unit 개수
  return targetRef.value.scrollHeight / grid.value;
}

onMounted(() => {
  createTimelist();
  createTimeSheet(timeLine);
})

</script>

<style lang="scss" scoped>
  .todo-time__sheet {
    height: 100%;
    padding: 30px 25px 30px 50px;
  }
  .unit {
    width: 100%;
    height: 10px;
    border-bottom: 1px dotted #dfe5ba;
  }
</style>