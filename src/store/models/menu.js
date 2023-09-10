import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getMenuAPI } from '@/apis/menu';

export const useMenuStore = defineStore(
  'menu',
  () => {
    const menuData = ref([]);

    const tagsList = ref([
      {
        path: '/home',
        name: 'home',
        icons:'HomeFilled',
        label: '首页',
      },
    ])

    //去后端获取menu数据 不异步
    const getMenu = () => {
      const menu = getMenuAPI().then((res) => res.data);
      return menu;
    };
    return {
      menuData,
      tagsList,
      getMenu,
    };
  },
  {
    persist: {
      paths: ['menuData','tagsList' ],
      enable: true,
    },
  }
);
