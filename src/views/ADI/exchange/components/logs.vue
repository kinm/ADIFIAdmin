<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="兌換詳情" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-table
        border
        size="mini"
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="at" label="更新時間" min-width="160" />
        <el-table-column prop="station_str" label="兌換狀態" min-width="150" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      dialogFormVisible: false,
      tableData: []
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    handleClose() {
      this.dialogFormVisible = false
      this.tableData = []
    }
  }
}
</script>
<style lang='scss'  scoped>

</style>
