import request from '@/utils/request'

// 参与记录列表
export function xyOrderList(params) {
  return request({
    url: 'xy-order/list',
    params
  })
}

// 参与记录枚举
export function xyOrderEnums(params) {
  return request({
    url: 'xy-order/enums',
    params
  })
}

// 参与数量上限获取回显
export function xyOrderConfig(params) {
  return request({
    url: 'xy-order/buy-config',
    params
  })
}

// 参与数量上限
export function xyOrderSet(data) {
  return request({
    url: 'xy-order/set-config',
    method: 'post',
    data
  })
}

// 个人总质押参与获取
export function getPersonPart(params) {
  return request({
    url: 'setting/get-person-part',
    params
  })
}

// 个人总质押参与设置
export function setPersonPart(data) {
  return request({
    url: 'setting/set-person-part',
    method: 'post',
    data
  })
}

// 提现ADI领取状态枚举
export function xyBalanceWithdrawEnums(params) {
  return request({
    url: 'xy-balance-withdraw/enums',
    params
  })
}

// ADI用户列表
export function balanceWithdrawList(params) {
  return request({
    url: 'xybalance-wallet/list',
    params
  })
}

// 提现ADI领取列表
export function xyBalanceWithdrawList(params) {
  return request({
    url: 'xy-balance-withdraw/list',
    params
  })
}

// 提现ADI审核通过
export function xyBalanceWithdrawPass(data) {
  return request({
    url: 'xy-balance-withdraw/pass',
    method: 'post',
    data
  })
}

// 提现ADI审核驳回
export function xyBalanceWithdrawReject(data) {
  return request({
    url: 'xy-balance-withdraw/reject',
    method: 'post',
    data
  })
}

// 获取提现设置
export function settingGetDrawRate(params) {
  return request({
    url: 'setting/get-xy-draw-rate',
    params
  })
}

// 设置提现设置
export function settingSetDrawRate(data) {
  return request({
    url: 'setting/set-xy-draw-rate',
    method: 'post',
    data
  })
}

// 提现ADI自动转款设置回显
export function xyBalanceWithdrawAutoGet(params) {
  return request({
    url: 'xy-balance-withdraw/auto-get',
    params
  })
}

// 提现ADI自动提现设置
export function xyBalanceWithdrawAutoSet(data) {
  return request({
    url: 'xy-balance-withdraw/auto-set',
    method: 'post',
    data
  })
}

// 规则设置枚举
export function xyFenrunRuleEnums(params) {
  return request({
    url: 'xy-fenrun-rule/enums',
    params
  })
}

// 规则设置列表
export function xyFenrunRuleList(params) {
  return request({
    url: 'xy-fenrun-rule/list',
    params
  })
}

// 规则设置
export function xyFenrunRuleSet(data) {
  return request({
    url: 'xy-fenrun-rule/set',
    method: 'post',
    data
  })
}

// 获取收益枚举
export function xyFenrunItemsEnums(params) {
  return request({
    url: 'xy-fenrun-items/enums',
    params
  })
}

// 获取收益列表
export function xyFenrunItemsList(params) {
  return request({
    url: 'xy-fenrun-items/list',
    params
  })
}

// 获取收益列表
export function xyFenrunItemsDetail(params) {
  return request({
    url: 'xy-fenrun-items/detail',
    params
  })
}

// 私募订单列表
export function ipoOrderList(params) {
  return request({
    url: 'ipo-order/list',
    params
  })
}

// 私募参与数量上限获取回显
export function ipoOrderConfig(params) {
  return request({
    url: 'ipo-order/config',
    params
  })
}

// 设置参与数量上限
export function ipoOrderSet(data) {
  return request({
    url: 'ipo-order/set',
    method: 'post',
    data
  })
}

// 获得收款账户
export function getAcc(params) {
  return request({
    url: 'setting/get-xy-acc',
    params
  })
}

// 添加账户
export function addAcc(data) {
  return request({
    url: 'setting/add-xy-acc',
    method: 'post',
    data
  })
}

// 删除账户
export function delAcc(data) {
  return request({
    url: 'setting/del-xy-acc',
    method: 'post',
    data
  })
}

// 设置收款账户
export function setAcc(data) {
  return request({
    url: 'setting/set-xy-acc',
    method: 'post',
    data
  })
}

// 服务器节点查询
export function nodesList(params) {
  return request({
    url: 'xy-nodes/list',
    params
  })
}

// 服务器节点添加
export function nodesAdd(data) {
  return request({
    url: 'xy-nodes/add',
    method: 'post',
    data
  })
}

// 服务器节点编辑
export function nodesEdit(data) {
  return request({
    url: 'xy-nodes/edit',
    method: 'post',
    data
  })
}

// 服务器节点删除
export function nodesDel(params) {
  return request({
    url: 'xy-nodes/del',
    params
  })
}

// 私募奖励记录
export function ipoAwardsList(params) {
  return request({
    url: 'ipo-awards/list',
    params
  })
}

// 用戶詳情收益记录
export function getIncomeDistribute(params) {
  return request({
    url: 'xybalance-wallet/get-income-distribute',
    params
  })
}

// 用戶詳情提现记录
export function getWithdrawLog(params) {
  return request({
    url: 'xybalance-wallet/get-withdraw-log',
    params
  })
}

// 用戶詳情資產记录
export function getResourceLog(params) {
  return request({
    url: 'xybalance-wallet/get-resource-log',
    params
  })
}

// ADI业绩
export function userAdiGroup(params) {
  return request({
    url: 'user/adi-group',
    params
  })
}

// ADI业绩
export function getDirectById(params) {
  return request({
    url: 'user/adi-get-direct-by-id',
    params
  })
}

// 汇率接口獲取
export function getHuilv(params) {
  return request({
    url: 'setting/get-huilv',
    params
  })
}

// 汇率接口設置
export function setHuilv(data) {
  return request({
    url: 'setting/set-huilv',
    method: 'post',
    data
  })
}

// 私募领取枚舉
export function awardsEnum(params) {
  return request({
    url: 'ipo-awards/enum',
    params
  })
}

// 資產列表
export function resourceConfigList(params) {
  return request({
    url: 'resource-config/list',
    params
  })
}

// 資產列表詳情
export function resourceConfigDetail(params) {
  return request({
    url: 'resource-config/detail',
    params
  })
}

// 資產列表新增
export function resourceConfigAdd(data) {
  return request({
    url: 'resource-config/add',
    method: 'post',
    data
  })
}

// 資產列表编辑
export function resourceConfigEdit(data) {
  return request({
    url: 'resource-config/edit',
    method: 'post',
    data
  })
}

// 資產列表更新展示状态
export function resourceConfigOn(params) {
  return request({
    url: 'resource-config/on',
    params
  })
}

// 資產列表更新权重
export function resourceConfigSort(params) {
  return request({
    url: 'resource-config/sort',
    params
  })
}

// 資產列表删除
export function resourceConfigDel(params) {
  return request({
    url: 'resource-config/del',
    params
  })
}

// 提现相关枚举
export function resourceWithdrawEnums(params) {
  return request({
    url: 'xy-resource-withdraw/enums',
    params
  })
}

// 提现记录列表
export function resourceWithdrawList(params) {
  return request({
    url: 'xy-resource-withdraw/list',
    params
  })
}

// 审核通过
export function resourceWithdrawPass(data) {
  return request({
    url: 'xy-resource-withdraw/pass',
    method: 'post',
    data
  })
}

// 审核通过
export function resourceWithdrawReject(data) {
  return request({
    url: 'xy-resource-withdraw/reject',
    method: 'post',
    data
  })
}

// 提现设置
export function getResourceDrawRate(params) {
  return request({
    url: 'setting/get-resource-draw-rate',
    params
  })
}

// 提现设置
export function setResourceDrawRate(data) {
  return request({
    url: 'setting/set-resource-draw-rate',
    method: 'post',
    data
  })
}

// 臨時訂單
export function callbackList(params) {
  return request({
    url: 'callback/list',
    params
  })
}

// 臨時訂單枚舉
export function callbackEnums(params) {
  return request({
    url: 'callback/enums',
    params
  })
}

// ADI數據統計
export function indexStat(params) {
  return request({
    url: 'xy-index/stat',
    params
  })
}

// ADI數據統計枚舉
export function indexEnums(params) {
  return request({
    url: 'xy-index/enums',
    params
  })
}

// ADI用户列表上级用户列表
export function walletUpper(params) {
  return request({
    url: 'xybalance-wallet/upper',
    params
  })
}

// ADI兑换记录列表
export function adi2dotExchangeList(params) {
  return request({
    url: 'adi2dot-exchange/list',
    params
  })
}

// ADI兑换记录列表枚舉
export function adi2dotExchangeEnums(params) {
  return request({
    url: 'adi2dot-exchange/enums',
    params
  })
}

// 后台ADI用户切换代数
export function adi2dotUserSwitch(params) {
  return request({
    url: 'adi2dot-user/switch',
    params
  })
}

// 兌換額度设置
export function updateExchangeQuota(data) {
  return request({
    url: 'adi2dot-user/update-exchange-quota',
    method: 'post',
    data
  })
}

// adi獲得系統設置
export function getAdiSystem(params) {
  return request({
    url: 'setting/get-adi-system',
    params
  })
}

// 设置adi系统设置
export function setAdiSystem(data) {
  return request({
    url: 'setting/set-adi-system',
    method: 'post',
    data
  })
}

// 兌換設置
export function adi2dotExchangeGetSwitch(params) {
  return request({
    url: 'adi2dot-exchange/get-switch',
    params
  })
}

// 兌換設置
export function adi2dotExchangeSetSwitch(data) {
  return request({
    url: 'adi2dot-exchange/set-switch',
    method: 'post',
    data
  })
}
