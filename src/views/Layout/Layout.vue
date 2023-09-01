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
import { useMenuStore } from '@/store/models/menu';

//从后端获取列表信息并赋值给pinia中的数据
const useMenu = useMenuStore()
useMenu.getMenu().then(res =>useMenu.menuData =  res.data)


</script>