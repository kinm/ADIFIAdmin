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
          storage-name="adifi-pledge"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <template #btnContentLeft>
            <el-button v-setButtonPower="'adifi-pledge-set'" type="primary" size="mini" @click="handleClick('set')">團隊獎勵設置</el-button>
            <el-button v-setButtonPower="'adifi-pledge-exchange'" type="primary" size="mini" @click="handleClick('exchange')">代幣兌換地址設置</el-button>
          </template>
          <template #btnContentRight>
            <span class="team-tips">當前質押總和：{{ total_staked }}</span>
            <!-- <span class="team-tips">累計個人收益：{{ total_person_income }}</span> -->
            <span class="team-tips">累計發放團隊獎勵：{{ total_team_income }}</span>
            <el-tooltip class="item table-top-btn" effect="dark" content="刷新列表" placement="top">
              <el-button size="mini" circle icon="el-icon-refresh-right" @click="getData" />
            </el-tooltip>
          </template>
          <el-table-column fixed prop="adifi_order_id" label="訂單ID" min-width="100" />
          <el-table-column fixed show-overflow-tooltip prop="from" label="錢包地址" min-width="150" />
          <el-table-column prop="value" label="質押數量（ADI）" min-width="130" />
          <el-table-column prop="state_str" label="質押狀態" min-width="120" />
          <!-- <el-table-column label="個人累計收益" min-width="160">
            <template slot-scope="scope">
              <div style="padding: 0;">
                {{ scope.row.person_income }}
              </div>
              <div style="padding: 0;font-size: 12px;color: #c1c1c1;">
                （待领取：{{ scope.row.unc_person_income }}）
              </div>
            </template>
          </el-table-column> -->
          <el-table-column label="團隊收益" min-width="220">
            <template slot-scope="scope">
              <div v-if="buttonRoles.some((el) => el === 'adifi-pledge-team')">
                <el-button style="padding: 0;" type="text" @click="handleClick('team',scope.row)">{{ scope.row.team_income }}</el-button>
              </div>
              <div v-else>{{ scope.row.team_income }}</div>
            </template>
          </el-table-column>
          <el-table-column label="質押時間" min-width="170">
            <template slot-scope="scope">
              <div>
                {{ scope.row.created_at }}
                <el-popover
                  v-if="scope.row.created_at!=='--'&&scope.row.created_at!==''"
                  placement="top"
                  trigger="hover"
                  popper-class="el-popover-self"
                >
                  Hash：{{ scope.row.hash }}
                  <i slot="reference" class="el-icon-warning" />
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="解除時間" min-width="170">
            <template slot-scope="scope">
              <div>
                {{ scope.row.sec_created_at }}
                <el-popover
                  v-if="scope.row.sec_created_at!=='--'&&scope.row.sec_created_at!==''"
                  placement="top"
                  trigger="hover"
                  popper-class="el-popover-self"
                >
                  Hash：{{ scope.row.sec_hash }}
                  <i slot="reference" class="el-icon-warning" />
                </el-popover>
              </div>
            </template>
          </el-table-column>
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
    <Detail ref="Detail" :options="options" />
    <Set ref="Set" />
    <Exchange ref="Exchange" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TablePackage from '@/components/TablePackage'
import SearchForm from '@/components/SearchForm'
import { pageMixins } from '@/mixins/page'
import Award from './components/award'
import Set from './components/set'
import Exchange from './components/exchange'
import Detail from './components/detail'
import { stakedEnums, stakedList } from '@/api/adifi'
export default {
  name: 'ADIFIPledge', // 質押記錄
  components: { TablePackage, SearchForm, Award, Set, Detail, Exchange },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      options: {
        state_enum: [],
        staked_type_enum: [],
        user_level_enum: []
      },
      searchConfig: [
        {
          key: 'relation_addr',
          type: 'input',
          label: '錢包地址',
          value: ''
        },
        {
          key: 'adifi_order_id',
          type: 'input',
          label: '訂單ID',
          value: ''
        },
        {
          key: 'state',
          type: 'select',
          label: '質押狀態',
          value: ''
        },
        {
          key: 'create_time',
          type: 'datetimerange',
          label: '質押時間',
          is_simple: true,
          value: ''
        },
        {
          key: 'sec',
          type: 'datetimerange',
          label: '解除時間',
          value: ''
        },
        {
          key: 'hash',
          type: 'input',
          label: '質押Hash',
          value: ''
        },
        {
          key: 'sec_hash',
          type: 'input',
          label: '解除Hash',
          value: ''
        }
      ],
      tableData: [],
      total_staked: 0,
      total_person_income: 0,
      total_team_income: 0
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
      const { data } = await stakedEnums()
      this.options.state_enum = data.staked_state
      this.options.staked_type_enum = data.staked_type
      this.options.user_level_enum = data.user_level
    },
    async getData() {
      this.loading = true
      const { data } = await stakedList(this.getSearchOptions())
      this.loading = false
      this.tableData = data.data
      this.searchForm.total = data.total
      this.total_staked = data.total_staked || 0
      this.total_person_income = data.total_person_income || 0
      this.total_team_income = data.total_team_income || 0
    },
    handleClick(type, data) {
      if (type === 'num') {
        this.$refs.Detail.searchForm.uid = data.id
        this.$refs.Detail.getData()
        this.$refs.Detail.dialogFormVisible = true
      } else if (type === 'team') {
        this.$refs.Award.searchForm.order_id = data.id
        this.$refs.Award.getData()
        this.$refs.Award.dialogFormVisible = true
      } else if (type === 'set') {
        this.$refs.Set.getData()
        this.$refs.Set.dialogFormVisible = true
      } else if (type === 'exchange') {
        this.$refs.Exchange.getData()
        this.$refs.Exchange.dialogFormVisible = true
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
