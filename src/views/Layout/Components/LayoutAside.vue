<template>
  <header class="appHeader">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      style="width:200px"
    >
      <el-menu-item
        v-for="item in noChildrenMenu"
        :key="item.name"
        :index="item.name"
        @click="$router.push(`${item.path}`)"
      >
        <template #title>
          <el-icon></el-icon>
          <span>{{ item.label }}</span>
        </template>
      </el-menu-item>
      <el-sub-menu
        v-for="item in hasChildrenMenu"
        :key="item.label"
        :index="item.label"
      >
        <template #title>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group
          v-for="subItem in item.children"
          :key="subItem.name"
        >
          <el-menu-item :index="subItem.name" @click="$router.push(`${item.path}`+`${subItem.path}`)">{{ subItem.label }}</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </header>
</template>

<script setup>
import { useMenuStore } from '@/store/models/menu';
import { computed } from 'vue';

//从pinia中拿菜单数据
const useMenu = useMenuStore();
// 筛选出有children属性的数组
const hasChildrenMenu = computed(() => {
  return useMenu.menuData.filter((item) => item.children);
});
console.log(useMenu.menuData);
// 筛选出无children属性的数组
const noChildrenMenu = computed(() => {
  return useMenu.menuData.filter((item) => !item.children);
});

</script>

<style scoped lang="scss">

</style>
