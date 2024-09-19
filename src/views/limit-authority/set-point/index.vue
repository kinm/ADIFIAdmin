<template>
  <div>
    <el-card shadow="never" class="page-card">
      <div>
        <TablePackage
          v-loading="loading"
          :data="tableData"
          storage-name="set-point"
          style="width: 100%"
          row-key="id"
          :size="$size"
          border
          :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
          :cell-style="{ 'text-align': 'center' }"
          @selection-change="handleSelectionChange"
        >
          <template #btnContentLeft>
            <el-button v-setButtonPower="'set-point-add'" :size="$s_size" type="primary" icon="el-icon-plus" @click="handleClick('new')">新 增</el-button>
          </template>
          <template #btnContentRight>
            <el-tooltip class="item table-top-btn" effect="dark" content="刷新列表" placement="top">
              <el-button size="mini" circle icon="el-icon-refresh-right" @click="getData" />
            </el-tooltip>
          </template>
          <el-table-column prop="name" label="名稱" min-width="120" />
          <el-table-column prop="role" label="標識" min-width="120" />
          <el-table-column prop="desc" label="描述" min-width="120" />
          <el-table-column prop="api" label="API" min-width="120" />
          <el-table-column label="操作" class="operate-table" width="80" fixed="right">
            <template slot-scope="scope">
              <el-dropdown v-if="tableData.length" trigger="click" size="small" placement="bottom-end" :hide-on-click="false" @command="(e)=>{ handleClick(e,scope.row, scope.$index) }">
                <span class="el-dropdown-link">
                  ...
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-if="scope.row.pid == 0" v-setButtonPower="'set-point-add'" command="add">添加</el-dropdown-item>
                  <el-dropdown-item v-setButtonPower="'set-point-edit'" command="edit">編輯</el-dropdown-item>
                  <el-dropdown-item v-setButtonPower="'set-point-del'" command="del">刪除</el-dropdown-item>
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
import { authPointList, authPointDel } from '@/api/limit-authority'
import { elMessage } from '@/utils/message-remind.js'
export default {
  name: 'SetPoint',
  components: { TablePackage, Set },
  data() {
    return {
      loading: false,
      searchShow: true,
      operate_type_enum: [],
      type_enum: [],
      searchForm: {
        page: 1,
        page_size: 10,
        total: 0,
        start: '',
        end: '',
        name: '',
        company_name: '',
        order_sn: '',
        type: '',
        operate_type: '',
        time: []
      },
      tableData: [],
      delList: []
    }
  },
  computed: {
  },
  created() {
    this.getData()
  },
  methods: {
    async delItem(data) {
      await authPointDel({ id: data.id })
      elMessage(this, '操作成功！', 'success')
      this.getData()
    },
    async getData() {
      this.loading = true
      const { data } = await authPointList(this.searchForm)
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
    changeTime(e, key = '') {
      let name = ''
      if (key) {
        name = `${key}_`
      }
      if (e) {
        this.searchForm[`${name}start`] = e[0] / 1000
        this.searchForm[`${name}end`] = e[1] / 1000
      } else {
        this.searchForm[`${name}start`] = ''
        this.searchForm[`${name}end`] = ''
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
    handleClick(type, data) {
      this.$refs.Set.mode = type
      if (type === 'add') {
        this.$refs.Set.ruleForm.pid = data.id
        this.$refs.Set.ruleForm.id = ''
        this.$refs.Set.ruleForm.name = ''
        this.$refs.Set.ruleForm.role = ''
        this.$refs.Set.ruleForm.api = ''
        this.$refs.Set.ruleForm.desc = ''
      }
      if (type === 'edit') {
        this.$refs.Set.ruleForm.id = data.id
        this.$refs.Set.ruleForm.pid = data.pid
        this.$refs.Set.ruleForm.name = data.name
        this.$refs.Set.ruleForm.role = data.role
        this.$refs.Set.ruleForm.api = data.api
        this.$refs.Set.ruleForm.desc = data.desc
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
      this.$refs.Set.is_edit = true
      this.$refs.Set.dialogFormVisible = true
    }
  }
}
</script>
<style lang='scss'  scoped>

</style>
