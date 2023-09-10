<template>
  <div>
   <el-input v-model="searchKey" placeholder="请输入商品参数" clearable ></el-input>
   
    <el-button type="primary" size="default" @click="searchList(searchKey)">搜索</el-button>
    <el-button type="primary" size="default" @click="addList">新增</el-button>
  </div>
  <div class="table">
    <el-table :data="goodsData" stripe style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="商品编号" width="100" />
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
      <el-table-column prop="price" label="商品售价(￥)" width="120" />
      <el-table-column prop="inventory" label="库存" width="100" />
      <el-table-column prop="sales" label="销量" width="100" />
      <el-table-column label="操作" width="180">
        <template #default="scope">     
        <el-button size="default" @click="editList(scope.row.id)">编辑</el-button>
        <el-button type="danger" size="default" @click="deleteList(scope.row.id)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 弹出输入框 -->
  <el-dialog
    v-model="centerDialogVisible"
    title="请输入参数"
    width="30%"
    align-center
  >
  <el-form
    :model="ruleForm"
    class="demo-ruleForm"
    status-icon
  >
  <el-form-item label="商品名称" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
  <el-form-item label="商品价格" prop="price">
      <el-input v-model="ruleForm.price" />
    </el-form-item>

    <el-form-item label="商品库存" prop="price">
      <el-input v-model="ruleForm.inventory" />
    </el-form-item>

    <el-form-item label="商品销售" prop="price">
      <el-input v-model="ruleForm.sales" />
    </el-form-item>
    <el-form-item label="商品图片url" prop="price">
      <el-input v-model="ruleForm.url" />
    </el-form-item>
  </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelCommit">取消</el-button>
        <el-button type="primary" @click="commit()">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref,} from 'vue';
import { getGoodsApi ,deleteGoodsAPI, addGoodsAPI, editGoodsAPI } from '@/apis/goods';

const goodsData = ref([]);
const searchKey =ref('')
const isEdit = ref(false)
let centerDialogVisible = ref(false)
const ruleForm = ref({
  id:'',
  name:'',
  price:'',
  inventory: '',
  sales: '',
  url: '',
  rules:[
  ],
})

// 获取货物信息
const getGoods = async () => {
  goodsData.value = await getGoodsApi().then((res) => res.data);
}
getGoods()

const addList = () =>{
  centerDialogVisible.value = true
}

//提交函数
const commit = async () =>{
  if(!isEdit.value){
    commitAddList()
    resetForm()
  }else{
    commitEditList()
    resetForm()
  }

}

// 新增的提交函数
const commitAddList = async ()=>{
  centerDialogVisible.value = false
  const res = await addGoodsAPI(ruleForm.value).then(res => res.data)
  goodsData.value = res
}

// 编辑修改提交函数
const commitEditList = async () =>{
  centerDialogVisible.value = false
  const res = await editGoodsAPI(ruleForm.value).then(res => res.data)
  goodsData.value = res
}

const cancelCommit = () =>{
  isEdit.value = false
  centerDialogVisible.value = false
  resetForm()
}



const deleteList = async (id)=>{
  goodsData.value = await deleteGoodsAPI(id).then(res => res.data)
}

const searchList = (key)=>{
  console.log(key);

}

const editList = async (id) =>{
  // 打开表单
  centerDialogVisible.value = true
  isEdit.value = true
  console.log(id);
  const found = goodsData.value.find((element) => element.id === id)
  ruleForm.value = {
    ...found
  }
}


// 重置
const resetForm = () => {
  return ruleForm.value = {
  id:'',
  name:'',
  price:'',
  inventory: '',
  sales: '',
  url: '',
  rules:[
  ],
}
}
</script>

<style>
.table {
  margin: 10px;
}
</style>
