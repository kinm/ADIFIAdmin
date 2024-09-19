export const pageMixins = {
  data() {
    return {
      searchShow: true,
      options: {},
      searchForm: {
        page: 1,
        page_size: 10,
        total: 0
      },
      selectList: [],
      message: {},
      eventEnum: {
        'del': 'onDel',
        'add': 'onAdd',
        'edit': 'onEdit',
        'batchDel': 'onBatchDel'
      }
    }
  },
  methods: {
    getSearchOptions() {
      if (this.$refs.searchForm) {
        return Object.assign({}, this.searchForm, this.$refs.searchForm.searchForm)
      } else {
        return this.searchForm
      }
    },
    // 重置搜索
    onInit(options = {}) {
      const search = this.$refs.searchForm ? this.$refs.searchForm.searchForm : {} // 搜索组件参數
      const parmas = Object.assign({}, options, this.$options.data().searchForm, search)
      this.searchForm = parmas
      this.getData()
    },
    onSearch() {
      this.searchForm.page = 1
      this.getData()
    },
    onCancel() {
      this.isShow = false
    },
    handleSelectionChange(val) {
      this.selectList = val
    },
    handleCurrentChange(val) {
      this.loading = true
      this.searchForm.page = val
      this.getData()
    }
  }
}
