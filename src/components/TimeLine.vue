<template>
  <div @click="createTimelineBar($event)" @mousemove="drawTimelineBar($event)" class="todo-time__grid" ref="timeLineGridRef">
    <div class="time-grid" v-for="n in props.totalGrid" :style="{ height: props.height + 'px' }"></div>

    <template v-for="bar in timelineBar">
        <div class="todo-timeline__bar" :id="'bar_'+bar.id" :class="{'active': bar.created}" :style="{ top: bar.startPoint + 'px', height: bar.timeRange + 'px' }"></div>
      </template>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { inject, onMounted } from 'vue';
import { useMouse } from '@/composables/useMouse';

const props = defineProps({
  totalGrid: Number,
  height: Number,
  grid: Object
})

const util = inject('util');
const { x: absX, y: absY } = useMouse(); 
const timeLineGridRef = ref(null);

const timelineBar = ref([]);
const timelineData = ref({
  id: '',
  theDate : '',
  startTime: {hour: 0, minute: 0},
  endTime:  {hour: 0, minute: 0},
  startPoint: 0,
  endPoint: 0,
  timeRange: 0,
  title: '',
  content: '',
  complete: false,
  created: false
});

const createTimelineBar = ($event) => {
  const { startScrollY } = props.grid;

  if(!timelineData.value.created){
    timelineData.value.created = true;
    const cloneData = util.deepCopy(timelineData.value);
    timelineBar.value.push(cloneData);
  }

  const newIdx = timelineBar.value.length-1;
  timelineBar.value[newIdx].id = util.randomKey();
  timelineBar.value[newIdx].theDate = props.date;

  if(!timelineBar.value[newIdx].startPoint){
    timelineBar.value[newIdx].startPoint = $event.pageY - startScrollY;

    const { hour, minute} = getTimeFromPoint(timelineBar.value[newIdx].startPoint);
    timelineBar.value[newIdx].startTime.hour = hour;
    timelineBar.value[newIdx].startTime.minute = minute;

    messageGuide.value.message = '종료시간을 선택하세요';
  }else{
    timelineBar.value[newIdx].endPoint = $event.pageY - startScrollY;
    console.log('endPoint', timelineBar.value[newIdx].endPoint);
    
    const { hour, minute} = getTimeFromPoint(timelineBar.value[newIdx].endPoint);
    timelineBar.value[newIdx].endTime.hour = hour;
    timelineBar.value[newIdx].endTime.minute = minute;

    timelineData.value.created = false;
    messageGuide.value.message = '시작시간을 선택하세요';
  }    
};

const drawTimelineBar = ($event) => {
  if(!timelineData.value.created) return false;

  const newIdx = timelineBar.value.length-1;
  timelineBar.value[newIdx].timeRange = updatePositionY($event) - timelineBar.value[newIdx].startPoint;
}

const updatePositionY = (event) => {
  return event.pageY - props.grid.startScrollY
}

const getTimeFromPoint = (value) => {
  let timeHeight = calcToPx();
  let result = value / timeHeight;
  let hour = Math.floor(result);
  let minute = util.getOnlyDecimal(result, 2);

  hour = hour < 10 ? `0${hour}`: `${hour}`;
  minute = Math.floor(minute*timeHeight / parseFloat(props.grid.oneMinute));
  minute = minute < 10 ? `0${minute}`: `${minute}`;

  return {
    hour,
    minute
  }
}

onMounted(() => {
  props.grid.startScrollY = timeLineGridRef.value.getBoundingClientRect().top + window.scrollY;

  timeLineGridRef.value.addEventListener('mousemove', (event) => {
    messageGuide.value.hover = true;
    messageGuide.value.x = `${absX.value}px`;
    messageGuide.value.y = `${absY.value}px`;
  });
  timeLineGridRef.value.addEventListener('mouseout', (event) => {
    messageGuide.value.hover = false;
    messageGuide.value.y = '-9999px';
  });
});

</script>

<style lang="scss" scoped>
  .todo-time__grid {
    border-top: 1px dotted #000;
    cursor: pointer;

    .time-grid {
      width: 100%;
      border-bottom: 1px dotted #dfe5ba;

      &:nth-child(12n){
        border-bottom-color: #000;
      }
    }    
  }

  .todo-timeline__bar {
    display: none;
    position: absolute;
    left: 150px; 
    top: 100px;
    width: 50px;
    background: #7749F8;
    box-shadow: 0 0 1px rgba(0,0,0,.2), 0 2px 4px rgba(0,0,0,.1);
    border-radius: 5px;
    text-shadow: 1px 1px 1px rgba(0,0,0,.1);    
    
    &.active {
      display: block;
    }
  }
</style>