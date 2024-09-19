<template>
  <div>
    <el-dialog class="ruleform" width="35%" title="代幣兌換地址設置" :before-close="handleClose" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-position="top">
        <el-form-item prop="url">
          <el-input v-model="ruleForm.url" type="textarea" :rows="5" placeholder="请输入兌換地址" clearable />
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
import { getAdifiExchangeLink, setAdifiExchangeLink } from '@/api/adifi'
export default {
  name: '',
  data() {
    return {
      dialogFormVisible: false,
      ruleForm: {
        url: ''
      },
      rules: {
        url: [{ required: true, message: '请输入兌換地址', trigger: 'blur' }]
      }
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData() {
      const { data } = await getAdifiExchangeLink()
      if (data.url) this.ruleForm = data
    },
    handleClose() {
      this.ruleForm = {
        url: ''
      }
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return elMessage(this, '請按要求填寫！')
        await setAdifiExchangeLink(this.ruleForm)
        elMessage(this, '操作成功！', 'success')
        this.handleClose()
      })
    }
  }
}
</script>
<style lang='scss'  scoped>

</style>
