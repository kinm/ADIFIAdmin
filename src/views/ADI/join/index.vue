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
          storage-name="adi-join"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <template #btnContentLeft>
            <el-button v-setButtonPower="'adi-join-set'" type="primary" :size="$s_size" @click="handlebatchClick('set')">參與設置</el-button>
            <el-button v-setButtonPower="'adi-join-upgrade'" type="primary" :size="$s_size" @click="handlebatchClick('upgrade')">升級門檻</el-button>
            <el-button v-setButtonPower="'adi-join-duration'" type="primary" :size="$s_size" @click="handlebatchClick('duration')">質押時長設置</el-button>
            <el-button v-setButtonPower="'adi-join-server'" type="primary" :size="$s_size" @click="handlebatchClick('server')">服務器配置</el-button>
            <!-- <el-button v-setButtonPower="'adi-join-exchange'" type="primary" :size="$s_size" @click="handlebatchClick('exchange')">匯率設置</el-button> -->
            <el-button v-setButtonPower="'adi-join-property'" type="primary" :size="$s_size" @click="handlebatchClick('property')">資產配置</el-button>
            <el-button v-setButtonPower="'adi-join-convert'" type="primary" :size="$s_size" @click="handlebatchClick('convert')">兌換設置</el-button>
            <span class="rate-tips">1ADI(1.0) ≈ {{ adi2usdt }}USDT</span>
            <span class="rate-tips">1ADI(2.0) ≈ {{ adiv2usdt }}USDT</span>
          </template>
          <template #btnContentRight>
            <el-tooltip class="item table-top-btn" effect="dark" content="刷新列表" placement="top">
              <el-button size="mini" circle icon="el-icon-refresh-right" @click="getData" />
            </el-tooltip>
          </template>
          <el-table-column fixed show-overflow-tooltip prop="order_sn" label="記錄編號" min-width="150" />
          <el-table-column fixed show-overflow-tooltip prop="relation_addr" label="關聯地址" min-width="150" />
          <el-table-column fixed show-overflow-tooltip prop="select" label="收款地址" min-width="150" />
          <el-table-column fixed prop="sys_str" label="服務器節點" min-width="150" />
          <el-table-column prop="order_price" label="參與數量" min-width="220" />
          <el-table-column prop="version_str" label="參與代幣版本" min-width="120" />
          <el-table-column prop="pay_money" label="支付數量" min-width="150" />
          <el-table-column prop="type_str" label="支付幣種" min-width="150" />
          <el-table-column show-overflow-tooltip prop="txid" label="hash" min-width="150" />
          <el-table-column prop="rule_str" label="質押時長" min-width="150" />
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
    <SetServer ref="SetServer" />
    <SetAccount ref="SetAccount" />
    <Exchange ref="Exchange" />
    <Property ref="Property" :options="options" />
    <Upgrade ref="Upgrade" />
    <Convert ref="Convert" />
    <Duration ref="Duration" :options="options" />
  </div>
</template>

<script>
import TablePackage from '@/components/TablePackage'
import SearchForm from '@/components/SearchForm'
import { pageMixins } from '@/mixins/page'
import Set from './components/set'
import Upgrade from './components/upgrade'
import SetServer from './components/set-server'
import SetAccount from './components/set-account'
import Duration from './components/duration'
import Exchange from './components/exchange'
import Property from './components/property'
import Convert from './components/convert'
import { xyOrderList, xyOrderEnums, xyFenrunRuleEnums, getHuilv } from '@/api/adi.js'
export default {
  name: 'ADIJoin', // 參與記錄
  components: { TablePackage, SearchForm, Set, Duration, SetServer, SetAccount, Exchange, Property, Upgrade, Convert },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      options: {
        type_enum: [],
        time_unit: [],
        val_unit: [],
        sys_enum: [],
        version_enum: [],
        adifi_resource_user_type: [],
        rule_enum: []
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
          key: 'type',
          type: 'select',
          label: '支付幣種',
          value: ''
        },
        {
          key: 'version',
          type: 'select',
          label: '參與代幣版本',
          value: ''
        },
        // {
        //   key: 'type',
        //   type: 'select',
        //   label: '參與狀態',
        //   value: ''
        // },
        {
          key: 'select',
          type: 'input',
          label: '收款地址',
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
          key: 'sys',
          type: 'select',
          label: '服務器節點',
          value: ''
        },
        {
          key: 'order_price',
          type: 'interval',
          label: '參與數量',
          value: ''
        },
        {
          key: 'pay_money',
          type: 'interval',
          label: '支付數量',
          value: ''
        },
        {
          key: 'txid',
          type: 'input',
          label: 'hash',
          value: ''
        },
        {
          key: 'rule',
          type: 'select',
          label: '質押時長',
          value: ''
        }
      ],
      tableData: [],
      time: null,
      adi2usdt: 0,
      adiv2usdt: 0
    }
  },
  computed: {
  },
  created() {
    this.getEnum()
    this.ruleEnums()
    if (!this.time) {
      this.time = setInterval(() => {
        this.getRate()
      }, 3000)
    }
  },
  mounted() {
  },
  beforeDestroy() {
    clearInterval(this.time)
    this.time = null
  },
  methods: {
    async getEnum() {
      const { data } = await xyOrderEnums()
      this.options.type_enum = data.xy_part_order_type
      this.options.sys_enum = data.sys
      this.options.version_enum = data.version
      this.options.adifi_resource_user_type = data.adifi_resource_user_type
      this.options.rule_enum = data.rule_id
    },
    async ruleEnums() {
      const { data } = await xyFenrunRuleEnums()
      this.options.time_unit = data.xyfenrun_rule_time_unit
      this.options.val_unit = data.xyfenrun_rule_val_unit
    },
    async getData() {
      this.loading = true
      const { data } = await xyOrderList(this.getSearchOptions())
      this.loading = false
      this.tableData = data.data
      this.searchForm.total = data.total
    },
    async getRate() {
      const { data } = await getHuilv()
      this.adi2usdt = data.adi2usdt || 0
      this.adiv2usdt = data.adiv2usdt || 0
    },
    handlebatchClick(type) {
      if (type === 'set') {
        this.$refs.Set.getData()
        this.$refs.Set.dialogFormVisible = true
      } else if (type === 'duration') {
        this.$refs.Duration.getData()
        this.$refs.Duration.dialogFormVisible = true
      } else if (type === 'server') {
        this.$refs.SetServer.getData()
        this.$refs.SetServer.dialogFormVisible = true
      } else if (type === 'account') {
        // this.$refs.SetAccount.getData()
        // this.$refs.SetAccount.dialogFormVisible = true
      } else if (type === 'exchange') {
        // this.$refs.Exchange.getData()
        // this.$refs.Exchange.dialogFormVisible = true
      } else if (type === 'property') {
        this.$refs.Property.getData()
        this.$refs.Property.dialogFormVisible = true
      } else if (type === 'upgrade') {
        this.$refs.Upgrade.getData()
        this.$refs.Upgrade.dialogFormVisible = true
      } else if (type === 'convert') {
        this.$refs.Convert.getData()
        this.$refs.Convert.dialogFormVisible = true
      }
    }
  }
}
</script>
<style lang='scss'  scoped>
.rate-tips{
  display: inline-block;
  margin-left: 20px;
  font-size: 14px;
  color: #c1c1c1;
}
</style>
