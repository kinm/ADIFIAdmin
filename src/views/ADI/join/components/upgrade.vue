<template>
  <div>
    <el-dialog width="30%" :close-on-click-modal="false" title="設置升級門檻" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="18" :offset="3">
            <el-form-item v-for="(item, index) in ruleForm.list" :key="index" :label="`${item.label}：`" :prop="`list.${index}.part`" :rules="rules.part">
              <el-input v-model="item.part" placeholder="請輸入" clearable>
                <!-- <template slot="prepend">总參與上限</template> -->
                <template slot="append">ADI</template>
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
import { getPersonPart, setPersonPart } from '@/api/adi'
import { positiveNumber } from '@/utils/validate.js'
export default {
  name: '',
  data() {
    return {
      mode: '',
      dialogFormVisible: false,
      ruleForm: {
        list: [
          {
            label: '等级',
            part: '',
            value: 1
          }
        ]
      },
      rules: {
        part: [{ required: true, message: '請輸入升級門檻', trigger: 'blur' },
          { validator: positiveNumber, trigger: 'blur' }]
      }

    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData() {
      const { data } = await getPersonPart()
      this.ruleForm.list = data
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return elMessage(this, '請按要求填寫！')
        await setPersonPart(this.ruleForm.list)
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
