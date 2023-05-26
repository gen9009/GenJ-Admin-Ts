<script setup lang="ts">
import { ref, useAttrs } from 'vue';
import { DialogProps } from 'element-plus';
/* 
   疑问[problem]
   (
    组件根元素会自动挂载 没被 props 接收的属性
    本打算 不采用attrs透传 因为写入属性会自动挂载上去 也就是挂载到ElDialog
    但是
    如果不采用 $attrs 透穿( :='$attrs' ) 点击蒙层后关闭弹窗无法响应modelValue 😅...
   )
*/

interface QiDialogProps extends Partial<DialogProps> {
  modelValue: boolean;
  hasFullScreen?: boolean;
  title?: string;
  diaLoading?: boolean;
}
const props = withDefaults(defineProps<QiDialogProps>(), {
  modelValue: false,
  title: '标题',
  hasFullScreen: true,
  diaLoading: false
});
const emit = defineEmits(['closeDia', 'openDia']);
const attrs = useAttrs();

const isFullscreen = ref(false);
const handleFullScreen = () => {
  if (Object.hasOwn(attrs, 'fullscreen')) return;
  isFullscreen.value = !isFullscreen.value;
};
const handleClose = () => {
  emit('closeDia');
};
const confirm = () => {
  emit('closeDia');
};
</script>

<template>
  <el-dialog v-model="props.modelValue" :showClose="false" :fullscreen="props.fullscreen ?? isFullscreen" :="$attrs">
    <template #header>
      <div class="dialog-header">
        <div class="dialog-header-title">{{ props.title }}</div>
        <div class="dialog-header-icons">
          <div class="dialog-header-icons-fullscreen" v-if="hasFullScreen" @click="handleFullScreen">全屏🫵🏼</div>
          <div class="dialog-header-icons-close" @click="handleClose">关闭🫵🏼</div>
        </div>
      </div>
    </template>
    <div class="content" v-loading="props.diaLoading">
      <slot></slot>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">关闭</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.dialog-header {
  display: flex;
  justify-content: space-between;
  &-icons {
    display: flex;
    div + div {
      margin-left: 20px;
    }
  }
}
</style>
