<template>
  <div id="form_moudle">
    <div class="item">
      <ELInput></ELInput>
    </div>
    <div class="item">
      <ELSelect></ELSelect>
    </div>
  </div>
</template>
<script setup lang="ts">
import ELInput from './components/input.vue';
import ELSelect from './components/select.vue';
</script>
<style lang="scss" scoped>
#form_moudle {
  padding: 10px;
  display: grid;
  min-height: 100%;
  grid-template-columns: repeat(auto-fill, 300px);
  // grid-template-rows: repeat(4,1fr);
  grid-gap: 5px;
  margin: auto;
  .item {
    height: 300px;
    border: 1px solid #eee;
    padding: 10px;
  }
}
</style>
