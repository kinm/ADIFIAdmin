<template>
  <div>
    <el-dialog class="ruleform" width="30%" :title="{add:'新增',edit:'編輯'}[mode]" :before-close="handleClose" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-position="top">
        <el-form-item label="社交媒體名稱：" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入社交媒體名稱" clearable />
        </el-form-item>
        <el-form-item label="地址：" prop="url">
          <el-input v-model="ruleForm.url" placeholder="请输入地址" clearable />
        </el-form-item>
        <el-form-item label="圖標鏈接：" prop="icon">
          <el-input v-model="ruleForm.icon" placeholder="请输入圖標鏈接" clearable />
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
import { mediumAdd, mediumEdit } from '@/api/adifi'
export default {
  name: '',
  data() {
    return {
      mode: '',
      dialogFormVisible: false,
      ruleForm: {
        id: '',
        name: '',
        url: '',
        icon: ''
      },
      rules: {
        name: [{ required: true, message: '请输入社交媒體名稱', trigger: 'blur' }],
        url: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        icon: [{ required: true, message: '请输入圖標鏈接', trigger: 'blur' }]
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
        id: '',
        name: '',
        url: '',
        icon: ''
      }
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return elMessage(this, '請按要求填寫！')
        if (this.mode === 'add') {
          await mediumAdd(this.ruleForm)
        } else if (this.mode === 'edit') {
          await mediumEdit(this.ruleForm)
        }
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
