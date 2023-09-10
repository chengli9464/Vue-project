<template>
  <div class="tags">
    <el-tag
      v-for="item in tags"
      :key="item.label"
      :closable="item.name !== 'home'"
      :disable-transitions="true"
      :round="true"
      >{{ item.label }}</el-tag
    >
  </div>
</template>

<script setup>
import { useMenuStore } from '@/store/models/menu';

const useMenu = useMenuStore();
const tags = useMenu.tagsList;

</script>
