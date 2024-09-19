<template>
  <div>
    <el-dialog width="35%" title="收藏者設置" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="24" style="margin-bottom:20px">
            <div class="red">設置說明:被設置用戶可直接獲得指定期數、指定輪數的NFT圖片，且將在全部合成後獲得NFT獎勵和每日獎勵</div>
          </el-col>
          <el-col :span="12">
            <el-form-item label="選擇期數：" prop="date">
              <el-select v-model="ruleForm.date" clearable placeholder="請選擇" @change="changeData" @clear="clearDate">
                <el-option v-for="item in options.date_enum" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="選擇輪數：" prop="round">
              <el-select v-model="ruleForm.round" clearable :disabled="!ruleForm.date" placeholder="請選擇">
                <el-option v-for="item in roundsEnum" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="錢包地址：" prop="relation_addrs">
              <el-input v-model="ruleForm.relation_addrs" type="textarea" :rows="4" clearable placeholder="請輸入用戶個錢包地址" />
              <div class="input-cue"><span class="red">*</span> 輸入多個錢包地址時，請用“/”隔開</div>
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
import { apeWorldGetDate, apeWorldCollect } from '@/api/nft'
export default {
  name: '',
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      mode: '',
      dialogFormVisible: false,
      roundsEnum: [],
      ruleForm: {
        date: '',
        relation_addrs: '',
        round: ''
      },
      rules: {
        date: [{ required: true, message: '请選擇期數', trigger: 'change' }],
        relation_addrs: [{ required: true, message: '請輸入用戶個錢包地址', trigger: 'blur' }],
        round: [{ required: true, message: '请選擇輪數', trigger: 'change' }]
      }

    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    changeData(e) {
      this.getRound(e)
    },
    async getRound(params) {
      this.roundsEnum = []
      this.ruleForm.round = ''
      const { data } = await apeWorldGetDate({ date: params })
      if (data.length) {
        data.map(el => {
          this.roundsEnum.push({
            label: `第${el}輪`,
            value: el
          })
        })
      }
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    clearDate() {
      this.ruleForm.round = ''
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) {
          return elMessage(this, '请按要求填写！')
        }
        await apeWorldCollect(this.ruleForm)
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
