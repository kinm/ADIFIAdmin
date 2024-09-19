import request from '@/utils/request'

// 相關枚舉
export function indexEnums(params) {
  return request({
    url: 'index/enums',
    params
  })
}

// 數據概覽
export function indexStat11(params) {
  return request({
    url: 'index/stat11',
    params
  })
}

// 發放收益總和
export function indexStat12(params) {
  return request({
    url: 'index/stat12',
    params
  })
}

// 靜態收益
export function indexStat21(params) {
  return request({
    url: 'index/stat21',
    params
  })
}

// 賽博園NFT
export function indexStat22(params) {
  return request({
    url: 'index/stat22',
    params
  })
}

// 動態收益
export function indexStat31(params) {
  return request({
    url: 'index/stat31',
    params
  })
}

// 永動激勵
export function indexStat41(params) {
  return request({
    url: 'index/stat41',
    params
  })
}

// 永動補償
export function indexStat42(params) {
  return request({
    url: 'index/stat42',
    params
  })
}

// .聯盟委員
export function indexStat51(params) {
  return request({
    url: 'index/stat51',
    params
  })
}

// .技術服務
export function indexStat52(params) {
  return request({
    url: 'index/stat52',
    params
  })
}

// .获取近7天的余额记录
export function indexStat61(params) {
  return request({
    url: 'index/stat61',
    params
  })
}

// .总充值、实际提现、提现手续费查询
export function indexStat62(params) {
  return request({
    url: 'index/stat62',
    params
  })
}

// 静态收益池的变动日志
export function staticPoolLogs(params) {
  return request({
    url: 'static-pool/logs',
    params
  })
}

// 静态收益池变动值
export function staticPoolDo(data) {
  return request({
    url: 'static-pool/do',
    method: 'post',
    data
  })
}

// 静态收益加备池的变动日志
export function staticPoolAssistLogs(params) {
  return request({
    url: 'static-pool/assist-logs',
    params
  })
}

// 静态收益加备池变动值
export function staticPoolAssist(data) {
  return request({
    url: 'static-pool/assist',
    method: 'post',
    data
  })
}
