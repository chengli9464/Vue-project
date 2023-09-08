<template>
  <div>
    <el-button type="primary" size="default" @click="addList">新增</el-button>
    <el-button type="success" size="default" @click="refreshList"
      >重置</el-button
    >
    <el-button type="primary" size="default" @click="searchList"
      >搜索</el-button
    >
  </div>
  <div class="table">
    <el-table :data="goodsData" stripe style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="num" label="商品编号" width="100" />
      <el-table-column prop="url" label="商品图">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-image
              :src="scope.row.url"
              style="width: 80px; height: 80px"
              preview-teleported
              :preview-src-list="[scope.row.url]"
              :lazy="true"
            ></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" />
      <el-table-column prop="price" label="商品售价" width="100" />
      <el-table-column prop="inventory" label="库存" width="100" />
      <el-table-column prop="sales" label="销量" width="100" />
      <el-table-column label="操作" width="180">
        <el-button size="default">编辑</el-button>
        <el-button type="danger" size="default">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import { getGoodsApi } from '@/apis/goods';

const goodsData = ref([]);
onMounted(async () => {
  goodsData.value = await getGoodsApi().then((res) => res.data);
});

const addList = () =>{

}

const refreshList = ()=>{

}

const searchList = ()=>{

}
</script>

<style>
.table {
  margin: 10px;
}
</style>
