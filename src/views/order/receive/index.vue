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
          storage-name="order-receive"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <template #btnContentLeft>
            <el-button v-setButtonPower="'order-receive-export'" type="primary" :size="$s_size" @click="handlebatchClick('export')">導出</el-button>
            <!-- <el-button v-setButtonPower="'order-receive-check'" type="primary" :size="$s_size" @click="handlebatchClick('check')">批量審核</el-button> -->
            <!-- <el-button v-setButtonPower="'order-receive-auto'" type="primary" :size="$s_size" @click="handlebatchClick('auto')">自動審核</el-button> -->
          </template>
          <template #btnContentRight>
            <el-tooltip class="item table-top-btn" effect="dark" content="刷新列表" placement="top">
              <el-button size="mini" circle icon="el-icon-refresh-right" @click="getData" />
            </el-tooltip>
          </template>
          <el-table-column fixed show-overflow-tooltip prop="order_sn" label="訂單編號" min-width="150" />
          <el-table-column fixed prop="uid" label="用戶ID" min-width="100" />
          <el-table-column show-overflow-tooltip prop="relation_addr" label="關聯地址" min-width="150" />
          <el-table-column prop="ape" label="領取數量（APE）" min-width="120" />
          <el-table-column prop="state_str" label="狀態" min-width="80" />
          <el-table-column prop="created_at" label="領取時間" min-width="160" />
          <el-table-column show-overflow-tooltip label="備註" min-width="160">
            <template slot-scope="scope">
              <div class="table-omit">
                <span v-if="buttonRoles.some((el) => el === 'order-receive-remark')" class="icon-edit" @click="editRemarks(scope.row)"><i class="el-icon-edit" /></span>
                {{ scope.row.remark }}
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作" class="operate-table" width="80" fixed="right">
            <template slot-scope="scope">
              <el-dropdown v-if="scope.row.state ===1" v-setButtonPower="'order-receive-audit'" trigger="click" size="small" placement="bottom-end" :hide-on-click="false" @command="(e)=>{ handleClick(e,scope.row, scope.$index) }">
                <span class="el-dropdown-link">
                  ...
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="audit">審核發放</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column> -->
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

import { elMessage } from '@/utils/message-remind.js'
import { withdrawList, withdrawEnums, withdrawChangeRemark, withdrawReject, withdrawExport, withdrawPass } from '@/api/order'
export default {
  name: 'OrderReceive', // 領取記錄
  components: { TablePackage, SearchForm, SetCheck, SetAuto },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      options: {
        state_enum: []
      },
      searchConfig: [
        {
          key: 'uid',
          type: 'input',
          label: '用戶ID',
          value: ''
        },
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
          key: 'state',
          type: 'select',
          label: '狀態',
          value: ''
        },
        {
          key: 'create_time',
          type: 'datetimerange',
          label: '領取時間',
          is_simple: true,
          value: ''
        }
      ],
      tableData: [],
      contract: null,
      contractAddress: null,
      provider: null
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
      const { data } = await withdrawEnums()
      this.options.state_enum = data.withdraw_state
    },
    async getData() {
      this.loading = true
      const { data } = await withdrawList(this.getSearchOptions())
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
        const { data } = await withdrawExport(params)
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
      }
    },
    setAuto() {
      this.$refs.SetAuto.getData()
      this.$refs.SetAuto.dialogFormVisible = true
    },
    editRemarks(params) {
      this.$prompt('', '請輸入備註', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        inputType: 'textarea',
        inputValue: params.remark,
        inputErrorMessage: '備註不能為空',
        inputValidator: function(val) { if (!val) { return '請輸入備註' } else { return true } }
      }).then(async({ value }) => {
        await withdrawChangeRemark({ id: params.id, remark: value })
        elMessage(this, '操作成功！', 'success')
        this.getData()
      }).catch(() => {})
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
        inputErrorMessage: '備註不能為空',
        inputValidator: function(val) { if (!val) { return '拒絕原因' } else { if (val.length > 30) { return '限制30個字符' } else { return true } } }
      }).then(async({ value }) => {
        await withdrawReject({ id: params.id, reason: value })
        elMessage(this, '操作成功！', 'success')
        this.getData()
      }).catch(() => {})
    },
    async setPass(data) {
      await withdrawPass({ id: data.id })
      elMessage(this, '操作成功！', 'success')
      this.getData()
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
