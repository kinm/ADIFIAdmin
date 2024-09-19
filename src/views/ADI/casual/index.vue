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
          storage-name="adi-casual"
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
          <el-table-column fixed show-overflow-tooltip prop="actionId" label="訂單編號" min-width="150" />
          <el-table-column show-overflow-tooltip prop="input_user_addr" label="用戶地址" min-width="150" />
          <el-table-column prop="input_num" label="質押數量" min-width="150" />
          <el-table-column prop="input_uid_left" label="支付前餘額" min-width="150" />
          <el-table-column prop="version" label="質押代幣版本" min-width="120" />
          <el-table-column prop="input_left_after" label="支付後餘額" min-width="150" />
          <el-table-column show-overflow-tooltip prop="input_receive" label="收款地址" min-width="150" />
          <el-table-column prop="input_receive_left" label="收款前餘額" min-width="150" />
          <el-table-column prop="out_select_left_after" label="收款後餘額" min-width="150" />
          <el-table-column prop="input_coin" label="質押幣種" min-width="150" />
          <el-table-column show-overflow-tooltip prop="input_serino" label="用戶設備號" min-width="150" />
          <el-table-column show-overflow-tooltip prop="input_contract" label="合約地址" min-width="150" />
          <el-table-column show-overflow-tooltip prop="txID" label="hash" min-width="150" />
          <el-table-column prop="hash_at" label="hash生成時間" min-width="160" />
          <el-table-column show-overflow-tooltip prop="output_receive" label="回調收款賬號" min-width="150" />
          <el-table-column show-overflow-tooltip prop="output_contract" label="回調合約地址" min-width="150" />
          <el-table-column show-overflow-tooltip prop="output_user_addr" label="回調用戶地址" min-width="150" />
          <el-table-column prop="state_str" label="訂單狀態" min-width="150">
            <template slot-scope="scope">
              <div>
                {{ scope.row.state_str }}
                <el-popover
                  v-if="scope.row.state===2"
                  placement="bottom"
                  trigger="hover"
                  popper-class="el-popover-self"
                >
                  {{ scope.row.desc }}
                  <i slot="reference" class="el-icon-warning" />
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="創建時間" min-width="160" />
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
  </div>
</template>

<script>
import TablePackage from '@/components/TablePackage'
import SearchForm from '@/components/SearchForm'
import { pageMixins } from '@/mixins/page'
import { callbackList, callbackEnums } from '@/api/adi'
export default {
  name: 'ADICasual', // 臨時訂單
  components: { TablePackage, SearchForm },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      options: {
        state_enum: [],
        version_enum: []
      },
      searchConfig: [
        {
          key: 'sn',
          type: 'input',
          label: '訂單編號',
          value: ''
        },
        {
          key: 'addr',
          type: 'input',
          label: '用戶地址',
          value: ''
        },
        {
          key: 'state',
          type: 'select',
          label: '訂單狀態',
          value: ''
        },
        {
          key: 'version',
          type: 'select',
          label: '質押代幣版本',
          value: ''
        },
        {
          key: 'hash',
          type: 'input',
          label: 'hash',
          value: ''
        },
        {
          key: 'create_time',
          type: 'datetimerange',
          label: '參與時間',
          is_simple: true,
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
      const { data } = await callbackEnums()
      this.options.state_enum = data.xy_callback_state
      this.options.version_enum = data.adi_version
    },
    async getData() {
      this.loading = true
      const { data } = await callbackList(this.getSearchOptions())
      this.loading = false
      this.tableData = data.data
      this.searchForm.total = data.total
    }
  }
}
</script>
<style lang='scss'  scoped>

</style>
