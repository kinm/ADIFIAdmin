<template>
  <div>
    <el-card shadow="never" class="page-card">
      <SearchForm ref="searchForm" :options="options" :search-config="searchConfig" @search="onSearch" @init="onInit" />
      <div v-if="showTable">
        <TablePackage
          ref="TablePackage"
          v-loading="loading"
          :data="tableData"
          storage-name="user-list"
          style="width: 100%"
          :size="$size"
          border
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
          <el-table-column fixed show-overflow-tooltip prop="relation_addr" label="關聯地址" min-width="160" />
          <el-table-column v-for="(ite,index) in roleEnum" :key="index" :label="ite.label" min-width="100">
            <template slot-scope="scope">
              <div>
                <el-select v-model="scope.row[ite.value]" :disabled="!buttonRoles.some((el) => el === 'user-list-role')" placeholder="請選擇" @change="changeRole(scope.row)">
                  <el-option
                    v-for="item in isRole"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="user_level" label="等級" min-width="100">
            <template slot-scope="scope">
              <div>
                <el-select v-model="scope.row.level" :disabled="!buttonRoles.some((el) => el === 'user-list-level')" placeholder="請選擇" @change="changeLevel(scope.row)">
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
          <el-table-column show-overflow-tooltip prop="pid" label="推薦人" min-width="80">
            <template slot-scope="scope">
              <div v-if="buttonRoles.some((el) => el === 'user-list-pid')">
                <el-button type="text" @click="handleClick('pid',scope.row)">{{ scope.row.pid }}</el-button>
              </div>
              <div v-else>{{ scope.row.pid }}</div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="餘額" min-width="80">
            <template slot-scope="scope">
              <div v-if="buttonRoles.some((el) => el === 'user-list-balance')">
                <el-button type="text" @click="handleClick('balance',scope.row)">{{ scope.row.balance }}</el-button>
              </div>
              <div v-else>{{ scope.row.balance }}</div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="uuid" label="設備ID" min-width="150" />
          <el-table-column prop="quota" label="額度" min-width="80" />
          <el-table-column prop="account.ape" label="待领取APE" min-width="120" />
          <el-table-column prop="account.acc_ape" label="累计發放APE" min-width="120" />
          <el-table-column prop="relation_at" label="關聯時間" min-width="160" />
          <el-table-column show-overflow-tooltip label="備註" min-width="160">
            <template slot-scope="scope">
              <div class="table-omit">
                <span v-if="buttonRoles.some((el) => el === 'user-list-remark')" class="icon-edit" @click="editRemarks(scope.row)"><i class="el-icon-edit" /></span>
                {{ scope.row.remark }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="狀態" min-width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :disabled="!buttonRoles.some((el) => el === 'user-list-status')"
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
                  <el-dropdown-item v-setButtonPower="'user-list-record'" command="record">查看數據</el-dropdown-item>
                  <el-dropdown-item v-setButtonPower="'user-list-team'" command="team">團隊詳情</el-dropdown-item>
                  <el-dropdown-item v-setButtonPower="'user-list-quota'" command="quota">增加額度</el-dropdown-item>
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
    <BalanceDetail ref="BalanceDetail" :options="options" />
    <TeamDetail ref="TeamDetail" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RecordDetail from './components/record-detail'
import TeamDetail from './components/team-detail'
import BalanceDetail from './components/balance-detail'
import TablePackage from '@/components/TablePackage'
import { elMessage } from '@/utils/message-remind.js'
import { pageMixins } from '@/mixins/page'
import { operateAuth } from '@/utils/utils'
import SearchForm from '@/components/SearchForm'
import { userEnums, userList, userRole, userStatus, userRemark, userChangeLevel, userParent, userAddQuota } from '@/api/user'
export default {
  name: 'UserList', // 用戶列表
  components: { TablePackage, RecordDetail, SearchForm, TeamDetail, BalanceDetail },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      showTable: false,
      options: {
        role_enum: [],
        status_enum: [],
        level_enum: [],
        income_type_enum: [],
        log_type_enum: [],
        is_note_enum: [],
        is_wei_enum: [],
        balance_log_type_enum: []
      },
      roleEnum: [],
      isRole: [],
      searchConfig: [
        {
          key: 'id',
          type: 'input',
          label: '用戶ID',
          value: ''
        },
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
          key: 'is_note',
          type: 'select',
          label: '創世節點',
          value: ''
        },
        {
          key: 'is_wei',
          type: 'select',
          label: '聯盟股東',
          value: ''
        },
        {
          key: 'level',
          type: 'select',
          label: '等級',
          value: ''
        },
        {
          key: 'uuid',
          type: 'input',
          label: '設備ID',
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
    operateAuthB() {
      return operateAuth(['user-list-team', 'user-list-record', 'user-list-quota'])
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
      this.options.role_enum = data.user_role
      this.options.status_enum = data.status
      this.options.level_enum = data.user_level
      this.options.income_type_enum = data.income_type
      this.options.log_type_enum = data.log_type
      this.options.is_note_enum = data.bool
      this.options.is_wei_enum = data.bool
      this.options.balance_log_type_enum = data.balance_log_type
      this.isRole = data.bool
      this.roleEnum = data.user_role_type
      this.showTable = true
    },
    async getData() {
      this.loading = true
      const { data } = await userList(this.getSearchOptions())
      this.loading = false
      this.tableData = data.data
      this.searchForm.total = data.total
    },
    handleCurrentChange(val) {
      this.loading = true
      this.searchForm.page = val
      this.getData()
    },
    async changeRole(e) {
      this.$confirm(`確定调整用戶ID：${e.id}的聯盟委員？`, '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await userRole({ id: e.id, is_note: e.is_note, is_wei: e.is_wei })
        this.$message({ type: 'success', message: '操作成功！' })
        this.getData()
      }).catch(() => {
        this.getData()
      })
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
        this.$refs.RecordDetail.getData(data)
        this.$refs.RecordDetail.dialogFormVisible = true
      } else if (type === 'pid') {
        this.setPid(data)
      } else if (type === 'quota') {
        this.setQuota(data)
      } else if (type === 'balance') {
        this.$refs.BalanceDetail.searchForm.id = data.id
        this.$refs.BalanceDetail.getData()
        this.$refs.BalanceDetail.dialogFormVisible = true
      }
    },
    setQuota(params) {
      const reg = /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*))$/
      this.$prompt('', '增加額度', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        inputErrorMessage: '增加額度不能為空',
        inputValidator: function(val) { if (!val) { return '請輸入增加額度' } else { if (!reg.test(val)) { return '包含两位小數的正數' } else { return true } } }
      }).then(async({ value }) => {
        await userAddQuota({ id: params.id, num: value })
        elMessage(this, '操作成功！', 'success')
        this.getData()
      }).catch(() => {})
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
