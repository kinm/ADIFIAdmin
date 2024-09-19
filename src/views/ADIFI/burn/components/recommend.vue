<template>
  <div>
    <el-dialog class="ruleform" width="30%" title="直推獎勵設置" :before-close="handleClose" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
        <el-form-item label="直推獎勵比例：" prop="direct_push">
          <el-input v-model="ruleForm.direct_push" placeholder="请输入直推獎勵比例" clearable>
            <template slot="append">%</template>
          </el-input>
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
import { getDropDirect, setDropDirect } from '@/api/adifi'
export default {
  name: '',
  data() {
    return {
      dialogFormVisible: false,
      ruleForm: {
        direct_push: ''
      },
      rules: {
        direct_push: [{ required: true, message: '请输入直推獎勵比例', trigger: 'blur' }]
      }
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData() {
      const { data } = await getDropDirect()
      if (data.direct_push) this.ruleForm = data
    },
    handleClose() {
      this.ruleForm = {
        direct_push: ''
      }
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return elMessage(this, '請按要求填寫！')
        await setDropDirect(this.ruleForm)
        elMessage(this, '操作成功！', 'success')
        // this.$emit('getData')
        this.handleClose()
      })
    }
  }
}
</script>
<style lang='scss'  scoped>

</style>
