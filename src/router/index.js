// 导入路由
import { createRouter, createWebHistory } from 'vue-router';
// 导入组件
import Login from '@/views/Login/Login.vue';
import Register from '@/views/Register/Register.vue';
import Home from '@/views/Home/Home.vue';
import Layout from '@/views/Layout/Layout.vue';
import NotFound from '@/views/Error/NotFound.vue';

import User from '@/views/Layout/system/user.vue';
import Role from '@/views/Layout/system/role.vue';
import Menu from '@/views/Layout/system/menu.vue';
import Notice from '@/views/Layout/system/notice.vue';

import Online from '@/views/Layout/monitor/online.vue';
import Job from '@/views/Layout/monitor/job.vue';
import Server from '@/views/Layout/monitor/server.vue';

import Build from '@/views/Layout/tool/build.vue';
import Swagger from '@/views/Layout/tool/swagger.vue';

// 定义路由
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    //绑定动态路由
    path: '/home',
    component: Layout,
    //只在进入路由时触发
    beforeEnter: () => {
      if (localStorage.getItem('token') === null) {
        ElMessageBox.alert('请登录账号！', '警告', {
          confirmButtonText: '确定',
          callback: () => {
            router.push('/login');
          },
        });
        return false;
      } else {
        return true;
      }
    },
    children: [
      {
        //path为空，默认路由
        path: '',
        component: Home,
      },
    ],
  },
  {
    path: '/system',
    component: Layout,
    children: [
      {
        path: 'user',
        component: User,
      },
      {
        path: 'role',
        component: Role,
      },
      {
        path: 'menu',
        component: Menu,
      },
      {
        path: 'notice',
        component: Notice,
      },
    ],
  },
  {
    path: '/monitor',
    component: Layout,
    children: [
      {
        path: 'online',
        component: Online,
      },
      {
        path: 'job',
        component: Job,
      },
      {
        path: 'server',
        component: Server,
      },
    ],
  },
  {
    path: '/tool',
    component: Layout,
    children: [
      {
        path: 'build',
        component: Build,
      },
      {
        path: 'swagger',
        component: Swagger,
      },
    ],
  },
  {
    path: '/login',
    component: Login,
    beforeEnter: () => {
      localStorage.removeItem('token');
    },
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/:path(.*)',
    component: NotFound,
  },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。hash模式地址栏带#号
  // createWebHistory history模式，地址栏不带#
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
});

//将路由导出
export default router;
