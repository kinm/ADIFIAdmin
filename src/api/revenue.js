import request from '@/utils/request'

// 靜態收益列表
export function incomeList1(params) {
  return request({
    url: 'income/list1',
    params
  })
}

// 列表相關枚舉
export function incomeEnums(params) {
  return request({
    url: 'income/enums',
    params
  })
}

// 動態收益列表
export function incomeList2(params) {
  return request({
    url: 'income/list2',
    params
  })
}

// 永凍激勵s
export function incomeList3(params) {
  return request({
    url: 'income/list3',
    params
  })
}

// 永凍補償
export function incomeList4(params) {
  return request({
    url: 'income/list4',
    params
  })
}

// .聯盟收益
export function incomeList5(params) {
  return request({
    url: 'income/list5',
    params
  })
}

// .獲取動態收益詳情
export function incomeDynamicDetail(params) {
  return request({
    url: 'income/dynamic-detail',
    params
  })
}

// .聯盟委员收益导出
export function incomeExportDounion(params) {
  return request({
    url: 'income-export/dounion',
    params
  })
}

// .永动补偿收益导出
export function incomeExportDobu(params) {
  return request({
    url: 'income-export/dobu',
    params
  })
}

// .靜態收益導出
export function incomeList1Export(params) {
  return request({
    url: 'income/list1-export',
    params
  })
}

// .動態收益導出
export function incomeList2Export(params) {
  return request({
    url: 'income/list2-export',
    params
  })
}

// .永動激勵
export function incomeList3Export(params) {
  return request({
    url: 'income/list3-export',
    params
  })
}

// 獲取靜態收益設置
export function settingGetJincome(params) {
  return request({
    url: 'setting/get-jincome',
    params
  })
}

// 靜態收益設置
export function settingSetJincome(data) {
  return request({
    url: 'setting/set-jincome',
    method: 'post',
    data
  })
}

// APE静态收益重发需求
export function staticBuCtx(params) {
  return request({
    url: 'static-bu/ctx',
    params
  })
}

// APE静态收益重发需求创建任务
export function staticBuCreateTask(params) {
  return request({
    url: 'static-bu/create-task',
    params
  })
}
