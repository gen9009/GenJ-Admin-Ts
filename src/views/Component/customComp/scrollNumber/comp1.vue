<template>
  <div class="scroll-num">
    <div class="num-list">
      <div class="num-item single-num-box" :class="{ 'spring-back': options.showSpringBack }" :style="springBackDelayStyle(delayIndex)" v-for="(value, delayIndex) in options.numList" :key="delayIndex">
        <!-- 固定数字展示 -->
        <div class="single-num-list" :class="{ ['move-' + value]: moveListSwich[delayIndex] }" :style="singleDelayStyle(delayIndex)" @animationend="removeAnimation(delayIndex)">
          <span class="single-num-item" v-for="singleNum in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]" :key="singleNum">{{ singleNum }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { isNumber, isString, isArray } from '@/utils/instanceof';
import { computed, reactive, ref } from 'vue';

/*
  具有回弹效果的老虎机🎰滚动
  1、不支持小数
  2、支持重置数据
  3、支持关闭动画
  4、可配置每个box的动画延时

  知识点
  1、animationend 动画结束事件
  2、sass 类名变量占位
*/
interface ScorllNumProps {
  modelValue: number | string;
  isRemoveAnimation?: boolean; // 是否移除动画
  firstAnimation?: boolean; // 是否执行首次动画
  blur?: number; // 数字模糊度
  delay?: number | Array<number>; // 数字滚动延时 Array每个元素控制对应数字 单位s
}

const props = withDefaults(defineProps<ScorllNumProps>(), {
  firstAnimation: false,
  blur: 1,
  isRemoveAnimation: false
});
const options = reactive({
  // 回弹动画开关
  showSpringBack: props.firstAnimation,
  //数字列表
  numList: computed((): number[] => {
    if (isNumber(props.modelValue)) {
      return String(props.modelValue)
        .split('')
        .map(v => parseInt(v));
    }
    if (isString(props.modelValue)) {
      return (props.modelValue as string).split('').map(v => parseInt(v));
    }
    return [];
  })
});

// 计算回弹动画延时
const springBackDelayStyle = (delayIndex: number) => {
  const delay = isArray(props.delay) ? props.delay[delayIndex] + 1 : delayIndex + 1;
  return { animationDelay: delay + 's' };
};

// 计算单数字滚动动画延时
const singleDelayStyle = (delayIndex: number) => {
  const delay = isArray(props.delay) ? props.delay[delayIndex] + 1 : delayIndex + 1;
  return { animationDelay: `0s, ${delay}s` };
};

//每个数字滚动动画开关
const moveListSwich = ref<Boolean[]>(new Array(options.numList.length).fill('').map(() => props.firstAnimation));

const removeAnimation = (index: number) => {
  if (!props.isRemoveAnimation) return;
  moveListSwich.value[index] = false;
};

const refresh = () => {
  // 重新执行回弹动画
  options.showSpringBack = false;
  setTimeout(() => {
    options.showSpringBack = true;
  });
  // 重新计算数字位移
  moveListSwich.value = moveListSwich.value.map(() => false);
  setTimeout(() => {
    moveListSwich.value = moveListSwich.value.map(() => true);
  });
};
defineExpose({
  refresh
});
</script>
<style lang="scss" scoped>
// 回弹动画类
.spring-back {
  animation: spring-back 1s forwards;
}

// 数字无限滚动
@for $num from 0 through 9 {
  .move-#{$num} {
    transform: translateY($num * 9.09%);
    animation: move 0.3s linear infinite, bounce-in-down#{$num} 1s forwards;
  }

  @keyframes bounce-in-down#{$num} {
    0% {
      filter: none;

      // 11个数 100/11
      transform: translateY(calc(-9.09% * $num - 7%));
    }
    25% {
      transform: translateY(calc(-9.09% * $num + 3%));
    }
    50% {
      transform: translateY(calc(-9.09% * $num - 1%));
    }
    70% {
      transform: translateY(calc(-9.09% * $num + 0.6%));
    }
    85% {
      transform: translateY(calc(-9.09% * $num - 0.3%));
    }
    100% {
      filter: none;
      transform: translateY(calc(-9.09% * $num));
    }
  }
}

// 无限动画
@keyframes move {
  from {
    filter: blur(calc(v-bind(blur) * 1px));
    transform: translateY(-90%);
  }
  to {
    filter: blur(calc(v-bind(blur) * 1px));
    transform: translateY(0%);
  }
}

// 回弹动画
@keyframes spring-back {
  25% {
    transform: translateY(8%);
  }
  50% {
    transform: translateY(-4%);
  }
  70% {
    transform: translateY(2%);
  }
  85% {
    transform: translateY(-1%);
  }
  100% {
    transform: translateY(0);
  }
}
.num-list {
  display: flex;
  .num-item {
    width: 50px;
    height: 90px;
    line-height: 90px;
    border: 2px solid saddlebrown;
    border-radius: 5px;
    box-shadow: 5px 5px 10px #cccccc;
  }
}
.single-num-box {
  position: relative;
  margin: 10px;
  overflow: hidden;
  .single-num-list {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-flow: column;
    width: 50px;
    font-size: 16px;
    text-align: center;
    .single-num-item {
      width: 50px;
      height: 90px;
      font-size: 30px;
      font-weight: 700;
      line-height: 90px;
      color: saddlebrown;
    }
  }
}
</style>
