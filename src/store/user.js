import { defineStore } from 'pinia';
import { ref } from 'vue';

//三个用户模块、token setToken removeToken

//defineStore('唯一表示',回调函数) 返回值是一个函数
export const useUserStore = defineStore(
  'user',
  () => {
    //声明响应式数据

    const userName = ref('')

    //声明操作数据的方法action 支持异步

  
    return {
      userName
    };
  },
  {
    //开启当前模块的持久化
    persist: {
      paths:[ 'userName' ],
      enable:true,
      storage: localStorage
    }
  }
);
 


