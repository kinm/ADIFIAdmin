<template>
  <div>
    <el-dialog class="ruleform" width="30%" title="團隊獎勵設置" :before-close="handleClose" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-position="top">
        <el-form-item label="分潤基數：" prop="fenrun_base">
          <el-input v-model="ruleForm.fenrun_base" placeholder="请输入分潤基數" clearable>
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="直推比例：" prop="direct_push">
          <el-input v-model="ruleForm.direct_push" placeholder="请输入直推比例" clearable>
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="等級遞增，分潤級差：" prop="fenrun_range">
          <el-input v-model="ruleForm.fenrun_range" placeholder="请输入級差" clearable>
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="平級間分潤比例：" prop="equal_fenrun">
          <el-input v-model="ruleForm.equal_fenrun" placeholder="请输入比例" clearable>
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="平級分潤上限：" prop="equal_limit">
          <el-input v-model="ruleForm.equal_limit" placeholder="请输入比例" clearable>
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="平級分潤最低數額：" prop="equal_min">
          <el-input v-model="ruleForm.equal_min" placeholder="请输入數額" clearable />
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
import { getAdifiTeamKong, setAdifiTeamKong } from '@/api/adifi'
export default {
  name: '',
  data() {
    return {
      dialogFormVisible: false,
      ruleForm: {
        fenrun_base: '',
        direct_push: '',
        fenrun_range: '',
        equal_fenrun: '',
        equal_limit: '',
        equal_min: ''
      },
      rules: {
        fenrun_base: [{ required: true, message: '请输入分潤基數', trigger: 'blur' }],
        direct_push: [{ required: true, message: '请输入直推比例', trigger: 'blur' }],
        fenrun_range: [{ required: true, message: '请输入等級遞增，分潤級差', trigger: 'blur' }],
        equal_fenrun: [{ required: true, message: '请输入平級間分潤比例', trigger: 'blur' }],
        equal_limit: [{ required: true, message: '请输入平級分潤上限', trigger: 'blur' }],
        equal_min: [{ required: true, message: '平級分潤最低數額', trigger: 'blur' }]
      }
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData() {
      const { data } = await getAdifiTeamKong()
      if (data.equal_limit) this.ruleForm = data
    },
    handleClose() {
      this.ruleForm = {
        fenrun_base: '',
        direct_push: '',
        fenrun_range: '',
        equal_fenrun: '',
        equal_limit: '',
        equal_min: ''
      }
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return elMessage(this, '請按要求填寫！')
        await setAdifiTeamKong(this.ruleForm)
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
