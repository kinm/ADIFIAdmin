<template>
  <div>
    <el-dialog width="30%" :close-on-click-modal="false" title="匯率設置" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item>
              <el-input v-model="ruleForm.adi" disabled clearable>
                <template slot="append">ADI</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <div class="convert">
              <svg-icon icon-class="convert" />
            </div>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="adi2usdt">
              <el-input v-model="ruleForm.adi2usdt" clearable>
                <template slot="append">USDT</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
import { getHuilv, setHuilv } from '@/api/adi'
export default {
  name: '',
  data() {
    return {
      mode: '',
      dialogFormVisible: false,
      ruleForm: {
        adi: 1,
        adi2usdt: ''
      },
      rules: {
        adi2usdt: [{ required: true, message: '請輸入轉換匯率', trigger: 'blur' }]
      }

    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData() {
      const { data } = await getHuilv()
      if (data.adi2usdt) this.ruleForm.adi2usdt = data.adi2usdt
      // this.ruleForm = data
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return elMessage(this, '請按要求填寫！')
        await setHuilv({ adi2usdt: this.ruleForm.adi2usdt })
        elMessage(this, '操作成功！', 'success')
        this.$emit('getData')
        this.handleClose()
      })
    }
  }
}
</script>
<style lang='scss'  scoped>
.convert{
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}
</style>
