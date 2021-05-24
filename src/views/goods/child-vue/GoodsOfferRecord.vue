<template>
  <!-- useful 竞价进入 -->
  <el-container>
    <el-header class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item>竞价管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>

    <el-main class="main">

      <div class="query_form_btn">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="submit()">确定</el-button>
      </div>

      <div class="table">
        <el-table
          ref="Table"
          :header-cell-style="{ background: 'rgba(249,250,252,1)' }"
          border
          :data="tableList"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @current-change="chooseMcaterialChange"
        >
          <el-table-column prop="OfferID" label="竞价ID" width="75" align="center" />
          <!-- <el-table-column prop="ShowTitle" label="商品名称" width="100" align="center" /> -->
          <el-table-column prop="BusinessName" label="商家名称" width="110" align="center" />
          <el-table-column prop="MemberName" label="操作员名称" width="100" align="center" />
          <el-table-column prop="Tel" label="联系电话" width="150" align="center" />
          <el-table-column prop="OfferPrice" label="出价" width="110" align="center" />
          <el-table-column prop="OfferTime" label="出价时间" width="110" align="center" />
          <el-table-column prop="TradeID" label="订单" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.TradeID === '0'">未选择</span>
              <span v-if="scope.row.TradeID !== '0'">{{ scope.row.TradeID+ '号订单' }}</span>
            </template>
          </el-table-column>
          <el-table-column type="selection" />
        </el-table>
      </div>

      <div class="page">
        <el-pagination
          :page-sizes="[10, 20, 30, 50]"
          :page-size="queryForm.limit"
          :total="queryForm.TotalSize"
          :current-page="queryForm.current"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import {
  queryTabGoods,
  queryTabGoodsOfferRecord,
  updateTabGoods
} from '@/api/goods'
import {
  formatTimes
} from '@/utils/fortime'
import {
  addThcTrade,
  addThcTradeGoods,
  queryThcTrade,
  updateThcTrade
} from '@/api/trade'
// eslint-disable-next-line no-unused-vars
import { config } from '@vue/test-utils'
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['parsemsg'],
  data() {
    return {
      currentTradeID: '',
      addForm: {},
      thcTradeList: {},
      tableList: [],
      goodstableList: {},
      tableThcTradeList: {},
      addFormGoods: {},
      queryForm: {
        current: 1,
        limit: 10,
        TotalSize: 0,
        total: 0
      },
      value: '',
      TradeIDadd: ''
    }
  },
  created() {
    // console.log(this.parsemsg, 'parsemsg')
    this.queryTabGoodsOfferRecord()
  },
  methods: {
    submit() {
      this.queryTabGoods()
    },
    queryTabGoods() {
      const queryParams = {}
      queryParams.GoodsID = this.parsemsg.GoodsID
      queryTabGoods(queryParams).then(response => {
        if (JSON.parse(response.data.data).RowCnt) {
          this.goodstableList = JSON.parse(response.data.data).Records[0]
        }
        if (this.goodstableList.OfferID === '0' && this.goodstableList.TradeID === '0') {
          // console.log('添加 ')
          // console.log(this.goodstableList.OfferID, 'this.goodstableList.OfferID')
          // console.log(this.goodstableList.TradeID, 'this.goodstableList.TradeID')
          // 在 thc_trade 表里生成订单 表里的TradeID与竞价ID：OfferID 添加至 goods表里
          this.addThcTrade()
        } else {
          // console.log('修改')
          // console.log(this.goodstableList.OfferID, 'this.goodstableList.OfferID')
          // console.log(this.goodstableList.TradeID, 'this.goodstableList.TradeID')
          this.updateThcTrade()
        }
      })
    },
    updateThcTrade() { // 修改订单
      const params = {}
      params.TradeID = this.goodstableList.TradeID
      params.GoodsID = this.parsemsg.GoodsID
      // eslint-disable-next-line no-irregular-whitespace
      var date = formatTimes(new Date())
      params.TradeTime = date
      params.TradePrice = this.thcTradeList.OfferPrice
      params.TotalPrice = this.thcTradeList.OfferPrice
      updateThcTrade(params).then((res) => {
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.updateGoods()
        } else {
          this.$message({
            type: 'error',
            message: '修改失败'
          })
        }
      })
    },
    addThcTradeGoods() { // 生成订单_商品详情
      this.addFormGoods.TradeID = this.TradeIDadd
      this.addFormGoods.GoodsID = this.parsemsg.GoodsID
      addThcTradeGoods(this.addFormGoods).then(response => {
        if (response.data.success) {
          this.$message({ message: '添加成功', type: 'success' })
          // this.close()
        } else {
          this.$message({ message: '添加失败', type: 'error' })
        }
      })
    },
    addThcTrade() { // 生成订单
      this.addForm.GoodsID = this.parsemsg.GoodsID
      this.addForm.Amount = 1
      // eslint-disable-next-line no-irregular-whitespace
      var date = formatTimes(new Date())
      this.addForm.TradeTime = date
      this.addForm.MemberID = this.thcTradeList.MemberID
      this.addForm.TradePrice = this.thcTradeList.OfferPrice
      this.addForm.TotalPrice = (this.thcTradeList.OfferPrice) * this.addForm.Amount
      // console.log(this.addForm.TradeTime, '时间')
      addThcTrade(this.addForm).then(response => {
        if (response.data.success) {
          this.$message({ message: '添加成功', type: 'success' })
          this.TradeIDadd = JSON.parse(response.data.data).TradeID
          // console.log(this.TradeIDadd, 'this.TradeIDadd')
          // 生成订单查询主键：TradeIDadd 将 TradeIDadd与竞价ID 存入  this.updateTabGoods()  this.addThcTradeGoods()// 查完添加订单商品
          this.submitGoods()
        } else {
          this.$message({ message: '添加失败', type: 'error' })
        }
      })
    },
    submitGoods() {
      this.updateTabGoods()
      this.addThcTradeGoods()
    },
    queryThcTrade() {
      const queryThcTradelist = {}
      queryThcTradelist.GoodsID = this.addForm.GoodsID
      queryThcTradelist.TradeTime = this.addForm.TradeTime
      queryThcTradelist.MemberID = this.addForm.MemberID
      queryThcTrade(queryThcTradelist).then(response => {
        if (JSON.parse(response.data.data).RowCnt) {
          this.tableThcTradeList = JSON.parse(response.data.data).Records
          // console.log(this.tableThcTradeList, 'this.tableThcTradeList')
        }
      })
    },
    queryTabGoodsOfferRecord() { // 查询
      const queryParams = {}
      // console.log(this.parsemsg.GoodsID, 'parsemsg.GoodsID')
      queryParams.GoodsID = this.parsemsg.GoodsID
      queryTabGoodsOfferRecord(queryParams).then(response => {
        if (JSON.parse(response.data.data).RowCnt) {
          this.tableList = JSON.parse(response.data.data).Records
        }
      })
    },
    handleSelectionChange(val) {
      // console.log(val.OfferID, 'val[0].OfferID')
      if (val.length > 1) {
        this.$refs.Table.clearSelection()
        this.$refs.Table.toggleRowSelection(val.pop())
      }
      this.thcTradeList = val[0]
      // console.log(this.thcTradeList, 'this.thcTradeList')
    },
    chooseMcaterialChange(val) {
      // console.log(val.OfferID, 'val[00000000000].OfferID')
      this.$refs.Table.toggleRowSelection(val)
    },
    updateTabGoods() { // 修改商品表里的竞价ID
      const params = {}
      params.GoodsID = this.parsemsg.GoodsID
      params.OfferID = this.thcTradeList.OfferID // 竞价ID
      params.TradeID = this.TradeIDadd // 订单ID
      updateTabGoods(params).then((res) => {
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.queryTabGoodsOfferRecord()// 生成订单添加完订单与竞价ID 刷新页面
        } else {
          this.$message({
            type: 'error',
            message: '修改失败'
          })
        }
      })
    },
    updateGoods() { // 修改商品表里的竞价ID
      const params = {}
      params.GoodsID = this.parsemsg.GoodsID
      params.OfferID = this.thcTradeList.OfferID
      updateTabGoods(params).then((res) => {
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.queryTabGoodsOfferRecord()// 生成订单添加完订单与竞价ID 刷新页面
        } else {
          this.$message({
            type: 'error',
            message: '修改失败'
          })
        }
      })
    },
    handleCurrentChange() {
    },
    handleSizeChange(val) {
    },
    resetForm() {
    },
    execQueryForm() {
    },
    close() {
      this.$emit('func', 'close')
    }
  }
}
</script>

<style lang="scss" scoped>
.query_form_btn{
  float: right;
  margin-bottom: 20px;}

</style>
