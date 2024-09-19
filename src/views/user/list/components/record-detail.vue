<template>
  <div>
    <el-dialog width="75%" title="數據詳情" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-card>
        <el-descriptions title="數據統計" direction="vertical" size="mini" :column="4" border>
          <el-descriptions-item label="參與數量（APE）">{{ detailInfo.part_ape }}</el-descriptions-item>
          <el-descriptions-item label="累放發放（APE）">{{ detailInfo.acc_ape }}</el-descriptions-item>
          <el-descriptions-item label="待領取（APE）">{{ detailInfo.ape }}</el-descriptions-item>
          <el-descriptions-item label="賽博猿（张）">{{ detailInfo.world_ape }}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions style="margin-top:20px;" title="收益詳情" direction="vertical" size="mini" :column="3" border>
          <el-descriptions-item label="靜態收益（APE）">{{ detailInfo.static_income }}</el-descriptions-item>
          <el-descriptions-item label="動態收益（APE）">{{ detailInfo.dynamic_income }}</el-descriptions-item>
          <el-descriptions-item label="永動激勵（APE）">{{ detailInfo.perpetual_motivation }}</el-descriptions-item>
          <el-descriptions-item label="永動補償（APE）">{{ detailInfo.perpetual_compensation }}</el-descriptions-item>
          <el-descriptions-item label="聯盟委員會（APE）">{{ detailInfo.alliance_income }}</el-descriptions-item>
          <el-descriptions-item label="賽博猿NFT（APE）">{{ detailInfo.world_income }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card style="margin-top:20px;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="收益記錄" name="firstMoney">
            <Money ref="firstMoney" :options="options" :from="'first'" />
          </el-tab-pane>
          <el-tab-pane label="收支記錄" name="secondMoney">
            <Money ref="secondMoney" :options="options" :from="'second'" />
          </el-tab-pane>
        </el-tabs>
      </el-card>

    </el-dialog>
  </div>
</template>

<script>
import { userData } from '@/api/user.js'
import Money from './money'
export default {
  name: '',
  components: { Money },
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      mode: '',
      dialogFormVisible: false,
      activeName: 'firstMoney',
      detailInfo: {},
      detailId: ''
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData(params) {
      const { data } = await userData({ id: params.id })
      this.detailInfo = { ...this.detailInfo, ...data }
      this.getRefData('firstMoney', params)
    },
    getRefData(type, data) {
      this.$refs[type].searchForm.id = data.id
      this.$refs[type].searchForm.page = 1
      this.$refs[type].searchForm.type = ''
      this.$refs[type].searchForm.start = ''
      this.$refs[type].searchForm.end = ''
      this.$refs[type].searchForm.time = []
      this.$refs[type].getData()
    },
    handleClose() {
      this.detailInfo = {}
      this.activeName = 'firstMoney'
      this.$refs.firstMoney.tableData = []
      this.$refs.secondMoney.tableData = []
      this.dialogFormVisible = false
    },
    handleClick(e) {
      const params = {}
      params.id = this.detailId
      this.getRefData(this.activeName, params)
    }
  }
}
</script>
<style lang='scss'  scoped>
::v-deep .el-dialog__body{
  background-color: #f0f3fa;
}
</style>
