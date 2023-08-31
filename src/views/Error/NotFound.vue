<template>
  <p>404 未找到页面</p>
</template>

<script setup>
import router from '@/router';

  setTimeout(()=>{
    localStorage.getItem('token') === null? router.push('/login'): router.push('/home')
  },1000)
  
</script>