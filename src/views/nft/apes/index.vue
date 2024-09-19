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
          storage-name="nft-apes"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
          :cell-style="{ 'text-align': 'center' }"
          @selection-change="handleSelectionChange"
        >
          <template #btnContentLeft>
            <el-button v-setButtonPower="'nft-apes-apes'" type="primary" :size="$s_size" @click="handlebatchClick('apes')">賽博猿</el-button>
            <el-button v-setButtonPower="'nft-apes-record'" type="primary" :size="$s_size" @click="handlebatchClick('record')">合成記錄</el-button>
            <el-button v-setButtonPower="'nft-apes-reward'" type="primary" :size="$s_size" @click="handlebatchClick('reward')">NFT獎勵</el-button>
            <el-button v-setButtonPower="'nft-apes-collectors'" type="primary" :size="$s_size" @click="handlebatchClick('collectors')">收藏者設置</el-button>
          </template>
          <template #btnContentRight>
            <el-tooltip class="item table-top-btn" effect="dark" content="刷新列表" placement="top">
              <el-button size="mini" circle icon="el-icon-refresh-right" @click="getData" />
            </el-tooltip>
          </template>
          <el-table-column fixed prop="uid" label="用戶ID" min-width="150" />
          <el-table-column show-overflow-tooltip prop="relation_addr" label="關聯地址" min-width="150" />
          <el-table-column prop="date" label="期數" min-width="150" />
          <el-table-column prop="round" label="輪數" min-width="150" />
          <el-table-column prop="no" label="碎片序號" min-width="150" />
          <el-table-column prop="type_str" label="獲取方式" min-width="150" />
          <el-table-column label="碎片圖片" min-width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.img">
                <el-image
                  style="width: 80px; height: 80px;margin-right:10px;"
                  :src="scope.row.img"
                  :preview-src-list="[scope.row.img]"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="收集時間" min-width="160" />
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
    <ConflateRecord ref="ConflateRecord" />
    <NftReward ref="NftReward" :options="options" />
    <SetApes ref="SetApes" @getData="getData" />
    <Collectors ref="Collectors" :options="options" @getData="getData" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TablePackage from '@/components/TablePackage'
import SearchForm from '@/components/SearchForm'
import { pageMixins } from '@/mixins/page'
import ConflateRecord from './components/conflate-record'
import NftReward from './components/nft-reward'
import SetApes from './components/set-apes'
import Collectors from './components/collectors'
import { apeWorldList, apeWorldEnum } from '@/api/nft'
export default {
  name: 'NftApes', // 猿·世界NFT
  components: { TablePackage, SearchForm, ConflateRecord, NftReward, SetApes, Collectors },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      options: {
        date_enum: [],
        round_enum: [],
        no_enum: [],
        reward_enum: [],
        type_enum: []
      },
      searchConfig: [
        {
          key: 'uid',
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
          key: 'type',
          type: 'select',
          label: '獲取方式',
          value: ''
        },
        {
          key: 'date',
          type: 'select',
          label: '期數',
          value: ''
        },
        {
          key: 'round',
          type: 'select',
          label: '輪數',
          value: ''
        },
        {
          key: 'no',
          type: 'select',
          label: '碎片序號',
          value: ''
        },
        {
          key: 'create_time',
          type: 'datetimerange',
          label: '收集時間',
          is_simple: true,
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
      const { data } = await apeWorldEnum()
      this.options.date_enum = data.date
      this.options.round_enum = data.round
      this.options.no_enum = data.no
      this.options.reward_enum = data.type6
      this.options.type_enum = data.picket_type
    },
    async getData() {
      this.loading = true
      const { data } = await apeWorldList(this.getSearchOptions())
      this.loading = false
      this.tableData = data.data
      this.searchForm.total = data.total
    },
    async handlebatchClick(type) {
      if (type === 'apes') {
        this.$refs.SetApes.getData()
        this.$refs.SetApes.dialogFormVisible = true
      } else if (type === 'record') {
        this.$refs.ConflateRecord.getData()
        this.$refs.ConflateRecord.dialogFormVisible = true
      } else if (type === 'reward') {
        this.$refs.NftReward.getData()
        this.$refs.NftReward.dialogFormVisible = true
      } else if (type === 'collectors') {
        this.$refs.Collectors.dialogFormVisible = true
      }
    }
  }
}
</script>
<style lang='scss'  scoped>

</style>
