<template>
  <div class="main-login">
    <div class="Vcenter">
      <div class="appLogin">
        <div class="border_corner border_corner_left_top"></div>
        <div class="border_corner border_corner_right_top"></div>
        <div class="border_corner border_corner_left_bottom"></div>
        <div class="border_corner border_corner_right_bottom"></div>
        <div class="form">
          <el-form
            ref="formRef"
            :model="form"
            :rules="rules"
            label-width="80px"
            :inline="false"
          >
            <el-form-item label="账号" prop="username">
              <el-input
                v-model.trim="form.username"
                placeholder="请输入账号"
                clearable
                @keyup.enter="doLogin"
                style="width: 210px"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="form.password"
                type="password"
                @keyup.enter="doLogin"
                placeholder="请输入密码"
                clearable
                style="width: 210px"
              ></el-input>
            </el-form-item>
            <div style="padding-left: 50px">
              <el-checkbox v-model="form.agree" prop="agree"
                >我已同意隐私条款与服务条款</el-checkbox
              >
            </div>

            <el-button @click="doLogin" type="primary">登录</el-button>
            <el-button type="primary" @click="$router.push('/register')"
              >注册</el-button
            >
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';
import { loginAPI } from '@/apis/users';

import { useUserStore } from '@/store/models/user';
import { useMenuStore } from '@/store/models/menu';

// Pinia 响应式数据接收 不能解构赋值出来，解构出来的数据不是响应式的，方法可以直接解构
// 如果想不丢失响应式 使用storeToRefs()方法
// import {storeToRefs} from 'pinia'
const useUser = useUserStore();
const useMenu = useMenuStore();

//1、定义表单对象
const form = ref({
  username: '',
  password: '',
  agree: true,
});

//2、定义表单规则
const rules = {
  username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度为6-18位', trigger: 'blur' },
  ],
  //是否同意协议的规则
  agree: [
    {
      validator: (rule, value, callback) => {
        if (value) {
          callback();
        } else {
          callback(new Error('请勾选隐私条款与服务条款协议'));
        }
      },
    },
  ],
};

//3、获取form做统一校验
const formRef = ref(null);

//4、登录提交按钮函数
const doLogin = () => {
  //***调用实例方法***
  formRef.value.validate(async (valid) => {
    // valid 所有表单都通过为true
    // console.log(valid);
    if (valid) {
      const { username, password } = form.value;
      const res = await loginAPI(username, password);
      // 账号密码在后端判断了 正确传了数字1
      if (res.status === 200) {
        if (res.data.status === 1) {
          // 将token存到localStorage中
          localStorage.setItem('token', res.data.token);
          //将登录信息放进pinia中
          useUser.userName = username;  
          useMenu.menuData = res.data.menu
          ElMessage({
            message: '登录成功',
            type: 'success',
            duration: 1000,
          });
          router.push(`/home`);
        } else {
          ElMessage({
            message: '账号或密码不正确',
            type: 'error',
            duration: 1000,
          });
        }
      } else {
        ElMessage({
          message: '无法连接到服务器',
          type: 'error',
          duration: 1000,
        });
      }
    }
  });
};
</script>

<style scoped lang="scss">
.main-login {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.Vcenter {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 50%;
  height: 50%;
  margin: auto;
}

.appLogin {
  clear: both;
  margin: auto;
  vertical-align: middle;
  padding: 0 50px 0 50px;
  border: 1px solid #21a7e1;
  box-shadow: 5px 5px 10px 10px rgba(24, 68, 124, 0.4);
  padding-top: 10px;
  padding-bottom: 50px;
  border-radius: 6px;
  width: 300px;
  position: relative;
  background-color: rgba(10, 163, 245, 0);
  align-self: center;
  height: 240px;
}
/*四个角框*/
.border_corner {
  z-index: 2500;
  position: absolute;
  width: 19px;
  height: 19px;
  background: rgba(0, 0, 0, 0);
  border: 4px solid #1fa5f1;
}

.border_corner_left_top {
  top: -2px;
  left: -2px;
  border-right: none;
  border-bottom: none;
  border-top-left-radius: 6px;
}

.border_corner_right_top {
  top: -2px;
  right: -2px;
  border-left: none;
  border-bottom: none;
  border-top-right-radius: 6px;
}

.border_corner_left_bottom {
  bottom: -2px;
  left: -2px;
  border-right: none;
  border-top: none;
  border-bottom-left-radius: 6px;
}

.border_corner_right_bottom {
  bottom: -2px;
  right: -2px;
  border-left: none;
  border-top: none;
  border-bottom-right-radius: 6px;
}

.form {
  padding-top: 50px;
}
</style>
@/store/models/user
