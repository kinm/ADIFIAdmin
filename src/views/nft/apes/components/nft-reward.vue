<template>
  <div>
    <el-dialog width="65%" title="NFT獎勵" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-form ref="searchForm" label-position="top" size="mini" :inline="true" :model="searchForm">
        <el-row>
          <el-col :span="7">
            <el-form-item label="用戶ID：" prop="uid">
              <el-input v-model="searchForm.uid" clearable placeholder="請輸入用戶ID" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="關聯地址：" prop="relation_addr">
              <el-input v-model="searchForm.relation_addr" clearable placeholder="請輸入關聯地址" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="獎勵類型：" prop="type">
              <el-select v-model="searchForm.type" clearable placeholder="請選擇">
                <el-option
                  v-for="item in options.reward_enum"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button type="primary" @click="search">搜索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span class="title ">总计：</span><span class="table-describe">獎勵數量（APE）：{{ ape }}</span>
      <el-table
        :data="tableData"
        border
        size="mini"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="uid" label="用戶ID" min-width="120" />
        <el-table-column show-overflow-tooltip prop="relation_addr" label="關聯地址" min-width="160" />
        <el-table-column prop="date" label="期數" min-width="80" />
        <el-table-column prop="type6_str" label="獎勵類型" min-width="120" />
        <el-table-column prop="ape" label="獎勵數量（APE）" min-width="120" />
        <el-table-column prop="created_at" label="獎勵時間" min-width="160" />
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
import { apeWorldGetIncomeLog } from '@/api/nft'
export default {
  name: '',
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      searchForm: {
        page: 1,
        page_size: 10,
        total: 0,
        uid: '',
        relation_addr: ''
      },
      tableData: [],
      ape: ''
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    search() {
      this.getData()
    },
    handleClose() {
      this.searchForm = {
        uid: '',
        relation_addr: ''
      }
      this.dialogFormVisible = false
    },
    handleCurrentChange(val) {
      this.searchForm.page = val
      this.getData()
    },
    async getData() {
      const { data } = await apeWorldGetIncomeLog(this.searchForm)
      this.tableData = data.data
      this.searchForm.total = data.total
      this.ape = data.stat_total
    }
  }
}
</script>
<style lang='scss'  scoped>
.detail-footer{
  margin-top: 20px;
  text-align: center;
}
::v-deep .el-row{
    display: flex;
    align-items: flex-end;
}
.table-describe{
  font-size: 12px;
  color: #97a8be;
  margin-right: 20px;
}
</style>
