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
          storage-name="revenue-trends"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
          :cell-style="{ 'text-align': 'center' }"
          @selection-change="handleSelectionChange"
        >
          <template #btnContentLeft>
            <span class="title ">总计：</span><span class="table-describe">收益數量：{{ ape }}</span>
            <el-button v-setButtonPower="'revenue-trends-export'" type="primary" :size="$s_size" @click="handlebatchClick('export')">導出</el-button>
          </template>
          <template #btnContentRight>
            <el-tooltip class="item table-top-btn" effect="dark" content="刷新列表" placement="top">
              <el-button size="mini" circle icon="el-icon-refresh-right" @click="getData" />
            </el-tooltip>
          </template>
          <el-table-column show-overflow-tooltip fixed label="關聯訂單" min-width="230">
            <template slot-scope="scope">
              <div v-if="buttonRoles.some((el) => el === 'revenue-trends-rel')">
                <el-button type="text" @click="handleClick('rel',scope.row)"> {{ scope.row.order_sn }}</el-button>
              </div>
              <div v-else>
                {{ scope.row.order_sn }}
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed prop="uid" label="收益用戶ID" min-width="100" />
          <el-table-column show-overflow-tooltip prop="relation_addr" label="關聯地址" min-width="150" />
          <el-table-column prop="order_uid" label="下單用戶ID" min-width="100" />
          <el-table-column show-overflow-tooltip prop="order_addr" label="下單人地址" min-width="150" />
          <el-table-column prop="pid" label="推薦人" min-width="100" />
          <el-table-column prop="type6_str" label="收益類型" min-width="80" />
          <el-table-column prop="order_ape" label="訂單總計" min-width="120" />
          <el-table-column prop="rate" label="收益比例" min-width="80" />
          <el-table-column prop="ape" label="收益數量（APE）" min-width="140" />
          <el-table-column prop="created_at" label="收益發放時間" min-width="160" />
          <!-- <el-table-column show-overflow-tooltip label="備註" min-width="160">
            <template slot-scope="scope">
              <div class="table-omit">
                <span v-if="buttonRoles.some((el) => el === 'revenue-trends-remark')" class="icon-edit" @click="editRemarks(scope.row)"><i class="el-icon-edit" /></span>
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
    <RelDetails ref="RelDetails" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TablePackage from '@/components/TablePackage'
import SearchForm from '@/components/SearchForm'
import { pageMixins } from '@/mixins/page'
import RelDetails from './components/rel-details'
import FileSaver from 'file-saver'
import { elMessage } from '@/utils/message-remind.js'
import { incomeList2, incomeEnums, incomeList2Export } from '@/api/revenue'
export default {
  name: 'RevenueTrends', // 動態收益
  components: { TablePackage, SearchForm, RelDetails },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      options: {
        type6_enum: []
      },
      searchConfig: [
        {
          key: 'order_addr',
          type: 'input',
          label: '下單人地址',
          value: ''
        },
        {
          key: 'order_sn',
          type: 'input',
          label: '關聯訂單',
          value: ''
        },
        {
          key: 'relation_addr',
          type: 'input',
          label: '關聯地址',
          value: ''
        },
        {
          key: 'uid',
          type: 'input',
          label: '收益用戶ID',
          value: ''
        },
        {
          key: 'pid',
          type: 'input',
          label: '推薦人',
          value: ''
        },
        {
          key: 'type6',
          type: 'select',
          label: '收益類型',
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
      this.options.type6_enum = data.dynamic_income_type
    },
    async getData() {
      this.loading = true
      const { data } = await incomeList2(this.getSearchOptions())
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
        const { data } = await incomeList2Export(params)
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
    },
    handleClick(type, data) {
      if (type === 'rel') {
        this.$refs.RelDetails.searchForm.id = data.id
        this.$refs.RelDetails.getData()
        this.$refs.RelDetails.dialogFormVisible = true
      }
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
