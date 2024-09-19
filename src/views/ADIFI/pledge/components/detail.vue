<template>
  <div>
    <el-dialog width="75%" title="質押明細" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-form ref="searchForm" size="mini" :inline="true" :model="searchForm">
        <el-form-item label="Hash地址：" prop="hash">
          <el-input v-model="searchForm.hash" clearable placeholder="請輸入Hash地址" />
        </el-form-item>
        <el-form-item label="訂單狀態：">
          <el-select v-model="searchForm.state" placeholder="請選擇">
            <el-option
              v-for="item in options.state_enum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="操作類型：">
          <el-select v-model="searchForm.type" placeholder="請選擇">
            <el-option
              v-for="item in options.staked_type_enum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="創建時間：">
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
          <el-button @click="reset">重置</el-button>
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
        <el-table-column prop="hash" show-overflow-tooltip label="Hash" min-width="160" />
        <el-table-column prop="type_str" label="操作類型" min-width="80" />
        <el-table-column prop="value" label="ADI數量" min-width="100" />
        <el-table-column prop="total" label="操作後總額" min-width="100" />
        <el-table-column prop="state_str" label="訂單狀態" min-width="100" />
        <el-table-column prop="created_at" label="創建時間" min-width="160" />
        <el-table-column prop="real" label="實時質押數量" min-width="160" />
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
import { stakedStakedList } from '@/api/adifi'
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
        hash: '',
        type: '',
        state: '',
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
      const { data } = await stakedStakedList(this.searchForm)
      this.tableData = data.data
      this.searchForm.total = data.total
    },
    handleClose() {
      this.searchForm = {
        page: 1,
        page_size: 10,
        total: 0,
        uid: '',
        hash: '',
        type: '',
        state: '',
        start: '',
        end: '',
        time: []
      }
      this.tableData = []
      this.dialogFormVisible = false
    },
    reset() {
      this.searchForm = {
        page: 1,
        page_size: 10,
        total: 0,
        uid: this.searchForm.uid,
        hash: '',
        type: '',
        state: '',
        start: '',
        end: '',
        time: []
      }
      this.getData()
    }
  }
}
</script>
<style lang='scss'  scoped>
.detail-footer{
    padding: 30px 0 0;
    text-align: center;
}
</style>
