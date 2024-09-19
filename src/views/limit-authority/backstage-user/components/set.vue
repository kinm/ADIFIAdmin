<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="{ add: '新增用戶', edit: '編輯用戶' }[mode]" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="後臺賬號：" prop="username">
          <el-input v-model="ruleForm.username" :disabled="ruleForm.id != ''" clearable placeholder="請輸入後臺賬號" />
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="ruleForm.role_id" placeholder="請選擇角色" clearable>
            <el-option
              v-for="item in roleEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="nickname">
          <el-input v-model="ruleForm.nickname" clearable placeholder="請輸入姓名" />
        </el-form-item>
        <el-form-item label="聯系方式" prop="mobile">
          <el-input v-model="ruleForm.mobile" clearable placeholder="請輸入聯系方式" />
        </el-form-item>
        <el-form-item label="賬號密碼：" prop="password_hash" :rules="mode==='add' ? rules.password_hash : []">
          <el-input v-model="ruleForm.password_hash" clearable placeholder="請輸入賬號密碼" />
        </el-form-item>
        <el-form-item label="啟用状态:" prop="status">
          <el-radio-group v-model="ruleForm.status" size="mini">
            <el-radio :label="1" border>啟用</el-radio>
            <el-radio :label="2" border>禁用</el-radio>
          </el-radio-group>
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
import md5 from '@/utils/md5.js'
import { elMessage } from '@/utils/message-remind.js'
import { addAdmin } from '@/api/limit-authority'
export default {
  name: '',
  props: {
    roleEnum: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      mode: '',
      dialogFormVisible: false,
      ruleForm: {
        id: '',
        username: '',
        password_hash: '',
        nickname: '',
        mobile: '',
        role_id: '',
        status: 1
      },
      rules: {
        username: [{ required: true, message: '請輸入後臺賬號', trigger: 'blur' }],
        role_id: [{ required: true, message: '請選擇角色', trigger: 'change' }],
        password_hash: [{ required: true, message: '必填', trigger: 'blur' }]
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
          return elMessage(this, '請按要求填寫！')
        }
        const postForm = {}
        postForm.id = this.ruleForm.id
        postForm.username = this.ruleForm.username
        postForm.password_hash = md5(this.ruleForm.password_hash)
        postForm.nickname = this.ruleForm.nickname
        postForm.mobile = this.ruleForm.mobile
        postForm.role_id = this.ruleForm.role_id
        postForm.status = this.ruleForm.status
        await addAdmin(postForm)
        elMessage(this, '操作成功！', 'success')
        this.$emit('getData')
        this.handleClose()
      })
    }
  }
}
</script>
<style lang='scss'  scoped>
::v-deep .el-form-item__content{
  .el-select{
    width: 100%;
  }
}
</style>
