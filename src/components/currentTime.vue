<template>
  <div class="todo-time__area">
    <v-img :width="48" :height="48" src="/assets/images/ico-time.png"></v-img>
    <span class="txt-date mt-3">{{ dateString }}</span>
    <span class="txt-time">{{ timeString }} <sup>{{ ampm }}</sup></span>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const currentDate = ref({
  today: null,
  year: null,
  month: null,
  date: null
});

const currentTime = ref({
  hour: '',
  minute: '',
  second: ''
});

const dateString = ref('');
const timeString = ref('');
const ampm = ref('');

const getCurrentDate = () => {
  let { today, year, month, date } = currentDate.value;
  today = new Date();
  year = today.getFullYear();
  month = today.getMonth()+1;
  date = today.getDate();

  month = ( month > 9 ) ? month : "0" + month;
  date = ( date > 9 ) ? date : "0" + date;

  currentDate.value.month = month;
  currentDate.value.date = date;
  currentDate.value.year = year;

  return `${month}/${date}/${year}`;
}

const getCurrentTime = () => {
  let { hour, minute, second } = currentTime.value;
  const now = new Date();

  hour = now.getHours();
  hour = hour % 12 || 12;
  
  minute = now.getMinutes();
  minute = ( minute > 9 ) ? minute : "0" + minute;
  
  second = now.getSeconds(); 
  second = ( second > 9 ) ? second : "0" + second;
  
  let millisec = now.getMilliseconds(); 
  millisec = ( millisec > 99 ) ? millisec : ( millisec > 9 ) ? "0" + millisec : "00" + millisec;
  
  ampm.value = (hour<12 || hour == 24) ? 'AM' : 'PM';
  return hour + ":" + minute + ":" + second;
}

const updateClock = () => {
  dateString.value = getCurrentDate();
  timeString.value = getCurrentTime();
}

let refreshIntervalId = setInterval (updateClock, 1000);

console.log('currentDate', currentDate.value);
</script>

<style lang="scss" scoped>
  .todo-time__area {
    display: flex;
    flex-direction: column;
    align-items: center;

    .txt-date {
      font-size: 1.5rem;
    }
    .txt-time {
      position: relative;
      min-width: 210px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: -0.5rem;
      padding-right: 25px;
      font-size: 3.5rem;

      sup {
        position: absolute;
        right: 0;
        top: 1.5rem;
        font-size: 1rem;
      }
    }
  }

</style>