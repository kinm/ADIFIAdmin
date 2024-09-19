<template>
  <div>
    <el-card shadow="never" class="page-card">
      <el-button v-setButtonPower="'system-account-add'" type="primary" size="mini" style="margin-bottom:20px;" @click="handleClick('add')">添加賬戶</el-button>
      <el-form ref="ruleForm" :size="$size" label-position="right" label-width="10px" class="demo-ruleForm">
        <el-form-item label="" prop="service_agreement">
          <el-table
            :data="tableData"
            border
            storage-name="system-account"
            style="width: 100%"
            :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
            :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column prop="type_str" label="參與收款" min-width="50">
              <template slot-scope="scope">
                <div :class="[scope.row.flag?'el-radio-checked':'','el-radio']" @click="chnageWX(scope.row)" />
              </template>
            </el-table-column>
            <el-table-column prop="type_str" label="充值收款" min-width="50">
              <template slot-scope="scope">
                <div :class="[scope.row.flag_app?'el-radio-checked':'','el-radio']" @click="chnageAliApp(scope.row)" />
              </template>
            </el-table-column>
            <el-table-column prop="com_acc" label="賬戶標識" min-width="150" />
            <!-- <el-table-column prop="name" label="賬戶號" min-width="150" /> -->
            <el-table-column prop="income" label="收款總額" min-width="150" />
            <el-table-column label="操作" class="operate-table" width="80">
              <template slot-scope="scope">
                <el-dropdown v-if="scope.row.com_acc!==select" v-setButtonPower="'system-account-del'" trigger="click" size="small" placement="bottom-end" :hide-on-click="false" @command="(e)=>{ handleClick(e,scope.row, scope.$index) }">
                  <span class="el-dropdown-link">
                    ...
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="del">刪除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item v-setButtonPower="'system-account-set'" style="text-align: center;">
          <el-button :size="$s_size" @click="onCancel">重 置</el-button>
          <el-button :size="$s_size" type="primary" @click="onSubmit">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { elMessage } from '@/utils/message-remind.js'
import { settingGetAcc, settingSetAcc, settingAddAcc, settingDelAcc } from '@/api/system.js'
export default {
  name: '',
  data() {
    return {
      tableData: [],
      select: ''
    }
  },
  computed: {
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const { data } = await settingGetAcc()
      // console.log(data, 8888)
      this.select = data.select
      if (data.list.length) {
        data.list.forEach(el => {
          if (el.com_acc === data.select) {
            el.flag = true
          } else {
            el.flag = false
          }
          if (el.com_acc === data.charge_select) {
            el.flag_app = true
          } else {
            el.flag_app = false
          }
        })
      }
      this.tableData = data.list
    },
    handleClick(type, data) {
      if (type === 'add') {
        this.setAdd()
      } else if (type === 'del') {
        this.setDel(data)
      }
    },
    setDel(params) {
      this.$confirm('確定刪除此賬戶？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await settingDelAcc({ com_acc: params.com_acc })
        elMessage(this, '操作成功！', 'success')
        this.getData()
      }).catch(() => {})
    },
    setAdd() {
      this.$prompt('', '請輸入賬戶', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        // inputType: 'textarea',
        inputErrorMessage: '賬戶不能為空',
        inputValidator: function(val) { if (!val) { return '請輸入賬戶' } else { return true } }
      }).then(async({ value }) => {
        await settingAddAcc({ com_acc: value })
        elMessage(this, '操作成功！', 'success')
        this.getData()
      }).catch(() => {})
    },
    chnageWX(params) {
      if (params.flag_app) return
      this.tableData.forEach(el => {
        if (el.com_acc === params.com_acc) {
          el.flag = !params.flag
        } else {
          el.flag = false
        }
      })
    },
    chnageAliApp(params) {
      if (params.flag) return
      this.tableData.forEach(el => {
        if (el.com_acc === params.com_acc) {
          el.flag_app = !params.flag_app
        } else {
          el.flag_app = false
        }
      })
    },
    onCancel() {
      this.getData()
    },
    async onSubmit() {
      const selectFrom = {}
      this.tableData.map(el => {
        if (el.flag) selectFrom.select = el.com_acc
        if (el.flag_app) selectFrom.charge_select = el.com_acc
      })
      await settingSetAcc(selectFrom)
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
