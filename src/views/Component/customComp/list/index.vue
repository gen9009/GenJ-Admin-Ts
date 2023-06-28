<template>
  <div class="list-moudle">
    <QiCard> <virtualList></virtualList></QiCard>
    <QiCard> <autoPlayList></autoPlayList></QiCard>
  </div>
</template>
<script setup lang="ts">
import virtualList from './component/virtualList/virtualList.vue';
import autoPlayList from './component/autoPayList/autoPlayList.vue';
</script>
<style lang="scss" scoped>
.list-moudle {
  display: flex;
  gap: 5px;
  padding: 10px;
}
</style>
