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
          storage-name="revenue-incentive"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
          :cell-style="{ 'text-align': 'center' }"
          @selection-change="handleSelectionChange"
        >
          <template #btnContentLeft>
            <span class="title ">总计：</span><span class="table-describe">收益數量：{{ ape }}</span>
            <el-button v-setButtonPower="'revenue-incentive-export'" type="primary" :size="$s_size" @click="handlebatchClick('export')">導出</el-button>
          </template>
          <template #btnContentRight>
            <el-tooltip class="item table-top-btn" effect="dark" content="刷新列表" placement="top">
              <el-button size="mini" circle icon="el-icon-refresh-right" @click="getData" />
            </el-tooltip>
          </template>
          <el-table-column fixed prop="uid" label="用戶ID" min-width="100" />
          <el-table-column show-overflow-tooltip prop="relation_addr" label="關聯地址" min-width="150" />
          <el-table-column prop="balance" label="永動激勵池（APE）" min-width="140" />
          <el-table-column prop="range" label="排名" min-width="50" />
          <el-table-column prop="rate" label="收益比例" min-width="80" />
          <el-table-column prop="ape" label="收益數量（APE）" min-width="140" />
          <el-table-column prop="created_at" label="收益發放時間" min-width="160" />
          <!-- <el-table-column show-overflow-tooltip label="備註" min-width="160">
            <template slot-scope="scope">
              <div class="table-omit">
                <span v-if="buttonRoles.some((el) => el === 'revenue-incentive-remark')" class="icon-edit" @click="editRemarks(scope.row)"><i class="el-icon-edit" /></span>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TablePackage from '@/components/TablePackage'
import SearchForm from '@/components/SearchForm'
import { pageMixins } from '@/mixins/page'
import FileSaver from 'file-saver'
import { elMessage } from '@/utils/message-remind.js'
import { incomeList3, incomeList3Export } from '@/api/revenue'
export default {
  name: 'RevenueIncentive', // 永動激勵
  components: { TablePackage, SearchForm },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      options: {},
      searchConfig: [
        {
          key: 'uid',
          type: 'input',
          label: '用戶ID',
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
          label: '收益發放時間',
          is_simple: true,
          value: ''
        },
        {
          key: 'range',
          type: 'input',
          label: '排名',
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
  },
  methods: {
    async getData() {
      this.loading = true
      const { data } = await incomeList3(this.getSearchOptions())
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
        const { data } = await incomeList3Export(params)
        var oReq = new XMLHttpRequest()
        oReq.open('GET', data.excel_url, true)
        oReq.responseType = 'blob'
        oReq.onload = () => {
          var file = new Blob([oReq.response], {
            type: 'application/vnd.ms-excel' || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          })
          FileSaver.saveAs(file, decodeURI(data.excel_url.split('/')[data.excel_url.split('/').length - 1].split('?')[0]))
        }
        oReq.send()
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
