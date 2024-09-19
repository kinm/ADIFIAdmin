<template>
  <div>
    <el-dialog width="35%" title="收益補發" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-descriptions border title="發放詳情" :column="1">
        <el-descriptions-item label="發放日期">{{ detailsForm.date }}</el-descriptions-item>
        <el-descriptions-item label="發放數量">{{ detailsForm.static_income }}</el-descriptions-item>
        <el-descriptions-item label="是否已發放">{{ detailsForm.has_send_out?'已發放':'未發放' }}</el-descriptions-item>
        <el-descriptions-item label="備用池余額">{{ detailsForm.static_assist }}</el-descriptions-item>
      </el-descriptions>
      <div class="dialog-footer" style="margin-top:15px;">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button size="mini" :disabled="!detailsForm.can_send" type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { elMessage } from '@/utils/message-remind.js'
import { staticBuCtx, staticBuCreateTask } from '@/api/revenue'
export default {
  name: '',
  data() {
    return {
      mode: '',
      dialogFormVisible: false,
      detailsForm: {}
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData() {
      const { data } = await staticBuCtx()
      this.detailsForm = data
      console.log(data, 888888888)
    },
    handleClose() {
      this.dialogFormVisible = false
    },
    async submitForm() {
      await staticBuCreateTask()
      elMessage(this, '操作成功！', 'success')
      this.$emit('getData')
      this.handleClose()
    }
  }
}
</script>
<style lang='scss'  scoped>

</style>
