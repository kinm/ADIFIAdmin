<template>
  <div>
    <el-dialog width="35%" title="收益設置" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="24" style="margin-bottom:20px">
            <div class="red">設置說明： 設置成功後，次日將按照以下比例規則發放靜態收益</div>
          </el-col>
          <!-- <el-col :span="24">
            <el-form-item label="餘量池：" prop="left_p">
              <el-input v-model="ruleForm.left_p" clearable placeholder="請輸入餘量池">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="24">
            <el-form-item label="靜態收益比例：" prop="pool_p">
              <el-input v-model="ruleForm.pool_p" clearable placeholder="請輸入靜態收益比例">
                <template slot="append">%</template>
              </el-input>
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
import { settingGetJincome, settingSetJincome } from '@/api/revenue'
export default {
  name: '',
  data() {
    const checkNum = (rule, value, callback) => {
      const reg = /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*))$/
      if (value && !reg.test(value)) {
        callback(new Error('包含两位小數的正數'))
      } else if (Number(value) > 100) {
        return callback(new Error('比例不能超過100%'))
      }
      callback()
    }
    return {
      mode: '',
      dialogFormVisible: false,
      ruleForm: {
        left_p: '',
        pool_p: ''
      },
      rules: {
        left_p: [{ required: true, message: '請輸入餘量池', trigger: 'blur' },
          { validator: checkNum, trigger: 'blur' }],
        pool_p: [{ required: true, message: '請輸入靜態收益比例', trigger: 'blur' },
          { validator: checkNum, trigger: 'blur' }]
      }

    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData() {
      const { data } = await settingGetJincome()
      if (data.pool_p) this.ruleForm = data
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
        await settingSetJincome(this.ruleForm)
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
::v-deep.el-select{
  width: 100%;
}
</style>
