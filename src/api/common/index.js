import axios from '@/libs/api.request'

export const getWxConfig = (url) => {
  url = url || 'http://192.168.50.101:8082/'
  return axios.request({
    url: 'Common/GetWxJsApi',
    params: {
      url
    },
    method: 'get'
  })

}

export const GetUser = (uid) => {
  return axios.request({
    url: 'User/GetUser',
    params: {
      uid
    },
    method: 'get'
  })

}

export const UserForWX = (Datas) => {
  return axios.request({
    url: 'User/RegisterUserForWX',
    data: Datas,
    method: 'post'
  })

}
