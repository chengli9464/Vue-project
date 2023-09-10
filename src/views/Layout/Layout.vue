<template>
  <div class="common-layout">
    <el-container>
      <!-- 侧边栏 -->
        <LayoutAsideVue />
      <el-container>
        <el-header style="padding: 0">
          <LayoutHeaderVue />
        </el-header>

        <el-main>
          <LayoutTag /> 
          <!-- 二级路由出口 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script setup>
import LayoutHeaderVue from '@/views/Layout/Components/LayoutHeader.vue';
import LayoutAsideVue from '@/views/Layout/Components/LayoutAside.vue';
import LayoutTag from './Components/LayoutTag.vue';
</script>


<style lang="scss" scoped>

.common-layout{
  width:100%;
  height: 100%;
}
.el-container{
  width:100%;
  height: 100%;
}

.tag{
  background: #235f9b;
  margin: 0;
}

.el-main{
  width:100%;
  height: 100%;
}

</style>