<template>
  <div>
    <el-dialog width="35%" title="修改密碼" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" inline size="mini" label-width="120px" class="demo-ruleForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="原始密碼" prop="old_passcode">
              <el-input v-model="ruleForm.old_passcode" clearable placeholder="請輸入原始密碼" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="新密碼" prop="new_passcode">
              <el-input v-model="ruleForm.new_passcode" clearable placeholder="請輸入新密碼" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="確認新密碼" prop="confirm_password">
              <el-input v-model="ruleForm.confirm_password" clearable placeholder="請確認新密碼" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitForm">確 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import md5 from '@/utils/md5.js'
import { elMessage } from '@/utils/message-remind.js'
import { passcodeEdit } from '@/api/utils'
export default {
  name: '',
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.ruleForm.new_passcode) {
        callback(new Error('两次輸入密碼不一致！'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      ruleForm: {
        old_passcode: '',
        new_passcode: '',
        confirm_password: ''
      },
      rules: {
        confirm_password: [{ required: true, message: '請確認新密碼！', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }],
        old_passcode: [{ required: true, message: '請輸入原始密碼！', trigger: 'blur' }],
        new_passcode: [{ required: true, message: '請輸入新密碼！', trigger: 'blur' }]
      }
    }
  },
  computed: {
  },
  created() {

  },
  methods: {
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) {
          return elMessage(this, '請安要求填寫！')
        }
        const params = {}
        params.old_passcode = md5(this.ruleForm.old_passcode)
        params.new_passcode = md5(this.ruleForm.new_passcode)
        await passcodeEdit(params)
        elMessage(this, '密碼修改成功！', 'success')
        this.handleClose()
      })
    }
  }
}
</script>
<style lang='scss'  scoped>
::v-deep .el-form-item{
  width: 100%;
  .el-form-item__content{
    .el-select{
      width: 100%;
    }
  }
}
</style>
