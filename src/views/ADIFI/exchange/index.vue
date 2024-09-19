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
          storage-name="adifi-exchange"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <template #btnContentLeft>
            <el-button v-setButtonPower="'adifi-exchange-set'" type="primary" size="mini" @click="handleClick('set')">團隊獎勵設置</el-button>
          </template>
          <template #btnContentRight>
            <span class="team-tips">累計發放團隊獎勵：{{ total_income }}</span>
            <el-tooltip class="item table-top-btn" effect="dark" content="刷新列表" placement="top">
              <el-button size="mini" circle icon="el-icon-refresh-right" @click="getData" />
            </el-tooltip>
          </template>
          <el-table-column fixed prop="id" label="訂單ID" min-width="80" />
          <el-table-column fixed show-overflow-tooltip prop="from" label="錢包地址" min-width="150" />
          <el-table-column prop="value" label="支付USDT數量" min-width="120" />
          <el-table-column prop="adi" label="買入ADI數量" min-width="120" />
          <el-table-column show-overflow-tooltip label="累計獎勵" min-width="120">
            <template slot-scope="scope">
              <div v-if="buttonRoles.some((el) => el === 'adifi-exchange-award')">
                <el-button type="text" @click="handleClick('award',scope.row)">{{ scope.row.income }}</el-button>
              </div>
              <div v-else>{{ scope.row.income }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="state_str" label="訂單狀態" min-width="100" />
          <el-table-column show-overflow-tooltip prop="hash" label="Hash" min-width="150" />
          <el-table-column prop="created_at" label="創建時間" min-width="160" />
          <el-table-column prop="deadline" label="截止時間" min-width="160" />
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
    <Award ref="Award" :options="options" />
    <Set ref="Set" @getData="getData" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TablePackage from '@/components/TablePackage'
import SearchForm from '@/components/SearchForm'
import { pageMixins } from '@/mixins/page'
import Award from './components/award'
import Set from './components/set'
import { fenhongEnums, fenhongList } from '@/api/adifi'
export default {
  name: 'ADIFIExchange', // 兌換訂單
  components: { TablePackage, SearchForm, Award, Set },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      options: {
        state_enum: [],
        fenhong_income_type_enum: []
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
          label: '創建時間',
          is_simple: true,
          value: ''
        },
        {
          key: 'deadline',
          type: 'datetimerange',
          label: '截至時間',
          value: ''
        }
      ],
      tableData: [],
      total_income: 0
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
      const { data } = await fenhongEnums()
      this.options.state_enum = data.fenhong_order_state
      this.options.fenhong_income_type_enum = data.fenhong_income_type
    },
    async getData() {
      this.loading = true
      const { data } = await fenhongList(this.getSearchOptions())
      this.loading = false
      this.tableData = data.data
      this.searchForm.total = data.total
      this.total_income = data.total_income || 0
    },
    handleClick(type, data) {
      if (type === 'award') {
        this.$refs.Award.searchForm.order_id = data.id
        this.$refs.Award.getData()
        this.$refs.Award.dialogFormVisible = true
      } else if (type === 'set') {
        this.$refs.Set.getData()
        this.$refs.Set.dialogFormVisible = true
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
