import router, { otherRoutes } from '@/router'
import store from './store'
import { getInfo } from '@/api/utils'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import lodash from 'lodash'
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/', '/404'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path.toLowerCase() === '/') {
      getInfo().then(({ data }) => {
        const newArr = []
        const newOtherRoutes = lodash.cloneDeep(otherRoutes)
        newOtherRoutes.forEach(item => {
          item.children = item.children.filter((el) => {
            return data.point.includes(el.name)
          })
          if (item.children.length) newArr.push(item)
        })
        next(newArr[0].path + '/' + newArr[0].children[0].path)
        NProgress.done()
      }).catch(() => {
        next()
        NProgress.done()
      })
    } else {
      const hasGetUserInfo = store.getters.username
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')
          next(to)
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          // Message.error(error || 'Has Error')
          next(`/?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to, from) => {
  // finish progress bar
  const bol = store.state.routes.list.every(item => item.name !== to.name)
  if (bol && to.name) {
    store.commit('routes/SETLIST', [...store.state.routes.list, to])
  }
  NProgress.done()
})

