<template>
  <div ref="tooltip" :style="[{ 'left': left, 'top': top }, marginLeftSty]" :class="[{ show: isHover }, direction]" class="tooltip-view">
    <div class="inner arrow-down">
      <p v-html="message"></p>
    </div>
  </div> 
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";

const props = defineProps({
  isHover: {
    type: Boolean,
    default: false
  },
  left: {
    type: String,
  },
  top: {
    type: String,
  },  
  message: {
    type: String,
  },
  direction: {
    type: String,
  }
});

const tooltip = ref(null);
const marginLeft = ref(0);
const marginLeftSty = computed(() => {
  marginLeft.value = 0;
  if(props.isHover){
    if(props.direction === 'top' || props.direction === 'bottom'){
      marginLeft.value = -(tooltip.value.clientWidth/2);
    }else if(props.direction === 'left'){
      marginLeft.value = -(tooltip.value.clientWidth + 10);
    }else if(props.direction === 'right'){
      marginLeft.value = 10;
    }
  }else{
    marginLeft.value = 0;
  }
  return { 'margin-left' : `${marginLeft.value}px`};
})
</script>

<style scoped>
.tooltip-view {display:inline-block;position:absolute;top:-9999px;z-index:100;}
.tooltip-view .inner:before {position:absolute;content:'';width:8px;height:8px;border-width:1px 0 0 1px;border-style:solid;border-color:#ddd;background-color:#fff;}
.tooltip-view .inner {max-width:320px;padding:4px 15px;border:1px solid #ddd;border-radius:6px;background:#fff;}
.tooltip-view .inner > p {margin-bottom:0; font-size:.7rem; color: #666}
.tooltip-view.top.show {margin-top:-5px;}
.tooltip-view.bottom.show {margin-top:10px;}
.tooltip-view.top .inner:before {bottom:-5px;left:50%;transform:rotate(-135deg)}
.tooltip-view.bottom .inner:before {top:-5px;left:50%;transform:rotate(45deg)}
.tooltip-view.left .inner:before {right:-5px;top:calc(50% - 4px);transform:rotate(135deg)}
.tooltip-view.right .inner:before {left:-5px;top:calc(50% - 4px);transform:rotate(-45deg)}
</style>