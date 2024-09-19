<template>
  <div>
    <el-dialog title="合成記錄" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-table
        :data="tableData"
        border
        size="mini"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="uid" label="用戶ID" min-width="100" />
        <el-table-column show-overflow-tooltip prop="relation_addr" label="關聯地址" min-width="160" />
        <el-table-column prop="date" label="期數" min-width="80" />
        <el-table-column prop="round" label="輪數" min-width="80" />
        <el-table-column prop="created_at" label="合成時間" min-width="160" />
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
    </el-dialog>
  </div>
</template>

<script>
import { apeWorldGetGatherLog } from '@/api/nft'
export default {
  name: '',
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      searchForm: {
        page: 1,
        page_size: 10,
        total: 0
      }
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData() {
      const { data } = await apeWorldGetGatherLog(this.searchForm)
      this.tableData = data.data
      this.searchForm.total = data.total
    },
    handleClose() {
      this.searchForm = {
        page: 1,
        page_size: 10,
        total: 0
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
