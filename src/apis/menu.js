import  httpInstance  from '@/utils/http'

export const getMenuAPI = ()=>{
  return httpInstance({
    url:'/getMenu',
    method:'get',
  })
}