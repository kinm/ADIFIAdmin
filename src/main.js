import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-TW' // lang i18n

import '@/styles/index.scss' // global css
import './element-variables.scss'

import App from './App'
import store from './store'
import router from './router'

import { VueJsonp } from 'vue-jsonp'

import directivesJs from '@/directives'

Object.keys(directivesJs).forEach((item) => {
  Vue.directive(item, directivesJs[item])
})

import '@/icons' // icon
import '@/permission' // permission control

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.prototype.$size = 'medium'
Vue.prototype.$s_size = 'mini'

ElementUI.Dialog.props.lockScroll.default = false

Vue.use(ElementUI)

Vue.use(VueJsonp)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
