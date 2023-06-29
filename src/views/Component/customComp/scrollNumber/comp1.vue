<template>
  <div class="scroll-num">
    <div class="num-list">
      <div class="num-item single-num-box" :class="{ 'spring-back': options.showSpringBack }" :style="springBackDelayStyle(delayIndex)" v-for="(value, delayIndex) in options.numList" :key="delayIndex">
        <!-- 所选数字展示 -->
        <div class="single-num-case"></div>
        <!-- 固定数字展示 -->
        <div class="single-num-list" :class="{ ['move-' + value]: moveListSwich[delayIndex] }" :style="singleDelayStyle(delayIndex, value)" @animationend="removeAnimation(delayIndex)">
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
  1、数字无限滚动
  2、数字回弹效果
  3、不支持小数

  知识点
  1、animationend 动画结束事件
  2、sass 类名变量占位
*/
interface ScorllNumProps {
  modelValue: number | string;
  isremoveAnimation?: boolean; // 是否移除动画
  blur?: number; // 数字模糊度
  delay?: number | Array<number>; // 数字滚动延时 Array每个元素控制对应数字 单位s
}
const props = withDefaults(defineProps<ScorllNumProps>(), {
  blur: 1,
  isremoveAnimation: false
});
const options = reactive({
  showSpringBack: true, // 回弹动画开关
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
  return { animationDelay: delay + 1 + 's' };
};

// 计算单数字滚动动画延时 以及 初始位移
const singleDelayStyle = (delayIndex: number, value: number) => {
  const delay = isArray(props.delay) ? props.delay[delayIndex] + 1 : delayIndex + 1;
  return { animationDelay: `0s, ${delay}s`, transform: `translateY(${-value * 9.09}% )` };
};

//每个数字滚动动画开关
const moveListSwich = ref(new Array(options.numList.length).fill('').map(() => true));

const removeAnimation = (index: number) => {
  if (!props.isremoveAnimation) return;
  moveListSwich.value[index] = false;
};
</script>
<style lang="scss" scoped>
// 回弹动画类
.spring-back {
  animation: spring-back 1s forwards;
}

// 数字无限滚动
@for $num from 0 through 9 {
  .move-#{$num} {
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
}
.single-num-box {
  position: relative;
  height: 40px;
  margin: 10px;
  overflow: hidden;
  .single-num-case,
  .single-num-list {
    width: 30px;
    font-size: 16px;
    text-align: center;
  }
  .single-num-case {
    height: 40px;
    line-height: 40px;
    background-color: pink;
    border-radius: 5px;
  }
  .single-num-list {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-flow: column;
    .single-num-item {
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
