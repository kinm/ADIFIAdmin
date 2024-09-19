<template>
  <div>
    <el-card shadow="never" class="page-card">
      <SearchForm ref="searchForm" :options="options" :search-config="searchConfig" @search="onSearch" @init="onInit" />
      <div v-if="showTable">
        <TablePackage
          v-loading="loading"
          :data="tableData"
          :size="$size"
          border
          storage-name="adi-user"
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
          <el-table-column fixed prop="id" label="用戶ID" min-width="120" />
          <el-table-column fixed show-overflow-tooltip prop="relation_addr" label="關聯地址" min-width="150" />
          <el-table-column prop="user_level" label="等級" min-width="100">
            <template slot-scope="scope">
              <div>
                <el-select v-model="scope.row.level" :disabled="!buttonRoles.some((el) => el === 'adi-user-level')" placeholder="請選擇" @change="changeLevel(scope.row)">
                  <el-option
                    v-for="item in options.level_enum"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="pid" label="推薦人" min-width="150">
            <template slot-scope="scope">
              <div v-if="buttonRoles.some((el) => el === 'adi-user-pid')">
                <el-button type="text" @click="handleClick('pid',scope.row)">{{ scope.row.pid }}</el-button>
              </div>
              <div v-else>{{ scope.row.pid }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="version_str" label="合約版本" min-width="80" />
          <el-table-column label="剩餘兌換額度" min-width="120">
            <template slot-scope="scope">
              <div v-if="scope.row.version===2">
                <el-button :disabled="!buttonRoles.some((el) => el === 'adi-user-quota')||!scope.row.can_change_quota" type="text" size="mini" @click="handleClick('exchange_quota',scope.row)"> {{ scope.row.exchange_quota }}</el-button>
              </div>
              <div v-else>
                --
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="accu_part" label="累計質押參與" min-width="150" />
          <el-table-column prop="accu_collet" label="累計質押領取" min-width="150" />
          <el-table-column prop="accu_rewards" label="累計質押獎勵" min-width="150" />
          <el-table-column prop="adi_online" label="錢包ADI餘額" min-width="150" />
          <el-table-column show-overflow-tooltip prop="uuid" label="設備ID" min-width="150" />
          <el-table-column prop="created_at" label="關聯時間" min-width="160" />
          <el-table-column show-overflow-tooltip label="備註" min-width="160">
            <template slot-scope="scope">
              <div class="table-omit">
                <span v-if="buttonRoles.some((el) => el === 'adi-user-remark')" class="icon-edit" @click="editRemarks(scope.row)"><i class="el-icon-edit" /></span>
                {{ scope.row.remark }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="狀態" min-width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :disabled="!buttonRoles.some((el) => el === 'adi-user-status')"
                :active-value="1"
                :inactive-value="0"
                @change="changeStatus(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" class="operate-table" width="80" fixed="right">
            <template slot-scope="scope">
              <el-dropdown v-if="operateAuthB" trigger="click" size="small" placement="bottom-end" :hide-on-click="false" @command="(e)=>{ handleClick(e,scope.row, scope.$index) }">
                <span class="el-dropdown-link">
                  ...
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-setButtonPower="'adi-user-superior'" command="superior">上级列表</el-dropdown-item>
                  <el-dropdown-item v-setButtonPower="'adi-user-record'" command="record">查看數據</el-dropdown-item>
                  <el-dropdown-item v-setButtonPower="'adi-user-team'" command="team">團隊詳情</el-dropdown-item>
                  <el-dropdown-item v-setButtonPower="'adi-user-version'" command="version">修改合約</el-dropdown-item>
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

    <RecordDetail ref="RecordDetail" :options="options" />
    <TeamDetail ref="TeamDetail" />
    <Superior ref="Superior" />
    <SetVersion ref="SetVersion" :options="options" @getData="getData" />
    <SetQuota ref="SetQuota" @getData="getData" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TablePackage from '@/components/TablePackage'
import SearchForm from '@/components/SearchForm'
import RecordDetail from './components/record-detail'
import TeamDetail from './components/team-detail'
import Superior from './components/superior'
import SetVersion from './components/set-version'
import SetQuota from './components/set-quota'
import { elMessage } from '@/utils/message-remind.js'
import { operateAuth } from '@/utils/utils'
import { pageMixins } from '@/mixins/page'
import { balanceWithdrawList } from '@/api/adi'
import { userEnums, userStatus, userRemark, userChangeLevel, userParent } from '@/api/user'
export default {
  name: 'AdiUser', // 用户管理
  components: { TablePackage, SearchForm, TeamDetail, RecordDetail, Superior, SetVersion, SetQuota },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      showTable: false,
      options: {
        level_enum: [],
        status_enum: [],
        version_enum: [],
        resource_log_type_enum: []
      },
      searchConfig: [
        {
          key: 'relation_addr',
          type: 'input',
          label: '關聯地址',
          value: ''
        },
        {
          key: 'pid',
          type: 'input',
          label: '推薦人',
          value: ''
        },
        {
          key: 'level',
          type: 'select',
          label: '等級',
          value: ''
        },
        {
          key: 'id',
          type: 'input',
          label: '用戶ID',
          value: ''
        },
        {
          key: 'version',
          type: 'select',
          label: '合約版本',
          value: ''
        },
        {
          key: 'accu_part',
          type: 'interval',
          label: '累計質押參與',
          value: ''
        },
        {
          key: 'accu_collet',
          type: 'interval',
          label: '累計質押領取',
          value: ''
        },
        {
          key: 'accu_rewards',
          type: 'interval',
          label: '累計質押獎勵',
          value: ''
        },
        {
          key: 'create_time',
          type: 'datetimerange',
          label: '關聯時間',
          is_simple: true,
          value: ''
        },
        {
          key: 'adi_online',
          type: 'interval',
          label: '錢包ADI餘額',
          value: ''
        },
        {
          key: 'uuid',
          type: 'input',
          label: '設備ID',
          value: ''
        },
        {
          key: 'status',
          type: 'select',
          label: '狀態',
          value: ''
        }
      ],
      tableData: []
    }
  },
  computed: {
    operateAuthB() {
      return operateAuth(['adi-user-superior', 'adi-user-record', 'adi-user-team', 'adi-user-version'])
    },
    ...mapGetters([
      'buttonRoles'
    ])
  },
  created() {
    this.getEnum()
  },
  methods: {
    async getEnum() {
      const { data } = await userEnums()
      this.options.level_enum = data.user_level
      this.options.status_enum = data.status
      this.options.version_enum = data.user_version
      this.options.user_adi_range_enum = data.user_adi_range
      this.options.resource_log_type_enum = data.xy_resource_log_type
      this.showTable = true
    },
    async getData() {
      this.loading = true
      const { data } = await balanceWithdrawList(this.getSearchOptions())
      this.loading = false
      this.tableData = data.data
      this.searchForm.total = data.total
    },
    editRemarks(params) {
      this.$prompt('', '請輸入備註', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        inputType: 'textarea',
        inputValue: params.remark,
        inputErrorMessage: '備註不能為空',
        inputValidator: function(val) { if (!val) { return '請輸入備註' } else { return true } }
      }).then(async({ value }) => {
        await userRemark({ id: params.id, remark: value })
        elMessage(this, '操作成功！', 'success')
        this.getData()
      }).catch(() => {})
    },
    async changeLevel(e) {
      this.$confirm(`確定调整用戶ID：${e.id}的等级？`, '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await userChangeLevel({ id: e.id, level: e.level })
        this.$message({ type: 'success', message: '操作成功！' })
        this.getData()
      }).catch(() => {
        this.getData()
      })
    },
    changeStatus(e) {
      this.$confirm(e.status === 1 ? `是否啟用ID：${e.id}的用戶` : `是否禁用ID：${e.id}的用戶`, '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await userStatus({ id: e.id, status: e.status })
        elMessage(this, '操作成功！', 'success')
        this.getData()
      }).catch(() => {
        this.getData()
      })
    },
    handleClick(type, data) {
      if (type === 'team') {
        this.$refs.TeamDetail.userId = data.id
        this.$refs.TeamDetail.getData(data)
        this.$refs.TeamDetail.dialogFormVisible = true
      } else if (type === 'record') {
        this.$refs.RecordDetail.detailId = data.id
        this.$refs.RecordDetail.detailInfo.accu_part = data.accu_part
        this.$refs.RecordDetail.detailInfo.accu_collet = data.accu_collet
        this.$refs.RecordDetail.detailInfo.accu_rewards = data.accu_rewards
        this.$refs.RecordDetail.dialogFormVisible = true
        this.$refs.RecordDetail.getData(data)
      } else if (type === 'pid') {
        this.setPid(data)
      } else if (type === 'superior') {
        this.$refs.Superior.getData(data)
        this.$refs.Superior.dialogFormVisible = true
      } else if (type === 'version') {
        this.$refs.SetVersion.ruleForm.uid = data.id
        this.$refs.SetVersion.dialogFormVisible = true
      } else if (type === 'exchange_quota') {
        this.$refs.SetQuota.ruleForm.uid = data.id
        this.$refs.SetQuota.dialogFormVisible = true
      }
    },
    setPid(params) {
      this.$prompt('', '修改推薦人', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        inputValue: params.pid,
        inputErrorMessage: '修改推薦人ID不能為空',
        inputValidator: function(val) { if (!val) { return '修改推薦人ID不能為空' } else { return true } }
      }).then(async({ value }) => {
        await userParent({ id: params.id, pid: value })
        elMessage(this, '操作成功！', 'success')
        this.getData()
      }).catch(() => {})
    }
  }
}
</script>
<style lang='scss'  scoped>

</style>
