<template>
  <div>
    <el-form ref="searchForm" size="mini" :inline="true" :model="searchForm">
      <el-form-item label="變動時間：">
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
      <el-form-item label="變動類型：">
        <el-select v-model="searchForm.type" placeholder="請選擇">
          <el-option
            v-for="item in options.resource_log_type_enum"
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
      <el-table-column prop="new_num" label="資產總額" min-width="120" />
      <el-table-column prop="num" label="變動數量" min-width="120" />
      <el-table-column prop="type_str" label="變動類型" min-width="120" />
      <el-table-column prop="state_str" label="變動狀態" min-width="120" />
      <el-table-column prop="created_at" label="變動時間" min-width="160" />
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
import { getResourceLog } from '@/api/adi'
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
      searchForm: {
        page: 1,
        page_size: 10,
        total: 0,
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
      const { data } = await getResourceLog(this.searchForm)
      this.tableData = data.data
      this.searchForm.total = data.total
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
