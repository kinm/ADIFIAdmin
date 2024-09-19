import { login, getInfo, logout } from '@/api/utils'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { otherRoutes, constantRoutes, resetRouter } from '@/router'
import { filterArr } from '@/utils/utils'
import lodash from 'lodash'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    username: '',
    avatar: '',
    roles: [],
    buttonRoles: [],
    newRoutes: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_BUTTON_ROLES: (state, buttonRoles) => {
    state.buttonRoles = buttonRoles
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_NEW_ROUTES: (state, newRoutes) => {
    state.newRoutes = newRoutes
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          return reject('驗證失敗，請重新登錄.')
        }
        const { nickname, head_portrait, point, child_point, username } = data
        if (!point || point.length <= 0) {
          reject('暂无權限!')
        }
        // ----------------------
        const newArr = filterArr(lodash.cloneDeep(otherRoutes), point)
        // ----------------------
        newArr.push({ path: '*', redirect: '/404', hidden: true })
        router.addRoutes(newArr)
        router.options.routes = [...constantRoutes, ...newArr]
        commit('SET_NAME', nickname)
        commit('SET_USERNAME', username)
        commit('SET_AVATAR', head_portrait)
        commit('SET_BUTTON_ROLES', child_point)
        commit('SET_NEW_ROUTES', newArr)
        resolve(newArr)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logoutToken({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

