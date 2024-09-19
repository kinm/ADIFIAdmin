<template>
  <div>
    <el-dialog width="30%" :close-on-click-modal="false" title="領取設置" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="領取手續費：" prop="commission">
          <el-input v-model="ruleForm.commission" placeholder="請輸入領取手續費" clearable>
            <el-select slot="append" v-model="ruleForm.commission_type" style="width:100px" placeholder="請選擇">
              <el-option
                v-for="e in options.unit_enum"
                :key="e.value"
                :label="e.label"
                :value="e.value"
              />
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="最低領取數量：" prop="lowest">
          <el-input v-model="ruleForm.lowest" placeholder="請輸入最低領取數量" clearable>
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
import { settingGetDrawRate, settingSetDrawRate } from '@/api/adi'
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
        commission: '',
        lowest: '',
        commission_type: 1
      },
      rules: {
        commission: [{ required: true, message: '請輸入提現手續費', trigger: 'blur' }],
        lowest: [{ required: true, message: '請輸入最低領取數量', trigger: 'blur' }]
      }

    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData() {
      const { data } = await settingGetDrawRate()
      if (data.commission_type) this.ruleForm = data
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return elMessage(this, '請按需求填写！')
        await settingSetDrawRate(this.ruleForm)
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
