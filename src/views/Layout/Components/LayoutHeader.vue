<template>
  <el-header height="" class="header">
    <div class="left-content">
      <el-button size="default" @click="changeCollapse" plain>
        <el-icon :size="20"><Operation /></el-icon>
      </el-button>
    </div>
    <div class="right-content">
      <nav class="appNav">
        <ul>
          <li>您好！ {{ useUser.userName }}</li>
          <li>
            <el-image
              :src="getImg"
              fit="fill"
              :lazy="true"
              class="head-img"
            ></el-image>
          </li>
          <li>
            <el-link type="danger" target="_blank" @click="quitLogin"
              >退出登录</el-link
            >
          </li>
        </ul>
      </nav>
    </div>
  </el-header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/store/models/user';
import { useMenuStore } from '@/store/models/menu';
import { useCollapseStore } from '@/store/models/collapse';

import { getUserAPI } from '@/apis/users';
import router from '@/router';

const isLogin = ref(false);
const useUser = useUserStore();
const useMenu = useMenuStore();
const useCollapse = useCollapseStore();
const getImg = ref('');

const changeCollapse = () => useCollapse.changeCollapse();

const quitLogin = () => {
  localStorage.removeItem('token');
  localStorage.setItem('user', '');
  useMenu.menuData = [];
  useMenu.tagsList = [
      {
        path: '/home',
        name: 'home',
        icons:'HomeFilled',
        label: '首页',
      },
    ]
  // 更新token
  const useUser = useUserStore();
  getUserAPI().then((res) => {
    if (res.data.status === 1) {
      useUser.user = res.data.username;
    }
  });
  router.push('/login');
};

onMounted(() => {
  localStorage.getItem('token') === null || ''
    ? (isLogin.value = false)
    : (isLogin.value = true);
});
</script>

<style scoped lang="scss">

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.head-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.appNav {
  background: #434445;
  display: flex;
  padding: 0;
}

ul {
  li {
    display: inline;
    margin-right: 30px;
  }
  a {
    color: #fff;
  }
}
</style>
