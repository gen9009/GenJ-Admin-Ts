<template>
  <div class="scrollText-moudle">
    <QiCard><scrollText></scrollText></QiCard>
  </div>
</template>
<script setup lang="ts">
import scrollText from './comp.vue';
</script>
<style lang="scss" scoped>
.scrollText-moudle {
  display: flex;
  gap: 5px;
  padding: 10px;
}
</style>
