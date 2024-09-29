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
          storage-name="adifi-user"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <template #btnContentLeft>
            <el-button v-setButtonPower="'adifi-user-calibration'" type="primary" size="mini" @click="handleClick('calibration')">校準記錄</el-button>
          </template>
          <template #btnContentRight>
            <el-tooltip class="item table-top-btn" effect="dark" content="刷新列表" placement="top">
              <el-button size="mini" circle icon="el-icon-refresh-right" @click="getData" />
            </el-tooltip>
          </template>
          <el-table-column fixed prop="id" label="用戶ID" min-width="80" />
          <el-table-column fixed show-overflow-tooltip prop="relation_addr" label="錢包地址" min-width="150" />
          <el-table-column label="等級" min-width="120">
            <template slot-scope="scope">
              <div>
                <el-select v-model="scope.row.level" size="mini" :disabled="!buttonRoles.some((el) => el === 'adifi-user-level')" placeholder="請選擇" @change="changeLevel(scope.row)">
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
              <div v-if="buttonRoles.some((el) => el === 'adifi-user-pid')">
                <el-button type="text" @click="handleClick('pid',scope.row)">{{ scope.row.tj_relation_addr }}</el-button>
              </div>
              <div v-else>{{ scope.row.tj_relation_addr }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="bind_at" label="綁定時間" min-width="160" />
          <el-table-column label="錢包ADI餘額" min-width="200">
            <template slot-scope="scope">
              <div>
                ADI 1.0：{{ scope.row.adi1 }}
              </div>
              <div>
                ADI 2.0：{{ scope.row.adi2 }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="total_staked" label="當前質押(ADI)" min-width="150" />
          <el-table-column prop="accu_burn" label="累計燃燒(ADI)" min-width="150" />
          <el-table-column label="累計個人收益(ADI)" min-width="200">
            <template slot-scope="scope">
              <div>
                質押收益：{{ scope.row.total_staked_income }}
              </div>
              <div>
                燃燒分紅：{{ scope.row.total_burn_income }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="accu_team" label="團隊累計獎勵(ADI)" min-width="150" />
          <el-table-column prop="relation_at" label="關聯時間" min-width="160" />
          <el-table-column label="狀態" min-width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :disabled="!buttonRoles.some((el) => el === 'adifi-user-status')"
                :active-value="1"
                :inactive-value="0"
                @change="changeStatus(scope.row)"
              />
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
    <Calibration ref="Calibration" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TablePackage from '@/components/TablePackage'
import SearchForm from '@/components/SearchForm'
import { elMessage } from '@/utils/message-remind.js'
import { pageMixins } from '@/mixins/page'
import Calibration from './components/calibration'
import { userEnums, userList, userStatus, userParent, userChangeLevel } from '@/api/adifi'
export default {
  name: 'ADIFIUser', // 用戶列表
  components: { TablePackage, SearchForm, Calibration },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      options: {
        level_enum: [],
        status_enum: [],
        com_bind_enum: [],
        withdraw_type_enum: [{ label: '質押收益', value: 1 }, { label: '燃燒分紅', value: 2 }],
        adi_type_enum: [{ label: '錢包ADI 1.0餘額', value: 1 }, { label: '錢包ADI 2.0餘額', value: 2 }]
      },
      searchConfig: [
        {
          key: 'relation_addr',
          type: 'input',
          label: '錢包地址',
          value: ''
        },
        {
          key: 'tj_relation_addr',
          type: 'input',
          label: '推薦人地址',
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
          key: 'accu_burn',
          type: 'interval',
          label: '累計燃燒',
          value: ''
        },
        {
          key: 'withdraw_type_value',
          type: 'interval',
          value: '',
          slot_label: true,
          label_type: 'select',
          label_key: 'withdraw_type',
          slot_label_style: 'width:80px'
        },
        {
          key: 'accu_team',
          type: 'interval',
          label: '累計團隊獎勵',
          value: ''
        },
        {
          key: 'adi_type_value',
          type: 'interval',
          value: '',
          slot_label: true,
          label_type: 'select',
          label_key: 'adi_type',
          slot_label_style: 'width:120px'
        },
        {
          key: 'relation_at',
          type: 'datetimerange',
          label: '關聯時間',
          value: ''
        },
        {
          key: 'bind_at',
          type: 'datetimerange',
          label: '推薦人綁定時間',
          value: ''
        }
      ],
      tableData: []
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
      const { data } = await userEnums()
      this.options.level_enum = data.user_level
      this.options.status_enum = data.status
      this.options.com_bind_enum = data.com_bind
    },
    async getData() {
      const { adi_type, adi_type_value_min, adi_type_value_max, withdraw_type, withdraw_type_value_min, withdraw_type_value_max, ...agu } = this.getSearchOptions()
      let staked_income_min
      let staked_income_max
      let burn_income_min
      let burn_income_max
      let adi1_min
      let adi1_max
      let adi2_min
      let adi2_max
      if (withdraw_type === 1) {
        staked_income_min = withdraw_type_value_min
        staked_income_max = withdraw_type_value_max
        burn_income_min = ''
        burn_income_max = ''
      } else {
        staked_income_min = ''
        staked_income_max = ''
        burn_income_min = withdraw_type_value_min
        burn_income_max = withdraw_type_value_max
      }
      if (adi_type === 1) {
        adi1_min = adi_type_value_min
        adi1_max = adi_type_value_max
        adi2_min = ''
        adi2_max = ''
      } else {
        adi1_min = ''
        adi1_max = ''
        adi2_min = adi_type_value_min
        adi2_max = adi_type_value_max
      }
      const params = { staked_income_min, staked_income_max, burn_income_min, burn_income_max, adi1_min, adi1_max, adi2_min, adi2_max, ...agu }
      this.loading = true
      const { data } = await userList(params)
      this.loading = false
      this.tableData = data.data
      this.searchForm.total = data.total
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
      if (type === 'pid') {
        this.setPid(data)
      } else if (type === 'calibration') {
        this.setCalibration()
      }
    },
    setPid(params) {
      this.$prompt('', '修改推薦人', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        inputValue: params.tj_relation_addr,
        inputErrorMessage: '修改推薦人ID不能為空'
        // inputValidator: function(val) { if (!val) { return '修改推薦人ID不能為空' } else { return true } }
      }).then(async({ value }) => {
        await userParent({ id: params.id, pid: value })
        elMessage(this, '操作成功！', 'success')
        this.getData()
      }).catch(() => {})
    },
    setCalibration() {
      this.$refs.Calibration.dialogFormVisible = true
    }
  }
}
</script>
<style lang='scss'  scoped>
.reference-content{
  .label{
    font-size: 14px;
    color: #909399;
    font-weight: bold;
  }
  .value{
    font-size: 14px;
    color: #606266
  }
}
</style>
