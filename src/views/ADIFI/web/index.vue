<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-form ref="ruleForm" class="ruleForm" :model="ruleForm" :rules="rules" label-position="top">
          <el-form-item label="跳轉地址一" prop="url1">
            <svg-icon icon-class="footer_url_logo1" style="width:20px;height:20px;position: absolute;left: 10px;top: 10px;z-index: 9999;" alt="" class="svg-container" />
            <el-input v-model="ruleForm.url1" placeholder="請輸入跳轉地址一" clearable />
          </el-form-item>
          <el-form-item label="跳轉地址二" prop="url2">
            <svg-icon icon-class="footer_url_logo2" style="width:20px;height:20px;position: absolute;left: 10px;top: 10px;z-index: 9999;" alt="" class="svg-container" />
            <el-input v-model="ruleForm.url2" placeholder="請輸入跳轉地址二" clearable />
          </el-form-item>
        </el-form>
        <span v-setButtonPower="'adifi-web-set'" class="dialog-footer">
          <el-button :size="$s_size" @click="handleClose">重 置</el-button>
          <el-button :size="$s_size" type="primary" @click="submitForm">保 存</el-button>
        </span>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { elMessage } from '@/utils/message-remind.js'
import { settingGetOffUrl, settingSetOffUrl } from '@/api/adifi'
export default {
  name: '',
  data() {
    return {
      ruleForm: {
        url1: '',
        url2: ''
      },
      rules: {
        url1: [{ required: true, message: '請輸入跳轉地址一', trigger: 'blur' }],
        url2: [{ required: true, message: '請輸入跳轉地址二', trigger: 'blur' }]
      }
    }
  },
  computed: {
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const { data } = await settingGetOffUrl()
      if (data.url1) this.ruleForm = data
    },
    handleClose() {
      this.ruleForm = {
        url1: '',
        url2: ''
      }
      this.$refs.ruleForm.resetFields()
      this.getData()
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return elMessage(this, '請按要求填寫！')
        await settingSetOffUrl(this.ruleForm)
        elMessage(this, '操作成功！', 'success')
        this.handleClose()
      })
    }
  }
}
</script>
<style lang='scss'  scoped>
.ruleForm{
  ::v-deep .el-input__inner{
    padding-left: 40px;
  }
}
</style>
