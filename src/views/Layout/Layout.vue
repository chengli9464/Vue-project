<template>
  <div>
    <LayoutNavVue />
    <LayoutHeaderVue />
    <!-- 二级路由出口 -->
    <router-view />
    <LayoutFooter />
  </div>
</template>

<script setup>
import LayoutNavVue from '@/views/Layout/Components/LayoutNav.vue';
import LayoutHeaderVue from '@/views/Layout/Components/LayoutHeader.vue';
import LayoutFooter from '@/views/Layout/Components/LayoutFooter.vue';

</script>