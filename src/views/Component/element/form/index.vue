<template>
  <div id="form-moudle">
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
#form-moudle {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);

  // grid-template-rows: repeat(4,1fr);
  grid-gap: 5px;
  min-height: 100%;
  padding: 10px;
  margin: auto;
  .item {
    height: 300px;
    padding: 10px;
    border: 1px solid #eeeeee;
  }
}
</style>
