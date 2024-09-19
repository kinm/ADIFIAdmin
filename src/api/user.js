import request from '@/utils/request'

// 用戶列表枚举
export function userEnums(params) {
  return request({
    url: 'user/enums',
    params
  })
}

// 用戶列表
export function userList(params) {
  return request({
    url: 'user/list',
    params
  })
}

// 修改聯盟委员
export function userRole(params) {
  return request({
    url: 'user/role',
    params
  })
}

// 狀態設置s
export function userStatus(params) {
  return request({
    url: 'user/status',
    params
  })
}

// 修改用戶等級
export function userChangeLevel(params) {
  return request({
    url: 'user/change-level',
    params
  })
}

// 備註內容
export function userRemark(data) {
  return request({
    url: 'user/remark',
    method: 'post',
    data
  })
}

// 查看數據
export function userData(params) {
  return request({
    url: 'user/data',
    params
  })
}

// 收益記錄
export function incomeDistribute(params) {
  return request({
    url: 'user/get-income-distribute',
    params
  })
}

// 收支記錄
export function incomeLog(params) {
  return request({
    url: 'user/get-income-log',
    params
  })
}

// 團隊詳情
export function userGroup(params) {
  return request({
    url: 'user/group',
    params
  })
}

// 獲取直推信息
export function getDirectById(params) {
  return request({
    url: 'user/get-direct-by-id',
    params
  })
}

// 修改推薦人
export function userParent(params) {
  return request({
    url: 'user/parent',
    params
  })
}

// 增加额度接口
export function userAddQuota(data) {
  return request({
    url: 'user/add-quota',
    method: 'post',
    data
  })
}

// 用户余额详情列表
export function userLogs(params) {
  return request({
    url: 'user/logs',
    params
  })
}
