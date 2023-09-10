import httpInstance from '@/utils/http'

export const getGoodsApi = () =>{
  return httpInstance({
    url:'/users/goods',
    method:'get'
  })
}

export const deleteGoodsAPI = (id) =>{
  return httpInstance({
    url:'/users/deleteGoods',
    method:'post',
    data:{
      id
    }
  })
}

export const addGoodsAPI = (obj) =>{
  console.log(11111111, obj);
  return httpInstance({
    url:'/users/addGoods',
    method:'post',
    data: obj,
  })
}

export const editGoodsAPI = (obj) =>{
  return httpInstance({
    url:'/users/editGoods',
    method : 'post',
    data: obj   
  })
}