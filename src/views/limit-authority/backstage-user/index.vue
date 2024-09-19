<template>
  <div>
    <el-card shadow="never" class="page-card">
      <SearchForm ref="searchForm" :options="options" :search-config="searchConfig" @search="onSearch" @init="onInit" />
      <div>
        <TablePackage
          v-loading="loading"
          :data="tableData"
          storage-name="backstage-user"
          style="width: 100%"
          :size="$size"
          border
          :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
          :cell-style="{ 'text-align': 'center' }"
          @selection-change="handleSelectionChange"
        >
          <template #btnContentLeft>
            <el-button v-setButtonPower="'backstage-user-add'" :size="$s_size" type="primary" icon="el-icon-plus" @click="handleClick('add')">新 增</el-button>
          </template>
          <template #btnContentRight>
            <el-tooltip class="item table-top-btn" effect="dark" content="刷新列表" placement="top">
              <el-button size="mini" circle icon="el-icon-refresh-right" @click="getData" />
            </el-tooltip>
          </template>
          <el-table-column prop="username" label="管理員賬號" min-width="150" />
          <el-table-column prop="nickname" label="姓名" min-width="150" />
          <el-table-column prop="mobile" label="聯系方式" min-width="150" />
          <el-table-column prop="role_str" label="角色" min-width="150" />
          <el-table-column prop="id" label="啟用狀態" min-width="120">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :disabled="!buttonRoles.some((el) => el === 'backstage-user-edit')"
                :active-value="1"
                :inactive-value="2"
                @change="changeStatus(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="創建時間" min-width="160" />
          <el-table-column label="操作" class="operate-table" width="80" fixed="right">
            <template slot-scope="scope">
              <el-dropdown v-if="tableData.length" trigger="click" size="small" placement="bottom-end" :hide-on-click="false" @command="(e)=>{ handleClick(e,scope.row, scope.$index) }">
                <span class="el-dropdown-link">
                  ...
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-setButtonPower="'backstage-user-edit'" command="edit">編輯</el-dropdown-item>
                  <el-dropdown-item v-setButtonPower="'backstage-user-del'" command="del">刪除</el-dropdown-item>
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
    <Set ref="Set" :role-enum="roleEnum" @getData="getData" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Set from './components/set'
import TablePackage from '@/components/TablePackage'
import { elMessage } from '@/utils/message-remind.js'
import { pageMixins } from '@/mixins/page'
import SearchForm from '@/components/SearchForm'
import { getAdminList, setAdminStatus, delAdmin, getAdminEnum } from '@/api/limit-authority'
export default {
  name: 'BackstageUser',
  components: { TablePackage, Set, SearchForm },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      options: {
        status_enum: [{ value: 1, label: '啟用' }, { value: 2, label: '禁用' }],
        role_id_enum: []
      },
      searchConfig: [
        {
          key: 'username',
          type: 'input',
          label: '賬號',
          value: ''
        },
        {
          key: 'nickname',
          type: 'input',
          label: '姓名',
          value: ''
        },
        {
          key: 'status',
          type: 'select',
          label: '啟用状态',
          value: ''
        },
        {
          key: 'role_id',
          type: 'select',
          label: '角色',
          value: ''
        }
      ],
      roleEnum: [],
      tableData: [],
      delList: []
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
      const { data } = await getAdminEnum()
      this.options.role_id_enum = data
      this.roleEnum = data
    },
    async getData() {
      this.loading = true
      const { data } = await getAdminList(this.getSearchOptions())
      this.loading = false
      this.tableData = data.data
      this.searchForm.total = data.total
    },
    reset() {
      this.loading = true
      Object.assign(this.$data.searchForm, this.$options.data().searchForm)
      this.getData()
    },
    search() {
      this.loading = true
      this.searchForm.page = 1
      this.getData()
    },
    changeTime(e) {
      if (e) {
        this.searchForm.start = e[0] / 1000
        this.searchForm.end = e[1] / 1000
      } else {
        this.searchForm.start = ''
        this.searchForm.end = ''
      }
    },
    handleSelectionChange(val) {
      this.delList = val
    },
    handleCurrentChange(val) {
      this.loading = true
      this.searchForm.page = val
      this.getData()
    },
    delMoreItem() {
      if (this.delList.length <= 0) {
        return elMessage(this, '最少選擇一條需要刪除的數據')
      }
      this.$confirm(`是否確定刪除${this.delList.length}條數據`, '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const newArr = this.delList.map(el => {
          return el.id
        })
        await delAdmin({ id: newArr })
        elMessage(this, '操作成功！', 'success')
        this.getData()
      }).catch(() => {})
    },
    async  changeSort(data) {
      if (data.record_sort === data.sort) return
      // await shopShopAdvChangeSort({ id: data.id, sort: data.sort })
      elMessage(this, '操作成功！', 'success')
      this.getData()
    },
    changeStatus(e) {
      this.$confirm(e.status === 2 ? '是否禁用' : '是否啟用', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await setAdminStatus({ id: e.id, status: e.status })
        elMessage(this, '操作成功！', 'success')
        this.getData()
      }).catch(() => {
        this.getData()
      })
    },
    changeType(e) {},
    async delItem(data) {
      await delAdmin({ id: [data.id] })
      elMessage(this, '操作成功！', 'success')
      this.getData()
    },
    handleClick(type, data) {
      this.$refs.Set.mode = type
      if (data && data.id) {
        this.$refs.Set.ruleForm.id = data.id
        this.$refs.Set.ruleForm.username = data.username
        this.$refs.Set.ruleForm.nickname = data.nickname
        this.$refs.Set.ruleForm.role_id = data.role_id
        this.$refs.Set.ruleForm.status = data.status
        this.$refs.Set.ruleForm.mobile = data.mobile
      }
      if (type === 'del') {
        this.$confirm('是否確認刪除该條數據？', '提示', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delItem(data)
        })
        return
      }
      this.$refs.Set.dialogFormVisible = true
    }
  }
}
</script>
<style lang='scss'  scoped>

</style>
