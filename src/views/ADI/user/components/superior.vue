<template>
  <div>
    <el-dialog width="90%" title="上级列表" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-table
        :data="tableData"
        size="mini"
        border
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column show-overflow-tooltip prop="relation_addr" label="關聯地址" min-width="150" />
        <el-table-column prop="user_level" label="等級" min-width="100" />
        <el-table-column show-overflow-tooltip prop="pid" label="推薦人" min-width="150" />
        <el-table-column prop="adi_online" label="錢包ADI餘額" min-width="150" />
        <el-table-column show-overflow-tooltip prop="uuid" label="設備ID" min-width="150" />
        <el-table-column prop="created_at" label="關聯時間" min-width="160" />
        <el-table-column prop="status_str" label="狀態" min-width="100" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { walletUpper } from '@/api/adi'
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
    async getData(params) {
      const { data } = await walletUpper({ uid: params.uid })
      if (data.length) this.tableData = data
    },
    handleClose() {
      this.tableData = []
      this.dialogFormVisible = false
    }
  }
}
</script>
<style lang='scss'  scoped>

</style>
