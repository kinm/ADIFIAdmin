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
          storage-name="adi-extract"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <template #btnContentLeft>
            <el-button v-setButtonPower="'adi-extract-set'" type="primary" :size="$s_size" @click="handlebatchClick('set')">提現設置</el-button>
            <el-button v-setButtonPower="'adi-extract-auto'" type="primary" :size="$s_size" @click="handlebatchClick('auto')">自動審核</el-button>
          </template>
          <template #btnContentRight>
            <el-tooltip class="item table-top-btn" effect="dark" content="刷新列表" placement="top">
              <el-button size="mini" circle icon="el-icon-refresh-right" @click="getData" />
            </el-tooltip>
          </template>
          <el-table-column fixed show-overflow-tooltip prop="order_sn" label="提現編號" min-width="150" />
          <el-table-column fixed show-overflow-tooltip prop="relation_addr" label="關聯地址" min-width="150" />
          <el-table-column prop="version_str" label="代幣版本" min-width="150" />
          <el-table-column prop="base" label="提現數量" min-width="150" />
          <el-table-column prop="type_str" label="領取類型" min-width="150" />
          <!-- <el-table-column prop="rate" label="手續費" min-width="150" />
          <el-table-column prop="num" label="實際到賬" min-width="150" /> -->
          <el-table-column prop="state_str" label="提現狀態" min-width="150">
            <template slot-scope="scope">
              <div>
                {{ scope.row.state_str }}
                <el-popover
                  v-if="scope.row.state===3"
                  placement="bottom"
                  trigger="hover"
                  popper-class="el-popover-self"
                >
                  {{ scope.row.reason }}
                  <i slot="reference" class="el-icon-warning" />
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="txid" label="hash" min-width="150" />
          <el-table-column prop="created_at" label="提現時間" min-width="160" />
          <el-table-column label="操作" class="operate-table" width="80" fixed="right">
            <template slot-scope="scope">
              <el-dropdown v-setButtonPower="'adi-extract-audit'" trigger="click" size="small" placement="bottom-end" :hide-on-click="false" @command="(e)=>{ handleClick(e,scope.row, scope.$index) }">
                <span class="el-dropdown-link">
                  ...
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :disabled="scope.row.state !==1" command="audit">審核</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
    <Set ref="Set" :options="options" />
    <SetAuto ref="SetAuto" />
  </div>
</template>

<script>
import TablePackage from '@/components/TablePackage'
import SearchForm from '@/components/SearchForm'
import { pageMixins } from '@/mixins/page'
import { elMessage } from '@/utils/message-remind.js'
import Set from './components/set'
import SetAuto from './components/set-auto'
import { resourceWithdrawEnums, resourceWithdrawList, resourceWithdrawPass, resourceWithdrawReject } from '@/api/adi'
export default {
  name: 'ADIExtract', // 資產提現
  components: { TablePackage, SearchForm, Set, SetAuto },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      options: {
        state_enum: [],
        type_enum: [],
        version_enum: [],
        unit_enum: []
      },
      searchConfig: [
        {
          key: 'order_sn',
          type: 'input',
          label: '提現編號',
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
          label: '領取類型',
          value: ''
        },
        {
          key: 'version',
          type: 'select',
          label: '提現代幣版本',
          value: ''
        },
        {
          key: 'state',
          type: 'select',
          label: '提現狀態',
          value: ''
        },
        {
          key: 'create_time',
          type: 'datetimerange',
          label: '领取時間',
          is_simple: true,
          value: ''
        },
        {
          key: 'base',
          type: 'interval',
          label: '提現數量',
          value: ''
        },
        // {
        //   key: 'rate',
        //   type: 'interval',
        //   label: '手續費',
        //   value: ''
        // },
        // {
        //   key: 'num',
        //   type: 'interval',
        //   label: '實際到賬',
        //   value: ''
        // },
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
    this.getEnum()
  },
  methods: {
    async getEnum() {
      const { data } = await resourceWithdrawEnums()
      this.options.state_enum = data.xywithdraw_state
      this.options.type_enum = data.xyresource_type
      this.options.version_enum = data.adi_version
      this.options.unit_enum = data.xywithdraw_commission_type
    },
    async getData() {
      this.loading = true
      const { data } = await resourceWithdrawList(this.getSearchOptions())
      this.loading = false
      this.tableData = data.data
      this.searchForm.total = data.total
    },
    handlebatchClick(type) {
      if (type === 'set') {
        this.$refs.Set.getData()
        this.$refs.Set.dialogFormVisible = true
      } else if (type === 'auto') {
        this.$refs.SetAuto.getData()
        this.$refs.SetAuto.dialogFormVisible = true
      }
    },
    handleClick(type, data) {
      if (type === 'audit') {
        this.$confirm('審核通過後，提現數量將發放至錢包中，請確認是否發放？', '審核發放', {
          confirmButtonText: '通過',
          cancelButtonText: '拒絕',
          distinguishCancelAndClose: true,
          type: 'warning'
        }).then(() => {
          this.setPass(data)
        }).catch((e) => {
          if (e === 'cancel') { this.setRefuse(data) }
        })
      }
    },
    setRefuse(params) {
      this.$prompt('', '拒絕原因', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        inputType: 'textarea',
        inputErrorMessage: '拒絕原因不能為空',
        inputValidator: function(val) { if (!val) { return '拒絕原因' } else { if (val.length > 30) { return '限制30個字符' } else { return true } } }
      }).then(async({ value }) => {
        await resourceWithdrawReject({ id: params.id, reason: value })
        elMessage(this, '操作成功！', 'success')
        this.getData()
      }).catch(() => {})
    },
    async setPass(data) {
      this.$prompt('', '请输入HASH', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        inputType: 'textarea',
        inputErrorMessage: 'HASH不能為空',
        inputValidator: function(val) { if (!val) { return 'HASH不能為空' } return true }
      }).then(async({ value }) => {
        await resourceWithdrawPass({ id: data.id, hash: value })
        elMessage(this, '操作成功！', 'success')
        this.getData()
      }).catch(() => {})
    }
  }
}
</script>
<style lang='scss'  scoped>

</style>
