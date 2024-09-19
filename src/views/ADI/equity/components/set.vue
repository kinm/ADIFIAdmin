<template>
  <div>
    <el-dialog width="30%" :close-on-click-modal="false" title="私募設置" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="開啟時間：" prop="ipo_time">
          <el-date-picker
            v-model="ruleForm.ipo_time"
            type="datetime"
            value-format="timestamp"
            placeholder="選擇開啟時間"
          />
        </el-form-item>
        <el-form-item label="結束時間：" prop="ipo_end">
          <el-date-picker
            v-model="ruleForm.ipo_end"
            type="datetime"
            value-format="timestamp"
            placeholder="選擇結束時間"
          />
        </el-form-item>
        <!-- <el-form-item label="私募總額：" prop="ipo_total">
          <template slot="label">
            私募總額：<span class="tips">(已募集金額{{ RaisedAmount }})</span>
          </template>
          <el-input v-model="ruleForm.ipo_total" placeholder="請輸入私募總額" clearable />
        </el-form-item> -->
        <el-form-item label="參與數量上限：" prop="buy_max">
          <el-input v-model="ruleForm.buy_max" placeholder="請輸入參與數量上限" clearable />
        </el-form-item>
        <el-form-item label="单次參與數量下限：" prop="buy_min">
          <el-input v-model="ruleForm.buy_min" placeholder="請輸入单次參與數量下限" clearable />
        </el-form-item>
        <el-form-item label="接收地址：" prop="receiver_addr">
          <el-input v-model="ruleForm.receiver_addr" placeholder="請輸入接收地址" clearable />
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
import { ipoOrderConfig, ipoOrderSet } from '@/api/adi'
export default {
  name: '',
  data() {
    return {
      mode: '',
      dialogFormVisible: false,
      RaisedAmount: 0,
      ruleForm: {
        ipo_time: '',
        ipo_end: '',
        ipo_total: '',
        receiver_addr: '',
        buy_max: '',
        buy_min: ''
      },
      rules: {
        ipo_time: [{ required: true, message: '請選擇開啟時間', trigger: 'change' }],
        ipo_end: [{ required: true, message: '請結束時間', trigger: 'change' }],
        receiver_addr: [{ required: true, message: '請輸入接收地址', trigger: 'blur' }],
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
      const { data } = await ipoOrderConfig()
      const { ipo_start, ipo_end, ...agu } = data
      const params = { ipo_time: ipo_start * 1000, ipo_end: ipo_end * 1000, ...agu }
      this.RaisedAmount = params.total_money
      this.ruleForm = params
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return elMessage(this, '請按需求填写！')
        const { ipo_time, ipo_end, ...agu } = this.ruleForm
        const params = { ipo_start: ipo_time / 1000, ipo_end: ipo_end / 1000, ...agu }
        await ipoOrderSet(params)
        elMessage(this, '操作成功！', 'success')
        this.$emit('getData')
        this.handleClose()
      })
    }
  }
}
</script>
<style lang='scss'  scoped>
::v-deep .el-date-editor{
  width: 100% !important;
}
.tips{
  font-size: 12px;
}
</style>
