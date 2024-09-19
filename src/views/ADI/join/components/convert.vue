<template>
  <div>
    <el-dialog width="20%" :close-on-click-modal="false" title="兌換設置" :visible.sync="dialogFormVisible">
      <div class="switch-content">
        <el-switch
          v-model="value1"
          active-text="開"
          inactive-text="關"
          :active-value="2"
          :inactive-value="1"
        />
      </div>
      <span class="dialog-footer" style="margin-top:30px">
        <el-button :size="$s_size" @click="dialogFormVisible = false">取 消</el-button>
        <el-button :size="$s_size" type="primary" @click="submitForm">確 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { elMessage } from '@/utils/message-remind.js'
import { adi2dotExchangeGetSwitch, adi2dotExchangeSetSwitch } from '@/api/adi'
export default {
  name: '',
  data() {
    return {
      dialogFormVisible: false,
      value1: 1
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData() {
      const { data } = await adi2dotExchangeGetSwitch()
      if (data.open) this.value1 = data.open
    },
    async submitForm() {
      await adi2dotExchangeSetSwitch({ open: this.value1 })
      elMessage(this, '操作成功！', 'success')
      this.dialogFormVisible = false
    }
  }
}
</script>
<style lang='scss'  scoped>
.switch-content{
  display: flex;
  justify-content: center;
}
</style>
