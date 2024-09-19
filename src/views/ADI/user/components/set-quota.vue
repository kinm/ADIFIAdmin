<template>
  <div>
    <el-dialog class="ruleform" width="30%" title="修改兌換額度" :before-close="handleClose" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" class="demo-ruleForm">
        <el-form-item label="選擇變動類型" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio :label="1">減少</el-radio>
            <el-radio :label="2">增加</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="變動值" prop="num">
          <el-input v-model="ruleForm.num" placeholder="请输入變動值" clearable />
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
import { updateExchangeQuota } from '@/api/adi'
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
      ruleForm: {
        uid: '',
        num: '',
        type: ''
      },
      rules: {
        num: [{ required: true, message: '请输入變動值', trigger: 'blur' }],
        type: [{ required: true, message: '選擇變動類型', trigger: 'change' }]
      }
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    handleClose() {
      this.ruleForm = {
        uid: '',
        num: '',
        type: ''
      }
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return elMessage(this, '請按要求填寫！')
        await updateExchangeQuota(this.ruleForm)
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
