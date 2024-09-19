<template>
  <div>
    <el-card shadow="never" class="page-card">
      <SearchForm ref="searchForm" :search-config="searchConfig" @search="onSearch" @init="onInit" />
      <div>
        <TablePackage
          v-loading="loading"
          :data="tableData"
          storage-name="set-role"
          style="width: 100%"
          :size="$size"
          border
          :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
          :cell-style="{ 'text-align': 'center' }"
          @selection-change="handleSelectionChange"
        >
          <template #btnContentLeft>
            <el-button v-setButtonPower="'set-role-add'" :size="$s_size" type="primary" icon="el-icon-plus" @click="handleClick('add')">新 增</el-button>
            <el-button v-setButtonPower="'set-role-del'" :size="$s_size" type="plain" icon="el-icon-delete" @click="delMoreItem">刪 除</el-button>
          </template>
          <template #btnContentRight>
            <el-tooltip class="item table-top-btn" effect="dark" :content="searchShow?'關閉搜索':'打開搜索'" placement="top">
              <el-button size="mini" circle icon="el-icon-search" @click="searchShow=!searchShow" />
            </el-tooltip>
            <el-tooltip class="item table-top-btn" effect="dark" content="刷新列表" placement="top">
              <el-button size="mini" circle icon="el-icon-refresh" @click="getData" />
            </el-tooltip>
          </template>
          <el-table-column type="selection" width="55" />
          <el-table-column prop="name" label="權限名稱" min-width="150" />
          <el-table-column prop="count" label="用戶數量" min-width="150" />
          <el-table-column prop="created_at" label="添加時間" min-width="150" />
          <el-table-column label="操作" class="operate-table" width="80" fixed="right">
            <template slot-scope="scope">
              <el-dropdown v-if="tableData.length" trigger="click" size="small" placement="bottom-end" :hide-on-click="false" @command="(e)=>{ handleClick(e,scope.row, scope.$index) }">
                <span class="el-dropdown-link">
                  ...
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-setButtonPower="'set-role-edit'" command="edit">編輯</el-dropdown-item>
                  <el-dropdown-item v-setButtonPower="'set-role-del'" :disabled="scope.row.count>0" command="del">刪除</el-dropdown-item>
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
    <Set ref="Set" @getData="getData" />
  </div>
</template>

<script>
import TablePackage from '@/components/TablePackage'
import Set from './components/set'
import { pageMixins } from '@/mixins/page'
import SearchForm from '@/components/SearchForm'
import { elMessage } from '@/utils/message-remind.js'
import { authRoleList, delRole } from '@/api/limit-authority'
export default {
  name: 'SetRole',
  components: { TablePackage, Set, SearchForm },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      searchShow: true,
      searchConfig: [
        {
          key: 'name',
          type: 'input',
          label: '角色名稱',
          value: ''
        }
      ],
      tableData: [],
      delList: []
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData() {
      this.loading = true
      const { data } = await authRoleList(this.getSearchOptions())
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
        await delRole({ id: newArr })
        elMessage(this, '操作成功！', 'success')
        this.getData()
      }).catch(() => {})
    },
    async delItem(data) {
      await delRole({ id: [data.id] })
      elMessage(this, '操作成功！', 'success')
      this.getData()
    },
    handleClick(type, data) {
      this.$refs.Set.mode = type
      if (type === 'add') {
        this.$refs.Set.onInit()
        this.$refs.Set.defaultCheckedKeys = []
      }
      if (type === 'edit') {
        this.$refs.Set.onInit()
        this.$refs.Set.ruleForm.id = data.id
        this.$refs.Set.ruleForm.name = data.name
        this.$refs.Set.defaultCheckedKeys = data.auth
        this.$refs.Set.ruleForm.auth = data.auth
      }
      if (type === 'del') {
        this.$confirm('是否確認刪除该條數據？', '提示', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delItem(data)
        }).catch(() => {})
        return
      }
      this.$refs.Set.dialogFormVisible = true
    }
  }
}
</script>
<style lang='scss'  scoped>

</style>
