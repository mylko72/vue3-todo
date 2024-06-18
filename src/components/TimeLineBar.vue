<template>
  <div class="todo-timeline__bar" :id="'bar_'+props.id" :class="{'active': props.active}" :style="{ top: props.top + 'px', height: props.height + 'px' }"></div>
</template>

<script setup>
const props = defineProps({
  id: String,
  active: Boolean,
  top: Number,
  height: Number,
})
</script>

<style lang="scss" scoped>
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