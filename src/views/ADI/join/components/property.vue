<template>
  <div>
    <el-dialog width="75%" :close-on-click-modal="false" title="資產配置" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-button style="margin-bottom:15px" type="primary" size="mini" @click="handleClick('add')">新增</el-button>
      <el-table
        border
        size="mini"
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="title" label="名稱" min-width="80" />
        <el-table-column show-overflow-tooltip prop="coin" label="圖標" min-width="150" />
        <el-table-column show-overflow-tooltip prop="receive" label="錢包地址" min-width="150" />
        <el-table-column show-overflow-tooltip prop="contract" label="合約地址" min-width="150" />
        <el-table-column prop="user_type_str" label="適用用戶" min-width="120" />
        <el-table-column label="狀態" min-width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.show"
              :active-value="1"
              :inactive-value="2"
              @change="changeStatus(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="權重" min-width="80">
          <template slot-scope="scope">
            <el-input v-model="scope.row.sort" @blur="changeSort(scope.row)" @keyup.enter.native="changeSort(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="handleClick('edit',scope.row)">編輯</el-button>
            <!-- <el-button type="text" @click="handleClick('del',scope.row)">刪除</el-button> -->
          </template>
        </el-table-column>
      </el-table>

      <el-dialog width="30%" :title="{add:'新增資產',edit:'編輯資產'}[setMode]" :visible.sync="innerVisible" :before-close="innerHandleClose" :close-on-click-modal="false" append-to-body>
        <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
          <el-form-item label="名稱：" prop="title">
            <el-input v-model="ruleForm.title" placeholder="請輸入名稱" clearable />
          </el-form-item>
          <el-form-item label="圖標：" prop="coin">
            <el-input v-model="ruleForm.coin" placeholder="請輸入圖標鏈接" clearable />
          </el-form-item>
          <el-form-item label="收款錢包地址：" prop="receive">
            <el-input v-model="ruleForm.receive" placeholder="請輸入收款錢包地址" clearable />
          </el-form-item>
          <el-form-item label="合約地址：" prop="contract">
            <el-input v-model="ruleForm.contract" placeholder="請輸入合約地址" clearable />
          </el-form-item>
          <el-form-item label="適用用戶：" prop="user_type">
            <el-select v-model="ruleForm.user_type" placeholder="請選擇">
              <el-option
                v-for="e in options.adifi_resource_user_type"
                :key="e.value"
                :label="e.label"
                :value="e.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="權重：" prop="sort">
            <el-input v-model="ruleForm.sort" placeholder="請輸入權重" clearable />
          </el-form-item>
          <el-form-item label="啟用狀態：">
            <el-switch
              v-model="ruleForm.show"
              active-text="啟用"
              inactive-text="禁用"
              :active-value="1"
              :inactive-value="2"
            />
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
import { resourceConfigList, resourceConfigAdd, resourceConfigEdit, resourceConfigOn, resourceConfigSort, resourceConfigDel } from '@/api/adi'
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
      tableData: [],
      setMode: '',
      innerVisible: false,
      ruleForm: {
        id: '',
        title: '',
        coin: '',
        receive: '',
        user_type: '',
        contract: '',
        sort: '',
        show: ''
      },
      rules: {
        title: [{ required: true, message: '請輸入名稱', trigger: 'blur' }],
        coin: [{ required: true, message: '請輸入圖標鏈接', trigger: 'blur' }],
        user_type: [{ required: true, message: '請選擇適用用戶', trigger: 'change' }],
        receive: [{ required: true, message: '請輸入收款錢包地址', trigger: 'blur' }],
        contract: [{ required: true, message: '請輸入合約地址', trigger: 'blur' }]
      }
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData() {
      const { data } = await resourceConfigList({ page: 1, page_size: 99999999 })
      if (data.data.length) {
        if (data.data) {
          data.data.forEach(el => {
            el.record_sort = el.sort
          })
          this.tableData = data.data
        }
      }
    },
    handleClose() {
      this.dialogFormVisible = false
      this.tableData = []
    },
    changeStatus(e) {
      this.$confirm(e.show === 2 ? '是否禁用' : '是否啟用', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await resourceConfigOn({ id: e.id, show: e.show })
        elMessage(this, '操作成功！', 'success')
        this.getData()
      }).catch(() => {
        this.getData()
      })
    },
    async  changeSort(data) {
      if (data.record_sort === data.sort) return
      await resourceConfigSort({ id: data.id, sort: data.sort })
      elMessage(this, '操作成功！', 'success')
      this.getData()
    },
    handleClick(type, data) {
      if (type === 'add' || type === 'edit') {
        this.setMode = type
        this.innerVisible = true
        if (type === 'edit') {
          this.ruleForm.id = data.id
          this.ruleForm.title = data.title
          this.ruleForm.coin = data.coin
          this.ruleForm.receive = data.receive
          this.ruleForm.user_type = data.user_type
          this.ruleForm.contract = data.contract
          this.ruleForm.sort = data.sort
          this.ruleForm.show = data.show
        }
      } else if (type === 'del') {
        this.$confirm('確定刪除該資產？', '提示', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await resourceConfigDel({ id: data.id })
          elMessage(this, '操作成功！', 'success')
          this.getData()
        }).catch(() => {})
      }
    },
    innerHandleClose() {
      this.ruleForm = {
        id: '',
        title: '',
        coin: '',
        receive: '',
        user_type: '',
        contract: '',
        sort: '',
        show: ''
      }
      this.$refs.ruleForm.resetFields()
      this.innerVisible = false
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return elMessage(this, '請按需求填写！')
        if (this.setMode === 'add') {
          await resourceConfigAdd(this.ruleForm)
        } else if (this.setMode === 'edit') {
          await resourceConfigEdit(this.ruleForm)
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
.el-radio{
  border: 1px solid #dcdfe6;
    border-radius: 100%;
    width: 14px;
    height: 14px;
    background-color: #fff;
    position: relative;
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;
}
.el-radio-checked{
  border-color: #409eff;
  background: #409eff;
}
.el-radio-checked::after{
  width: 4px;
    height: 4px;
    border-radius: 100%;
    background-color: #fff;
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%) scale(0);
    transition: transform .15s ease-in;
    transform: translate(-50%,-50%) scale(1);
}
</style>
