export default {
  name: 'MyTable',
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  render(h) {
    const scopedSlots = {}
    Object.keys(this.$parent.$scopedSlots).forEach(key => {
      if (key !== 'default') {
        scopedSlots[key] = this.$parent.$scopedSlots[key]
      }
    })
    return h('el-table', {
      ref: 'elTable',
      key: this.config.key || '',
      attrs: { ...this.config.attrs },
      on: { ...this.config.listeners },
      scopedSlots
    }, this.config.children)
  }
}
