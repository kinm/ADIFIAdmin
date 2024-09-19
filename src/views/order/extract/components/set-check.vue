<template>
  <div>
    <el-dialog width="35%" :close-on-click-modal="false" title="批量審核通過" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="領取時間：" prop="time">
          <el-date-picker
            v-model="ruleForm.time"
            type="datetimerange"
            range-separator="至"
            value-format="timestamp"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeTime"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :size="$s_size" @click="handleClose">取 消</el-button>
        <el-button :size="$s_size" type="primary" @click="submitForm">通過並導出</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { elMessage } from '@/utils/message-remind.js'
import { balanceWithdrawBatchReview } from '@/api/order'
import FileSaver from 'file-saver'
export default {
  name: '',
  data() {
    return {
      mode: '',
      dialogFormVisible: false,
      ruleForm: {
        time: [],
        start: '',
        end: ''
      },
      rules: {
        time: [{ required: true, message: '請選擇領取時間', trigger: 'blur' }]
      }

    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    changeTime(e) {
      if (e) {
        this.ruleForm.start = e[0] / 1000
        this.ruleForm.end = e[1] / 1000
      } else {
        this.ruleForm.start = ''
        this.ruleForm.end = ''
      }
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) {
          return elMessage(this, '請選擇領取時間！')
        }
        const { data } = await balanceWithdrawBatchReview(this.ruleForm)
        var oReq = new XMLHttpRequest()
        oReq.open('GET', data.excel_url, true)
        oReq.responseType = 'blob'
        oReq.onload = () => {
          var file = new Blob([oReq.response], {
            type: 'application/vnd.ms-excel' || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          })
          FileSaver.saveAs(file, decodeURI(data.excel_url.split('/')[data.excel_url.split('/').length - 1]))
        }
        oReq.send()
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
