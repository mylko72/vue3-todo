<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters cols="12">
      <TheMainHeader class="main-header" />      
      <TheMainView class="main-content" />
      <TheMainSide />
    </v-row>
    <!-- <v-row>
      <v-col>
        <TheFooter />
      </v-col>
    </v-row> -->
  </v-container>
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