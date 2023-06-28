<template>
  <div id="table-moudle">
    <QiCard height="500px" width="70"><TableDemo></TableDemo></QiCard>
  </div>
</template>
<script setup lang="ts">
import TableDemo from './components/TableDemo.vue';
</script>
<style lang="scss" scoped>
#table-moudle {
  display: flex;
  gap: 5px;
  padding: 10px;
}
</style>
