<template>
  <div>
    <el-card shadow="never" class="page-card">
      <el-button v-setButtonPower="'adifi-media-add'" type="primary" size="mini" @click="handleClick('add')">新增</el-button>
      <el-table
        :data="tableData"
        :size="$size"
        border
        style="width: 100%;margin-top:15px;"
        :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column fixed prop="name" label="社交媒体名称" min-width="150" />
        <el-table-column show-overflow-tooltip prop="icon" label="圖標鏈接" min-width="150" />
        <el-table-column show-overflow-tooltip prop="url" label="地址" min-width="150" />
        <el-table-column prop="created_at" label="創建時間" min-width="160" />
        <el-table-column label="操作" class="operate-table" width="80" fixed="right">
          <template slot-scope="scope">
            <el-dropdown v-if="operateAuthB" trigger="click" size="small" placement="bottom-end" :hide-on-click="false" @command="(e)=>{ handleClick(e,scope.row, scope.$index) }">
              <span class="el-dropdown-link">
                ...
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-setButtonPower="'adifi-media-edit'" command="edit">編輯</el-dropdown-item>
                <el-dropdown-item v-setButtonPower="'adifi-media-del'" command="del">刪除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
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
    </el-card>
    <Set ref="Set" @getData="getData" />
  </div>
</template>

<script>
import { operateAuth } from '@/utils/utils'
import Set from './components/set'
import { elMessage } from '@/utils/message-remind.js'
import { mediumList, mediumDel } from '@/api/adifi'
export default {
  name: 'ADIFIMedia', // 媒體設置
  components: { Set },
  data() {
    return {
      searchForm: {
        page: 1,
        page_size: 10,
        total: 0
      },
      tableData: []
    }
  },
  computed: {
    operateAuthB() {
      return operateAuth(['adifi-media-edit', 'adifi-media-del'])
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const { data } = await mediumList()
      this.tableData = data.data
      this.searchForm.total = data.total
    },
    handleCurrentChange() {},
    handleClick(type, data) {
      if (type === 'add' || type === 'edit') {
        this.$refs.Set.mode = type
        this.$refs.Set.dialogFormVisible = true
        if (type === 'edit') {
          this.$refs.Set.ruleForm.id = data.id
          this.$refs.Set.ruleForm.name = data.name
          this.$refs.Set.ruleForm.url = data.url
          this.$refs.Set.ruleForm.icon = data.icon
        }
      } else if (type === 'del') {
        this.delItem(data)
      }
    },
    delItem(e) {
      this.$confirm(`確定刪除該媒體？`, '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await mediumDel({ id: e.id })
        elMessage(this, '操作成功！', 'success')
        this.getData()
      }).catch(() => {})
    }
  }
}
</script>
<style lang='scss'  scoped>
::v-deep .el-table__fixed-body-wrapper{
  top:43.79px !important;
}
</style>
