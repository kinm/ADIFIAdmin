import request from '@/utils/request'

// 用户列表相關枚舉
export function userEnums(params) {
  return request({
    url: 'adifi-user/enums',
    params
  })
}

// 用户列表
export function userList(params) {
  return request({
    url: 'adifi-user/list',
    params
  })
}

// 狀態設置
export function userStatus(data) {
  return request({
    url: 'adifi-user/status',
    method: 'post',
    data
  })
}

// 設置推薦人
export function userParent(data) {
  return request({
    url: 'adifi-user/parent',
    method: 'post',
    data
  })
}

// 設置等級
export function userChangeLevel(data) {
  return request({
    url: 'adifi-user/change-level',
    method: 'post',
    data
  })
}

// 兌換訂單列表相關枚舉
export function fenhongEnums(params) {
  return request({
    url: 'adifi-fenhong/enums',
    params
  })
}

// 兌換訂單列表
export function fenhongList(params) {
  return request({
    url: 'adifi-fenhong/list',
    params
  })
}

// 兌換訂單列表團隊獎勵
export function fenhongIncomeList(params) {
  return request({
    url: 'adifi-fenhong/income-list',
    params
  })
}

// 获取团队奖励设置
export function getAdifiTeamFenhong(params) {
  return request({
    url: 'setting/get-adifi-team-fenhong',
    params
  })
}

// 设置团队奖励设置
export function setAdifiTeamFenhong(data) {
  return request({
    url: 'setting/set-adifi-team-fenhong',
    method: 'post',
    data
  })
}

// 获取兌換地址設置
export function getAdifiExchangeLink(params) {
  return request({
    url: 'setting/get-adifi-exchange-link',
    params
  })
}

// 设置兌換地址設置
export function setAdifiExchangeLink(data) {
  return request({
    url: 'setting/set-adifi-exchange-link',
    method: 'post',
    data
  })
}

// 沽空列表枚举
export function kongEnums(params) {
  return request({
    url: 'adifi-kong/enums',
    params
  })
}

// 沽空列表
export function kongList(params) {
  return request({
    url: 'adifi-kong/list',
    params
  })
}

// 沽空列表团队奖励
export function kongIncomeList(params) {
  return request({
    url: 'adifi-kong/income-list',
    params
  })
}

// 沽空列表获取团队奖励设置
export function getAdifiTeamKong(params) {
  return request({
    url: 'setting/get-adifi-team-kong',
    params
  })
}

// 沽空列表设置团队奖励设置
export function setAdifiTeamKong(data) {
  return request({
    url: 'setting/set-adifi-team-kong',
    method: 'post',
    data
  })
}

// 燃燒列表枚举
export function dropEnums(params) {
  return request({
    url: 'adifi-drop/enums',
    params
  })
}

// 燃燒列表
export function dropList(params) {
  return request({
    url: 'adifi-drop/list',
    params
  })
}

// 燃燒列表获取直推奖励设置
export function getDropDirect(params) {
  return request({
    url: 'setting/get-drop-direct',
    params
  })
}

// 燃燒列表设置直推奖励设置
export function setDropDirect(data) {
  return request({
    url: 'setting/set-drop-direct',
    method: 'post',
    data
  })
}

// 領取記錄枚举
export function withdrawOrderEnums(params) {
  return request({
    url: 'adifi-withdraw-order/enums',
    params
  })
}

// 領取記錄
export function withdrawOrderList(params) {
  return request({
    url: 'adifi-withdraw-order/list',
    params
  })
}

// 質押記錄枚举
export function stakedEnums(params) {
  return request({
    url: 'adifi-staked/enums',
    params
  })
}

// 質押記錄
export function stakedList(params) {
  return request({
    url: 'adifi-staked/list',
    params
  })
}

// 質押記錄质押明细列表
export function stakedStakedList(params) {
  return request({
    url: 'adifi-staked/staked-list',
    params
  })
}

// 質押記錄团队收益列表
export function stakedTeamIncomeList(params) {
  return request({
    url: 'adifi-staked/team-income-list',
    params
  })
}

// 媒体列表
export function mediumList(params) {
  return request({
    url: 'adifi-medium/list',
    params
  })
}

// 媒体新增
export function mediumAdd(data) {
  return request({
    url: 'adifi-medium/add',
    method: 'post',
    data
  })
}

// 媒体编辑
export function mediumEdit(data) {
  return request({
    url: 'adifi-medium/edit',
    method: 'post',
    data
  })
}

// 媒体删除
export function mediumDel(data) {
  return request({
    url: 'adifi-medium/del',
    method: 'post',
    data
  })
}

// 提現列表枚舉
export function withdrawEnums(params) {
  return request({
    url: 'adifi-withdraw/enums',
    params
  })
}

// 提現列表
export function withdrawList(params) {
  return request({
    url: 'adifi-withdraw/list',
    params
  })
}

// 結算記錄列表枚舉
export function adifiKongEnums(params) {
  return request({
    url: 'adifi-kong/enums',
    params
  })
}

// 結算記錄列表
export function adifiKongSettleList(params) {
  return request({
    url: 'adifi-kong/settle-list',
    params
  })
}

// 用户列表-校准记录
export function manualFetchEvents(data) {
  return request({
    url: 'adifi-user/manual-fetch-events',
    method: 'post',
    data
  })
}

// 官网链接获取
export function settingGetOffUrl(params) {
  return request({
    url: 'setting/get-off-url',
    params
  })
}

// 官网链接设置
export function settingSetOffUrl(data) {
  return request({
    url: 'setting/set-off-url',
    method: 'post',
    data
  })
}
