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
          storage-name="adifi-burn"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <template #btnContentLeft>
            <el-button v-setButtonPower="'adifi-burn-set'" type="primary" size="mini" @click="handleClick('set')">直推獎勵設置</el-button>
          </template>
          <template #btnContentRight>
            <span class="team-tips">累計燃燒數量：{{ total_value }}</span>
            <span class="team-tips">累計發放推薦人獎勵：{{ total_award }}</span>
            <el-tooltip class="item table-top-btn" effect="dark" content="刷新列表" placement="top">
              <el-button size="mini" circle icon="el-icon-refresh-right" @click="getData" />
            </el-tooltip>
          </template>
          <el-table-column fixed prop="id" label="記錄ID" min-width="80" />
          <el-table-column fixed show-overflow-tooltip prop="from" label="錢包地址" min-width="150" />
          <el-table-column prop="value" label="燃燒數量" min-width="100" />
          <el-table-column prop="award" label="推薦人獎勵" min-width="200" />
          <!-- <el-table-column prop="state_str" label="訂單狀態" min-width="120" /> -->
          <el-table-column show-overflow-tooltip prop="hash" label="Hash" min-width="150" />
          <el-table-column prop="created_at" label="燃燒時間" min-width="160" />
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
    <Recommend ref="Recommend" @getData="getData" />
  </div>
</template>

<script>
import TablePackage from '@/components/TablePackage'
import SearchForm from '@/components/SearchForm'
import { pageMixins } from '@/mixins/page'
import Recommend from './components/recommend'
import { dropEnums, dropList } from '@/api/adifi'
export default {
  name: 'ADIFIBurn', // 燃燒記錄
  components: { TablePackage, SearchForm, Recommend },
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
        // {
        //   key: 'state',
        //   type: 'select',
        //   label: '訂單狀態',
        //   value: ''
        // },
        {
          key: 'hash',
          type: 'input',
          label: 'Hash',
          value: ''
        },
        {
          key: 'create_time',
          type: 'datetimerange',
          label: '燃燒時間',
          is_simple: true,
          value: ''
        }
      ],
      tableData: [],
      total_value: 0,
      total_award: 0
    }
  },
  computed: {},
  created() {
    this.getEnum()
  },
  methods: {
    async getEnum() {
      const { data } = await dropEnums()
      this.options.state_enum = data.drop_order_state
    },
    async getData() {
      this.loading = true
      const { data } = await dropList(this.getSearchOptions())
      this.loading = false
      this.tableData = data.data
      this.searchForm.total = data.total
      this.total_value = data.total_value || 0
      this.total_award = data.total_award || 0
    },
    handleClick(type, data) {
      if (type === 'set') {
        this.$refs.Recommend.getData()
        this.$refs.Recommend.dialogFormVisible = true
      }
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
