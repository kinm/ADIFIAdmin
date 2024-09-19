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
          storage-name="adifi-adopt"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <template #btnContentLeft>
            <span class="team-tips">當前分紅池：{{ total_bonus }}</span>
            <span class="team-tips">累計領取分紅數量：{{ total_num }}</span>
          </template>
          <template #btnContentRight>
            <el-tooltip class="item table-top-btn" effect="dark" content="刷新列表" placement="top">
              <el-button size="mini" circle icon="el-icon-refresh-right" @click="getData" />
            </el-tooltip>
          </template>
          <el-table-column fixed prop="id" label="記錄ID" min-width="80" />
          <el-table-column fixed show-overflow-tooltip prop="from" label="錢包地址" min-width="150" />
          <el-table-column prop="value" label="領取數量" min-width="120" />
          <el-table-column prop="state_str" label="領取狀態" min-width="100" />
          <el-table-column show-overflow-tooltip prop="hash" label="Hash" min-width="150" />
          <el-table-column prop="created_at" label="領取時間" min-width="160" />
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
import { withdrawOrderEnums, withdrawOrderList } from '@/api/adifi'
export default {
  name: 'ADIFIAdopt', // 領取記錄
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
          key: 'from',
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
          key: 'hash',
          type: 'input',
          label: 'Hash',
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
      total_bonus: 0,
      total_num: 0
    }
  },
  computed: {},
  created() {
    this.getEnum()
  },
  methods: {
    async getEnum() {
      const { data } = await withdrawOrderEnums()
      this.options.state_enum = data.adifi_withdraw_state
    },
    async getData() {
      this.loading = true
      const { data } = await withdrawOrderList(this.getSearchOptions())
      this.loading = false
      this.tableData = data.data
      this.searchForm.total = data.total
      this.total_bonus = data.total_bonus || 0
      this.total_num = data.total_num || 0
    }
  }
}
</script>
<style lang='scss'  scoped>
.team-tips{
  color: #c1c1c1;
  font-size: 14px;
  display: inline-block;
  margin-right: 15px;
}
</style>
