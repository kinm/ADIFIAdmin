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
          storage-name="adi-equity"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <template #btnContentLeft>
            <el-button v-setButtonPower="'adi-equity-set'" type="primary" :size="$s_size" @click="handlebatchClick('set')">私募設置</el-button>
          </template>
          <template #btnContentRight>
            <el-tooltip class="item table-top-btn" effect="dark" content="刷新列表" placement="top">
              <el-button size="mini" circle icon="el-icon-refresh-right" @click="getData" />
            </el-tooltip>
          </template>
          <el-table-column fixed show-overflow-tooltip prop="order_sn" label="記錄編號" min-width="150" />
          <el-table-column fixed show-overflow-tooltip prop="relation_addr" label="關聯地址" min-width="150" />
          <el-table-column show-overflow-tooltip prop="select" label="收款地址" min-width="150" />
          <el-table-column show-overflow-tooltip prop="txid" label="hash" min-width="150" />
          <el-table-column prop="order_price" label="參與數量" min-width="150" />
          <el-table-column prop="pay_time" label="參與時間" min-width="160" />
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
    <Set ref="Set" />
  </div>
</template>

<script>
import TablePackage from '@/components/TablePackage'
import SearchForm from '@/components/SearchForm'
import { pageMixins } from '@/mixins/page'
import Set from './components/set'
import { ipoOrderList } from '@/api/adi.js'
export default {
  name: 'ADIEquity', // 私募記錄
  components: { TablePackage, SearchForm, Set },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      options: {
        type_enum: [],
        time_unit: [],
        val_unit: []
      },
      searchConfig: [
        {
          key: 'order_sn',
          type: 'input',
          label: '記錄編號',
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
          label: '參與時間',
          is_simple: true,
          value: ''
        },
        {
          key: 'select',
          type: 'input',
          label: '收款地址',
          value: ''
        },
        {
          key: 'order_price',
          type: 'interval',
          label: '參與數量',
          value: ''
        },
        {
          key: 'txid',
          type: 'input',
          label: 'hash',
          value: ''
        }
      ],
      tableData: []
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData() {
      this.loading = true
      const { data } = await ipoOrderList(this.getSearchOptions())
      this.loading = false
      this.tableData = data.data
      this.searchForm.total = data.total
    },
    handlebatchClick(type) {
      if (type === 'set') {
        this.$refs.Set.getData()
        this.$refs.Set.dialogFormVisible = true
      } else if (type === 'duration') {
        this.$refs.Duration.getData()
        this.$refs.Duration.dialogFormVisible = true
      }
    }
  }
}
</script>
<style lang='scss'  scoped>

</style>
