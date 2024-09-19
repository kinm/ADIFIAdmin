<template>
  <div>
    <el-dialog width="75%" title="餘額明細" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-form ref="searchForm" size="mini" :model="searchForm" label-position="top">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="變動時間">
              <el-date-picker
                v-model="searchForm.time"
                type="daterange"
                value-format="timestamp"
                range-separator="至"
                start-placeholder="開始時間"
                end-placeholder="結束時間"
                @change="changeTime"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="變動原因">
              <el-select v-model="searchForm.type" clearable placeholder="請選擇">
                <el-option
                  v-for="item in options.balance_log_type_enum"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="padding-bottom: 18px;">
            <el-button type="primary" size="mini" @click="search">搜索</el-button>
            <el-button size="mini" icon="el-icon-refresh-right" @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        border
        size="mini"
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="type_str" label="變動原因" min-width="150" />
        <el-table-column prop="num" label="變動數量（APE）" min-width="150" />
        <el-table-column prop="new_num" label="變動後餘額（APE）" min-width="150" />
        <el-table-column prop="state_str" label="變動狀態" min-width="150" />
        <el-table-column prop="created_at" label="變動時間" min-width="160" />
      </el-table>
      <div class="footerpage">
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
import { userLogs } from '@/api/user'
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
        id: '',
        time: [],
        start: '',
        end: '',
        type: ''
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
    changeTime(e) {
      if (e) {
        this.searchForm.start = e[0] / 1000
        this.searchForm.end = e[1] / 1000
      } else {
        this.searchForm.start = ''
        this.searchForm.end = ''
      }
    },
    search() {
      this.searchForm.page = 1
      this.getData()
    },
    reset() {
      this.searchForm.page = 1
      this.searchForm.time = []
      this.searchForm.start = ''
      this.searchForm.end = ''
      this.searchForm.type = ''
      this.getData()
    },
    async getData() {
      const { data } = await userLogs(this.searchForm)
      this.tableData = data.data
      this.searchForm.total = data.total
    },
    handleClose() {
      this.searchForm = {
        page: 1,
        page_size: 10,
        total: 0,
        id: '',
        time: [],
        start: '',
        end: '',
        type: ''
      }
      this.dialogFormVisible = false
    }
  }
}
</script>
<style lang='scss'  scoped>
::v-deep .el-dialog__body{
  background-color: #fafafa;
}
::v-deep .el-select{
  width: 100%;
}
.el-row{
    display:flex;
    flex-wrap: wrap;
    align-items: flex-end;
}
</style>
