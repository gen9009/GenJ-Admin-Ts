<template>
  <div id="form-moudle">
    <QiCard><ELInput></ELInput></QiCard>
    <QiCard><ELSelect></ELSelect></QiCard>
    <QiCard><TagsInput></TagsInput></QiCard>
  </div>
</template>
<script setup lang="ts">
import ELInput from './components/input.vue';
import ELSelect from './components/select.vue';
import TagsInput from './components/TagsInput.vue';
</script>
<style lang="scss" scoped>
#form-moudle {
  display: flex;
  gap: 5px;
  padding: 10px;
}
</style>
