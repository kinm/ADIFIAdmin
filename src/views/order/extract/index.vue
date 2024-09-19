<template>
  <div>
    <el-card shadow="never" class="page-card">
      <SearchForm ref="searchForm" :options="options" :search-config="searchConfig" @search="onSearch" @init="onInit" />
      <div>
        <TablePackage
          v-loading="loading"
          :data="tableData"
          :size="$size"
          border
          storage-name="order-extract"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <template #btnContentLeft>
            <el-button v-setButtonPower="'order-extract-export'" type="primary" :size="$s_size" @click="handlebatchClick('export')">導出</el-button>
            <!-- <el-button v-setButtonPower="'order-extract-check'" type="primary" :size="$s_size" @click="handlebatchClick('check')">批量審核</el-button> -->
            <el-button v-setButtonPower="'order-extract-auto'" type="primary" :size="$s_size" @click="handlebatchClick('auto')">自動審核</el-button>
            <el-button v-setButtonPower="'order-extract-set'" type="primary" :size="$s_size" @click="handlebatchClick('set')">提現設置</el-button>
          </template>
          <template #btnContentRight>
            <el-tooltip class="item table-top-btn" effect="dark" content="刷新列表" placement="top">
              <el-button size="mini" circle icon="el-icon-refresh-right" @click="getData" />
            </el-tooltip>
          </template>
          <el-table-column fixed show-overflow-tooltip prop="order_sn" label="訂單編號" min-width="150" />
          <el-table-column fixed show-overflow-tooltip prop="relation_addr" label="關聯地址" min-width="150" />
          <el-table-column prop="base" label="提現數量（APE）" min-width="150" />
          <el-table-column prop="rate" label="手續費（APE）" min-width="120" />
          <el-table-column prop="num" label="實際到賬（APE）" min-width="150" />
          <el-table-column prop="state_str" label="狀態" min-width="100">
            <template slot-scope="scope">
              <div>
                {{ scope.row.state_str }}
                <el-popover
                  v-if="scope.row.state===3"
                  placement="bottom"
                  trigger="hover"
                  popper-class="el-popover-self"
                >
                  {{ scope.row.reason }}
                  <i slot="reference" class="el-icon-warning" />
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="txid" label="hash" min-width="160" />
          <el-table-column prop="created_at" label="提現時間" min-width="160" />
          <el-table-column label="操作" class="operate-table" width="80" fixed="right">
            <template slot-scope="scope">
              <el-dropdown v-setButtonPower="'order-extract-audit'" trigger="click" size="small" placement="bottom-end" :hide-on-click="false" @command="(e)=>{ handleClick(e,scope.row, scope.$index) }">
                <span class="el-dropdown-link">
                  ...
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :disabled="scope.row.state !==1" command="audit">審核發放</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </TablePackage>
        <div class="footerpage">
          <el-pagination
            background
            :current-page="searchForm.page"
            :page-size="searchForm.page_size"
            layout="total,  prev, pager, next, jumper"
            :total="searchForm.total"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </el-card>
    <SetCheck ref="SetCheck" @getData="getData" />
    <SetAuto ref="SetAuto" @getData="getData" />
    <Set ref="Set" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TablePackage from '@/components/TablePackage'
import SearchForm from '@/components/SearchForm'
import { pageMixins } from '@/mixins/page'
import FileSaver from 'file-saver'
import SetCheck from './components/set-check'
import SetAuto from './components/set-auto'
import Set from './components/set'
import { elMessage } from '@/utils/message-remind.js'
import { balanceWithdrawList, balanceWithdrawEnums, balanceWithdrawReject, balanceWithdrawExport, balanceWithdrawPass } from '@/api/order'
export default {
  name: 'OrderExtract', // 提現記錄
  components: { TablePackage, SearchForm, SetCheck, SetAuto, Set },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      options: {
        state_enum: []
      },
      searchConfig: [
        {
          key: 'order_sn',
          type: 'input',
          label: '訂單編號',
          value: ''
        },
        {
          key: 'relation_addr',
          type: 'input',
          label: '關聯地址',
          value: ''
        },
        {
          key: 'create_time',
          type: 'datetimerange',
          label: '提現時間',
          is_simple: true,
          value: ''
        },
        {
          key: 'state',
          type: 'select',
          label: '狀態',
          value: ''
        }
      ],
      tableData: []
    }
  },
  computed: {
    ...mapGetters([
      'buttonRoles'
    ])
  },
  created() {
    this.getEnum()
  },
  methods: {
    async getEnum() {
      const { data } = await balanceWithdrawEnums()
      this.options.state_enum = data.withdraw_state
    },
    async getData() {
      this.loading = true
      const { data } = await balanceWithdrawList(this.getSearchOptions())
      this.loading = false
      this.tableData = data.data
      this.searchForm.total = data.total
    },
    async handlebatchClick(type) {
      if (type === 'export') {
        const params = { ...this.getSearchOptions() }
        delete params.page
        delete params.page_size
        delete params.total
        const { data } = await balanceWithdrawExport(params)
        var oReq = new XMLHttpRequest()
        oReq.open('GET', data.url, true)
        oReq.responseType = 'blob'
        oReq.onload = () => {
          var file = new Blob([oReq.response], {
            type: 'application/vnd.ms-excel' || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          })
          FileSaver.saveAs(file, decodeURI(data.url.split('/')[data.url.split('/').length - 1]))
        }
        oReq.send()
      } else if (type === 'check') {
        this.setCheck()
      } else if (type === 'auto') {
        this.setAuto()
      } else if (type === 'set') {
        this.$refs.Set.getData()
        this.$refs.Set.dialogFormVisible = true
      }
    },
    setAuto() {
      this.$refs.SetAuto.getData()
      this.$refs.SetAuto.dialogFormVisible = true
    },
    handleClick(type, data) {
      if (type === 'audit') {
        this.setAudit(data)
      }
    },
    setAudit(params) {
      this.$confirm('審核通過後，領取數量將發放至錢包中，請確認是否發放？', '審核發放', {
        confirmButtonText: '通過',
        cancelButtonText: '拒絕',
        distinguishCancelAndClose: true,
        type: 'warning'
      }).then(() => {
        this.setPass(params)
      }).catch((e) => {
        if (e === 'cancel') { this.setRefuse(params) }
      })
    },
    setRefuse(params) {
      this.$prompt('', '拒絕原因', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        inputType: 'textarea',
        inputErrorMessage: '拒絕原因不能為空',
        inputValidator: function(val) { if (!val) { return '拒絕原因' } else { if (val.length > 30) { return '限制30個字符' } else { return true } } }
      }).then(async({ value }) => {
        await balanceWithdrawReject({ id: params.id, reason: value })
        elMessage(this, '操作成功！', 'success')
        this.getData()
      }).catch(() => {})
    },
    async setPass(data) {
      this.$prompt('', '请输入HASH', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        inputType: 'textarea',
        inputErrorMessage: 'HASH不能為空',
        inputValidator: function(val) { if (!val) { return 'HASH不能為空' } return true }
      }).then(async({ value }) => {
        await balanceWithdrawPass({ id: data.id, hash: value })
        elMessage(this, '操作成功！', 'success')
        this.getData()
      }).catch(() => {})
    },
    setCheck(params) {
      this.$refs.SetCheck.dialogFormVisible = true
    }
  }
}
</script>
<style lang='scss'  scoped>
.table-describe{
  font-size: 14px;
  color: #97a8be;
  margin-right: 20px;
}
</style>
