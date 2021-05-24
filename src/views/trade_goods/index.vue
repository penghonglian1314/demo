<template>
  <el-container>
    <el-header class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>

    <el-main class="main">

      <div class="table">
        <el-table
          :header-cell-style="{ background: 'rgba(249,250,252,1)' }"
          border
          :data="tableList"
          style="width: 100%"
        >
          <el-table-column
            prop="TradeID"
            label="交易ID"
            width="75"
            align="center"
          />
          <el-table-column
            prop="GoodsID"
            label="交易商品ID"
            width="75"
            align="center"
          />
          <el-table-column
            prop="Amount"
            label="交易数量"
            width="100"
            align="center"
          />
          <el-table-column
            prop="TradePrice"
            label="交易单价"
            width="150"
            align="center"
          />
          <el-table-column
            prop="TotalPrice"
            label="交易总价"
            width="150"
            align="center"
          />
          <el-table-column
            prop="ExtParam"
            label="属性"
            width="150"
            align="center"
          />
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <!-- <el-button style="color:rgb(150,150,150);" size="mini" type="text" @click="openDetailDialog(scope.row)">详情</el-button> -->
              <el-button style="color:rgb(233,195,65);" size="mini" type="text" @click="updates(scope.row)">修改</el-button><!-- openEditDialog(scope.row) -->
              <el-button style="color:red;" size="mini" type="text" @click="toDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
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

    <el-dialog v-if="update" :visible.sync="update" title="修改" width="50%">
      <update :parsemsg="parsemsg" @func="close" />
    </el-dialog>
  </el-container>
</template>

<script>
import {
  queryThcTradeGoods
} from '@/api/trade'
export default {
  data() {
    return {
      parsemsg: [],
      tableList: [],
      queryForm: {
        current: 1,
        limit: 10,
        TotalSize: 0,
        total: 0
      }
    }
  },
  created() {
    this.queryThcTradeGoods()
  },
  methods: {
    updates(row) {
      // console.log(row, 'row')
      this.update = true
      this.parsemsg = row
    },
    queryThcTradeGoods() {
      queryThcTradeGoods(this.queryParams).then(response => {
        if (JSON.parse(response.data.data).RowCnt) {
          this.tableList = JSON.parse(response.data.data).Records
        }
      })
    },
    // toDelete(row) {
    //   // console.log(row)
    //   this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     const params = {}
    //     params.TradeID = row.TradeID
    //     deleteThcTrade(params).then((response) => {
    //       if (response.data.success === true) {
    //         this.$message({ type: 'success', message: '删除成功!' })
    //         this.close()
    //       } else {
    //         this.$message({ type: 'error', message: '删除失败!' })
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message({ type: 'info', message: '已取消删除' })
    //   })
    // },
    close() {
      this.update = false
      this.queryThcTradeGoods()
    },
    handleCurrentChange() {
    },
    handleSizeChange(val) {
    },
    resetForm() {
    },
    execQueryForm() {
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/container.scss'
</style>
