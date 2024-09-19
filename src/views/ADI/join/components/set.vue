<template>
  <div>
    <el-dialog width="30%" :close-on-click-modal="false" title="參與設置" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="參與數量上限：" prop="buy_max">
          <el-input v-model="ruleForm.buy_max" placeholder="請輸入參與數量上限" clearable>
            <template slot="append">USDT</template>
          </el-input>
        </el-form-item>
        <el-form-item label="单次參與數量下限：" prop="buy_min">
          <el-input v-model="ruleForm.buy_min" placeholder="請輸入单次參與數量下限" clearable>
            <template slot="append">ADI</template>
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
import { xyOrderConfig, xyOrderSet } from '@/api/adi'
export default {
  name: '',
  data() {
    return {
      mode: '',
      dialogFormVisible: false,
      ruleForm: {
        buy_max: '',
        buy_min: ''
      },
      rules: {
        buy_max: [{ required: true, message: '請輸入參與數量上限', trigger: 'blur' }],
        buy_min: [{ required: true, message: '請輸入单次參與數量下限', trigger: 'blur' }]
      }

    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData() {
      const { data } = await xyOrderConfig()
      this.ruleForm = data
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return elMessage(this, '請按要求填寫！')
        await xyOrderSet(this.ruleForm)
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
