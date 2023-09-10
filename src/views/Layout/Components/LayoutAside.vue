<template>
  <el-aside :width="useCollapse.isCollapse ? '64px' : '180px'">
    <el-menu
      :default-active="$route.path"
      router
      :collapse="useCollapse.isCollapse"
      :collapse-transition="false"
      text-color="green"
    >
      <el-menu-item
        v-for="item in noChildrenMenu"
        :key="item.name"
        :index="item.path"
        @click="openMenu(item.path)"
      >
        <el-icon>
          <component :is="item.icons" />
        </el-icon>
        <template #title>
          <span>{{ item.label }}</span>
        </template>
      </el-menu-item>

      <el-sub-menu
        v-for="item in hasChildrenMenu"
        :key="item.label"
        :index="item.path"
      >
        <template #title>
          <el-icon>
            <component :is="item.icons" />
          </el-icon>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group
          v-for="subItem in item.children"
          :key="subItem.name"
        >
          <el-menu-item
            :index="item.path + subItem.path"
            @click="openSubMenu(item.path, subItem.path)"
          >
            <el-icon>
              <component :is="subItem.icons" />
            </el-icon>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { useMenuStore } from '@/store/models/menu';
import { computed } from 'vue';
import { useCollapseStore } from '@/store/models/collapse';
import router from '@/router';

const useCollapse = useCollapseStore();

//从pinia中拿菜单数据
const useMenu = useMenuStore();
// 筛选出有children属性的数组
const hasChildrenMenu = computed(() => {
  return useMenu.menuData.filter((item) => item.children);
});

// 筛选出无children属性的数组
const noChildrenMenu = computed(() => {
  return useMenu.menuData.filter((item) => !item.children);
});

const openMenu = (path) => {
  router.push(path);
  const foundTags = useMenu.tagsList.find((element) => element.path === path);
  if (!foundTags) {
    const found = noChildrenMenu.value.find((element) => element.path === path);
    console.log(found);
    useMenu.tagsList.push(found);
  }
};

const openSubMenu = (path1, path2) => {
  router.push(path1 + path2);
  // 先找tag列表里面有没有path2 没找到为undefined
  const foundSubTags = useMenu.tagsList.find(
    (element) => element.path === path2
  );
  if (!foundSubTags) {
    // 找第一路径元素
    const found = hasChildrenMenu.value.find(
      (element) => element.path === path1
    );
    // 找第二路径元素
    const subFound = found.children.find(
      (subElement) => subElement.path === path2
    );
    // 将第二路径元素push进tag数组中
    useMenu.tagsList.push(subFound);
  }
};
</script>

<style scoped lang="scss">
.el-aside {
  height: 100%;
}
</style>
