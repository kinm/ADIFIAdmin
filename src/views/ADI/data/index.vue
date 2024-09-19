<template>
  <div>
    <el-row :gutter="40">
      <el-col :span="10" :offset="2">
        <el-card class="box-card">
          <div slot="header" class="clearfix title">
            <span class="title-lh">用戶統計</span>
            <div style="float: right; padding: 6px 0">
              <el-select v-model="value1" size="mini" placeholder="請選擇" @change="getData1">
                <el-option v-for="item in time_enum" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
          <el-descriptions style="margin-top:40px;" :colon="false" direction="vertical" :column="1">
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px','color': '#C37454'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="總計">{{ form1.total_count }}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions style="margin-top:40px;" :colon="false" direction="vertical" :column="2">
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px','color': '#C37454'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="新增">{{ form1.new_count }}</el-descriptions-item>
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px','color': '#C37454'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="封號">{{ form1.close_count }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix title">
            <span class="title-lh">提現統計</span>
            <div style="float: right; padding: 6px 0">
              <el-date-picker
                v-model="value2"
                size="mini"
                style="width:370px"
                type="datetimerange"
                value-format="timestamp"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                @change="getData2"
              />
            </div>
          </div>
          <el-descriptions style="margin-top:80px;margin-bottom:80px;" :colon="false" direction="vertical" :column="2">
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px','color': '#C37454'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="質押">{{ form2.pledge_count }}</el-descriptions-item>
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px','color': '#C37454'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="社區">{{ form2.community_count }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="40" style="margin-top:40px">
      <el-col :span="10" :offset="2">
        <el-card class="box-card">
          <div slot="header" class="clearfix title">
            <span class="title-lh">質押統計</span>
            <div style="float: right; padding: 6px 0">
              <el-select v-model="value3" size="mini" placeholder="請選擇" @change="getData3">
                <el-option v-for="item in time_enum" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
          <el-descriptions style="margin-top:40px;" :colon="false" direction="vertical" :column="1">
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px','color': '#C37454'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="新增">
              <template slot="label">
                新增
                <el-popover v-if="form3.new_stat.price_stat.length" placement="bottom-start" trigger="hover">
                  <div class="ico-form8">
                    <div v-for="(item,index) in form3.new_stat.price_stat" :key="`form3.new_stat${index}`" class="ico-form8-item">
                      <div class="label">{{ item.label }}：</div>
                      <div class="value">{{ item.value }}</div>
                    </div>
                  </div>
                  <i slot="reference" class="el-icon-warning" />
                </el-popover>
              </template>
              {{ form3.new_stat.total_price }}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions style="margin-top:40px;" :colon="false" direction="vertical" :column="2">
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px','color': '#C37454'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="質押收益發放">{{ form3.income_grant.pledge_income }}</el-descriptions-item>
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px','color': '#C37454'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="社區收益發放">{{ form3.income_grant.community_income }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix title">
            <span class="title-lh">私募統計</span>
            <div style="float: right; padding: 6px 0">
              <el-select v-model="value4" size="mini" placeholder="請選擇" @change="getData4">
                <el-option v-for="item in time_enum" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
          <el-descriptions style="margin-top:40px;" :colon="false" direction="vertical" :column="1">
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px','color': '#C37454'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="參與總量">{{ form4.total_count }}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions style="margin-top:40px;" :colon="false" direction="vertical" :column="2">
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px','color': '#C37454'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="領取">{{ form4.receive_count }}</el-descriptions-item>
            <el-descriptions-item :content-style="{'text-align': 'center','font-size': '20px','color': '#C37454'}" :label-style="{'text-align': 'center','font-size': '15px'}" label="獎勵">{{ form4.reward_count }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { indexStat, indexEnums } from '@/api/adi'
export default {
  name: 'ADIData', // 数据统计
  data() {
    return {
      form1: {
        close_count: 0,
        new_count: 0,
        total_count: 0
      },
      value1: 1,
      value2: [new Date(new Date().setHours(0, 0, 0, 0)), new Date().getTime()],
      value3: 1,
      value4: 1,
      time_enum: [],
      form2: {
        community_count: 0,
        pledge_count: 0
      },
      form3: {
        income_grant: {
          pledge_income: 0,
          community_income: 0
        },
        new_stat: {
          price_stat: [],
          total_price: 0
        }
      },
      form4: {
        receive_count: 0,
        reward_count: 0,
        total_count: 0
      }

    }
  },
  computed: {
  },
  created() {
    this.getData()
    this.getEnums()
  },
  methods: {
    async getEnums() {
      const { data } = await indexEnums()
      this.time_enum = data.time_type
    },
    async getData() {
      const { data } = await indexStat({ type: 0, start: this.value2[0] / 1000, end: this.value2[1] / 1000 })
      if (data.user_stat.total_count) {
        this.form1 = data.user_stat
        this.form2 = data.withdraw_stat
        this.form3 = data.pledge_stat
        this.form4 = data.ipo_stat
      }
    },
    async getData1() {
      const { data } = await indexStat({ type: 1, time_type: this.value1 })
      if (data.user_stat.total_count) {
        this.form1 = data.user_stat
      }
    },
    async getData2() {
      const { data } = await indexStat({ type: 3, start: this.value2[0] / 1000, end: this.value2[1] / 1000 })
      if (data.withdraw_stat) {
        this.form2 = data.withdraw_stat
      }
    },
    async getData3() {
      const { data } = await indexStat({ type: 2, time_type: this.value3 })
      if (data.pledge_stat) {
        this.form3 = data.pledge_stat
      }
    },
    async getData4() {
      const { data } = await indexStat({ type: 4, time_type: this.value4 })
      if (data.ipo_stat) {
        this.form4 = data.ipo_stat
      }
    }
  }
}
</script>
<style lang='scss'  scoped>
::v-deep .el-card__header{
  padding: 10px 20px;
}
.title-lh{
  line-height: 40px;
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
</style>
