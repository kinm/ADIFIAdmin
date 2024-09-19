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
          storage-name="revenue-static"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
          :cell-style="{ 'text-align': 'center' }"
          @selection-change="handleSelectionChange"
        >
          <template #btnContentLeft>
            <span class="title ">总计：</span><span class="table-describe">收益數量：{{ ape }}</span>
            <el-button v-setButtonPower="'revenue-static-export'" type="primary" :size="$s_size" @click="handlebatchClick('export')">導出</el-button>
            <el-button v-setButtonPower="'revenue-static-set'" type="primary" :size="$s_size" @click="handlebatchClick('set')">收益設置</el-button>
            <el-button v-setButtonPower="'revenue-static-retransmission'" type="primary" :size="$s_size" @click="handlebatchClick('retransmission')">收益補發</el-button>
          </template>
          <template #btnContentRight>
            <el-tooltip class="item table-top-btn" effect="dark" content="刷新列表" placement="top">
              <el-button size="mini" circle icon="el-icon-refresh-right" @click="getData" />
            </el-tooltip>
          </template>
          <el-table-column fixed prop="uid" label="用戶ID" min-width="100" />
          <el-table-column show-overflow-tooltip prop="relation_addr" label="關聯地址" min-width="150" />
          <el-table-column prop="balance" label="當日獎金池（APE）" min-width="140" />
          <el-table-column prop="left" label="累計餘量（APE）" min-width="140" />
          <el-table-column prop="type6_str" label="收益比例" min-width="80" />
          <el-table-column prop="persons" label="發放人數" min-width="80" />
          <el-table-column prop="ape" label="收益數量（APE）" min-width="140" />
          <el-table-column prop="created_at" label="收益發放時間" min-width="160" />
          <!-- <el-table-column show-overflow-tooltip label="備註" min-width="160">
            <template slot-scope="scope">
              <div class="table-omit">
                <span v-if="buttonRoles.some((el) => el === 'revenue-static-remark')" class="icon-edit" @click="editRemarks(scope.row)"><i class="el-icon-edit" /></span>
                {{ scope.row.remark }}
              </div>
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
    <Set ref="Set" @getData="getData" />
    <SetRetransmission ref="SetRetransmission" @getData="getData" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TablePackage from '@/components/TablePackage'
import SearchForm from '@/components/SearchForm'
import { pageMixins } from '@/mixins/page'
import FileSaver from 'file-saver'
import Set from './components/set'
import SetRetransmission from './components/set-retransmission'
import { elMessage } from '@/utils/message-remind.js'
import { incomeList1, incomeEnums, incomeList1Export } from '@/api/revenue'
export default {
  name: 'RevenueStatic', // 靜態收益
  components: { TablePackage, SearchForm, Set, SetRetransmission },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      options: {
        type6_enum: []
      },
      searchConfig: [
        {
          key: 'uid',
          type: 'input',
          label: '用戶ID',
          value: ''
        },
        // {
        //   key: 'relation_addr',
        //   type: 'input',
        //   label: '訂單編號',
        //   value: ''
        // },
        {
          key: 'relation_addr',
          type: 'input',
          label: '關聯地址',
          value: ''
        },
        {
          key: 'type6',
          type: 'select',
          label: '收益比例',
          value: ''
        },
        {
          key: 'create_time',
          type: 'datetimerange',
          label: '收益發放時間',
          is_simple: true,
          value: ''
        }
      ],
      tableData: [],
      ape: 0
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
      const { data } = await incomeEnums()
      this.options.type6_enum = data.static_type6
    },
    async getData() {
      this.loading = true
      const { data } = await incomeList1(this.getSearchOptions())
      this.loading = false
      this.tableData = data.data
      this.ape = data.total_ape
      this.searchForm.total = data.total
    },
    async handlebatchClick(type) {
      if (type === 'export') {
        const params = { ...this.getSearchOptions() }
        delete params.page
        delete params.page_size
        delete params.total
        const { data } = await incomeList1Export(params)
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
      } else if (type === 'set') {
        this.$refs.Set.getData()
        this.$refs.Set.dialogFormVisible = true
      } else if (type === 'retransmission') {
        this.$refs.SetRetransmission.getData()
        this.$refs.SetRetransmission.dialogFormVisible = true
      }
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
        // await userRemark({ id: params.id, remark: value })
        elMessage(this, '操作成功！', 'success')
        this.getData()
      }).catch(() => {})
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
