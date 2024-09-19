<template>
  <div>
    <el-dialog class="ruleform" width="30%" title="修改合約" :before-close="handleClose" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" class="demo-ruleForm">
        <el-form-item label="合約版本" prop="version">
          <el-select v-model="ruleForm.version" placeholder="請選擇" clearable>
            <el-option
              v-for="item in options.version_enum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="修改範圍" prop="type">
          <el-select v-model="ruleForm.type" placeholder="請選擇" clearable>
            <el-option
              v-for="item in options.user_adi_range_enum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
import { adi2dotUserSwitch } from '@/api/adi'
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
        version: '',
        type: ''
      },
      rules: {
        version: [{ required: true, message: '選擇合約版本', trigger: 'change' }],
        type: [{ required: true, message: '請選擇修改範圍用戶', trigger: 'change' }]
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
        version: '',
        type: ''
      }
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return elMessage(this, '請按要求填寫！')
        await adi2dotUserSwitch(this.ruleForm)
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
