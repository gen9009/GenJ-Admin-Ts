<template>
  <div id="watermark">
    <div v-waterMarker="{ text: 'test', textColor: 'red' }"></div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
#watermark {
  width: 100%;
  height: 100%;
  & > div {
    width: 100%;
    height: 100%;
  }
}
</style>
