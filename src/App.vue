<template>
  <div class="main-container">
    <TheMainHeader />
    <TheMainView />
    <TheMainSide />
  </div>
  <TheFooter />
</template>

<script setup>
import TheMainHeader from '@/layout/TheMainHeader.vue'
import TheMainView from '@/layout/TheMainView.vue'
import TheMainSide from '@/layout/TheMainSide.vue'
import TheFooter from '@/layout/TheFooter.vue'
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
}
</style>