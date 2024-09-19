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
          storage-name="adi-income"
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
          <el-table-column fixed show-overflow-tooltip prop="order_sn" label="訂單編號" min-width="150" />
          <el-table-column fixed show-overflow-tooltip prop="relation_addr" label="關聯地址" min-width="150" />
          <el-table-column prop="type_str" label="分潤類型" min-width="150" />
          <el-table-column prop="num" label="發放數量" min-width="150">
            <template slot-scope="scope">
              <el-button type="text" @click="handleClick('detail',scope.row)">{{ scope.row.num }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="updated_at" label="關聯時間" min-width="160" />
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
    <Detail ref="Detail" />
  </div>
</template>

<script>
import TablePackage from '@/components/TablePackage'
import SearchForm from '@/components/SearchForm'
import { pageMixins } from '@/mixins/page'
import { xyFenrunItemsList, xyFenrunItemsEnums } from '@/api/adi'
import Detail from './components/detail'
export default {
  name: 'ADIIncome', // 收益記錄
  components: { TablePackage, SearchForm, Detail },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      options: {
        type_enum: []
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
          label: '關聯地址',
          value: ''
        },
        {
          key: 'type',
          type: 'select',
          label: '分潤類型',
          value: ''
        },
        {
          key: 'num',
          type: 'interval',
          label: '發放數量',
          value: ''
        },
        {
          key: 'create_time',
          type: 'datetimerange',
          label: '關聯時間',
          is_simple: true,
          value: ''
        }
      ],
      tableData: []
    }
  },
  computed: {
  },
  created() {
    this.getEnum()
  },
  methods: {
    async getEnum() {
      const { data } = await xyFenrunItemsEnums()
      this.options.type_enum = data.xyfenrun_items_type
      // console.log(data, 8888888888)
    },
    async getData() {
      this.loading = true
      const { data } = await xyFenrunItemsList(this.getSearchOptions())
      this.loading = false
      this.tableData = data.data
      this.searchForm.total = data.total
    },
    handleClick(type, data) {
      if (type === 'detail') {
        this.$refs.Detail.getData(data.id)
        this.$refs.Detail.dialogFormVisible = true
      }
    }
  }
}
</script>
<style lang='scss'  scoped>

</style>
