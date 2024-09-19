import request from '@/utils/request'

// 抽取記錄列表
export function apeWorldList(params) {
  return request({
    url: 'ape-world/list',
    params
  })
}

// 抽取記錄列表相關枚舉
export function apeWorldEnum(params) {
  return request({
    url: 'ape-world/enum',
    params
  })
}

// 合成記錄列表
export function apeWorldGetGatherLog(params) {
  return request({
    url: 'ape-world/get-gather-log',
    params
  })
}

// 猿世界設置詳情
export function apeWorldGetConfig(params) {
  return request({
    url: 'ape-world/get-config',
    params
  })
}

// 猿世界設置
export function apeWorldSet(data) {
  return request({
    url: 'ape-world/set',
    method: 'post',
    data
  })
}

// 獲取NFT獎勵
export function apeWorldGetIncomeLog(params) {
  return request({
    url: 'ape-world/get-income-log',
    params
  })
}

// 收藏者获取期数
export function apeWorldGetDate(params) {
  return request({
    url: 'ape-world/get-date',
    params
  })
}

// 收藏者设置
export function apeWorldCollect(data) {
  return request({
    url: 'ape-world/collect',
    method: 'post',
    data
  })
}
