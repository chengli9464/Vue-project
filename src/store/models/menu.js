import { defineStore } from 'pinia';
import {ref} from 'vue'
import { getMenuAPI } from '@/apis/menu';

export const useMenuStore = defineStore('menu', () => {
  
  const menuData = ref([]);

  const getMenu = async () =>{
     return await getMenuAPI()
  }


  return{
    menuData,
    getMenu
  }
});
