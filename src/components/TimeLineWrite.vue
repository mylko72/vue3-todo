<template>
  <div class="todo-time__write" :class="{opened: props.created}" :style="{ width: props.setWidth + 'px', transform: translateView }" ref="timeWriteRef">
    <h1 class="text-h3">Guest님,</h1>
    <div class="txt-selected-time">
      <p :class="{ active: activeClass }" ref="startTimeRef">
        <!-- <span class="time">{{ startTime.hour }}</span> -->
        <div class="number-rolling" :class="{ active: activeRolling[0] }" aria-hidden="true" ref="startHourRef">
          <div class="num" :class="`n${startHour[0]}`">&nbsp;</div>
          <div class="num" :class="`n${startHour[1]}`">&nbsp;</div>
        </div>
        <span class="txt">시</span> 
        <div class="number-rolling" :class="{ active: activeRolling[1] }" aria-hidden="true">
          <div class="num" :class="`n${startMinute[0]}`">&nbsp;</div>
          <div class="num" :class="`n${startMinute[1]}`">&nbsp;</div>
        </div>
        <span class="txt">분 부터</span>
      </p>
      <p :class="{ active: activeClass2 }" ref="startTimeRef2">
        <div class="number-rolling" :class="{ active: activeRolling[2] }" aria-hidden="true" ref="endHourRef">
          <div class="num" :class="`n${endHour[0]}`">&nbsp;</div>
          <div class="num" :class="`n${endHour[1]}`">&nbsp;</div>
        </div>
        <span class="txt">시</span>
        <div class="number-rolling" :class="{ active: activeRolling[3] }" aria-hidden="true">
          <div class="num" :class="`n${endMinute[0]}`">&nbsp;</div>
          <div class="num" :class="`n${endMinute[1]}`">&nbsp;</div>
        </div>
        <span class="txt">분 까지</span>
      </p>
      <p :class="{ active: activeClass3 }" ref="startTimeRef3">
        <span class="txt">할 일을 다음과 같이 등록하시겠습니까?</span>
      </p>
    </div>
    <v-sheet class="todo-time__form mx-auto mt-10" :class="{ active: activeForm }">
      <v-form @submit.prevent>
        <v-text-field
          v-model="currentTodo.todo"
          label="할일"
          variant="underlined"
          ref="inputRef"
        ></v-text-field>
        <v-textarea
          v-model="currentTodo.memo"
          label="메모"
          variant="underlined"
        ></v-textarea>
        <v-row justify-sm="center">
          <v-btn class="mt-2 mr-2" @click="handleCreate($event)" color="light-blue-darken-3" type="submit">등록</v-btn>
          <v-btn class="mt-2" @click="handleCancel">취소</v-btn>
          </v-row>
        </v-form>
    </v-sheet>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, ref, unref } from 'vue';
import { createTodo } from '@/api/todos'

const props = defineProps({
  setWidth: Number,
  startTime: Object,
  endTime: Object,
  title: {
    type: String,
    required: true
  },
  content: String,
  created: Boolean
});
const emit = defineEmits(['resetTodo', 'resultTodo'])
const todoData = inject('todoData');
const todoMode = inject('todoMode');
const currentTodo = ref({
  todo: '',
  memo: ''
});
const startHour = computed({
  get(){
    let hour = props.startTime.hour;
    hour = String(hour).split('');
    return hour;
  },
  set(newValue){
    startHour.value[0] = newValue.split('')[0];
    startHour.value[1] = newValue.split('')[1];
  }
});
const startMinute = computed({
  get(){
    let minute = props.startTime.minute;
    minute = String(minute).split('');
    return minute;
  },
  set(newValue){
    startMinute.value[0] = newValue.split('')[0];
    startMinute.value[1] = newValue.split('')[1];
  }
});
const endHour = computed(() => {
  let hour = props.endTime.hour;
  hour = String(hour).split('');
  return hour;
});
const endMinute = computed(() => {
  let minute = props.endTime.minute;
  minute = String(minute).split('');
  return minute;
});

const translateView = computed(() => {
  let result = null;
  if(props.created){
    result = props.setWidth;
  }else{
    result = 0;
  }
  return `translateX(${result}px)`;
});
const activeClass = ref(false);
const activeClass2 = computed(() => {
  return props.endTime.hour.length > 0 && true;
});
const activeClass3 = ref(false);
const activeRolling = ref([false, false, false, false]);
const activeForm = ref(false);

const timeWriteRef = ref(null);
const startTimeRef = ref(null);
const startTimeRef2 = ref(null);
const startTimeRef3 = ref(null);
const startHourRef = ref(null);
const endHourRef = ref(null);
const inputRef = ref(null);

const resetForm = () => {
  emit('resetTodo', false);

  currentTodo.value.todo = '';
  currentTodo.value.memo = '';
  activeClass.value = false;
  activeClass2.value = false;
  activeClass3.value = false;
  activeForm.value = false;
}
const handleCreate = (event) => {
  event.stopPropagation();
  todoData.value.todo = currentTodo.value.todo;
  todoData.value.memo = currentTodo.value.memo;

  createTodo({...todoData.value});
  todoMode.value = 'success';
  emit('resultTodo', todoMode.value);
  resetForm();
}

const handleCancel = (event) => {
  event.stopPropagation();
  todoMode.value = 'cancel';
  emit('resultTodo', todoMode.value);
}

onMounted(() => {
  timeWriteRef.value.addEventListener('transitionend', () => {
    if(props.created){
      activeClass.value = true;
    }
  }); 
  startTimeRef.value.addEventListener('transitionend', () => {
    if(props.created){
      activeRolling.value[0] = true;
      activeRolling.value[1] = true;
    }else{
      activeRolling.value[0] = false;
      activeRolling.value[1] = false;
      startHour.value = '00'
      startMinute.value = '00'
    }
  });
  startTimeRef2.value.addEventListener('transitionend', () => {
    if(props.created){
      activeRolling.value[2] = true;
      activeRolling.value[3] = true;

      setTimeout(() => {
        activeClass3.value = true;
        inputRef.value.focus();
      }, 300);
    }else{
      activeRolling.value[2] = false;
      activeRolling.value[3] = false;
    }
  });
  startTimeRef3.value.addEventListener('transitionend', () => {
    if(props.created){  
      activeForm.value = true;
    }
  });
})

</script>

<style lang="scss">
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
  transition: transform 1s;

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

    * {
      word-wrap: break-word;
    }
    
    .txt {
      color:#555;
      opacity: .3;
    }
    
    p {
      transform: translateY(10px);
      transition: all .3s;
      opacity: .3;

      &.active {
        transform: translateY(0);
        opacity: 1;
        .txt {
          opacity: 1;
        }
      }      
    }

  }
  .todo-time__form {
    opacity: 0;
    transform: translateY(50px);
    transition: all 1s;

    &.active {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .number-rolling {position:relative;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;vertical-align:bottom;word-wrap: break-word;}
  .number-rolling:before {content:'';display:block;position:absolute;top:0;left:0;width:100%;height:100%;z-index:1}
  .number-rolling:after {content:'';display:block;position:absolute;bottom:-0.2rem;left:0;width:100%;height:19%;z-index:1}
  .number-rolling > div {font-size:inherit;font-weight:700;color:inherit;text-align:center;position:relative;overflow:hidden;}
  .number-rolling .num {width:1.8rem}
  .number-rolling .num:before {content:'012345678901234567890';display:block;position:absolute;top:0;left:0;width:100%}
  .number-rolling .num + .num {margin-left:-0.03rem}
  .number-rolling .num.n1:before {content:'0123456789012345678901'}
  .number-rolling .num.n2:before {content:'01234567890123456789012'}
  .number-rolling .num.n3:before {content:'012345678901234567890123'}
  .number-rolling .num.n4:before {content:'0123456789012345678901234'}
  .number-rolling .num.n5:before {content:'01234567890123456789012345'}
  .number-rolling .num.n6:before {content:'012345678901234567890123456'}
  .number-rolling .num.n7:before {content:'0123456789012345678901234567'}
  .number-rolling .num.n8:before {content:'01234567890123456789012345678'}
  .number-rolling .num.n9:before {content:'012345678901234567890123456789'}
  .number-rolling.active .num:before {top:0.3rem;-webkit-animation:numRolling 1.5s .2s ease forwords; animation:numRolling 1.5s .2s ease forwards}
  .number-rolling.active .num + .num:before {-webkit-animation-delay:.3s; animation-delay:.3s}

  @-webkit-keyframes numRolling {
    0% {-webkit-transform:translateY(0);transform:translateY(0)}
    100% {-webkit-transform:translateY(calc(-100% + 3.3rem));transform:translateY(calc(-100% + 3.3rem))}
  }
  @keyframes numRolling {
    0% {-webkit-transform:translateY(0);transform:translateY(0)}
    100% {-webkit-transform:translateY(calc(-100% + 3.3rem));transform:translateY(calc(-100% + 3.3rem))}
  }

}
</style>