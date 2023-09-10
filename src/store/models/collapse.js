import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useCollapseStore = defineStore(
  'collapse',
  () => {
    const isCollapse = ref(false);
    // 修改是否展开
    const changeCollapse = () => isCollapse.value=!isCollapse.value
    return {
      isCollapse,
      changeCollapse,

    };
  },
);