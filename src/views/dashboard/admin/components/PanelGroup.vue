<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('monthMember')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            总会员数
          </div>
          <count-to :start-val="0" :end-val="Number(MemberTotal)" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('monthTrade')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            订单总数
          </div>
          <count-to :start-val="0" :end-val="Number(TotalOrders)" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('monthIncome')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            支付总额
          </div>
          ￥<count-to :start-val="0" :end-val="Number(ordermoney)" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('monthGoods')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            商品上架总数
          </div>
          <count-to :start-val="0" :end-val="Number(goodnum)" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

import {
  queryMember
} from '@/api/member'
import {
  queryThcTrade,
  queryThcTradeSumTotalPrice
  // QueryThcTradeSumMonth, QueryThcTradePriceSumMonth, QueryMemberSumMonth, QueryGoodsSumMonth
} from '@/api/trade'
import {
  queryTabGoods
} from '@/api/goods'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      MemberTotal: 0,
      TotalOrders: 0,
      ordermoney: 0,
      goodnum: 0
    }
  },
  created() {
    this.queryMemberTotal()
    this.queryThcTrade()
    this.queryThcTradeSumTotalPrice()
    this.queryTabGoods()
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    // 查询总收入
    queryThcTradeSumTotalPrice() {
      const params = {}
      queryThcTradeSumTotalPrice(params).then(res => {
        if (res.data.success) {
          this.ordermoney = JSON.parse(res.data.data).Records[0].SumTotalPrice
        }
      })
    },
    // 该函数用于查询会员总数
    queryMemberTotal() {
      const params = {}
      queryMember(params).then(res => {
        if (res.data.success) {
          this.MemberTotal = JSON.parse(res.data.data).TotalSize * 1
        }
      })
    },

    // 该函数用来查询商户的订单总数
    queryThcTrade() {
      const params = {}
      queryThcTrade(params).then(res => {
        if (res.data.success) {
          this.TotalOrders = JSON.parse(res.data.data).TotalSize * 1
          console.log(JSON.parse(res.data.data))
          // this.ordermoney = JSON.parse(res.data.data).Records.reduce(function(totals, currentValue) { totals += currentValue.TradePrice * 1; return totals }, 0)
        } else {
          console.log('请求失败')
        }
      })
    },
    // 该函数用来查询商品总数
    queryTabGoods() {
      const params = {}
      queryTabGoods(params).then(res => {
        if (res.data.success) {
          this.goodnum = JSON.parse(res.data.data).TotalSize * 1
        } else {
          console.log('请求失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
