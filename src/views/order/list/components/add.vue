<template>
  <div>
    <el-dialog width="35%" title="新增訂單" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="單價：" prop="price">
              <el-input v-model="ruleForm.price" disabled clearable placeholder="請輸入單價">
                <template slot="append">APE/份</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="參與數量：" prop="num">
              <el-input v-model="ruleForm.num" clearable placeholder="請輸入參與數量">
                <template slot="append">份</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="錢包地址：" prop="relation_addr">
              <el-input v-model="ruleForm.relation_addr" clearable placeholder="請輸入用戶個錢包地址" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { elMessage } from '@/utils/message-remind.js'
import { orderConfig, orderCreate } from '@/api/order'
export default {
  name: '',
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const checkNum = (rule, value, callback) => {
      const reg = /^[1-9]\d*$/
      if (value && !reg.test(value)) {
        callback(new Error('請輸入正整數'))
      } else if (Number(value) > this.buy_max) {
        return callback(new Error('可參與上限為' + this.buy_max + '份'))
      }
      callback()
    }
    return {
      mode: '',
      dialogFormVisible: false,
      ruleForm: {
        price: '',
        relation_addr: '',
        num: ''
      },
      rules: {
        price: [{ required: true, message: '請輸入單價', trigger: 'blur' }],
        num: [{ required: true, message: '請輸入參與數量', trigger: 'blur' },
          { validator: checkNum, trigger: 'blur' }],
        relation_addr: [{ required: true, message: '請輸入用戶個錢包地址', trigger: 'blur' }]
      },
      buy_max: ''

    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData() {
      const { data } = await orderConfig()
      this.ruleForm.price = data.price
      this.buy_max = data.buy_max
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) {
          return elMessage(this, '请按要求填写！')
        }
        await orderCreate(this.ruleForm)
        elMessage(this, '操作成功！', 'success')
        this.$emit('getData')
        this.handleClose()
      })
    }
  }
}
</script>
<style lang='scss'  scoped>
.red{
  color: red;
}
</style>
