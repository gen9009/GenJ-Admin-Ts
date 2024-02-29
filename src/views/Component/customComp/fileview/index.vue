<template>
  <div class="file-moudle">
    <QiCard class="flex-jac flex-col">
      <el-button type="primary" @click="openPDF">打开PDF</el-button>
    </QiCard>
  </div>
</template>
<script setup lang="ts">
const openPDF = () => {
  // 1、PDF浏览器自带就可以访问
  // window.open('http://124.223.XX.XX/static/test.pdf');
  // 2、部署PDFjs的WebViewer
  window.open('http://124.223.XX.XX/pdf-view/web/viewer.html?file=http://124.223.XX.XX/static/test.pdf');
  // 3、使用插件，比如PDFjs,vue-pdf...
};
</script>
<style lang="scss" scoped>
.file-moudle {
  display: flex;
  gap: 5px;
  padding: 10px;
}
</style>
