<template>
  <div>
    <el-dialog width="30%" :close-on-click-modal="false" title="自動審核" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="是否開啟自動審核：" prop="trans_auto">
          <el-switch
            v-model="ruleForm.trans_auto"
            active-text="開啟"
            inactive-text="關閉"
            :active-value="2"
            :inactive-value="1"
          />
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
import { withdrawAutoGet, withdrawAutoSet } from '@/api/order'
export default {
  name: '',
  data() {
    return {
      mode: '',
      dialogFormVisible: false,
      ruleForm: {
        trans_auto: ''
      },
      rules: {
        trans_auto: [{ required: true, message: '請選擇是否開啟自動審核', trigger: 'change' }]
      }

    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData() {
      const { data } = await withdrawAutoGet()
      this.ruleForm.trans_auto = data.trans_auto
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return elMessage(this, '請選擇是否開啟自動審核！')
        await withdrawAutoSet(this.ruleForm)
        elMessage(this, '操作成功！', 'success')
        this.$emit('getData')
        this.handleClose()
      })
    }
  }
}
</script>
<style lang='scss'  scoped>

</style>
