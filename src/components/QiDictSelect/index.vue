<script setup lang="tsx">
import { ref, onMounted, computed, useAttrs } from 'vue';
import { ElOption, ElSelect } from 'element-plus';
import { DictEnum } from './interface';
import { getDictApi } from '@/service/modules/common';
import { isPromise, isFunction, isString, isNumber } from '@/utils/instanceof';

interface QiDictSelect {
  dict: string | number | Promise<any> | (() => Promise<any>); // 字典code
  modelValue: string | number;
}

const emits = defineEmits(['update:modelValue']);
const attrs = useAttrs();
const props = withDefaults(defineProps<QiDictSelect>(), {});
const dictData = ref<DictEnum[]>([]);
let modelValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
  }
});
onMounted(() => {
  getDictList();
});
const getDictList = async () => {
  /*
    1、string｜number 通过参数调用接口
    2、Promise<DictEnum[]>  直接赋值
    3、()=>Promise<DictEnum[]>  调用接口
  */
  if (isString(props.dict) || isNumber(props.dict)) {
    const { data } = await getDictApi({ code: props.dict });
    return (dictData.value = data);
  } else if (isPromise(props.dict)) {
    const { data } = await props.dict;
    return (dictData.value = data);
  } else if (isFunction(props.dict)) {
    const { data } = await props.dict();
    return (dictData.value = data);
  }
};

const renderOptions = () => {
  return dictData.value.map((dictItem: DictEnum) => {
    return <ElOption {...attrs} label={dictItem?.value} value={dictItem.code} key={dictItem?.code}></ElOption>;
  });
};
const renderDicrSelect = () => {
  return (
    <ElSelect v-model={modelValue.value} {...attrs}>
      {renderOptions()}
    </ElSelect>
  );
};
</script>

<template>
  <component :is="renderDicrSelect"></component>
</template>

<style lang="scss" scoped></style>
