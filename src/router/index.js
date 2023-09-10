// 导入路由
import { createRouter, createWebHistory } from 'vue-router';
// 导入组件
import Login from '@/views/Login/Login.vue';
import Register from '@/views/Register/Register.vue';

import Layout from '@/views/Layout/Layout.vue';
import NotFound from '@/views/Error/NotFound.vue';
// 主页
import Home from '@/views/Layout/Home/Home.vue';
// 系统管理
import User from '@/views/Layout/System/user.vue';
import Role from '@/views/Layout/System/role.vue';
import Menu from '@/views/Layout/System/menu.vue';
import Notice from '@/views/Layout/System/notice.vue';
// 系统监控
import Online from '@/views/Layout/Monitor/online.vue';
import Job from '@/views/Layout/Monitor/job.vue';
import Server from '@/views/Layout/Monitor/server.vue';
// 系统工具
import Build from '@/views/Layout/tool/build.vue';
import Swagger from '@/views/Layout/tool/swagger.vue';
// 数据分析
import Analysis from '@/views/Layout/Analysis/Analysis.vue';
// 商品中心
import List from '@/views/Layout/Product/List.vue';
import Category from '@/views/Layout/Product/Category.vue';
import Property from '@/views/Layout/Product/Property.vue';
import Brand from '@/views/Layout/Product/Brand.vue';
// 订单中心
import Order from '@/views/Layout/Trade/Order.vue';
import AfterSale from '@/views/Layout/Trade/AfterSale.vue';
import Delivery from '@/views/Layout/Trade/Deliver.vue';



// 定义路由
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/home',
    component: Layout,
    //只在进入路由时触发
    beforeEnter: () => {
      if (localStorage.getItem('token' === null)) {
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
    name:'system',
    component: Layout,
    children: [
      {
        path: 'user',
        name:'user',
        component: User,
      },
      {
        path: 'role',
        name:'role',
        component: Role,
      },
      {
        path: 'menu',
        name:'menu',
        component: Menu,
      },
      {
        path: 'notice',
        name:'notice',
        component: Notice,
      },
    ],
  },
  {
    path: '/monitor',
    name:'monitor',
    component: Layout,
    children: [
      {
        path: 'online',
        name:'online',
        component: Online,
      },
      {
        path: 'job',
        name:'job',
        component: Job,
      },
      {
        path: 'server',
        name:'server',
        component: Server,
      },
    ],
  },
  {
    path: '/tool',
    name:'tool',
    component: Layout,
    children: [
      {
        path: 'build',
        name:'build',
        component: Build,
      },
      {
        path: 'swagger',
        name:'swagger',
        component: Swagger,
      },
    ],
  },
  {
    path: '/analysis',
    component: Layout,
    children:[
      {
        path:'',
        component:Analysis
      }
    ]
  },
  {
    path: '/product',
    name:'product',
    component: Layout,
    children: [
      {
        path: 'list',
        name:'list',
        component: List,
      },
      {
        path: 'category',
        name:'category',
        component: Category,
      },
      {
        path: 'property',
        name:'property',
        component: Property,
      },
      {
        path: 'brand',
        name:'brand',
        component: Brand,
      },
    ],
  },
  {
    path:'/trade',
    name:'trade',
    component:Layout,
    children:[
      {
        path: 'order',
        name:'order',
        component: Order,
      },
      {
        path: 'afterSale',
        name:'afterSale',
        component: AfterSale,
      },
      {
        path:'delivery',
        name:'delivery',
        component:Delivery
      }
    ]
  },
  {
    path: '/login',
    name:'login',
    component: Login,
    beforeEnter: () => {
      localStorage.removeItem('token');
    },
  },
  {
    path: '/register',
    name:'register',
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
