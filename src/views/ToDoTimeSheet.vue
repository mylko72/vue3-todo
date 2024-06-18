<template>
  <div class="todo-time__sheet">
    <TimeLineGrid 
      @init-grid="initGrid"
      @show-message="showMessage" 
      @set-pos-message="setPosMessage"
      :unit="props.unit"
      :today="props.date">
    </TimeLineGrid>

    <div class="todo-time__set">
      <ul>
        <li v-for="i in oneDay" :key="i" :style="{ height: timeHeight + 'px' }">
          <span class='time'>{{ setTimeList(i) }}</span>
        </li>
      </ul>
    </div>

    <Teleport to="body">
			<AppTooltip :isHover="messageGuide.hover" :left="messageGuide.x" :top="messageGuide.y" :direction="messageGuide.direction" :message="messageGuide.message" />
		</Teleport>    
  </div>
  <!-- <TimeLineWrite></TimeLineWrite> -->
</template>

<script setup>
import { computed, ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';
import TimeLineGrid from '@/components/TimeLineGrid.vue';
import AppTooltip from '@/components/app/AppTooltip.vue'

const props = defineProps({
  unit: {
    type: [String, Number],
    default: '2px',
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

const oneDay = ref(0);
const timeHeight = ref(0)

const messageGuide = ref({
  hover: false,
  direction: 'top',
  message: '시작시간을 선택하세요',
  x: 0, 
  y: -9999,  
});

// 메소드정의
const showMessage = (msg) => {
  messageGuide.value.message = msg;
}

const setPosMessage = (hover, x, y) => {
  messageGuide.value.hover = hover;
  messageGuide.value.x = `${x}px`;
  messageGuide.value.y = `${y}px`;
}

const setTimeList = (i) => {
    const idx = i - 1;
    return `${(idx < 10 ? "0": "") + idx}:00`;
};

const initGrid = (day, height) => {
  oneDay.value = day;
  timeHeight.value = height.value;
}
</script>

<style lang="scss" scoped>
  .todo-time__sheet {
    position: relative;
    height: 100%;
    padding: 0 25px 50px 80px;

    .todo-time__set {
      position: absolute;
      left: 30px;
      top: -10px;

      li {
        font-size: 16px;
        color: #666;
      }
    }
  }
</style>