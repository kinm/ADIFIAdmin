<template>
  <div>
    <el-dialog width="65%" :close-on-click-modal="false" title="賽博猿設置" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <div class="tabs-con">
          <el-tabs v-model="activeName" @tab-click="handleClick" @tab-remove="tabRemove">
            <el-tab-pane v-for="(item,index) in ruleForm.ruleList" :key="index" :closable="index!==0&&!item.outerFlag" :label="item.name" :name="item.name">
              <div class="tabs-con-inner">
                <el-tabs v-model="activeInnerName" @tab-click="handleInnerClick" @tab-remove="tabInnerRemove(index,activeInnerName)">
                  <el-tab-pane v-for="(ite,ind) in item.round" :key="ind" :closable="ind!==0&&activeInnerName===ite.name&&ite.state===1" :label="ite.name" :name="ite.name">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="完整圖片：" :prop="`ruleList.${index}.round.${ind}.main`" :rules="rules.main">
                          <el-input v-model="ruleForm.ruleList[index].round[ind].main" :disabled="ite.state===2||ite.state===3" clearable placeholder="請輸入" />
                          <!-- <UploadPic :ref="`ruleList${index}round${ind}`" v-model="ruleForm.ruleList[index].round[ind].main" :show-delete="ite.state===1" /> -->
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item label="碎片设置：">
                          <el-table
                            :header-cell-style="{ 'text-align': 'center','background':'#fafafa' }"
                            :cell-style="{ 'text-align': 'center' }"
                            size="mini"
                            :data="ruleForm.ruleList[index].round[ind].details"
                            border
                            style="width: 100%"
                          >
                            <el-table-column label="碎片序號" prop="no" min-width="120" />
                            <el-table-column label="碎片圖片" min-width="100">
                              <template slot-scope="scope">
                                <div>
                                  <el-form-item class="form-table" :prop="`ruleList.${index}.round.${ind}.details.${scope.$index}.img`" :rules="rules.img">
                                    <el-input v-model="scope.row.img" :disabled="ite.state===2||ite.state===3" clearable placeholder="請輸入" />
                                    <!-- <UploadPic :ref="`ruleList${index}round${ind}details${scope.row.no}`" v-model="scope.row.img" :show-delete="scope.row.state===1" :up-type="'more'" /> -->
                                  </el-form-item>
                                </div>
                              </template>
                            </el-table-column>
                            <el-table-column label="中獎概率" min-width="100">
                              <template slot-scope="scope">
                                <div>
                                  <el-form-item class="form-table" :prop="`ruleList.${index}.round.${ind}.details.${scope.$index}.p`" :rules="rules.p">
                                    <el-input v-model="scope.row.p" :disabled="scope.row.state===3" clearable placeholder="請輸入">
                                      <template slot="append">%</template>
                                    </el-input>
                                  </el-form-item>
                                </div>
                              </template>
                            </el-table-column>
                            <el-table-column label="發行量" min-width="100">
                              <template slot-scope="scope">
                                <div>
                                  <el-form-item class="form-table" :prop="`ruleList.${index}.round.${ind}.details.${scope.$index}.open`" :rules="rules.open">
                                    <el-input v-model="scope.row.open" :disabled="scope.row.state===3" clearable placeholder="請輸入">
                                      <template slot="append">張</template>
                                    </el-input>
                                  </el-form-item>
                                </div>
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-tab-pane>
                </el-tabs>
                <el-button class="right-btn-inner" type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="setAddInner(index)">新增輪</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
          <el-button class="right-btn" type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="setAdd()">新增期</el-button>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :size="$s_size" @click="handleClose">取 消</el-button>
        <el-button :size="$s_size" type="primary" @click="submitForm">確 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { elMessage } from '@/utils/message-remind.js'
import { positiveFixed2, positiveInteger } from '@/utils/validate.js'
import { apeWorldGetConfig, apeWorldSet } from '@/api/nft'
export default {
  name: '',
  data() {
    return {
      dialogFormVisible: false,
      activeName: '第1期',
      activeInnerName: '第1輪',
      ruleForm: {
        ruleList: [
          {
            date: 1,
            name: '第1期',
            round: [
              {
                name: '第1輪',
                round: 1,
                main: '',
                details: [
                  {
                    no: '碎片1',
                    img: '',
                    p: '',
                    open: ''
                  },
                  {
                    no: '碎片2',
                    img: '',
                    p: '',
                    open: ''
                  },
                  {
                    no: '碎片3',
                    img: '',
                    p: '',
                    open: ''
                  },
                  {
                    no: '碎片4',
                    img: '',
                    p: '',
                    open: ''
                  },
                  {
                    no: '碎片5',
                    img: '',
                    p: '',
                    open: ''
                  }
                ]
              }
            ]
          }
        ]
      },
      rules: {
        main: [{ required: true, message: '請上傳完整圖片', trigger: 'blur' }],
        img: [{ required: true, message: '請上傳碎片圖片', trigger: 'blur' }],
        p: [{ required: true, message: '請輸入概率', trigger: 'blur' },
          { validator: positiveFixed2, trigger: 'blur' }],
        open: [{ required: true, message: '請輸入發行量', trigger: 'blur' },
          { validator: positiveInteger, trigger: 'blur' }]
      }
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    async getData() {
      const { data } = await apeWorldGetConfig()
      this.ruleForm.ruleList = data.world_arr
      this.$nextTick(() => {
        data.world_arr.forEach((el, inx) => {
          if (el.date === data.date) {
            this.activeName = el.name
          }
          el.outerFlag = el.round.some(a => a.state !== 1)
          el.round.forEach((item, index) => {
            if (item.round === data.round) {
              this.activeInnerName = item.name
            }
            this.$nextTick(() => {
              // this.$refs[`ruleList${inx}round${index}`][0].evidence = item.main
            })
            if (item.details) {
              item.details.forEach((e, i) => {
                e.state = item.state
                this.$nextTick(() => {
                  // this.$refs[`ruleList${inx}round${index}details${e.no}`][0].picList = []
                  // console.log(this.$refs[`ruleList${inx}round${index}details${e.no}`][0].evidence)
                  // this.$refs[`ruleList${inx}round${index}details${e.no}`][0].picList.push(e.img)
                })
              })
            }
          })
        })
      })
    },
    handleClose() {
      this.ruleForm = {
        ruleList: [
          {
            date: 1,
            name: '第1期',
            round: [
              {
                name: '第1輪',
                round: 1,
                main: '',
                details: [
                  {
                    no: '碎片1',
                    img: '',
                    p: '',
                    open: ''
                  },
                  {
                    no: '碎片2',
                    img: '',
                    p: '',
                    open: ''
                  },
                  {
                    no: '碎片3',
                    img: '',
                    p: '',
                    open: ''
                  },
                  {
                    no: '碎片4',
                    img: '',
                    p: '',
                    open: ''
                  },
                  {
                    no: '碎片5',
                    img: '',
                    p: '',
                    open: ''
                  }
                ]
              }
            ]
          }
        ]
      }
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    handleClick(e) {
      // console.log(e.name, 7777)
      this.activeInnerName = '第1輪'
      // this.ruleForm.ruleList.map(el=>{
      //   if(el.name===e.name){
      //     el.round.map(i=>{

      //     })
      //   }
      // })
    },
    handleInnerClick() {},
    setAdd() {
      this.ruleForm.ruleList.push({
        date: this.ruleForm.ruleList.length + 1,
        name: `第${this.ruleForm.ruleList.length + 1}期`,
        round: [
          {
            round: 1,
            name: `第1輪`,
            main: '',
            details: [
              {
                no: '碎片1',
                img: '',
                p: '',
                open: ''
              },
              {
                no: '碎片2',
                img: '',
                p: '',
                open: ''
              },
              {
                no: '碎片3',
                img: '',
                p: '',
                open: ''
              },
              {
                no: '碎片4',
                img: '',
                p: '',
                open: ''
              },
              {
                no: '碎片5',
                img: '',
                p: '',
                open: ''
              }
            ]
          }
        ]
      })
    },
    setAddInner(index) {
      this.ruleForm.ruleList[index].round.push({
        round: this.ruleForm.ruleList[index].round.length + 1,
        name: `第${this.ruleForm.ruleList[index].round.length + 1}輪`,
        main: '',
        state: 1,
        details: [
          {
            no: '碎片1',
            img: '',
            p: '',
            state: 1,
            open: ''
          },
          {
            no: '碎片2',
            img: '',
            p: '',
            state: 1,
            open: ''
          },
          {
            no: '碎片3',
            img: '',
            p: '',
            state: 1,
            open: ''
          },
          {
            no: '碎片4',
            img: '',
            p: '',
            state: 1,
            open: ''
          },
          {
            no: '碎片5',
            img: '',
            p: '',
            state: 1,
            open: ''
          }
        ]
      })
    },
    tabRemove(e) {
      this.ruleForm.ruleList = this.ruleForm.ruleList.filter(el => el.name !== e)
      this.ruleForm.ruleList.forEach((el, index) => {
        el.name = `第${index + 1}期`
        el.date = index + 1
        el.round.forEach((e, i) => {
          e.name = `第${i + 1}輪`
          e.round = i + 1
        })
      })
    },
    tabInnerRemove(e, a) {
      this.ruleForm.ruleList[e].round = this.ruleForm.ruleList[e].round.filter(item => item.name !== a)
      this.ruleForm.ruleList[e].round.forEach((el, index) => {
        el.name = `第${index + 1}輪`
        el.round = index + 1
      })
    },
    submitForm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) {
          return elMessage(this, '請按要求填寫！')
        }
        await apeWorldSet(this.ruleForm.ruleList)
        elMessage(this, '操作成功！', 'success')
        this.$emit('getData')
        this.handleClose()
      })
    }
  }
}
</script>
<style lang='scss'  scoped>
.tabs-con{
  position: relative;
  .right-btn{
    position: absolute;
    right: 10px;
    top: 1px;
  }
}
.tabs-con-inner{
  position: relative;
  .right-btn-inner{
    position: absolute;
    right: 10px;
    top: 1px;
  }
}
</style>
