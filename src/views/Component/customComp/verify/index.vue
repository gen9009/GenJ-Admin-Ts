<template>
  <div class="verify-moudle">
    <QiCard width="" height="500px"> <SlideVerify></SlideVerify> </QiCard>
  </div>
</template>
<script setup lang="ts">
import SlideVerify from './slideVerify/slideVerify.vue';
</script>
<style lang="scss" scoped>
.verify-moudle {
  display: flex;
  gap: 5px;
  padding: 10px;
}
</style>
