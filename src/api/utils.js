import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'site/login',
    method: 'post',
    data
  })
}

export function getInfo(params) {
  return request({
    url: 'site/user-info',
    params
  })
}

export function logout(params) {
  return request({
    url: 'site/logout',
    params
  })
}
// 修改密碼
export function passcodeEdit(data) {
  return request({
    url: 'auth/passcode-edit',
    method: 'post',
    data
  })
}

// 获取阿里token
export function getOssInfo(params) {
  return request({
    url: 'common/oss',
    params
  })
}

// 获取阿里私有上传接口token
export function commonPrivateOss(params) {
  return request({
    url: 'common/private-oss',
    params
  })
}
