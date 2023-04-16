<template>
  <el-tooltip content="主题切换">
    <span class="iconfont icon-pifu" @click="drawer = true"></span>
  </el-tooltip>
  <!-- 传送至body 避免层级失效 -->
  <Teleport to="body">
    <el-drawer v-model="drawer" title="布局设置" size="300px">
      <!-- 全局主题 -->
      <div class="globe_theme">
        <div class="globe_title title">
          <el-divider>全局主题</el-divider>
        </div>
        <div class="globe_options">
          <div class="theme_item">
            <span>主题颜色</span>
            <el-color-picker v-model="themeConfig.colorTheme" :predefine="colorList" size="small" @change="useElementTheme" />
          </div>
          <div class="theme_item">
            <span>暗黑模式</span>
            <el-switch v-model="themeConfig.isDark" inline-prompt active-color="#0a0a0a" inactive-color="#dcdfe6" :active-icon="Sunny" :inactive-icon="Moon" @change="changeDark" />
          </div>
          <div class="theme_item">
            <span>灰色模式</span>
            <el-switch v-model="themeConfig.isGrey" />
          </div>
        </div>
      </div>
      <!-- 界面设置 -->
      <div class="web_theme">
        <div class="web_title title">
          <el-divider>界面主题</el-divider>
        </div>
        <div class="web_options">
          <div class="theme_item">
            <span>折叠面板</span>
            <el-switch v-model="menuStore.isCollapse" />
          </div>
          <div class="theme_item">
            <span>标签栏</span>
            <el-switch v-model="themeConfig.showTabs" />
          </div>
          <div class="theme_item">
            <span>页脚</span>
            <el-switch v-model="themeConfig.showFooter" />
          </div>
        </div>
      </div>
    </el-drawer>
  </Teleport>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { GlobalStore } from '@/store/modules/GlobalStore';
import { MenuStore } from '@/store/modules/MenuStore';
import { Sunny, Moon } from '@element-plus/icons-vue';
import { useTheme } from '@/hooks/useTheme';

// 预定义主题颜色
const colorList = ['#409EFF', '#DAA96E', '#0C819F', '#009688', '#27ae60', '#ff5c93', '#e74c3c', '#fd726d', '#f39c12', '#9b59b6'];

const globalStore = GlobalStore();
const menuStore = MenuStore();

const themeConfig = computed(() => globalStore.themeConfig);
const drawer = ref<boolean>(false);
const { useElementTheme, useDark } = useTheme();
const changeDark = useDark;
</script>
<style lang="scss" scoped>
@use '../style.scss';
</style>
