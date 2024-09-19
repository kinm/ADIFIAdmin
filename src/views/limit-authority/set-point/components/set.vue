<template>
  <div>
    <el-dialog class="dialog_ruleform" :title="{ new: '新增權限', add: '新增權限', edit: '編輯權限' }[mode]" :before-close="handleClose" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" label-position="top" :disabled="is_edit === false" :validate-on-rule-change="false" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="權限名稱：" prop="name">
          <el-input v-model="ruleForm.name" clearable placeholder="請輸入權限名稱" autocomplete="off" />
        </el-form-item>
        <el-form-item label="權限標識：" prop="role">
          <el-input v-model="ruleForm.role" clearable placeholder="請輸入權限標識" autocomplete="off" />
        </el-form-item>
        <el-form-item label="API：" prop="api">
          <el-input v-model="ruleForm.api" clearable placeholder="請輸入API" autocomplete="off" />
        </el-form-item>
        <el-form-item label="權限描述：" prop="desc">
          <el-input v-model="ruleForm.desc" clearable placeholder="請輸入權限描述" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :size="$s_size" @click="handleClose">取 消</el-button>
        <el-button :size="$s_size" type="primary" @click="submitForm">確 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { elMessage } from '@/utils/message-remind.js'
import { authPointAdd, authPointEdit } from '@/api/limit-authority'
export default {
  name: '',
  data() {
    return {
      is_edit: true,
      mode: '',
      dialogFormVisible: false,
      options: [],
      ruleForm: {
        id: '',
        pid: '', // 父类id,
        name: '', // 權限名稱
        role: '', // 權限標識
        api: '', // api
        desc: '' // 權限描述
      },
      rules: {
        name: [{ required: true, message: '請輸入權限名稱', trigger: 'blur' }],
        role: [{ required: true, message: '請輸入權限標識', trigger: 'blur' }],
        api: [{ required: true, message: '請輸入api', trigger: 'blur' }],
        desc: [{ required: true, message: '請輸入權限描述', trigger: 'blur' }]
      }

    }
  },
  methods: {
    handleClose() {
      this.ruleForm = this.$options.data().ruleForm
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    handleChange() {},
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) {
          return elMessage(this, '請按要求填寫！')
        }
        if (this.ruleForm.id) {
          await authPointEdit(this.ruleForm)
          elMessage(this, '操作成功！', 'success')
          this.$emit('getData')
          this.handleClose()
          return
        } else {
          await authPointAdd(this.ruleForm)
          elMessage(this, '操作成功！', 'success')
          this.$emit('getData')
          this.handleClose()
          return
        }
      })
    }
  }
}
</script>
<style lang='scss'  scoped>
.dialog_ruleform{
  :v-deep .el-dialog__body {
    padding: 0 20px 30px;
  }
}

</style>
