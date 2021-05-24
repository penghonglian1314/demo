<template>
  <el-container class="container">
    <el-tabs v-model="activeName" class="tabs">
      <el-tab-pane label="订单详情" name="first" class="info">
        <el-row>
          <el-col :span="4">
            交易单号
          </el-col>
          <el-col :span="18">
            {{ query.TradeCode }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            交易时间
          </el-col>
          <el-col :span="18">
            {{ query.TradeTime }}
          </el-col>
        </el-row><el-row>
          <el-col :span="4">
            用户ID
          </el-col>
          <el-col :span="18">
            {{ query.MemberID }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            当前状态
          </el-col>
          <el-col :span="18">
            {{ TypeMap[query.Status] }}
          </el-col>
        </el-row><el-row>
          <el-col :span="4">
            交易总价
          </el-col>
          <el-col :span="18">
            {{ query.TotalPrice }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            优惠后总价
          </el-col>
          <el-col :span="18">
            {{ query.TradePrice }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            备注
          </el-col>
          <el-col :span="18">
            {{ query.Remarks }}
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="商品详情" name="second">
        <el-table
          :header-cell-style="{ background: 'rgba(249,250,252,1)' }"
          border
          :data="tableList"
          style="width: 100%"
        >
          <el-table-column prop="FhumbnailFileID" label="封面图片" width="180" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.FhumbnailFileID === ''" />
              <img
                v-else
                :src="scope.row.FhumbnailFileID"
                width="100%"
                style="cursor: pointer;"
                alt=""
              >
            </template>
          </el-table-column>
          <el-table-column prop="ShowTitle" label="商品名称" align="center" />
          <!-- <el-table-column prop="ItemType" label="商品分类" width="150" align="center" /> -->
          <el-table-column prop="Price" label="售价" width="180" align="center" />
          <el-table-column prop="Amount" label="购买数量" width="180" align="center" />
          <!-- 计价类型，0:基本价格,1: 规格计价, 3:竞价模式 -->
          <!-- <el-table-column prop="ChargeType" label="计价类型" width="100" align="center">
            <template slot-scope="scope">
              <span>{{ ChargeTypeMap[scope.row.ChargeType] }}</span>
            </template>
          </el-table-column> -->

          <!-- <el-table-column prop="Weigth" label="重量(吨)" width="100" align="center" /> -->
          <!-- <el-table-column prop="Profiles" label="简介" width="300" align="center" /> -->
          <el-table-column align="center" width="240" label="操作">
            <template slot-scope="scope">
              <!-- <el-button style="color:blue;" size="mini" type="text" class="btnt" @click="toGiftDialog(scope.row)">
                赠品详情
              </el-button> -->
              <el-button style="color:red;" size="mini" type="text" class="btnt" @click="detailGood(scope.row)">
                详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane> <el-tab-pane label="收货人详情" name="third" class="info">
        <el-row>
          <el-col :span="4">
            用户ID
          </el-col>
          <el-col :span="18">
            {{ query.MemberID }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            用户名
          </el-col>
          <el-col :span="18">
            {{ query.Name }}
          </el-col>
        </el-row><el-row>
          <el-col :span="4">
            手机号码
          </el-col>
          <el-col :span="18">
            {{ query.Phone }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            所在省市
          </el-col>
          <el-col :span="18">
            {{ query.Region }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            详细地址
          </el-col>
          <el-col :span="18">
            {{ query.Detailnews }}
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script>
import { queryThcTradeAndGoods } from '@/api/trade'

export default {
  data() {
    return {
      activeName: 'first',
      TypeMap: {
        '0': '待付款',
        '1': '已支付(待发货)',
        '2': '已发货(待收货)',
        '3': '已收货',
        '9': '已完成'
      },
      ChargeTypeMap: { '0': '基本价格', '1': '规格计价', '3': '竞价模式' },
      tableList: []
    }
  },
  computed: {
    query() {
      return this.$route.query
    }
  },
  created() {
    console.log(this.query)
    this.queryThcTradeAndGoods()
  },
  methods: {
    toGiftDialog(row) {
      this.$router.push({ path: '/trade/trade_gift', query: row })
    },
    // queryThcTradeAndGoods() {
    //   const queryForm = {}
    //   queryForm.TradeCode = this.query.TradeCode
    //   queryThcTradeAndGoods(queryForm).then(response => {
    //     if (JSON.parse(response.data.data).RowCnt) {
    //       const t = JSON.parse(response.data.data).Records

    //       console.log(this.tableList, 'tableList')
    //     }
    //   })
    // }
    async queryThcTradeAndGoods() {
      const queryForm = {}
      queryForm.TradeCode = this.query.TradeCode
      // queryForm.ShopID = window.localStorage.getItem('ShopID')
      // console.log(queryForm)
      // const t = JSON.parse((await queryThcTradeAndGoods(queryForm)).data.data).Records.map(e => e.GoodsID)
      // console.log(t)
      // t.map(async e => {
      //   console.log(e, 'e')
      //   const r = await queryTabGoods({ GoodsID: e })
      //   console.log(r, 'r')
      //   if (JSON.parse(r.data.data).RowCnt * 1 === 1) { this.tableList.push(JSON.parse(r.data.data).Records[0]) }
      //   return 0
      // })
      this.tableList = JSON.parse((await queryThcTradeAndGoods(queryForm)).data.data).Records
      console.log(this.tableList)
    },
    detailGood(row) {
      // const up = { }
      // up.GoodsID = row.GoodsID
      // /business/todetails_shop.html /goods/details_goods.html
      this.$router.push({ path: '/goods/todetails_goods.html', query: { GoodsID: row.GoodsID }})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/container.scss';
.container {
  padding: 40px 50px;
  .tabs {
    width: 100%;
    .info {
      .el-row {
        padding: 10px;
        border-bottom:1px solid rgb(194, 182, 182);
        .el-col {
          padding: 5px;
          color: rgb(66, 65, 65);
          font-size: 14px;
        }
      }
    }
  }
}
.btnt{
  font-size: 12px;
}
</style>
