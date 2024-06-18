<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters cols="12">
      <TheMainHeader class="main-header" />      
      <TheMainContent class="main-content" />
    </v-row>
  </v-container>
</template>

<script setup>
import TheMainHeader from '@/layout/TheMainHeader.vue'
import TheMainContent from '@/layout/TheMainContent.vue'
</script>

<style lang="scss" scoped>

</style>