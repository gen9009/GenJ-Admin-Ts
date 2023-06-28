<template>
  <div class="card">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
defineProps({
  height: {
    type: String,
    default: '300px'
  },
  width: {
    default: '300px'
  }
});
</script>
<style lang="scss" scoped>
.card {
  width: v-bind(width);
  height: v-bind(height);
  padding: 5px;
  border: 1px solid #eeeeee;
}
</style>
