<template>
  <div>
    <el-card shadow="never" class="page-card">
      <el-form ref="ruleForm" :hide-required-asterisk="true" :size="$size" :model="ruleForm" :rules="rules" label-position="right" label-width="150px" class="demo-ruleForm">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="中文繁體" name="first">
            <el-form-item label="餘額管理提示：" prop="balance_desc">
              <el-input v-model="ruleForm.balance_desc" type="textarea" :rows="4" placeholder="請輸入內容" />
            </el-form-item>
            <el-form-item label="ADI餘額提现说明：" prop="xybalance_desc">
              <el-input v-model="ruleForm.xybalance_desc" type="textarea" :rows="4" placeholder="請輸入內容" />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="English" name="second">
            <el-form-item label="餘額管理提示：" prop="en_balance_desc">
              <el-input v-model="ruleForm.en_balance_desc" type="textarea" :rows="4" placeholder="請輸入內容" />
            </el-form-item>
            <el-form-item label="ADI餘額提现说明：" prop="en_xybalance_desc">
              <el-input v-model="ruleForm.en_xybalance_desc" type="textarea" :rows="4" placeholder="請輸入內容" />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="日語" name="third">
            <el-form-item label="餘額管理提示：" prop="jp_balance_desc">
              <el-input v-model="ruleForm.jp_balance_desc" type="textarea" :rows="4" placeholder="請輸入內容" />
            </el-form-item>
            <el-form-item label="ADI餘額提现说明：" prop="jp_xybalance_desc">
              <el-input v-model="ruleForm.jp_xybalance_desc" type="textarea" :rows="4" placeholder="請輸入內容" />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="韓語" name="fourth">
            <el-form-item label="餘額管理提示：" prop="ko_balance_desc">
              <el-input v-model="ruleForm.ko_balance_desc" type="textarea" :rows="4" placeholder="請輸入內容" />
            </el-form-item>
            <el-form-item label="ADI餘額提现说明：" prop="ko_xybalance_desc">
              <el-input v-model="ruleForm.ko_xybalance_desc" type="textarea" :rows="4" placeholder="請輸入內容" />
            </el-form-item>
          </el-tab-pane>
        </el-tabs>

        <el-form-item v-setButtonPower="'adi-system-set'" style="text-align: center;">
          <el-button :size="$s_size" @click="onCancel">取 消</el-button>
          <el-button :size="$s_size" type="primary" @click="onSubmit">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { elMessage } from '@/utils/message-remind.js'
import { getAdiSystem, setAdiSystem } from '@/api/adi'
export default {
  name: 'ADISystemSet', // 系統設置
  data() {
    return {
      ruleForm: {
        balance_desc: '',
        en_balance_desc: '', // （永動補償玩法）
        jp_balance_desc: '',
        ko_balance_desc: '',
        xybalance_desc: '', // （ADI餘額提现说明）
        en_xybalance_desc: '', // （ADI餘額提现说明（英文））
        jp_xybalance_desc: '', // （ADI餘額提现说明（日语））
        ko_xybalance_desc: ''// （ADI餘額提现说明（韩语））
      },
      rules: {
        balance_desc: [{ required: true, message: '請填寫餘額管理提示', trigger: 'blur' }],
        en_balance_desc: [{ required: true, message: '請填寫餘額管理提示英文版', trigger: 'blur' }],
        jp_balance_desc: [{ required: true, message: '請填寫餘額管理提示日語版', trigger: 'blur' }],
        ko_balance_desc: [{ required: true, message: '請填寫餘額管理提示韓語版', trigger: 'blur' }],
        xybalance_desc: [{ required: true, message: '請填寫ADI餘額提现说明', trigger: 'blur' }],
        en_xybalance_desc: [{ required: true, message: '請填寫ADI餘額提现说明英文版', trigger: 'blur' }],
        jp_xybalance_desc: [{ required: true, message: '請填寫ADI餘額提现说明日語版', trigger: 'blur' }],
        ko_xybalance_desc: [{ required: true, message: '請填寫ADI餘額提现说明韓語版', trigger: 'blur' }]
      },
      activeName: 'first'
    }
  },
  created() {
    this.getData()
  },
  beforeDestroy() {
  },
  methods: {
    async getData() {
      const { data } = await getAdiSystem()
      this.ruleForm = Object.assign(this.ruleForm, data)
    },
    onCancel() {
      this.getData()
    },
    async onSubmit() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return elMessage(this, '請按要求填寫！')
        await setAdiSystem(this.ruleForm)
        elMessage(this, '操作成功！', 'success')
        this.getData()
      })
    },
    handleClick() {}
  }
}
</script>

<style lang="scss" scoped>

</style>
