<template>
  <el-container>
    <el-main>
      <el-row v-if="!(Type0List.length||Type1List.length||listFlag)">
        <h3>它并没有赠品哦</h3>
      </el-row>
      <el-row v-if="Type0List.length">
        <h3>积分赠送：</h3>
        <el-table
          :header-cell-style="{ background: 'rgba(249,250,252,1)' }"
          border
          :data="Type0List"
          style="width: 100%"
        >
          <el-table-column prop="GiftKey" label="积分账户类型" width="180" align="center">
            <template slot-scope="scope">
              <span>
                {{ accountType2Name(scope.row.GiftKey) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="GiftValue" label="积分赠送数量" width="160" align="center" />
          <el-table-column prop="Status" label="赠品状态" width="180" align="center">
            <template slot-scope="scope">
              <span>
                {{ scope.row.Status==='0'?'未赠送':'已赠送' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="Remarks" label="备注" align="center" />
        </el-table>
      </el-row>
      <el-row v-if="Type1List.length">
        <h3>商品赠送：</h3>
        <el-table
          :header-cell-style="{ background: 'rgba(249,250,252,1)' }"
          border
          :data="Type1List"
          style="width: 100%"
        >
          <el-table-column prop="FhumbnailFileID" label="封面图片" width="130" align="center">
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
          <!-- <el-table-column prop="GiftKey" label="商品名称" width="100" align="center" /> -->
          <el-table-column prop="ShowTitle" label="商品名称" width="180" align="center" />

          <el-table-column prop="GiftValue" label="赠品赠送数量" width="160" align="center" />
          <el-table-column prop="Status" label="赠品状态" width="180" align="center">
            <template slot-scope="scope">
              <span>
                {{ scope.row.Status==='0'?'未赠送':'已赠送' }}
              </span>
            </template>
          </el-table-column>

          <!-- <el-table-column prop="ItemType" label="商品分类" width="150" align="center" />
          <el-table-column prop="Price" label="售价" width="100" align="center" /> -->
          <el-table-column prop="Remarks" label="备注" width="360" align="center" />
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button style="color:red;fontSize:14px;" size="mini" type="text" class="btnt" @click="detailGood(scope.row)">
                详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>

import { queryTradeGift } from '@/api/trade'
import {
  queryMemberAccountType
} from '@/api/gift'

export default {
  data() {
    return {
    //   row: {},
      listFlag: true, // 解决页面进入时，数据尚未请求到就开始渲染‘没有赠品’
      Type0List: [], // 积分礼品列表
      Type1List: [], // 商品礼品列表
      AccountType: []
    }
  },
  async created() {
    const res1 = await queryMemberAccountType()
    console.log(res1)
    this.AccountType = JSON.parse(res1.data.data).Records
    console.log(this.$route.query)
    const row = this.$route.query
    const res2 = await queryTradeGift(row)
    console.log(res2)
    const tableList = JSON.parse(res2.data.data).Records ? JSON.parse(res2.data.data).Records : []
    console.log(tableList)
    tableList.map(e => {
      if (e.GiftType === '0') {
        this.Type0List.push(e)
      } else if (e.GiftType === '1') {
        this.Type1List.push(e)
      }
      return null
    })
    this.listFlag = false
  },
  methods: {
    detailGood(row) {
      this.$router.push({ path: '/goods/todetails_goods.html', query: { GoodsID: row.GoodsID }})
    },
    accountType2Name(type) {
    //   console.log(type, this.AccountType)
    //   console.log(this.AccountType.find(e => e.AccountType === type))
      return this.AccountType.find(e => e.AccountType === type).AccountName
    }
  }
}
</script>

<style scoped>

</style>
