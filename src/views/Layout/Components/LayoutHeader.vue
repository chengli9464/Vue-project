<template>
  <nav class="appNav">
    <ul v-if="isLogin.value">
      <li>
        <a href=""></a>
        <router-link to="/login">请先登录</router-link>
      </li>
      <li>
        <a href="">帮助中心</a>
      </li>
      <li>
        <a href="">联系我们</a>
      </li>
    </ul>
    <ul v-else>
      <li>您好！ {{ useUser.userName }}</li>
      <li>
        <router-link to="/login" @click="quitLogin">退出登录</router-link>
      </li>
      <li>
        <a href="">帮助中心</a>
      </li>
      <li>
        <a href="">联系我们</a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import { useUserStore } from '@/store/models/user';
import { useMenuStore } from '@/store/models/menu';

const isLogin = ref(false)
const useUser = useUserStore()
const useMenu = useMenuStore()


const quitLogin = () =>{
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  useMenu.menuData = [];
  console.log(useMenu.menuData);
}

onMounted(()=>{
  localStorage.getItem('token') === null || '' ? isLogin.value =false: isLogin.value =true
})


</script>

<style scoped lang="scss">
.appNav {
  background: #434445;
  height: 50px;
  display: flex;
  padding: 0;
}

ul {
  
  li {
    display: inline;
    margin-right: 30px;
  }
  a{
    color: #fff;
  }
}
</style>
@/store/models/user