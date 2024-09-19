import store from '@/store'

// 获取文件名
export const getFileName = function(name) {
  return name.substring(0, name.lastIndexOf('.'))
}

// 获取 .後缀名
export const getExtension = function(name) {
  return name.substring(name.lastIndexOf('.'))
}
// 只获取後缀名
export const getExtensionName = function(name) {
  return name.substring(name.lastIndexOf('.') + 1)
}

// 富文本图片替换
export const getRichText = function(str) {
  str = str.replace(
    /width/gi,
    'sid'
  )
  str = str.replace(
    /height/gi,
    'hid'
  )
  str = str.replace(
    /\<img/gi,
    '<img class="rich-img" style="width: 100%;"'
  )
  return str
}

/**
 *
 * @param {string} str
 * @returns {string}
 */
export const nameCase = function(str) {
  const newStr = str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
  return `on${newStr}`
}

export const operateAuth = function(arr) {
  const isInclude = (arr1, arr2) => arr2.some((val) => arr1.includes(val))
  return isInclude(store.getters.buttonRoles, arr)
}

export const cleanStorageSearch = function() { // 清除localStorage搜索缓存
  const arr = Object.keys(window.localStorage).filter(key => key.includes('search-'))
  if (arr.length) { arr.map(key => { window.localStorage.removeItem(key) }) }
}

export const cleanStorageTable = function() { // 清除localStorage列表排序缓存
  window.localStorage.removeItem('tableStorage')
}

export const filterArr = (arr, point) => {
  return arr.reduce((acc, item) => {
    if (item.children) {
      const filteredChildren = filterArr(item.children, point)
      if (filteredChildren.length > 0) {
        acc.push({ ...item, children: filteredChildren })
      } else if (point.includes(item.name)) {
        acc.push({ ...item, children: undefined })
      }
    } else if (point.includes(item.name)) {
      acc.push(item)
    }
    return acc
  }, [])
}
