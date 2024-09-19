<template>
  <div>
    <el-dialog width="30%" :close-on-click-modal="false" title="提現設置" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="最低提現數量：" prop="lowest">
          <el-input v-model="ruleForm.lowest" placeholder="請輸入最低提現數量" clearable>
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
import { getResourceDrawRate, setResourceDrawRate } from '@/api/adi'
export default {
  name: '',
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      mode: '',
      dialogFormVisible: false,
      ruleForm: {
        lowest: ''
      },
      rules: {
        lowest: [{ required: true, message: '請輸入最低提現數量', trigger: 'blur' }]
      }

    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData() {
      const { data } = await getResourceDrawRate()
      if (data.lowest) this.ruleForm = data
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return elMessage(this, '請按需求填写！')
        await setResourceDrawRate(this.ruleForm)
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
