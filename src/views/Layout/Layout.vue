<template>

<div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <LayoutAsideVue />
      </el-aside>
      <el-container>
        <el-header style="padding: 0;">
          <LayoutHeaderVue />
        </el-header>
        <el-main>         
    <!-- 二级路由出口 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
  <div>
  </div>
</template>

<script setup>
import LayoutHeaderVue from '@/views/Layout/Components/LayoutHeader.vue';
import LayoutAsideVue from '@/views/Layout/Components/LayoutAside.vue';
import {getUserAPI } from '@/apis/users'
import { useUserStore } from '@/store/models/user';

// console.log(23678423784623);
// //从后端获取列表信息并赋值给pinia中menuData的数据
// const useMenu = useMenuStore()
// useMenu.getMenu().then(res => {
//   useMenu.menuData =  res.data
// })

// 更新token
const useUser = useUserStore()
getUserAPI().then(res => {
  if(res.data.status === 1){
    useUser.user = res.data.username
  }
})


</script>