import { ref } from 'vue';
export const useDialog = () => {
  const dialogVisible = ref(false);
  const diaLoading = ref(false);

  const openDia = () => {
    dialogVisible.value = true;
  };
  const closeDia = () => {
    dialogVisible.value = false;
  };

  return {
    dialogVisible,
    diaLoading,
    openDia,
    closeDia
  };
};
