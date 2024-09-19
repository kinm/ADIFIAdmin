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
          storage-name="order-list"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
          :cell-style="{ 'text-align': 'center' }"
          @selection-change="handleSelectionChange"
        >
          <template #btnContentLeft>
            <el-button v-setButtonPower="'order-list-set'" type="primary" :size="$s_size" @click="handlebatchClick('set')">參與設置</el-button>
            <el-button v-setButtonPower="'order-list-add'" type="primary" :size="$s_size" @click="handlebatchClick('add')">新增訂單</el-button>
          </template>
          <template #btnContentRight>
            <el-tooltip class="item table-top-btn" effect="dark" content="刷新列表" placement="top">
              <el-button size="mini" circle icon="el-icon-refresh-right" @click="getData" />
            </el-tooltip>
          </template>
          <el-table-column fixed show-overflow-tooltip prop="order_sn" label="訂單編號" min-width="200" />
          <el-table-column fixed prop="uid" label="用戶ID" min-width="100" />
          <el-table-column show-overflow-tooltip prop="relation_addr" label="關聯地址" min-width="150" />
          <el-table-column prop="is_admin_str" label="訂單類型" min-width="100" />
          <el-table-column prop="type_str" label="支付方式" min-width="100" />
          <el-table-column prop="price" label="單價" min-width="80" />
          <el-table-column prop="num" label="份數" min-width="80" />
          <el-table-column prop="order_ape" label="總計（APE）" min-width="120" />
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
    <Add ref="Add" @getData="getData" />
  </div>
</template>

<script>
import TablePackage from '@/components/TablePackage'
import SearchForm from '@/components/SearchForm'
import { pageMixins } from '@/mixins/page'
import Set from './components/set'
import Add from './components/add'
import { orderList, orderEnums } from '@/api/order'
export default {
  name: 'OrderList', // 參與訂單
  components: { TablePackage, SearchForm, Set, Add },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      options: {
        is_admin_enum: [],
        type_enum: []
      },
      searchConfig: [
        {
          key: 'uid',
          type: 'input',
          label: '用戶ID',
          value: ''
        },
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
          key: 'is_admin',
          type: 'select',
          label: '訂單類型',
          value: ''
        },
        {
          key: 'type',
          type: 'select',
          label: '支付方式',
          value: ''
        },
        {
          key: 'create_time',
          type: 'datetimerange',
          label: '參與時間',
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
      const { data } = await orderEnums()
      this.options.is_admin_enum = data.is_admin
      this.options.type_enum = data.part_order_type
    },
    async getData() {
      this.loading = true
      const { data } = await orderList(this.getSearchOptions())
      this.loading = false
      this.tableData = data.data
      this.searchForm.total = data.total
    },
    async handlebatchClick(type) {
      if (type === 'set') {
        this.$refs.Set.getData()
        this.$refs.Set.dialogFormVisible = true
      } else if (type === 'add') {
        this.$refs.Add.getData()
        this.$refs.Add.dialogFormVisible = true
      }
    }
  }
}
</script>
<style lang='scss'  scoped>

</style>
