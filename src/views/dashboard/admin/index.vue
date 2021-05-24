<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <!-- <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row> -->

    <!-- <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
// import RaddarChart from './components/RaddarChart'
// import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList/index'
// import BoxCard from './components/BoxCard'

const lineChartData = {
  monthMember: {
    // expectedData: [],
    actualData: [],
    title: '月新增用户数'
  },
  monthTrade: {
    // expectedData: [],
    actualData: [],
    title: '月新增订单数'
  },
  monthIncome: {
    // expectedData: [],
    actualData: [],
    title: '月总收入数'
  },
  monthGoods: {
    // expectedData: [],
    actualData: [],
    title: '月新增商品数'
  }
}
import { formatTime_monthlist_number } from '@/utils/fortime'
import {
  QueryThcTradeSumMonth, QueryThcTradePriceSumMonth, QueryMemberSumMonth, QueryGoodsSumMonth
} from '@/api/trade'

const Type2Fn = {
  monthMember: QueryMemberSumMonth,
  monthTrade: QueryThcTradeSumMonth,
  monthIncome: QueryThcTradePriceSumMonth,
  monthGoods: QueryGoodsSumMonth
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart
    // RaddarChart,
    // PieChart,
    // BarChart,
    // TransactionTable,
    // TodoList,
    // BoxCard
  },
  data() {
    return {
      lineChartData: {},
      timelist: [],
      timeRange: {
        StartTime: '',
        EndTime: ''
      }
    }
  },
  created() {
    // Object.values(lineChartData).map(v => Object.values(v).map(e => { e.push(...[...Array(12)].fill(0, 0, 12)) }))
    Object.values(lineChartData).map(v => v['actualData'].push(...[...Array(12)].fill(0, 0, 12)))
    // console.log(lineChartData)
    this.handleTime()
    this.querySumMonthByType('monthMember')
  },
  methods: {
    handleTime() {
      this.timelist = formatTime_monthlist_number(new Date()) // time
      const i = this.timelist.length - 1
      this.timeRange.StartTime = this.timelist[0] + '01000000'
      this.timeRange.EndTime = this.timelist[i] + '31235999'
      // this.timeRange.StartTime = this.timelist[0] + '01000000'
      // this.timeRange.EndTime = this.timelist[11] + '31235999'
    },

    handleSetLineChartData(type) {
      this.querySumMonthByType(type)
    },
    querySumMonthByType(type) {
      Type2Fn[type](this.timeRange).then(res => {
        if (res.data.success) {
          if (JSON.parse(res.data.data).Records) {
            var result = JSON.parse(res.data.data).Records
            for (let i = 0; i < result.length; i++) {
              var up = this.timelist.indexOf(result[i].Month)
              lineChartData[type].actualData[up] = result[i].Num * 1
              this.lineChartData = lineChartData[type]
            }
          } else {
            this.$message.error('没有查询到' + type + '记录')
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
