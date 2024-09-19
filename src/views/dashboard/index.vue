<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix title">
        <span class="title-lh">數據概覽</span>
        <div style="float: right; padding: 6px 0">
          <el-select v-model="value1" size="mini" placeholder="請選擇" @change="getData1">
            <el-option v-for="item in time_enum" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="grid-content1 ">
            <div class="content-title">總用戶數</div>
            <div class="content-num">{{ form1.user_count }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content2 ">
            <div class="content-title">參與人數</div>
            <div class="content-num">{{ form1.order_count }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content3 ">
            <div class="content-title">總參與數（APE）</div>
            <div class="content-num">{{ form1.order_ape }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content4 ">
            <div class="content-title">發放收益（APE）</div>
            <div class="content-num">{{ form1.total_income }}</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="20">
      <el-col :span="10">
        <el-card class="box-card" style="margin-top:20px;">
          <div slot="header" class="clearfix title">
            <span class="title-lh">總餘額</span>
            <div style="float: right; padding: 6px 0">
              <el-date-picker
                v-model="value10"
                size="mini"
                type="date"
                value-format="timestamp"
                placeholder="選擇日期"
                @change="getData10"
              />
            </div>
          </div>
          <BaseEchart ref="line10" :option="option10" height="237px" />
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card class="box-card" style="margin-top:20px;">
          <div slot="header" class="clearfix title">
            <span class="title-lh">資金統計</span>
            <div style="float: right; padding: 6px 0">
              <el-date-picker
                v-model="value11"
                size="mini"
                style="width:370px"
                type="datetimerange"
                value-format="timestamp"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                @change="getData11"
              />
            </div>
          </div>
          <el-descriptions style="margin-top:40px;" :colon="false" direction="vertical" :column="1">
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px','color': '#C37454'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="總充值">{{ form11.total_charge }}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions style="margin-top:40px;" :colon="false" direction="vertical" :column="2">
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px','color': '#C37454'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="實際提現">{{ form11.withdraw }}</el-descriptions-item>
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px','color': '#C37454'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="提現手續費">{{ form11.withdraw_rate }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:20px;">
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix title">
            <span class="title-lh">靜態收益（APE）</span>
            <div style="float: right; padding: 6px 0">
              <el-select v-model="value2" size="mini" placeholder="請選擇" @change="getData2">
                <el-option v-for="item in time_enum" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
          <div class="setbalance">
            <div>
              <el-button v-setButtonPower="'dashboard-set-balance'" style="padding:0" type="text" @click="setCollect('balance')">修改餘量池</el-button>
            </div>
            <div>
              <el-button v-setButtonPower="'dashboard-set-spare'" style="padding:0" type="text" @click="setCollect('spare')">修改備用池</el-button>
            </div>
          </div>
          <el-descriptions style="margin-top:40px;" :colon="false" direction="vertical" :column="1">
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px','color': '#C37454'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="當前獎金池">{{ form2.cur_balance }}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions style="margin-top:40px;" :colon="false" direction="vertical" :column="11">
            <el-descriptions-item :span="3" :content-style="{'text-align': 'center','font-size': '20px','color': '#C37454'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="累計注入">{{ form2.acc }}</el-descriptions-item>
            <el-descriptions-item :span="5" :content-style="{'text-align': 'center','font-size': '20px','color': '#C37454'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="餘量池">{{ form2.left }}</el-descriptions-item>
            <el-descriptions-item :span="3" :content-style="{'text-align': 'center','font-size': '20px','color': '#C37454'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="累計發放">{{ form2.distribute }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card class="box-card">
          <div slot="header" class="clearfix title">
            <span class="title-lh">發放收益總和</span>
            <div style="float: right; padding: 6px 0">
              <el-date-picker
                v-model="value3"
                size="mini"
                type="date"
                value-format="timestamp"
                placeholder="選擇日期"
                @change="getData3"
              />
            </div>
          </div>
          <BaseEchart ref="line" :option="option" height="253px" />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:20px;">
      <el-col :span="13">
        <el-card class="box-card">
          <div slot="header" class="clearfix title">
            <span class="title-lh">動態收益（APE）</span>
            <div style="float: right; padding: 6px 0">
              <el-select v-model="value4" size="mini" placeholder="請選擇" @change="getData4">
                <el-option v-for="item in time_enum" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
          <BaseEchart ref="circular" :option="option1" height="225px" />
          <div class="details">
            <el-row :gutter="40">
              <el-col :span="16">
                <el-descriptions :column="1">
                  <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px','color': '#658AE5'}" :label-style="{'text-align': 'center','font-size': '15px','color': '#658AE5','align-items': 'center'}">
                    <template slot="label">
                      <i class="icon-left1" />
                      直推獎勵
                    </template>
                    <span class="num">{{ form4.direct }}</span>
                    <span class="ratio">{{ form4.direct_p }}</span>
                  </el-descriptions-item>
                  <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px','color': '#7E53C5'}" :label-style="{'text-align': 'center','font-size': '15px','color': '#7E53C5'}">
                    <template slot="label">
                      <i class="icon-left2" />
                      團隊獎勵
                    </template>
                    <span class="num">{{ form4.team }}</span>
                    <span class="ratio">{{ form4.team_p }}</span>
                  </el-descriptions-item>
                  <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px','color': '#FC9E1E'}" :label-style="{'text-align': 'center','font-size': '15px','color': '#FC9E1E'}" label="累計發放">
                    <template slot="label">
                      <i class="icon-left3" />
                      層級獎勵
                    </template>
                    <span class="num">{{ form4.level }}</span>
                    <span class="ratio">{{ form4.level_p }}</span>
                  </el-descriptions-item>
                </el-descriptions>
              </el-col>
              <el-col :span="8">
                <el-descriptions style="margin-top: 30px;" :colon="false" direction="vertical" :column="1">
                  <el-descriptions-item :content-style="{'text-align': 'center','font-size': '15px','color': '#8F8F8F'}" :label-style="{'text-align': 'center','font-size': '20px'}" :label="form4.in">累計注入</el-descriptions-item>
                </el-descriptions>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="11">
        <el-card class="box-card">
          <div slot="header" class="clearfix title">
            <span class="title-lh">永動激勵（APE）</span>
            <div style="float: right; padding: 6px 0">
              <el-select v-model="value5" size="mini" placeholder="請選擇" @change="getData5">
                <el-option v-for="item in time_enum" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
          <el-descriptions style="margin-top:47px;" :colon="false" direction="vertical" :column="3">
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="當前獎金池">{{ form5.cur_balance }}</el-descriptions-item>
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="累計注入">{{ form5.acc }}</el-descriptions-item>
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="累計發放">{{ form5.distribute }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
        <el-card class="box-card" style="margin-top:20px;">
          <div slot="header" class="clearfix title">
            <span class="title-lh">永動補償（APE）</span>
            <div style="float: right; padding: 6px 0">
              <el-select v-model="value6" size="mini" placeholder="請選擇" @change="getData6">
                <el-option v-for="item in time_enum" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
          <el-descriptions style="margin-top:47px;" :colon="false" direction="vertical" :column="3">
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="當前獎金池">{{ form6.cur_balance }}</el-descriptions-item>
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="累計注入">{{ form6.acc }}</el-descriptions-item>
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="累計發放">{{ form6.distribute }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:20px;">
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix title">
            <span class="title-lh">賽博猿NFT</span>
            <div style="float: right; padding: 3px 0;height:35px;width:1px;">
              <!-- <el-select v-model="value7" size="mini" placeholder="請選擇" @change="getData7">
                <el-option v-for="item in time_enum" :key="item.value" :label="item.label" :value="item.value" />
              </el-select> -->
            </div>
          </div>
          <el-descriptions style="margin-top:40px;" :colon="false" direction="vertical" :column="3">
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="當前獎金池">{{ form7.cur_balance }}</el-descriptions-item>
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="累計注入">{{ form7.acc }}</el-descriptions-item>
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="累計發放">{{ form7.distribute }}</el-descriptions-item>
          </el-descriptions>
          <div class="count">累計合成：{{ form7.pics }}張</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix title">
            <span class="title-lh">聯盟委員（APE）</span>
            <div style="float: right; padding: 6px 0">
              <el-select v-model="value8" size="mini" placeholder="請選擇" @change="getData8">
                <el-option v-for="item in time_enum" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
          <el-descriptions :colon="false" direction="vertical" :column="1">
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="當前獎金池">{{ form8.cur_balance }}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions :colon="false" direction="vertical" :column="2">
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="累計注入">{{ form8.acc }}</el-descriptions-item>
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="">
              <template slot="label">
                累計發放
                <el-popover placement="top-start" trigger="hover">
                  <div class="ico-form8">
                    <div class="ico-form8-item">
                      <div class="label">創世節點：</div>
                      <div class="value">{{ form8.distribute_node }}</div>
                    </div>
                    <div class="ico-form8-item">
                      <div class="label">聯盟股東：</div>
                      <div class="value">{{ form8.distribute_share }}</div>
                    </div>
                  </div>
                  <i slot="reference" class="el-icon-warning" />
                </el-popover>
              </template>
              {{ form8.distribute }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix title">
            <span class="title-lh">其他</span>
            <div style="float: right; padding: 6px 0">
              <el-select v-model="value9" size="mini" placeholder="請選擇" @change="getData9">
                <el-option v-for="item in time_enum" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
          <el-descriptions :colon="false" direction="vertical" :column="1">
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px'}" :label-style="{'text-align': 'center','font-size': '15px','font-weight': '800'}" label="WEB3基金會（APE）">{{ form9.type8 }}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions :colon="false" direction="vertical" :column="1">
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px'}" :label-style="{'text-align': 'center','font-size': '15px','font-weight': '800'}" label="技術服務（APE）">{{ form9.type7 }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
    <setCollect ref="setCollect" />
  </div>
</template>

<script>
import BaseEchart from '@/components/echarts'
import setCollect from './components/set-collect'
import { indexEnums, indexStat11, indexStat21, indexStat12, indexStat31, indexStat41,
  indexStat42, indexStat22, indexStat51, indexStat52, indexStat61, indexStat62 } from '@/api/dashboard.js'
export default {
  name: '',
  components: { BaseEchart, setCollect },
  data() {
    return {
      value0: 1,
      value1: 1,
      value2: 1,
      value3: new Date().getTime(),
      value4: 1,
      value5: 1,
      value6: 1,
      value7: 1,
      value8: 1,
      value9: 1,
      value10: new Date().getTime(),
      value11: [new Date(new Date().setHours(0, 0, 0, 0)), new Date().getTime()],
      time_enum: [],
      form1: {},
      form2: {},
      form3: {},
      form4: {},
      form5: {},
      form6: {},
      form7: {},
      form8: {},
      form9: {},
      form10: {},
      option: {},
      option1: {},
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      option10: {},
      form11: {}
    }
  },
  computed: {
  },
  created() {
    this.getEnum()
    this.getData1()
    this.getData2()
    this.getData3()
    this.getData4()
    this.getData5()
    this.getData6()
    this.getData7()
    this.getData8()
    this.getData9()
    this.getData10()
    this.getData11(this.value11)
  },
  methods: {
    async getEnum() {
      const { data } = await indexEnums()
      this.time_enum = data.time_type
    },
    async getData1() { // 數據概覽
      const { data } = await indexStat11({ time_type: this.value1 })
      this.form1 = data
    },
    async getData2() { // 靜態收益
      const { data } = await indexStat21({ time_type: this.value2 })
      this.form2 = data
    },
    async getData3() { // 發放收益總和
      const { data } = await indexStat12({ time_type: parseInt(this.value3 / 1000) })
      this.option = {
        color: ['#7E77DA', '#8FCECF', '#DA77D4', '#CF958F', '#77DACD', '#CFC98F'],
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          left: '70px',
          right: '70px',
          top: '30px',
          bottom: '30px'
        },
        legend: {
          show: true
        },
        xAxis: {
          type: 'category',
          data: data.dates
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: data.data[1],
            name: '靜態收益',
            type: 'line',
            smooth: true
          },
          {
            data: data.data[2],
            name: '動態收益',
            type: 'line',
            smooth: true
          },
          {
            data: data.data[3],
            name: '永動激勵',
            type: 'line',
            smooth: true
          },
          {
            data: data.data[4],
            name: '永動補償',
            type: 'line',
            smooth: true
          },
          {
            data: data.data[5],
            name: '聯盟委員',
            type: 'line',
            smooth: true
          },
          {
            data: data.data[6],
            name: '賽博猿NFT',
            type: 'line',
            smooth: true
          }
        ]
      }
    },
    async getData4() { // 動態收益
      const { data } = await indexStat31({ time_type: this.value4 })
      this.form4 = data
      this.option1 = {
        color: ['#658AE5', '#7E53C5', '#FC9E1E'],
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          show: false,
          left: 'center'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['70%', '90%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: [
              { value: data.direct, name: '直推獎勵' },
              { value: data.team, name: '團隊獎勵' },
              { value: data.level, name: '層級獎勵' }
            ]
          }
        ],
        graphic: [
          { // 环形图中間添加文字
            type: 'text', // 通过不同top值可以设置上下显示
            left: 'center',
            top: '50%',
            style: {
              text: data.out,
              textAlign: 'center',
              fill: '#47301F', // 文字的颜色
              width: 200,
              height: 30,
              fontSize: 16,
              fontFamily: 'Microsoft YaHei'
            }
          },
          { // 环形图中間添加文字
            type: 'text', // 通过不同top值可以设置上下显示
            left: 'center',
            top: '40%',
            style: {
              text: '累計發放',
              textAlign: 'center',
              fill: '#8F8F8F', // 文字的颜色
              width: 200,
              height: 30,
              fontSize: 16,
              fontFamily: 'Microsoft YaHei'
            }
          }
        ]
      }
    },
    async getData5() { // 永動激勵
      const { data } = await indexStat41({ time_type: this.value5 })
      this.form5 = data
    },
    async getData6() { // 永動激勵
      const { data } = await indexStat42({ time_type: this.value6 })
      this.form6 = data
    },
    async getData7() { // 賽博園NFT
      const { data } = await indexStat22({ time_type: this.value7 })
      this.form7 = data
    },
    async getData8() { // 聯盟委員
      const { data } = await indexStat51({ time_type: this.value8 })
      this.form8 = data
    },
    async getData9() { // 技術服務
      const { data } = await indexStat52({ time_type: this.value9 })
      this.form9 = data
    },
    async getData10() {
      const { data } = await indexStat61({ time: parseInt(this.value10 / 1000) })
      this.option10 = {
        color: ['#147EDB'],
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          left: '70px',
          right: '70px',
          top: '30px',
          bottom: '30px'
        },
        legend: {
          show: false
        },
        xAxis: {
          type: 'category',
          data: data.dates
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: data.date,
            name: '總餘額',
            type: 'line',
            smooth: true
          }
        ]
      }
    },
    async getData11(e) {
      const params = {}
      if (e) {
        params.start = parseInt(e[0] / 1000)
        params.end = parseInt(e[1] / 1000)
      } else {
        params.start = ''
        params.end = ''
      }
      const { data } = await indexStat62(params)
      this.form11 = data
    },
    setCollect(type) {
      this.$refs.setCollect.mode = type
      this.$refs.setCollect.getData()
      this.$refs.setCollect.dialogFormVisible = true
    }
  }
}
</script>
<style lang='scss'  scoped>
::v-deep .el-card__header{
  padding: 18px 20px 0;
}
.grid-content1 {
    border-radius: 4px;
    height: 180px;
    width: 100%;
    background-image: url('~@/assets/common/dashboard1.png');
    background-size:100% 100%;
    padding:26px 30px;
    color: #C37454;
  }
.grid-content2 {
    border-radius: 4px;
    height: 180px;
    width: 100%;
    background-image: url('~@/assets/common/dashboard2.png');
    background-size:100% 100%;
    padding:26px 30px;
    color: #428876;
  }
.grid-content3 {
    border-radius: 4px;
    height: 180px;
    width: 100%;
    background-image: url('~@/assets/common/dashboard3.png');
    background-size:100% 100%;
    padding:26px 30px;
    color: #B49653;
  }
.grid-content4 {
    border-radius: 4px;
    height: 180px;
    width: 100%;
    background-image: url('~@/assets/common/dashboard4.png');
    background-size:100% 100%;
    padding:26px 30px;
    color: #7064AA;
  }
  ::v-deep .my-label{
    text-align: center;
  }
  ::v-deep .my-content{
    text-align: center;
  }
  .details{
    display: flex;
    justify-content: center;
    padding: 0 30px;
    ::v-deep .el-descriptions-item__container{
      align-items: center;
    }
  }
  .icon-left1{
    width: 11px;
    height: 11px;
    margin-right: 5px;
    background-color: #658AE5;
  }
  .icon-left2{
    width: 11px;
    height: 11px;
    margin-right: 5px;
    background-color: #7E53C5;
  }
  .icon-left3{
    width: 11px;
    height: 11px;
    margin-right: 5px;
    background-color: #FC9E1E;
  }
  .ratio{
    margin-left: 40px;
  }
  .count{
    margin-top: 20px;
    text-align: center;
    font-size: 15px;
    color: #23102F;
  }
  .content-title{
    font-size: 13px;
  }
  .content-num{
    margin-top: 25px;
    font-size: 20px;
    font-weight: 800;
  }
  ::v-deep .el-select{
    width: 100px;
  }
  ::v-deep .el-date-editor{
    width: 150px;
  }
  ::v-deep .el-icon-warning{
    color: red;
  }
  .ico-form8{
    .ico-form8-item{
      display: flex;
      align-items: baseline;
      .label{
        font-size: 15px
      }
      .value{
        font-size: 20px;
      }
    }
  }
  .title-lh{
    line-height: 40px;
  }
  ::v-deep .el-card__header{
    padding-top: 0;
  }
  .setbalance{
    height: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
