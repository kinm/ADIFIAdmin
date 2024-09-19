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
          storage-name="order-transfer"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <template #btnContentLeft>
            <el-button v-setButtonPower="'order-transfer-export'" type="primary" :size="$s_size" @click="handlebatchClick('export')">導出</el-button>
          </template>
          <template #btnContentRight>
            <el-tooltip class="item table-top-btn" effect="dark" content="刷新列表" placement="top">
              <el-button size="mini" circle icon="el-icon-refresh-right" @click="getData" />
            </el-tooltip>
          </template>
          <el-table-column fixed show-overflow-tooltip prop="sn" label="訂單編號" min-width="150" />
          <el-table-column fixed show-overflow-tooltip prop="relation_addr" label="發起方（關聯地址）" min-width="150" />
          <el-table-column fixed show-overflow-tooltip prop="to_addr" label="接收方（關聯地址）" min-width="150" />
          <el-table-column prop="num" label="轉賬數量（APE）" min-width="120" />
          <el-table-column prop="status_str" label="狀態" min-width="120" />
          <el-table-column prop="create" label="轉賬時間" min-width="160" />
          <el-table-column label="操作" class="operate-table" width="80" fixed="right">
            <template slot-scope="scope">
              <el-dropdown v-setButtonPower="'order-transfer-back'" trigger="click" size="small" placement="bottom-end" :hide-on-click="false" @command="(e)=>{ handleClick(e,scope.row, scope.$index) }">
                <span class="el-dropdown-link">
                  ...
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :disabled="scope.row.status ===2" command="back">退回</el-dropdown-item>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TablePackage from '@/components/TablePackage'
import SearchForm from '@/components/SearchForm'
import { elMessage } from '@/utils/message-remind.js'
import { pageMixins } from '@/mixins/page'
import FileSaver from 'file-saver'
import { transferList, transferExport, transferRollbackTrans } from '@/api/order'
export default {
  name: 'OrderTransfer', // 轉賬記錄
  components: { TablePackage, SearchForm },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      options: {
        status_enum: [
          { value: 1, label: '轉賬成功' },
          { value: 2, label: '轉賬退回' }
        ]
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
          label: '發起方',
          placeholder: '請輸入其關聯地址',
          value: ''
        },
        {
          key: 'to_addr',
          type: 'input',
          label: '接收方',
          placeholder: '請輸入其關聯地址',
          value: ''
        },
        {
          key: 'status',
          type: 'select',
          label: '狀態',
          value: ''
        },
        {
          key: 'create_time',
          type: 'datetimerange',
          label: '轉賬時間',
          is_simple: true,
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
  },
  methods: {
    async getData() {
      this.loading = true
      const { data } = await transferList(this.getSearchOptions())
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
        const { data } = await transferExport(params)
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
      }
    },
    handleClick(type, data) {
      if (type === 'back') {
        this.$confirm(`是否確定退回該筆轉賬`, '提示', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await transferRollbackTrans({ id: data.id })
          elMessage(this, '操作成功！', 'success')
          this.getData()
        }).catch(() => {})
      }
    }
  }
}
</script>
<style lang='scss'  scoped>

</style>
