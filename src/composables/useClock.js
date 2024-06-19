import { ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';

export const useClock = () => {
  let refreshIntervalId = null;

  const currentDate = ref({
    today: null,
    year: null,
    month: null,
    date: null
  });
  
  const currentTime = ref({
    hour: null,
    minute: null,
    second: null
  });
  
  const dateString = ref('');
  const dayString = ref('');
  const timeString = ref('');
  const ampm = ref('');
  
  const getCurrentDate = (date) => {
    currentDate.value.today = date;
    currentDate.value.year = date.getFullYear();
    currentDate.value.month = ( date.getMonth()+1 > 9 ) ? date.getMonth()+1 : "0" + (date.getMonth()+1);
    currentDate.value.date = ( date.getDate() > 9 ) ? date.getDate() : "0" + date.getDate();
  
    return `${currentDate.value.month}/${currentDate.value.date}/${currentDate.value.year}`;
  }
  
  const getCurrentTime = (date) => {
    // const now = new Date();
    const hour = date.getHours();
  
    ampm.value = (hour<12 || hour == 24) ? 'AM' : 'PM';
    currentTime.value.hour = hour % 12 || 12;
    
    const minute = date.getMinutes();
    currentTime.value.minute = ( minute > 9 ) ? minute : "0" + minute;
    
    const second = date.getSeconds(); 
    currentTime.value.second = ( second > 9 ) ? second : "0" + second;
    
    let millisec = date.getMilliseconds(); 
    millisec = ( millisec > 99 ) ? millisec : ( millisec > 9 ) ? "0" + millisec : "00" + millisec;
  
    return `${currentTime.value.hour}:${currentTime.value.minute}:${currentTime.value.second}`;
  }

  const getCurrentDay = (date) => {
    return new Intl.DateTimeFormat(
      'ko',
      { weekday: 'long' }
    ).format(date);
  }
  
  const updateClock = () => {
    const today = new Date();
    dateString.value = getCurrentDate(today);
    dayString.value = getCurrentDay(today);
    timeString.value = getCurrentTime(today);
  }
  
  onMounted(() => {
    refreshIntervalId = setInterval (updateClock, 1000);
  });
  
  return {
    dateString,
    dayString,
    timeString,
    ampm
  }  
}