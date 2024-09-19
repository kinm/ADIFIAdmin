<template>
  <div :id="id" ref="echart" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as $echarts from 'echarts'
export default {
  props: {
    option: {
      type: Object,
      default: function() {
        return {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }]
        }
      }
    },
    className: {
      type: String,
      default: 'my-echarts'
    },
    id: {
      type: String,
      default: 'my-echart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      echarts: null
    }
  },
  watch: {
    option: {
      // immediate:true,
      handler: function(val) {
        this.init()
      }
    }
  },
  mounted() {
    this.init()
    const _this = this
    window.addEventListener('resize', function(event) { // 改变窗口大小，echarts图表响应式改变
      _this.echarts.resize()
    })
  },
  methods: {
    resize() {
      console.log('sss')
      this.echarts.resize()
    },
    init() {
      // console.log(this.$echarts)
      if (this.echarts) {
        this.echarts.dispose()
      }
      this.echarts = $echarts.init(this.$refs.echart)
      this.echarts.setOption(this.option)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
