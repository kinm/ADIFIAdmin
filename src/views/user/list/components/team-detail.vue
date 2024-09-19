<template>
  <div v-if="dialogFormVisible">
    <el-dialog width="65%" title="團隊詳情" :visible.sync="dialogFormVisible">
      <el-card>
        <el-descriptions direction="vertical" size="mini" :column="3" border>
          <el-descriptions-item label="用戶ID">{{ userInfo.uid }}</el-descriptions-item>
          <el-descriptions-item label="個人業績">{{ userInfo.part_ape }}</el-descriptions-item>
          <el-descriptions-item label="團隊業績">{{ userInfo.team_yeji }}</el-descriptions-item>
        </el-descriptions>
        <el-row :gutter="20" style="margin-top:20px;">
          <el-col :span="24">
            <div class="title">大區業績：<span class="performance">{{ first_yeji }}</span></div>
            <div class="tree-con" style="margin-top:8px;">
              <el-tree
                ref="tree"
                accordion
                empty-text="暫無業績"
                :load="loadLevelNode"
                lazy
              />
            </div>
          </el-col>
          <el-col :span="24" style="margin-top:40px;">
            <div class="title">小區業績：<span class="performance">{{ second_yeji }}</span></div>
            <div class="tree-con" style="margin-top:8px;">
              <el-tree
                accordion
                empty-text="暫無業績"
                :load="loadLevelNode2"
                lazy
              />
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import { userGroup, getDirectById } from '@/api/user'
export default {
  name: '',
  data() {
    return {
      dialogFormVisible: false,
      userId: '',
      userInfo: {},
      first_yeji: 0,
      second_yeji: 0
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData(params) {
      const { data } = await userGroup({ id: params.id })
      this.userInfo = data.personal_yeji
      this.first_yeji = data.first_yeji
      this.second_yeji = data.second_yeji
    },
    loadLevelNode(node, resolve) {
      setTimeout(async() => {
        if (node.level === 0) {
          const { data } = await userGroup({ id: this.userId })
          this.eachData(data.first_region)
          if (resolve) {
            resolve(data.first_region)
          }
          node.childNodes.forEach(el => {
            if (!el.data.have_child) el.isLeaf = true
          })
        } else {
          const { data } = await getDirectById({ uid: node.data.uid })
          this.eachData(data)
          if (resolve) {
            resolve(data)
          }
          node.childNodes.forEach(el => {
            if (!el.data.have_child) el.isLeaf = true
          })
        }
      }, 500)
    },
    loadLevelNode2(node, resolve) {
      setTimeout(async() => {
        if (node.level === 0) {
          const { data } = await userGroup({ id: this.userId })
          this.eachData(data.second_region)
          if (resolve) {
            resolve(data.second_region)
          }
          node.childNodes.forEach(el => {
            if (!el.data.have_child) el.isLeaf = true
          })
        } else {
          const { data } = await getDirectById({ uid: node.data.uid })
          this.eachData(data)
          if (resolve) {
            resolve(data)
          }
          node.childNodes.forEach(el => {
            if (!el.data.have_child) el.isLeaf = true
          })
        }
      }, 500)
    },
    eachData(data) {
      if (data) {
        data.forEach(el => {
          el.label = `用戶ID：${el.uid}，個人業績：${el.part_ape}，團隊業績：${el.team_yeji}`
        })
      }
    }
  }
}
</script>
<style lang='scss'  scoped>
.tree-con{
  overflow-x: auto;
  // display: -webkit-box;
  text-align: center;
        white-space: nowrap;
        overflow-y: hidden;
}
.performance{
  color: #909399;
}
</style>
