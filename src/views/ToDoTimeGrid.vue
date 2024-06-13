<template>
  <div class="todo-time__sheet">
    <div class="todo-time__grid" ref="timeLineGridRef">
      <div @click="clickTimeline($event)" class="time-grid" v-for="n in getTotalGrid" :style="{ height: gridHeight + 'px' }"></div>
    </div>
    <div class="todo-time__list">
      <ul>
        <li v-for="i in day" :key="i" :style="{ height: timeHeight + 'px' }">
          <span class='time'>{{ setTimeList(i) }}</span>
        </li>
      </ul>
    </div>
    <template v-for="bar in timelineBar">
      <div class="todo-timeline__bar" :class="{'active': bar.created}" :style="{ top: bar.startPoint + 'px', height: bar.range + 'px' }"></div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, defineProps } from 'vue';
import { onMounted, onUnmounted } from 'vue';

let counter = 0;

const props = defineProps({
  unit: {
    type: String,
    default: '2px',
    required: true
  }
})

const timeLineGridRef = ref(null);

const day = 24;
// 그리드의 기본단위는 5분(minute)이며 1분은 2px이다.
const timeLineGrid = ref({
  oneMinute: '',
  fiveMinute: 0,
  currentTime: null,
  currentScollY: 0,
  startScrollY: 0
});

const timelineBar = ref([]);

const timelineData = ref({
  id: '',
  theDate : '',
  startTime: '',
  endTime: '',
  startPoint: 0,
  endPoint: 0,
  range: 0,
  title: '',
  content: '',
  complete: false,
  created: false
});

const clickTimeline = ($event) => {
  const { startScrollY } = timeLineGrid.value;

  if(!timelineData.value.created){
    counter++;
    timelineData.value.created = true;
    timelineData.value.id = `bar-${counter}`;
    const cloneData = {...timelineData.value};
    timelineBar.value.push(cloneData);
  }

  if(!timelineBar.value[timelineBar.value.length-1].startPoint){
    timelineBar.value[timelineBar.value.length-1].startPoint = $event.pageY - timeLineGrid.value.startScrollY;
  }else{
    timelineBar.value[timelineBar.value.length-1].endPoint = $event.pageY - timeLineGrid.value.startScrollY;
    timelineBar.value[timelineBar.value.length-1].range = timelineBar.value[timelineBar.value.length-1].endPoint - timelineBar.value[counter-1].startPoint;
    timelineData.value.created = false;
  }    
};

const timeHeight = computed(() => {
  return calcToPx();
});

const gridHeight = computed(() => {
  timeLineGrid.value.oneMinute = props.unit;
  return parseFloat(timeLineGrid.value.oneMinute) * 5;
});

const getTotalGrid = computed(() => {
  return day * (60/5);
});

const setTimeList = (i) => {
    const idx = i - 1;
    return `${(idx < 10 ? "0": "") + idx}:00`;
};

const initTimeline = () => {
  setCurrentTime();
  
  timeLineGrid.value.startScrollY = timeLineGridRef.value.getBoundingClientRect().top + window.scrollY;
};

//현재 시간 가져오기
const setCurrentTime = (fetchHour) => {
  let now = new Date();			//현재 시간을 가져오기 위한 Date 오브젝트 생성;

  timeLineGrid.value.currentTime = fetchHour ?? now.getHours();   // 서버에 저장된 시간(fetchHour)이 없다면 현재 시간을 timeLineGrid.value.currentTime에 저장       
  timeLineGrid.value.currentScollY = timeLineGrid.value.currentTime * calcToPx();		// 현재 시간을 px(calcToPx 함수가 반환한 값)로 연산(곱)하여 현재 px값를 구한다.  

  setTimeout(() => {
    window.scrollTo(0, timeLineGrid.value.currentScollY);
  }, 500);
}

// 60분을 px 단위로 변환
const calcToPx = () => {
  timeLineGrid.value.fiveMinute = gridHeight;   // 5분을 px로 연산
  return (60 / 5) * timeLineGrid.value.fiveMinute;
}

onMounted(() => {
  initTimeline();
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

    .todo-time__grid {
      border-top: 1px dotted #000;
      cursor: pointer;
      .time-grid {
        width: 100%;
        // height: 10px;
        border-bottom: 1px dotted #dfe5ba;
  
        &:nth-child(12n){
          border-bottom-color: #000;
        }
      }    
    }

    .todo-timeline__bar {
      display: none;
      position: absolute;
      left: 200px; 
      top: 100px;
      width: 50px;
      // height: 200px;
      background: #7749F8;
      box-shadow: 0 0 1px rgba(0,0,0,.2), 0 2px 4px rgba(0,0,0,.1);
      border-radius: 5px;
      text-shadow: 1px 1px 1px rgba(0,0,0,.1);    
      
      &.active {
        display: block;
      }
    }
  }
</style>