
<template>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>


</template>

<script setup>
import {getUserAPI } from '@/apis/users'
import { useUserStore } from '@/store/user';

const useUser = useUserStore()
getUserAPI().then(res => {
  if(res.data.status === 1){
    useUser.user = res.data.username
  }
})
</script>

<style scoped>

</style>
