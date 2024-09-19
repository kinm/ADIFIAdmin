<template>
  <div>
    <el-dialog width="75%" :close-on-click-modal="false" title="收款賬戶設置" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-button style="margin-bottom:15px" type="primary" size="mini" @click="handleClick('add')">新增</el-button>
      <el-table
        border
        size="mini"
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="type_str" label="當前收款" min-width="50">
          <template slot-scope="scope">
            <div :class="[scope.row.flag?'el-radio-checked':'','el-radio']" @click="chnageAc(scope.row,scope.$index)" />
          </template>
        </el-table-column>
        <el-table-column prop="com_acc" label="賬戶標識" min-width="150" />
        <el-table-column prop="income" label="收款總額" min-width="150" />
        <el-table-column label="操作" fixed="right" min-width="80">
          <template slot-scope="scope">
            <el-button type="text" @click="handleClick('del',scope.row)">刪除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button :size="$s_size" @click="getData">重 置</el-button>
        <el-button :size="$s_size" type="primary" @click="submitForm">確 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { elMessage } from '@/utils/message-remind.js'
import { getAcc, addAcc, delAcc, setAcc } from '@/api/adi'
export default {
  name: '',
  data() {
    return {
      dialogFormVisible: false,
      tableData: []
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData() {
      const { data } = await getAcc()
      if (data.list.length) {
        data.list.map(el => {
          if (el.com_acc === data.select) {
            el.flag = true
          } else {
            el.flag = false
          }
        })
        this.tableData = data.list
      }
    },
    handleClose() {
      this.dialogFormVisible = false
      this.tableData = []
    },
    handleClick(type, data) {
      if (type === 'add') {
        this.$prompt('', '請輸入賬戶', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          inputErrorMessage: '賬戶不能為空',
          inputValidator: function(val) { if (!val) { return '請輸入賬戶' } else { return true } }
        }).then(async({ value }) => {
          await addAcc({ com_acc: value })
          elMessage(this, '操作成功！', 'success')
          this.getData()
        }).catch(() => {})
      } else if (type === 'del') {
        this.$confirm('確定刪除此賬戶？', '提示', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await delAcc({ com_acc: data.com_acc })
          elMessage(this, '操作成功！', 'success')
          this.getData()
        }).catch(() => {})
      }
    },
    chnageAc(params, index) {
      if (params.flag) return
      this.tableData.forEach((el, i) => {
        if (index === i) {
          el.flag = !params.flag
        } else {
          el.flag = false
        }
      })
    },
    async submitForm() {
      if (!this.tableData.find(item => item.flag)) return elMessage(this, '請選擇賬戶！')
      const com_acc = this.tableData.find(item => item.flag).com_acc
      await setAcc({ select: com_acc })
      elMessage(this, '操作成功！', 'success')
      this.getData()
    }
  }
}
</script>
<style lang='scss'  scoped>
.el-radio{
  border: 1px solid #dcdfe6;
    border-radius: 100%;
    width: 14px;
    height: 14px;
    background-color: #fff;
    position: relative;
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;
}
.el-radio-checked{
  border-color: #409eff;
  background: #409eff;
}
.el-radio-checked::after{
  width: 4px;
    height: 4px;
    border-radius: 100%;
    background-color: #fff;
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%) scale(0);
    transition: transform .15s ease-in;
    transform: translate(-50%,-50%) scale(1);
}
</style>
