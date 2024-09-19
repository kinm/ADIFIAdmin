<template>
  <div>
    <el-dialog width="75%" :close-on-click-modal="false" title="質押時長設置" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <draggable v-model="ruleForm.list" :force-fallback="true">
          <el-form-item v-for="(item,index) in ruleForm.list" :key="index" style="cursor: move;" :label="`設置${index + 1}：`">
            <el-row :gutter="10" justify="space-between">
              <el-col :span="5">
                <el-form-item :key="`list.${index}.during`" :prop="`list.${index}.during`" :rules="rules.during">
                  <el-input v-model="item.during" clearable>
                    <template slot="prepend">時長</template>
                    <el-select slot="append" v-model="item.during_unit" style="width:65px" placeholder="請選擇">
                      <el-option
                        v-for="e in options.time_unit"
                        :key="e.value"
                        :label="e.label"
                        :value="e.value"
                      />
                    </el-select>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item :key="`list.${index}.days`" :prop="`list.${index}.days`" :rules="rules.days">
                  <el-input v-model="item.days" placeholder="請輸入天數" clearable>
                    <template slot="append">天</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :key="`list.${index}.rate_num`" :prop="`list.${index}.rate_num`" :rules="rules.rate_num">
                  <el-input v-model="item.rate_num" clearable>
                    <template slot="prepend">收益比例</template>
                    <el-select slot="append" v-model="item.rate_unit" style="width:65px" placeholder="請選擇">
                      <el-option
                        v-for="e in options.val_unit"
                        :key="e.value"
                        :label="e.label"
                        :value="e.value"
                      />
                    </el-select>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :key="`list.${index}.rate_amp`" :prop="`list.${index}.rate_amp`" :rules="rules.rate_amp">
                  <el-input v-model="item.rate_amp" clearable>
                    <template slot="prepend">波幅</template>
                    <el-select slot="append" v-model="item.rate_unit" style="width:65px" placeholder="請選擇">
                      <el-option
                        v-for="e in options.val_unit"
                        :key="e.value"
                        :label="e.label"
                        :value="e.value"
                      />
                    </el-select>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :key="`list.${index}.base`" :prop="`list.${index}.base`" :rules="rules.base">
                  <el-input v-model="item.base" placeholder="請輸入分潤基數" clearable>
                    <template slot="prepend">分潤基數</template>
                    <template slot="append">%</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :key="`list.${index}.step`" :prop="`list.${index}.step`" :rules="rules.step">
                  <el-input v-model="item.step" placeholder="請輸入分潤級差" clearable>
                    <template slot="prepend">分潤級差</template>
                    <template slot="append">%</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-button v-if="index===ruleForm.list.length-1" size="mini" type="primary" icon="el-icon-plus" circle @click="addItem" />
                <el-button v-if="ruleForm.list.length>1" size="mini" type="danger" icon="el-icon-delete" circle @click="delItem(item,index)" />
              </el-col>
            </el-row>
          </el-form-item>
        </draggable>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :size="$s_size" @click="handleClose">取 消</el-button>
        <el-button :size="$s_size" type="primary" @click="submitForm">確 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { positiveFixed2, positiveInteger } from '@/utils/validate.js'
import { elMessage } from '@/utils/message-remind.js'
import { xyFenrunRuleList, xyFenrunRuleSet } from '@/api/adi'
export default {
  name: '',
  components: {
    draggable
  },
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
      ruleForm: {
        list: [
          {
            id: 0,
            during: '',
            during_unit: 1,
            days: '',
            rate_num: '',
            rate_amp: '',
            rate_unit: 1,
            step: '',
            base: ''
          }
        ]
      },
      rules: {
        during: [{ required: true, message: '請輸入質押時長', trigger: 'blur' },
          { validator: positiveInteger, trigger: 'blur' }],
        days: [{ required: true, message: '請輸入天數', trigger: 'blur' },
          { validator: positiveInteger, trigger: 'blur' }],
        rate_num: [{ required: true, message: '請輸入收益比例', trigger: 'blur' },
          { validator: positiveFixed2, trigger: 'blur' }],
        rate_amp: [{ required: true, message: '請輸入波幅', trigger: 'blur' },
          { validator: positiveFixed2, trigger: 'blur' }],
        base: [{ required: true, message: '請輸入分潤基數', trigger: 'blur' }],
        step: [{ required: true, message: '請輸入分潤級差', trigger: 'blur' }]
      }

    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData() {
      const { data } = await xyFenrunRuleList()
      if (data.length) {
        data.sort((start, next) => { return start.sort - next.sort })
        this.ruleForm.list = data
      }
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    addItem() {
      this.ruleForm.list.push({
        id: 0,
        during: '',
        during_unit: 1,
        rate_num: '',
        rate_amp: '',
        rate_unit: 1,
        step: '',
        base: ''
      })
    },
    delItem(item, index) {
      this.ruleForm.list.splice(index, 1)
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return elMessage(this, '請按要求填寫！')
        const arr = []
        this.ruleForm.list.map((el, ind) => {
          arr.push({
            ...el,
            sort: ind
          })
        })
        await xyFenrunRuleSet({ rules: arr })
        elMessage(this, '操作成功！', 'success')
        this.$emit('getData')
        this.handleClose()
      })
    }
  }
}
</script>
<style lang='scss'  scoped>
::v-deep .el-col{
  margin-bottom: 15px;
}
</style>
