import request from '@/utils/request'

// 獲得系統設置
export function settingGetSystem(params) {
  return request({
    url: 'setting/get-system',
    params
  })
}

// 設置系統設置
export function settingSetSystem(data) {
  return request({
    url: 'setting/set-system',
    method: 'post',
    data
  })
}

// 獲取收款賬戶
export function settingGetAcc(params) {
  return request({
    url: 'setting/get-acc',
    params
  })
}

// 設置收款賬戶
export function settingSetAcc(data) {
  return request({
    url: 'setting/set-acc',
    method: 'post',
    data
  })
}

// 添加收款賬戶
export function settingAddAcc(data) {
  return request({
    url: 'setting/add-acc',
    method: 'post',
    data
  })
}

// 刪除收款賬戶
export function settingDelAcc(data) {
  return request({
    url: 'setting/del-acc',
    method: 'post',
    data
  })
}
