<template>
  <div>
    <el-dialog :title="{balance:'修改餘量池',spare:'修改備用池'}[mode]" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="變動數量：" prop="num">
          <div class="form-operate">
            <el-input v-model="ruleForm.num" :size="$s_size" clearable placeholder="請輸入變動數量" />
            <el-button :size="$s_size" type="primary" @click="submitForm">確 定</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div class="text">{{ {balance:'餘量池',spare:'備用池'}[mode] }}修改記錄</div>
      <el-table
        border
        size="mini"
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="num" label="變動數量（APE）" min-width="150" />
        <el-table-column prop="new" label="變動後餘額（APE）" min-width="150" />
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
import { elMessage } from '@/utils/message-remind.js'
import { staticPoolLogs, staticPoolDo, staticPoolAssistLogs, staticPoolAssist } from '@/api/dashboard.js'
export default {
  name: '',
  data() {
    return {
      mode: '',
      dialogFormVisible: false,
      ruleForm: {
        num: ''
      },
      rules: {
        num: [{ required: true, message: '請輸入變動數量', trigger: 'blur' }]
      },
      searchForm: {
        page: 1,
        page_size: 10,
        total: 0
      },
      tableData: []
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData() {
      if (this.mode === 'balance') {
        const { data } = await staticPoolLogs(this.searchForm)
        this.loading = false
        this.tableData = data.data
        this.searchForm.total = data.total
      } else {
        const { data } = await staticPoolAssistLogs(this.searchForm)
        this.loading = false
        this.tableData = data.data
        this.searchForm.total = data.total
      }
    },
    handleCurrentChange(val) {
      this.searchForm.page = val
      this.getData()
    },
    handleClose() {
      this.tableData = []
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return elMessage(this, '請按要求填寫！')
        if (this.mode === 'balance') {
          await staticPoolDo(this.ruleForm)
        } else {
          await staticPoolAssist(this.ruleForm)
        }
        elMessage(this, '操作成功！', 'success')
        this.ruleForm.num = ''
        this.$refs.ruleForm.resetFields()
        this.getData()
      })
    }
  }
}
</script>
<style lang='scss'  scoped>
.demo-ruleForm{
  width: 70%;
}
.form-operate{
  display: flex;
  display: flex;
    align-items: center;
    justify-content: space-between;
  .el-input{
    width: 80%;
  }
}
</style>
