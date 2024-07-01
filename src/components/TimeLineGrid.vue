<template>
  <div @click="createTimelineBar($event)" @mousemove="drawTimelineBar($event)" class="todo-time__grid" ref="timeLineGridRef">
    <div class="time-grid" v-for="n in getTotalGrid" :style="{ height: gridHeight + 'px' }"></div>

    <template v-for="bar in timelineBar">
      <TimeLineBar 
        :id="bar.id" 
        :active="bar.created" 
        :top="bar.startPoint" 
        :height="bar.timeRange">
        <template #bar>
          <span class="bar"></span>
        </template>
        <template #card>
          <v-card
            :loading="bar.status === 'pending'"
            class="card-view"
            max-width="544"
            hover
          >
            <v-card-item v-if="bar.status === 'success'">
              <v-card-title>
                {{ bar.todo }}
              </v-card-title>
              <v-card-subtitle>
                {{ bar.startTime.hour }}:{{ bar.startTime.hour }}
                ~ 
                {{ bar.endTime.hour }}:{{ bar.endTime.hour }}
              </v-card-subtitle>
            </v-card-item>

            <v-card-item class="in-progress" v-else-if="bar.status === 'pending'">
              <v-card-title>
                등록중...
              </v-card-title>
            </v-card-item>

            <v-card-text v-if="bar.status === 'success'">
              {{ bar.memo }}
            </v-card-text>
          </v-card>
        </template>
      </TimeLineBar>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect, watch } from 'vue';
import { inject, onMounted } from 'vue';
import { getTodoById } from '@/api/todos'
import { useMouse } from '@/composables/useMouse';
import TimeLineBar from '@/components/TimeLineBar.vue'

const props = defineProps({
  unit: [String, Number],
  today: String,
  success: Boolean
});

const emit = defineEmits([
  'initGrid', 
  'showMessage', 
  'setPosMessage',
  'sendTimeData'
]);

const util = inject('util');
const todoData = inject('todoData');
const todoMode = inject('todoMode');
const { x: absX, y: absY } = useMouse(); 
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
const timelineData = ref({...todoData.value});
const gridHeight = computed(() => {
  timeLineGrid.value.oneMinute = props.unit;
  return parseFloat(timeLineGrid.value.oneMinute) * 5;
});

const getTotalGrid = computed(() => {
  return day * (60/5);
});

//현재 시간 가져오기
const scrollToCurrentTime = (fetchHour) => {
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

const createTimelineBar = ($event) => {
  const { startScrollY } = timeLineGrid.value;

  if(!timelineData.value.created){
    timelineData.value.created = true;

    const cloneData = util.deepCopy(timelineData.value);
    timelineBar.value.push(cloneData);
    todoMode.value = 'pending';
  }

  const newIdx = timelineBar.value.length-1;
  timelineBar.value[newIdx].id = util.randomKey();
  timelineBar.value[newIdx].theDate = props.today;

  if(!timelineBar.value[newIdx].startPoint){
    timelineBar.value[newIdx].startPoint = $event.pageY - startScrollY;

    const { hour, minute} = getTimeFromPoint(timelineBar.value[newIdx].startPoint);
    timelineBar.value[newIdx].startTime.hour = hour;
    timelineBar.value[newIdx].startTime.minute = minute;

    emit('showMessage', '종료시간을 선택하세요');
    // emit('sendTimeData', timelineBar.value[newIdx]);

    todoData.value = {...timelineBar.value[newIdx]};
    console.log('todoData', todoData.value);
  }else{
    timelineBar.value[newIdx].endPoint = $event.pageY - startScrollY;
    console.log('endPoint', timelineBar.value[newIdx].endPoint);
    
    const { hour, minute} = getTimeFromPoint(timelineBar.value[newIdx].endPoint);
    timelineBar.value[newIdx].endTime.hour = hour;
    timelineBar.value[newIdx].endTime.minute = minute;

    timelineData.value.created = false;

    emit('showMessage', '시작시간을 선택하세요');
    // emit('sendTimeData', timelineBar.value[newIdx]);
    todoData.value = {...timelineBar.value[newIdx]};
    console.log('todoData', todoData.value);
  }    
};

const drawTimelineBar = ($event) => {
  if(!timelineData.value.created) return false;

  const newIdx = timelineBar.value.length-1;
  timelineBar.value[newIdx].timeRange = updatePositionY($event) - timelineBar.value[newIdx].startPoint;
}

const updatePositionY = (event) => {
  return event.pageY - timeLineGrid.value.startScrollY
}

const getTimeFromPoint = (value) => {
  let result = value / calcToPx();
  let hour = Math.floor(result);
  let minute = util.getOnlyDecimal(result, 2);

  hour = hour < 10 ? `0${hour}`: `${hour}`;
  minute = Math.floor(minute*calcToPx() / parseFloat(timeLineGrid.value.oneMinute));
  minute = minute < 10 ? `0${minute}`: `${minute}`;

  emit('initGrid', day, calcToPx());

  return {
    hour,
    minute
  }
}

const initTimelineGrid = () => {
  scrollToCurrentTime();
  timeLineGrid.value.startScrollY = timeLineGridRef.value.getBoundingClientRect().top + window.scrollY;
}

const handleEvents = () => {
  timeLineGridRef.value.addEventListener('mousemove', (event) => {
    emit('setPosMessage', true, absX.value, absY.value);
  });
  timeLineGridRef.value.addEventListener('mouseout', (event) => {
    emit('setPosMessage', false, 0, '-9999');
  });
}

watch(todoMode, (newMode, oldMode) => {
  console.log('newMode', newMode);
  timelineBar.value[timelineBar.value.length-1].status = newMode;

  if(newMode === 'success'){
    const newTodo = getTodoById(timelineBar.value.length-1);
    timelineBar.value[timelineBar.value.length-1].todo = newTodo.todo;
    timelineBar.value[timelineBar.value.length-1].memo = newTodo.memo;
  }
});
watchEffect(getTimeFromPoint);

onMounted(() => {
  initTimelineGrid();
  handleEvents();
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
    left: 120px; 
    top: 100px;
    
    .bar {
      display: inline-block;
      width: 50px;
      height: 100%;
      min-height: 10px;
      background: #7749F8;
      box-shadow: 0 0 1px rgba(0,0,0,.2), 0 2px 4px rgba(0,0,0,.1);
      border-radius: 5px;
      text-shadow: 1px 1px 1px rgba(0,0,0,.1);          
    }

    .card-view {
      min-width: 244px;
      margin-left: 20px;

      .in-progress {
        height: 100%;
        justify-content: center;
      }
    }
    &.active {
      display: flex;
    }
  }
</style>