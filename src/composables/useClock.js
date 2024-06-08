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
  const timeString = ref('');
  const ampm = ref('');
  
  const getCurrentDate = () => {
    const now = new Date();
    currentDate.value.today = now;
    currentDate.value.year = now.getFullYear();
    currentDate.value.month = ( now.getMonth()+1 > 9 ) ? now.getMonth()+1 : "0" + (now.getMonth()+1);
    currentDate.value.date = ( now.getDate() > 9 ) ? now.getDate() : "0" + now.getDate();
  
    return `${currentDate.value.month}/${currentDate.value.date}/${currentDate.value.year}`;
  }
  
  const getCurrentTime = () => {
    const now = new Date();
    const hour = now.getHours();
  
    ampm.value = (hour<12 || hour == 24) ? 'AM' : 'PM';
    currentTime.value.hour = hour % 12 || 12;
    
    const minute = now.getMinutes();
    currentTime.value.minute = ( minute > 9 ) ? minute : "0" + minute;
    
    const second = now.getSeconds(); 
    currentTime.value.second = ( second > 9 ) ? second : "0" + second;
    
    let millisec = now.getMilliseconds(); 
    millisec = ( millisec > 99 ) ? millisec : ( millisec > 9 ) ? "0" + millisec : "00" + millisec;
  
    return `${currentTime.value.hour}:${currentTime.value.minute}:${currentTime.value.second}`;
  }
  
  const updateClock = () => {
    dateString.value = getCurrentDate();
    timeString.value = getCurrentTime();
  }
  
  onMounted(() => {
    refreshIntervalId = setInterval (updateClock, 1000);
  });
  
  return {
    dateString,
    timeString,
    ampm
  }  
}