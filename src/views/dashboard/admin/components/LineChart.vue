<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { formatTime_monthlist } from '@/utils/fortime'
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      timelist: []
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        console.log(val)
        this.setOptions(val)
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  created() {
    this.handleTime()
    // this.queryThcTradeBusinessSumMonth()
  },
  methods: {
    // 在开始时候获取到本机时间，根据本机目前的时间往前推一年
    handleTime() {
      var time = formatTime_monthlist(new Date())
      this.timelist = time
      // console.log(time, '时间')
    },

    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    // { expectedData, actualData } = {}
    setOptions() {
      var that = this
      this.chart.setOption({
        title: {
          show: true,
          text: that.chartData.title,
          x: 'center', // 水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          y: 'top' // 垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
        },
        xAxis: {
          data: that.timelist,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        // tooltip: {
        //   trigger: 'axis',
        //   axisPointer: {
        //     type: 'cross'
        //   },
        //   padding: [5, 10]
        // },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          show: false
          // data: ['期望值', '实际值']
          // data: ['实际值']
        },
        series: [
          // {
          //   name: '期望值', itemStyle: {
          //     normal: {
          //       color: '#FF005A',
          //       lineStyle: {
          //         color: '#FF005A',
          //         width: 2
          //       }
          //     }
          //   },
          //   smooth: true,
          //   type: 'line',
          //   data: that.chartData.expectedData,
          //   animationDuration: 2800,
          //   animationEasing: 'cubicInOut'
          // },
          {
            name: '实际值',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#3888fa',
                lineStyle: {
                  color: '#3888fa',
                  width: 2
                },
                areaStyle: {
                  color: '#f3f8ff'
                }
              }
            },
            data: that.chartData.actualData,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }
        ]
      })
    }
  }
}
</script>
