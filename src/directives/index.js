import store from '@/store'
export default {
  setButtonPower: {
    inserted(dom, obj) {
      const { state: { user: { buttonRoles }}} = store
      if (buttonRoles && !buttonRoles.includes(obj.value)) dom.style.display = 'none'
    },
    componentUpdated(dom, obj) {
      const { state: { user: { buttonRoles }}} = store
      if (buttonRoles && !buttonRoles.includes(obj.value)) dom.style.display = 'none'
    }
  }
}
