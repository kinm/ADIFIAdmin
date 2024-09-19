<template>
  <div>
    <el-dialog width="75%" :close-on-click-modal="false" title="服務器配置" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-button style="margin-bottom:15px" type="primary" size="mini" @click="handleClick('add')">新增</el-button>
      <el-table
        border
        size="mini"
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="title" label="標題" min-width="80" />
        <el-table-column prop="addr" show-overflow-tooltip label="地址" min-width="160" />
        <el-table-column prop="coins_buy" label="支付幣種數量" min-width="320" />
        <el-table-column prop="desc" show-overflow-tooltip label="描述" min-width="160" />
        <el-table-column label="操作" fixed="right" min-width="80">
          <template slot-scope="scope">
            <el-button type="text" @click="handleClick('edit',scope.row)">編輯</el-button>
            <el-button type="text" @click="handleClick('del',scope.row)">刪除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog width="30%" :title="{add:'新增服務器配置',edit:'編輯服務器配置'}[setMode]" :visible.sync="innerVisible" :before-close="innerHandleClose" :close-on-click-modal="false" append-to-body>
        <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
          <el-form-item label="標題：" prop="title">
            <el-input v-model="ruleForm.title" placeholder="請輸入標題" clearable />
          </el-form-item>
          <el-form-item label="地址：" prop="addr">
            <el-input v-model="ruleForm.addr" placeholder="請輸入地址" clearable />
          </el-form-item>
          <el-form-item label="描述：" prop="desc">
            <el-input v-model="ruleForm.desc" type="textarea" :rows="4" placeholder="請輸入描述" clearable />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button :size="$s_size" @click="innerHandleClose">取 消</el-button>
          <el-button :size="$s_size" type="primary" @click="submitForm">確 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { elMessage } from '@/utils/message-remind.js'
import { nodesList, nodesAdd, nodesEdit, nodesDel } from '@/api/adi'
export default {
  name: '',
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      setMode: '',
      innerVisible: false,
      ruleForm: {
        id: '',
        title: '',
        addr: '',
        desc: ''
      },
      rules: {
        title: [{ required: true, message: '請輸入標題', trigger: 'blur' }],
        addr: [{ required: true, message: '請輸入地址', trigger: 'blur' }]
      }
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData() {
      const { data } = await nodesList()
      if (data.length) this.tableData = data
    },
    handleClose() {
      this.dialogFormVisible = false
      this.tableData = []
    },
    handleClick(type, data) {
      if (type === 'add' || type === 'edit') {
        this.setMode = type
        this.innerVisible = true
        if (type === 'edit') {
          this.ruleForm.id = data.id
          this.ruleForm.title = data.title
          this.ruleForm.addr = data.addr
          this.ruleForm.desc = data.desc
        }
      } else if (type === 'del') {
        this.$confirm('確定刪除該配置？', '提示', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await nodesDel({ id: data.id })
          elMessage(this, '操作成功！', 'success')
          this.getData()
        }).catch(() => {})
      }
    },
    innerHandleClose() {
      this.ruleForm = {
        id: '',
        title: '',
        addr: '',
        desc: ''
      }
      this.$refs.ruleForm.resetFields()
      this.innerVisible = false
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return elMessage(this, '請按需求填写！')
        if (this.setMode === 'add') {
          await nodesAdd(this.ruleForm)
        } else if (this.setMode === 'edit') {
          await nodesEdit(this.ruleForm)
        }
        elMessage(this, '操作成功！', 'success')
        this.getData()
        this.innerHandleClose()
      })
    }
  }
}
</script>
<style lang='scss'  scoped>
::v-deep .el-table .cell {
  white-space: pre-line;
}
</style>
