import axios from 'axios'
import { Message } from 'element-ui'
import Store from '@/store'
import qs from 'qs'
import Router from '@/router'
import { getToken } from '@/utils/auth'
const _axios = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})

let flag = true
// 請求拦截
_axios.interceptors.request.use(
  (config) => {
    config.headers.token = getToken()
    if (config.method === 'post' && config.josn) {
      if (config.upload) {
        config.headers['Content-Type'] = 'multipart/form-data'
      } else {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        config.data = qs.stringify(config.data)
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应
_axios.interceptors.response.use(
  (res) => {
    if (res.config.upload) {
      if (res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        Message.error(res.statusText)
        return Promise.reject(res)
      }
    }
    if (res.data.status === 0) {
      return res.data
    } else if (res.data.status === 401) {
      if (flag) {
        Message.error(res.data.message)
        flag = false
      }
      setTimeout(() => { flag = true }, 3000)
      Store.dispatch('user/logout')
      Router.push('/')
      return Promise.reject(res.data.message)
    } else {
      Message.error(res.data.message)
      return Promise.reject(res.data.message)
    }
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      Store.dispatch('user/logout')
      Message.error(error.response.data.message)
      Router.push('/?redirect=' + window.location.href.split('#')[1])
    }
    return Promise.reject(error)
  }
)
export default _axios
