<template>
  <div>
    <el-dialog class="ruleform" width="35%" title="校準記錄" :before-close="handleClose" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-position="top">
        <el-form-item label="開始區塊號" prop="from_block">
          <el-input v-model="ruleForm.from_block" placeholder="請輸入開始區塊號" clearable />
        </el-form-item>
        <el-form-item label="結束區塊號" prop="to_block">
          <el-input v-model="ruleForm.to_block" placeholder="請輸入結束區塊號" clearable />
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
import { manualFetchEvents } from '@/api/adifi'
import { positiveInteger } from '@/utils/validate.js'
export default {
  name: '',
  data() {
    return {
      dialogFormVisible: false,
      ruleForm: {
        from_block: '',
        to_block: ''
      },
      rules: {
        from_block: [{ required: true, message: '请输入開始區塊號', trigger: 'blur' },
          { validator: positiveInteger, trigger: 'blur' }],
        to_block: [{ required: true, message: '请输入結束區塊號', trigger: 'blur' },
          { validator: positiveInteger, trigger: 'blur' }]
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
        from_block: '',
        to_block: ''
      }
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return elMessage(this, '請按要求填寫！')
        await manualFetchEvents(this.ruleForm)
        elMessage(this, '操作成功！', 'success')
        this.handleClose()
      })
    }
  }
}
</script>
<style lang='scss'  scoped>

</style>
