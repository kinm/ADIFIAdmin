<template>
  <div>
    <el-dialog width="80%" title="收益詳情" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-card>
        <el-table
          :data="tableData"
          border
          size="mini"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column prop="uid" label="收益用戶ID" min-width="150" />
          <el-table-column prop="level_str" label="等級" min-width="150" />
          <el-table-column prop="pid" label="推薦人" min-width="160" />
          <el-table-column prop="pid_level_str" label="推薦人等級" min-width="150" />
          <el-table-column prop="type6_str" label="收益類型" min-width="150" />
          <el-table-column prop="rate" label="收益比例" min-width="160" />
          <el-table-column prop="profit" label="收益數量（APE）" min-width="150" />
        </el-table>
        <div class="detail-footer">
          <el-pagination
            background
            :current-page="searchForm.page"
            :page-size="searchForm.page_size"
            layout="total,  prev, pager, next, jumper"
            :total="searchForm.total"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import { incomeDynamicDetail } from '@/api/revenue.js'
export default {
  name: '',
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      searchForm: {
        page: 1,
        page_size: 10,
        total: 0,
        id: ''
      }
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData(params) {
      const { data } = await incomeDynamicDetail(this.searchForm)
      this.tableData = data.data
      this.searchForm.total = data.total
    },
    handleClose() {
      this.searchForm = {
        page: 1,
        page_size: 10,
        total: 0,
        id: ''
      }
      this.dialogFormVisible = false
      this.tableData = []
    },
    handleCurrentChange(val) {
      this.searchForm.page = val
      this.getData()
    }
  }
}
</script>
<style lang='scss'  scoped>
.detail-footer{
    padding: 30px 0 0;
    text-align: right;
}
</style>
