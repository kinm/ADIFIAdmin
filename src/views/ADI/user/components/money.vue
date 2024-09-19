<template>
  <div>
    <el-form ref="searchForm" size="mini" :inline="true" :model="searchForm">
      <el-form-item :label="from==='first'?'收益時間：':'領取時間：'">
        <el-date-picker
          v-model="searchForm.time"
          type="daterange"
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeTime"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      size="mini"
      style="width: 100%"
      :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column v-if="from==='first'" prop="num" label="收益數量（ADI）" min-width="150" />
      <el-table-column v-if="from==='first'" prop="updated_at" label="收益時間" min-width="160" />
      <el-table-column v-if="from==='second'" prop="base" label="領取數量（ADI）" min-width="150" />
      <el-table-column v-if="from==='second'" prop="rate" label="手續費（ADI）" min-width="150" />
      <el-table-column v-if="from==='second'" prop="num" label="實際到賬（ADI）" min-width="150" />
      <el-table-column v-if="from==='second'" prop="created_at" label="領取時間" min-width="160" />
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
  </div>
</template>

<script>
import { getIncomeDistribute, getWithdrawLog } from '@/api/adi'
export default {
  name: '',
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    from: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchForm: {
        page: 1,
        page_size: 10,
        total: 0,
        id: '',
        start: '',
        end: '',
        time: []
      },
      tableData: []
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    handleCurrentChange(val) {
      this.searchForm.page = val
      this.getData()
    },
    search() {
      this.searchForm.page = 1
      this.getData()
    },
    changeTime(e) {
      if (e) {
        this.searchForm.start = e[0] / 1000
        this.searchForm.end = e[1] / 1000
      } else {
        this.searchForm.start = ''
        this.searchForm.end = ''
      }
    },
    async getData() {
      if (this.from === 'first') {
        const { data } = await getIncomeDistribute(this.searchForm)
        this.tableData = data.data
        this.searchForm.total = data.total
      } else {
        const { data } = await getWithdrawLog(this.searchForm)
        this.tableData = data.data
        this.searchForm.total = data.total
      }
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
