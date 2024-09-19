<template>
  <div>
    <el-card shadow="never" class="page-card">
      <el-form ref="ruleForm" :hide-required-asterisk="true" :size="$size" :model="ruleForm" :rules="rules" label-position="right" label-width="150px" class="demo-ruleForm">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="中文繁體" name="first">
            <el-form-item label="首頁關於：" prop="home_about">
              <el-input v-model="ruleForm.home_about" type="textarea" :rows="4" placeholder="請輸入內容" />
            </el-form-item>
            <el-form-item label="賽博猿玩法：" prop="NFT_method">
              <el-input v-model="ruleForm.NFT_method" type="textarea" :rows="4" placeholder="請輸入內容" />
            </el-form-item>
            <el-form-item label="永動激勵玩法：" prop="incentives_method">
              <el-input v-model="ruleForm.incentives_method" type="textarea" :rows="4" placeholder="請輸入內容" />
            </el-form-item>
            <el-form-item label="永動補償玩法：" prop="compensation_method">
              <el-input v-model="ruleForm.compensation_method" type="textarea" :rows="4" placeholder="請輸入內容" />
            </el-form-item>
            <!-- <el-form-item label="餘額管理提示：" prop="balance_desc">
              <el-input v-model="ruleForm.balance_desc" type="textarea" :rows="4" placeholder="請輸入內容" />
            </el-form-item>
            <el-form-item label="ADI餘額提现说明：" prop="xybalance_desc">
              <el-input v-model="ruleForm.xybalance_desc" type="textarea" :rows="4" placeholder="請輸入內容" />
            </el-form-item> -->
          </el-tab-pane>
          <el-tab-pane label="English" name="second">
            <el-form-item label="首頁關於：" prop="en_home_about">
              <el-input v-model="ruleForm.en_home_about" type="textarea" :rows="4" placeholder="請輸入英文版內容" />
            </el-form-item>
            <el-form-item label="賽博猿玩法：" prop="en_NFT_method">
              <el-input v-model="ruleForm.en_NFT_method" type="textarea" :rows="4" placeholder="請輸入英文版內容" />
            </el-form-item>
            <el-form-item label="永動激勵玩法：" prop="en_incentives_method">
              <el-input v-model="ruleForm.en_incentives_method" type="textarea" :rows="4" placeholder="請輸入英文版內容" />
            </el-form-item>
            <el-form-item label="永動補償玩法：" prop="en_compensation_method">
              <el-input v-model="ruleForm.en_compensation_method" type="textarea" :rows="4" placeholder="請輸入英文版內容" />
            </el-form-item>
            <!-- <el-form-item label="餘額管理提示：" prop="en_balance_desc">
              <el-input v-model="ruleForm.en_balance_desc" type="textarea" :rows="4" placeholder="請輸入內容" />
            </el-form-item>
            <el-form-item label="ADI餘額提现说明：" prop="en_xybalance_desc">
              <el-input v-model="ruleForm.en_xybalance_desc" type="textarea" :rows="4" placeholder="請輸入內容" />
            </el-form-item> -->
          </el-tab-pane>
          <el-tab-pane label="日語" name="third">
            <el-form-item label="首頁關於：" prop="jp_home_about">
              <el-input v-model="ruleForm.jp_home_about" type="textarea" :rows="4" placeholder="請輸入日語版內容" />
            </el-form-item>
            <el-form-item label="賽博猿玩法：" prop="jp_NFT_method">
              <el-input v-model="ruleForm.jp_NFT_method" type="textarea" :rows="4" placeholder="請輸入日語版內容" />
            </el-form-item>
            <el-form-item label="永動激勵玩法：" prop="jp_incentives_method">
              <el-input v-model="ruleForm.jp_incentives_method" type="textarea" :rows="4" placeholder="請輸入日語版內容" />
            </el-form-item>
            <el-form-item label="永動補償玩法：" prop="jp_compensation_method">
              <el-input v-model="ruleForm.jp_compensation_method" type="textarea" :rows="4" placeholder="請輸入日語版內容" />
            </el-form-item>
            <!-- <el-form-item label="餘額管理提示：" prop="jp_balance_desc">
              <el-input v-model="ruleForm.jp_balance_desc" type="textarea" :rows="4" placeholder="請輸入內容" />
            </el-form-item>
            <el-form-item label="ADI餘額提现说明：" prop="jp_xybalance_desc">
              <el-input v-model="ruleForm.jp_xybalance_desc" type="textarea" :rows="4" placeholder="請輸入內容" />
            </el-form-item> -->
          </el-tab-pane>
          <el-tab-pane label="韓語" name="fourth">
            <el-form-item label="首頁關於：" prop="ko_home_about">
              <el-input v-model="ruleForm.ko_home_about" type="textarea" :rows="4" placeholder="請輸入韓語版內容" />
            </el-form-item>
            <el-form-item label="賽博猿玩法：" prop="ko_NFT_method">
              <el-input v-model="ruleForm.ko_NFT_method" type="textarea" :rows="4" placeholder="請輸入韓語版內容" />
            </el-form-item>
            <el-form-item label="永動激勵玩法：" prop="ko_incentives_method">
              <el-input v-model="ruleForm.ko_incentives_method" type="textarea" :rows="4" placeholder="請輸入韓語版內容" />
            </el-form-item>
            <el-form-item label="永動補償玩法：" prop="ko_compensation_method">
              <el-input v-model="ruleForm.ko_compensation_method" type="textarea" :rows="4" placeholder="請輸入韓語版內容" />
            </el-form-item>
            <!-- <el-form-item label="餘額管理提示：" prop="ko_balance_desc">
              <el-input v-model="ruleForm.ko_balance_desc" type="textarea" :rows="4" placeholder="請輸入內容" />
            </el-form-item>
            <el-form-item label="ADI餘額提现说明：" prop="ko_xybalance_desc">
              <el-input v-model="ruleForm.ko_xybalance_desc" type="textarea" :rows="4" placeholder="請輸入內容" />
            </el-form-item> -->
          </el-tab-pane>
        </el-tabs>

        <el-form-item v-setButtonPower="'system-set-set'" style="text-align: center;">
          <el-button :size="$s_size" @click="onCancel">取 消</el-button>
          <el-button :size="$s_size" type="primary" @click="onSubmit">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { elMessage } from '@/utils/message-remind.js'
import { settingGetSystem, settingSetSystem } from '@/api/system'
export default {
  name: 'SystemSet', // 系統設置
  data() {
    return {
      ruleForm: {
        home_about: '',
        NFT_method: '',
        incentives_method: '',
        compensation_method: '',
        // balance_desc: '',
        en_home_about: '', // （首頁關於）
        en_NFT_method: '', // （猿世界玩法）
        en_incentives_method: '', // （永動激勵玩法）
        en_compensation_method: '', // （永動補償玩法）
        // en_balance_desc: '', // （永動補償玩法）
        jp_home_about: '',
        jp_NFT_method: '',
        jp_incentives_method: '',
        jp_compensation_method: '',
        // jp_balance_desc: '',
        ko_home_about: '',
        ko_NFT_method: '',
        ko_incentives_method: '',
        ko_compensation_method: ''
        // ko_balance_desc: '',
        // xybalance_desc: '', // （ADI餘額提现说明）
        // en_xybalance_desc: '', // （ADI餘額提现说明（英文））
        // jp_xybalance_desc: '', // （ADI餘額提现说明（日语））
        // ko_xybalance_desc: ''// （ADI餘額提现说明（韩语））
      },
      rules: {
        home_about: [{ required: true, message: '請填寫首頁關於', trigger: 'blur' }],
        NFT_method: [{ required: true, message: '請填寫賽博猿玩法', trigger: 'blur' }],
        incentives_method: [{ required: true, message: '請填寫永動激勵玩法', trigger: 'blur' }],
        compensation_method: [{ required: true, message: '請填寫永動補償玩法', trigger: 'blur' }],
        // balance_desc: [{ required: true, message: '請填寫餘額管理提示', trigger: 'blur' }],
        en_home_about: [{ required: true, message: '請填寫首頁關於英文版', trigger: 'blur' }],
        en_NFT_method: [{ required: true, message: '請填寫賽博猿玩法英文版', trigger: 'blur' }],
        en_incentives_method: [{ required: true, message: '請填寫永動激勵玩法英文版', trigger: 'blur' }],
        en_compensation_method: [{ required: true, message: '請填寫永動補償玩法英文版', trigger: 'blur' }],
        // en_balance_desc: [{ required: true, message: '請填寫餘額管理提示英文版', trigger: 'blur' }],
        jp_home_about: [{ required: true, message: '請填寫首頁關於日語版', trigger: 'blur' }],
        jp_NFT_method: [{ required: true, message: '請填寫賽博猿玩法日語版', trigger: 'blur' }],
        jp_incentives_method: [{ required: true, message: '請填寫永動激勵玩法日語版', trigger: 'blur' }],
        jp_compensation_method: [{ required: true, message: '請填寫永動補償玩法日語版', trigger: 'blur' }],
        // jp_balance_desc: [{ required: true, message: '請填寫餘額管理提示日語版', trigger: 'blur' }],
        ko_home_about: [{ required: true, message: '請填寫首頁關於韓語版', trigger: 'blur' }],
        ko_NFT_method: [{ required: true, message: '請填寫賽博猿玩法韓語版', trigger: 'blur' }],
        ko_incentives_method: [{ required: true, message: '請填寫永動激勵玩法韓語版', trigger: 'blur' }],
        ko_compensation_method: [{ required: true, message: '請填寫永動補償玩法韓語版', trigger: 'blur' }]
        // ko_balance_desc: [{ required: true, message: '請填寫餘額管理提示韓語版', trigger: 'blur' }],
        // xybalance_desc: [{ required: true, message: '請填寫ADI餘額提现说明', trigger: 'blur' }],
        // en_xybalance_desc: [{ required: true, message: '請填寫ADI餘額提现说明英文版', trigger: 'blur' }],
        // jp_xybalance_desc: [{ required: true, message: '請填寫ADI餘額提现说明日語版', trigger: 'blur' }],
        // ko_xybalance_desc: [{ required: true, message: '請填寫ADI餘額提现说明韓語版', trigger: 'blur' }]
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
      const { data } = await settingGetSystem()
      this.ruleForm = Object.assign(this.ruleForm, data)
    },
    onCancel() {
      this.getData()
    },
    async onSubmit() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return elMessage(this, '請按要求填寫！')
        await settingSetSystem(this.ruleForm)
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
