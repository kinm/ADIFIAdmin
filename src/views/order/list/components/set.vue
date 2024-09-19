<template>
  <div>
    <el-dialog width="35%" :close-on-click-modal="false" title="參與設置" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="單價：" prop="price">
          <el-input v-model="ruleForm.price" clearable placeholder="請輸入每份APE數量" />
        </el-form-item>
        <el-form-item label="可購買份數：" prop="buy_max">
          <el-input v-model="ruleForm.buy_max" clearable placeholder="請輸入可參與份數上限" />
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
import { orderSet, orderConfig } from '@/api/order'
import { positiveInteger0 } from '@/utils/validate.js'
export default {
  name: '',
  data() {
    return {
      mode: '',
      dialogFormVisible: false,
      ruleForm: {
        price: '',
        buy_max: ''
      },
      rules: {
        price: [{ required: true, message: '請輸入每份APE數量', trigger: 'blur' }],
        buy_max: [{ required: true, message: '請輸入可參與份數上限', trigger: 'blur' },
          { validator: positiveInteger0, trigger: 'blur' }]
      }

    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData() {
      const { data } = await orderConfig()
      if (data.price) this.ruleForm = data
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) {
          return elMessage(this, '請按要求填寫！')
        }
        await orderSet(this.ruleForm)
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
