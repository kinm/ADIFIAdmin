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
          storage-name="adifi-settle"
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
          <el-table-column fixed prop="order_id" label="沽空訂單ID" min-width="80" />
          <el-table-column fixed show-overflow-tooltip prop="addr" label="錢包地址" min-width="150" />
          <el-table-column prop="state_str" label="結算狀態" min-width="100" />
          <el-table-column show-overflow-tooltip prop="hash" label="Hash" min-width="150" />
          <el-table-column prop="created_at" label="創建時間" min-width="160" />
          <el-table-column prop="settle_at" label="結算時間" min-width="160" />
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
import { adifiKongEnums, adifiKongSettleList } from '@/api/adifi'
export default {
  name: 'ADIFISettle', // 結算記錄
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
          key: 'order_id',
          type: 'input',
          label: '沽空訂單ID',
          value: ''
        },
        {
          key: 'addr',
          type: 'input',
          label: '錢包地址',
          value: ''
        },
        {
          key: 'state',
          type: 'select',
          label: '結算狀態',
          value: ''
        },
        {
          key: 'hash',
          type: 'input',
          label: 'Hash',
          value: ''
        },
        {
          key: 'create_time',
          type: 'datetimerange',
          label: '創建時間',
          is_simple: true,
          value: ''
        },
        {
          key: 'settle',
          type: 'datetimerange',
          label: '結算時間',
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
      const { data } = await adifiKongEnums()
      this.options.state_enum = data.settle_state
    },
    async getData() {
      this.loading = true
      const { data } = await adifiKongSettleList(this.getSearchOptions())
      this.loading = false
      this.tableData = data.data
      this.searchForm.total = data.total
    }
  }
}
</script>
<style lang='scss'  scoped>

</style>
