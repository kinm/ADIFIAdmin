import request from '@/utils/request'

// 订单列表
export function orderList(params) {
  return request({
    url: 'order/list',
    params
  })
}

// 参与设置
export function orderSet(data) {
  return request({
    url: 'order/set',
    method: 'post',
    data
  })
}

// 参与设置回显
export function orderConfig(params) {
  return request({
    url: 'order/config',
    params
  })
}

// 領取記錄列表
export function withdrawList(params) {
  return request({
    url: 'withdraw/list',
    params
  })
}

// 領取記錄列表枚舉：
export function withdrawEnums(params) {
  return request({
    url: 'withdraw/enums',
    params
  })
}

// 修改備註
export function withdrawChangeRemark(data) {
  return request({
    url: 'withdraw/change-remark',
    method: 'post',
    data
  })
}

// 修改備註
export function withdrawReject(data) {
  return request({
    url: 'withdraw/reject',
    method: 'post',
    data
  })
}

// 領取記錄列表導出：
export function withdrawExport(params) {
  return request({
    url: 'withdraw/export',
    params
  })
}

// 通過
export function withdrawPass(data) {
  return request({
    url: 'withdraw/pass',
    method: 'post',
    data
  })
}

// 批量審核通過
export function withdrawBatchReview(params) {
  return request({
    url: 'withdraw/batch-review',
    params
  })
}

// 后台增加参与订单
export function orderCreate(data) {
  return request({
    url: 'order/create',
    method: 'post',
    data
  })
}

// 訂單枚舉
export function orderEnums(params) {
  return request({
    url: 'order/enums',
    params
  })
}

// 自動審核獲取
export function withdrawAutoGet(params) {
  return request({
    url: 'withdraw/auto-get',
    params
  })
}

// 自動審核設置
export function withdrawAutoSet(data) {
  return request({
    url: 'withdraw/auto-set',
    method: 'post',
    data
  })
}

// 获取提现设置
export function getDrawRate(params) {
  return request({
    url: 'setting/get-draw-rate',
    params
  })
}

// 提现设置
export function setDrawRate(data) {
  return request({
    url: 'setting/set-draw-rate',
    method: 'post',
    data
  })
}

// 提现记录，枚举
export function balanceWithdrawEnums(params) {
  return request({
    url: 'balance-withdraw/enums',
    params
  })
}

// 提现记录列表
export function balanceWithdrawList(params) {
  return request({
    url: 'balance-withdraw/list',
    params
  })
}

// 提现审核拒绝
export function balanceWithdrawReject(data) {
  return request({
    url: 'balance-withdraw/reject',
    method: 'post',
    data
  })
}

// 提现审核通过
export function balanceWithdrawPass(data) {
  return request({
    url: 'balance-withdraw/pass',
    method: 'post',
    data
  })
}

// 导出提现记录
export function balanceWithdrawExport(data) {
  return request({
    url: 'balance-withdraw/export',
    method: 'post',
    data
  })
}

// 提现记录批量審核通過
export function balanceWithdrawBatchReview(params) {
  return request({
    url: 'balance-withdraw/batch-review',
    params
  })
}

// 提现记录自動審核獲取
export function balanceWithdrawAutoGet(params) {
  return request({
    url: 'balance-withdraw/auto-get',
    params
  })
}

// 提现记录自動審核設置
export function balanceWithdrawAutoSet(data) {
  return request({
    url: 'balance-withdraw/auto-set',
    method: 'post',
    data
  })
}

// 转账记录
export function transferList(params) {
  return request({
    url: 'transfer/list',
    params
  })
}

// 转账记录导出
export function transferExport(params) {
  return request({
    url: 'transfer/export',
    params
  })
}

// 转账退回
export function transferRollbackTrans(params) {
  return request({
    url: 'transfer/rollback-trans',
    params
  })
}
