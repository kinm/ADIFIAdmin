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
          storage-name="adifi-withdraw"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <template #btnContentLeft />
          <template #btnContentRight>
            <el-tooltip class="item table-top-btn" effect="dark" content="刷新列表" placement="top">
              <el-button size="mini" circle icon="el-icon-refresh-right" @click="getData" />
            </el-tooltip>
          </template>
          <el-table-column fixed prop="id" label="記錄ID" min-width="80" />
          <el-table-column fixed show-overflow-tooltip prop="relation_addr" label="錢包地址" min-width="150" />
          <el-table-column prop="num" label="提現數量(ADI)" min-width="200" />
          <el-table-column prop="state_str" label="提現狀態" min-width="100" />
          <el-table-column show-overflow-tooltip prop="txid" label="Hash" min-width="150" />
          <el-table-column prop="created_at" label="提現時間" min-width="160" />
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
import TablePackage from '@/components/TablePackage'
import SearchForm from '@/components/SearchForm'
import { pageMixins } from '@/mixins/page'
import { withdrawEnums, withdrawList } from '@/api/adifi'
export default {
  name: 'ADIFIWithdraw', // 提現記錄
  components: { TablePackage, SearchForm },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      options: {
        state_enum: []
      },
      searchConfig: [
        {
          key: 'relation_addr',
          type: 'input',
          label: '錢包地址',
          value: ''
        },
        {
          key: 'state',
          type: 'select',
          label: '訂單狀態',
          value: ''
        },
        {
          key: 'txid',
          type: 'input',
          label: 'Hash',
          value: ''
        },
        {
          key: 'create_time',
          type: 'datetimerange',
          label: '提現時間',
          is_simple: true,
          value: ''
        }
      ],
      tableData: []
    }
  },
  computed: {},
  created() {
    this.getEnum()
  },
  methods: {
    async getEnum() {
      const { data } = await withdrawEnums()
      this.options.state_enum = data.adifi_withdraw_state
    },
    async getData() {
      this.loading = true
      const { data } = await withdrawList(this.getSearchOptions())
      this.loading = false
      this.tableData = data.data
      this.searchForm.total = data.total
    }
  }
}
</script>
<style lang='scss'  scoped>

</style>
