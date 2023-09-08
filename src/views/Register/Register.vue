<template>
  <div>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="80px"
      :inline="false"
      style="width: 300px"
    >
      <el-form-item label="账号：" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="form.agree"
          >我已同意隐私条款与服务条款</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="$router.push('/login')">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { registerAPI } from '@/apis/users';
import { ElMessage } from 'element-plus';
import router from '@/router';

const form = ref({
  username: '',
  password: '',
  agree: true,
});

const rules = {
  username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度为6-18位', trigger: 'blur' },
  ],
  agree: [
    {
      validator: (rule, valid, callback) => {
        if (valid) {
          callback();
        } else {
          callback(new Error('请输入正确的账号密码'));
        }
      },
    },
  ],
};

const formRef = ref(null);

const onSubmit = () => {
  formRef.value.validate(async (valid) => {
    console.log(valid);
    const { username, password } = form.value;
    if (valid) {
      const res = await registerAPI(username, password);
      if (res.data.status === 0) {
        ElMessage({
          message: '注册成功',
          type: 'success',
          duration: 1000,
        });
        router.push('/login');
      }
    }
  });
};
</script>

<style></style>
