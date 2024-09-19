<template>
  <div>
    <el-dialog width="75%" title="數據詳情" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-card>
        <el-descriptions title="數據統計" direction="vertical" size="mini" :column="4" border>
          <el-descriptions-item label="累計質押參與">{{ detailInfo.accu_part }}</el-descriptions-item>
          <el-descriptions-item label="累計質押領取">{{ detailInfo.accu_collet }}</el-descriptions-item>
          <el-descriptions-item label="累計質押獎勵">{{ detailInfo.accu_rewards }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card style="margin-top:20px;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="質押收益" name="firstMoney">
            <Money ref="firstMoney" :from="'first'" />
          </el-tab-pane>
          <el-tab-pane label="質押領取" name="secondMoney">
            <Money ref="secondMoney" :from="'second'" />
          </el-tab-pane>
          <el-tab-pane label="資產詳情" name="thirdProperty">
            <Property ref="thirdProperty" :options="options" />
          </el-tab-pane>
        </el-tabs>
      </el-card>

    </el-dialog>
  </div>
</template>

<script>
import Money from './money'
import Property from './property'
export default {
  name: '',
  components: { Money, Property },
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
      detailInfo: {
        accu_part: '',
        accu_collet: '',
        accu_rewards: ''
      },
      detailId: ''
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData(params) {
      this.$nextTick(() => {
        this.getRefData('firstMoney', params)
      })
    },
    getRefData(type, data) {
      this.$refs[type].searchForm.id = data.id
      this.$refs[type].searchForm.page = 1
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
