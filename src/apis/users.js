import httpInstance from "@/utils/http";


export const loginAPI = (username, password) => {
  return httpInstance({
    url: '/login',
    method: 'post',
    data: {
      username,
      password,
    },
  });
};

export const registerAPI = (username, password) => {
  return httpInstance({
    url: '/register',
    method: 'post',
    data: {
      username,
      password,
    },
  });
};

export const getUserAPI = () => {
  return httpInstance({
    url: '/users',
    method: 'get',
  });
};

export const getUserImgAPI = ()=>{
  return httpInstance({
    url:'/users/image',
    method:'get'
  })
}

