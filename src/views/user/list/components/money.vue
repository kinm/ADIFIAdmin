<template>
  <div>
    <el-form ref="searchForm" size="mini" :inline="true" :model="searchForm">
      <el-form-item :label="from==='first'?'收益時間：':'收支時間：'">
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
      <el-form-item :label="from==='first'?'收益類型：':'收支類型：'">
        <el-select v-if="from==='first'" v-model="searchForm.type" clearable placeholder="請選擇">
          <el-option
            v-for="item in options.income_type_enum"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-else v-model="searchForm.type" clearable placeholder="請選擇">
          <el-option
            v-for="item in options.log_type_enum"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
      <el-table-column v-if="from==='first'" prop="type_str" label="收益类型" min-width="150" />
      <el-table-column v-if="from==='first'" prop="ape" label="收益數量（APE）" min-width="150" />
      <el-table-column v-if="from==='first'" prop="created_at" label="收益時間" min-width="160" />
      <el-table-column v-if="from==='second'" prop="type_str" label="收支類型" min-width="150" />
      <el-table-column v-if="from==='second'" prop="num" label="收支數量（APE）" min-width="150" />
      <el-table-column v-if="from==='second'" prop="new_num" label="待領取（APE）" min-width="150" />
      <el-table-column v-if="from==='second'" prop="created_at" label="收益時間" min-width="160" />
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
import { incomeDistribute, incomeLog } from '@/api/user'
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
        type: '',
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
        const { data } = await incomeDistribute(this.searchForm)
        this.tableData = data.data
        this.searchForm.total = data.total
      } else {
        const { data } = await incomeLog(this.searchForm)
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
