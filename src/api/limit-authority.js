import request from '@/utils/request'

// 權限列表
export function authPointList(params) {
  return request({
    url: 'auth/point-list',
    params
  })
}

// 刪除權限接口
export function authPointDel(data) {
  return request({
    url: 'auth/point-del',
    method: 'post',
    data
  })
}

// 添加權限接口
export function authPointAdd(data) {
  return request({
    url: 'auth/point-add',
    method: 'post',
    data
  })
}

// 編輯權限接口
export function authPointEdit(data) {
  return request({
    url: 'auth/point-edit',
    method: 'post',
    data
  })
}

// 角色列表
export function authRoleList(params) {
  return request({
    url: 'auth/role-list',
    params
  })
}

// 權限点集合
export function authAllAuth(params) {
  return request({
    url: 'auth/all-auth',
    params
  })
}

// 新增/編輯角色
export function setRole(data) {
  return request({
    url: 'auth/edit-role',
    method: 'post',
    data
  })
}

// 權限刪除
export function delRole(params) {
  return request({
    url: 'auth/del-role',
    params
  })
}

// 添加後臺用戶
export function addAdmin(data) {
  return request({
    url: 'auth/edit-backend-member',
    method: 'post',
    data
  })
}

// 後臺用戶枚举
export function getAdminEnum(data) {
  return request({
    url: 'auth/role-enums',
    method: 'post',
    data
  })
}

// 获取列表
export function getAdminList(params) {
  return request({
    url: 'auth/backend-member-list',
    params
  })
}

// 賬號禁用
export function setAdminStatus(params) {
  return request({
    url: 'auth/change-backend-member-status',
    params
  })
}

// 刪除賬號
export function delAdmin(params) {
  return request({
    url: 'auth/del-backend-member',
    params
  })
}
