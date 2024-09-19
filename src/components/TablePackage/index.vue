<template>
  <div class="hf-table">

    <el-popover
      placement="bottom-end"
      popper-class="table-cloumn-setting-popper"
      trigger="click"
    >
      <div class="setting-row-content">
        <div style="text-align:center">
          <el-button @click="delStorage">恢復當前表格設置</el-button>
        </div>
        <draggable v-model="storageList" handle=".el-icon-s-operation" @end="updateTable">
          <div v-for="clo in storageList" :key="clo.label" class="setting-row">
            <i class="el-icon-s-operation" />
            <el-checkbox v-model="clo.show" class="label" @change="showOrHidden($event,clo)">{{ clo.label }}</el-checkbox>
          </div>
        </draggable>
      </div>
      <div slot="reference" class="el-icon-setting-t">
        <el-tooltip class="item" effect="dark" content="显隐列" placement="top">
          <el-button size="mini" circle icon="el-icon-menu" />
        </el-tooltip>
      </div>
    </el-popover>

    <div
      class="table-operate-btn-content"
    >
      <slot name="operateBtnContent">
        <div class="operate-btn-content">
          <div>
            <slot name="btnContentLeft">
              <div />
            </slot>
          </div>
          <div>
            <slot name="btnContentRight">
              <div />
            </slot>
          </div>
        </div>
      </slot>
    </div>
    <div>
      <new-table ref="table" :config="config" />
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import newTable from './myTable.jsx'
const components = { newTable, draggable }
export default {
  name: 'HfTable',
  components,
  props: {
    storageName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showTable: false,
      storageList: [],
      name: '',
      config: {
        children: [],
        attrs: {},
        listeners: {},
        key: ''
      }
    }
  },
  watch: {
    '$attrs': {
      handler(newV) {
        this.$set(this.config, 'attrs', newV)
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.initStorage()
    this.updateTable()
  },
  methods: {
    reload() {
      this.$nextTick(() => {
        this.initStorage()
        this.updateTable()
      })
    },
    getInstance() {
      return this.$refs.table.$refs && this.$refs.table.$refs.elTable
    },
    delStorage() {
      this.$confirm('恢復當前表格設置将清除当前表格设置并刷新页面是否继续?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const storage = window.localStorage.getItem('tableStorage') ? JSON.parse(window.localStorage.getItem('tableStorage')) : {}
        storage[this.storageName] = []
        window.localStorage.setItem('tableStorage', JSON.stringify(storage))
        location.reload()
      })
    },
    delAllStorage() {
      this.$confirm('恢复系统表格设置将清除当前表格设置并刷新页面是否继续?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('tableStorage')
        location.reload()
      })
    },
    showOrHidden(val, clo) {
      if (!val && this.storageList.filter(i => i.show).length === 0) {
        this.$message.warning('列表最少显示一列')
        this.$nextTick(() => {
          clo.show = true
        })
        return
      }
      this.updateTable()
    },
    setFixed(value, clo) {
      if (clo.fixed === value) {
        clo.fixed = false
      } else {
        clo.fixed = value
      }
      this.updateTable()
    },
    initStorage() {
      this.storageList = []
      const storage = window.localStorage.getItem('tableStorage') ? JSON.parse(window.localStorage.getItem('tableStorage')) : {}
      let list = storage[this.storageName] ? storage[this.storageName] : []
      this.$vnode.componentOptions.children.forEach(node => {
        if (!(!node.componentOptions || node.componentOptions.propsData.type) && list.findIndex(i => i.label === node.componentOptions.propsData.label) < 0) {
          const propsData = JSON.parse(JSON.stringify(node.componentOptions.propsData))
          if (propsData.fixed === undefined || propsData.fixed === false) {
            propsData.fixed = false
          } else {
            propsData.fixed = propsData.fixed ? propsData.fixed : 'left'
          }
          list.push({
            fixed: false, // 默认新增的都是不固定
            show: true, // 默认新增的都是显示的
            ...propsData
          })
        }
      })
      list = list.filter(item => this.$vnode.componentOptions.children.find(n => {
        return n.componentOptions && item.label === n.componentOptions.propsData.label
      }))
      this.storageList = list
    },
    // 根据缓存的數组进行渲染表格
    updateTable() {
      // 特殊类型
      const childrenNodes = this.$vnode.componentOptions.children.filter(node => node.componentOptions && node.componentOptions.propsData.type)
      this.storageList.forEach(item => {
        if (item.show) {
          const node = this.$vnode.componentOptions.children.find(n => n.componentOptions && n.componentOptions.propsData.label === item.label)
          if (node) {
            node.componentOptions.propsData.fixed = item.fixed
            childrenNodes.push(node)
          }
        }
      })
      this.config.children = childrenNodes
      this.config.attrs = this.$attrs
      this.config.listeners = this.$listeners
      this.config.key = Math.random() + ''
      const storage = window.localStorage.getItem('tableStorage') ? JSON.parse(window.localStorage.getItem('tableStorage')) : {}
      storage[this.storageName] = this.storageList
      window.localStorage.setItem('tableStorage', JSON.stringify(storage))
    }
  }
}
</script>
<style lang="scss" scoped>
  .table-cloumn-setting-popper{
    .setting-row-content{
      max-height: 500px;
      overflow-y: auto;
      .setting-row{
        height: 40px;
        line-height: 40px;
        .el-icon-s-operation{
          cursor: move;
          font-size: 16px;
          margin-right: 8px;
        }
        .label{
          margin-right: 8px;
        }
        .btn{
          padding: 4px!important;
        }
      }
    }
  }
  .hf-table{
    width:100%;
    height:100%;
    position: relative;
    .el-icon-setting-t{
      border-radius: 50%;
      position: absolute;
      right: 7px;
      top: 12px;
      cursor: pointer;
    }
    .table-operate-btn-content{
      background: #fafafa;
      border-top: 1px solid #ededed;
      border-left: 1px solid #ededed;
      border-right: 1px solid #ededed;
      border-bottom: 1px solid #ededed;
      // width: calc(100% - 40px);
      min-height: 50px; // 给一个最低的高度，防止没有插槽，右侧icon被吞
     .operate-btn-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 50px;
        // padding-bottom: 6px;
        padding-left: 10px;
        padding-right: 40px;
      }
    }
  }
</style>
