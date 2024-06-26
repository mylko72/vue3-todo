<template>
  <div class="todo-time__write" :class="{opened: props.created}" :style="{ width: props.setWidth + 'px', transform: translateView }" ref="timeWriteRef">
    <h1 class="text-h3">Guest님,</h1>
    <div class="txt-selected-time">
      <p :class="{ active: activeClass }" ref="startTimeRef"><span class="time">{{ startTime.hour }}</span><span class="txt">시</span> <span class="time">{{ startTime.minute }}</span><span class="txt">분 부터</span></p>
      <p :class="{ active: activeClass2 }" ref="startTimeRef2"><span class="time">{{ endTime.hour }}</span><span class="txt">시</span> <span class="time">{{ endTime.minute }}</span><span class="txt">분 까지</span></p>
      <p :class="{ active: activeClass3 }" ref="startTimeRef3"><span class="txt">할 일을 다음과 같이 등록하시겠습니까?</span></p>
    </div>
    <v-sheet class="todo-time__form mx-auto mt-10" :class="{ active: activeForm }">
      <v-form @submit.prevent>
        <v-text-field
          v-model="currentTodo.title"
          label="제목"
          variant="underlined"
          ref="inputRef"
        ></v-text-field>
        <v-textarea
          v-model="currentTodo.content"
          label="내용"
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
import { createTodo, setStatus } from '@/api/todos'

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
const emit = defineEmits(['resetTodo', 'successTodo'])
const todoData = inject('todoData');
const currentTodo = ref({
  startTime: {
    hour: '00',
    minute: '00'
  },
  endTime: {
    hour: '00',
    minute: '00'
  },
  title: '',
  content: ''
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
const activeForm = ref(false);

const timeWriteRef = ref(null);
const startTimeRef = ref(null);
const startTimeRef2 = ref(null);
const startTimeRef3 = ref(null);
const inputRef = ref(null);

const resetForm = () => {
  emit('resetTodo', false);

  currentTodo.value.title = '';
  currentTodo.value.content = '';
  activeClass.value = false;
  activeClass2.value = false;
  activeClass3.value = false;
  activeForm.value = false;
}
const handleCreate = (event) => {
  event.stopPropagation();
  todoData.value.title = currentTodo.value.title;
  todoData.value.content = currentTodo.value.content;

  // setStatus('loading', false);
  createTodo({...todoData.value});
  emit('successTodo', true);
  resetForm();
}

onMounted(() => {
  timeWriteRef.value.addEventListener('transitionend', () => {
    if(props.created){
      activeClass.value = true;
      emit('successTodo', false);
    }
  }); 
  startTimeRef.value.addEventListener('transitionend', () => {
    if(props.created){
      currentTodo.value.startTime.hour = props.startTime.hour;
      currentTodo.value.startTime.minute = props.startTime.minute;
    }else{
      currentTodo.value.startTime.hour = '00'
      currentTodo.value.startTime.minute = '00'
    }
  });
  startTimeRef2.value.addEventListener('transitionend', () => {
    if(props.created){    
      currentTodo.value.endTime.hour = props.endTime.hour;
      currentTodo.value.endTime.minute = props.endTime.minute;

      setTimeout(() => {
        activeClass3.value = true;
        inputRef.value.focus();
      }, 300);
    }else{
      currentTodo.value.endTime.hour = '00';
      currentTodo.value.endTime.minute = '00';
    }
  });
  startTimeRef3.value.addEventListener('transitionend', () => {
    if(props.created){  
      activeForm.value = true;
    }
  });
})

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
}
</style>