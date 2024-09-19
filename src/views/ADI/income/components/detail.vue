<template>
  <div>
    <el-dialog title="收益詳情" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-descriptions style="margin-bottom:20px;" direction="vertical" size="mini" :column="4" border>
        <el-descriptions-item label="關聯地址">{{ detailInfo.relation_addr }}</el-descriptions-item>
        <el-descriptions-item label="質押時長">{{ detailInfo.rule_str }}</el-descriptions-item>
        <el-descriptions-item label="質押數額">{{ detailInfo.order_price }}</el-descriptions-item>
        <el-descriptions-item label="質押收益比例">{{ detailInfo.income_rate }}</el-descriptions-item>
      </el-descriptions>
      <el-table
        border
        size="mini"
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="relation_addr" show-overflow-tooltip label="關聯地址" min-width="150" />
        <el-table-column prop="p_relation_addr" show-overflow-tooltip label="上級關聯地址" min-width="150" />
        <el-table-column prop="level_str" label="用戶等級" min-width="80" />
        <el-table-column prop="num" label="訂單參與數量" min-width="100" />
        <el-table-column prop="profit_rate" label="分潤比例" min-width="80" />
        <el-table-column prop="income" label="分潤數量" min-width="150" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { xyFenrunItemsDetail } from '@/api/adi'
export default {
  name: '',
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      detailInfo: {
        relation_addr: 0,
        rule_str: 0,
        order_price: 0,
        income_rate: 0
      }
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData(params) {
      const { data } = await xyFenrunItemsDetail({ id: params })
      if (data && data.income_detail.length) this.tableData = data.income_detail
      if (data && data.order_detail && data.order_detail.relation_addr) this.detailInfo = data.order_detail
    },
    handleClose() {
      this.tableData = []
      this.detailInfo = {
        relation_addr: 0,
        rule_str: 0,
        order_price: 0,
        income_rate: 0
      }
      this.dialogFormVisible = false
    }
  }
}
</script>
<style lang='scss'  scoped>

</style>
