<template>
  <el-container>
    <el-header class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item>优惠券管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>

    <el-main class="main">
      <!--  <div class="query_form">
        <el-form label-width="auto" :model="queryForm" :inline="true">
          <el-row>
            <el-col :span="6">
              <el-form-item label="一起搜索吧:">
                <el-input v-model="queryForm.BusinessName" placeholder="搜索了个寂寞" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div> -->

      <div class="query_form_btn">
        <!-- <el-button type="primary" @click="execQueryForm">查询</el-button> -->
        <!-- <el-button type="primary" @click="addType = true">优惠券类型管理</el-button> -->
        <el-button type="primary" @click="add = true">增加</el-button>
      </div>

      <div class="table">
        <el-table
          :header-cell-style="{ background: 'rgba(249,250,252,1)' }"
          border
          :data="tableLists"
          style="width: 100%"
        >
          <!-- :default-sort="{prop: 'CreateTime', order: 'descending'}" -->
          <!-- <el-table-column
            prop="CouponID"
            label="优惠券ID"
            width="100"
            align="center"
          /> -->
          <!-- <el-table-column
            prop="Type"
            label="优惠券类型"
            width="150"
            align="center"
          /> -->
          <el-table-column
            prop="CouponName"
            label="优惠券名称"
            width=""
            align="center"
          />
          <el-table-column
            prop="CouponValue"
            label="折扣值/满减数量"
            width="130"
            align="center"
          />
          <el-table-column
            prop="Conditions"
            label="使用条件"
            width="120"
            align="center"
          />
          <el-table-column
            prop="MemberCountLimit"
            label="用户最大持有量"
            width="120"
            align="center"
          />
          <el-table-column
            prop="MaxCount"
            label="最大发放数量"
            width="120"
            align="center"
          />
          <el-table-column
            prop="CreateTime"
            label="创建时间"
            width="180"
            align="center"
          />
          <el-table-column
            prop="BeginTime"
            label="开始时间"
            width="180"
            align="center"
          />
          <el-table-column
            prop="EndTime"
            label="结束时间"
            width="180"
            align="center"
          />
          <el-table-column
            prop="Remarks"
            label="描述"

            align="center"
          />
          <el-table-column align="center" label="操作" width="180">
            <template slot-scope="scope">
              <!-- <el-button style="color:rgb(150,150,150);" size="mini" type="text" @click="openDetailDialog(scope.row)">详情</el-button> -->
              <el-button style="color:rgb(233,195,65);" size="mini" type="text" @click="updates(scope.row)">修改</el-button>
              <el-button style="color:red;" size="mini" type="text" @click="toDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="page">
        <el-pagination
          :page-sizes="[5,10, 20, 30]"
          :page-size="queryForm.limit"
          :total="queryForm.total"
          :current-page="queryForm.current"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-main>

    <el-dialog v-if="add" :visible.sync="add" title="添加" width="50%">
      <add @func="close" />
    </el-dialog>

    <el-dialog v-if="update" :visible.sync="update" title="修改" width="50%">
      <update :parsemsg="parsemsg" @func="close" />
    </el-dialog>

    <!-- <el-dialog v-if="addType" :visible.sync="addType" title="优惠券类型管理" width="70%">
      <addType @func="close" />
    </el-dialog> -->

  </el-container>
</template>

<script>
import {
  queryCoupon,
  deleteCoupon
} from '@/api/coupon'
import add from './child-vue/add'
import update from './child-vue/update'
// import addType from './child-vue/addType'
import { formatYmdhms } from '@/utils/formattime'
export default {
  components: {
    add: add,
    update: update
    // addType: addType
  },
  data() {
    return {
      // addType: false,
      add: false,
      update: false,
      parsemsg: [],
      tableList: [],
      queryForm: {
        current: 1,
        limit: 5,
        total: 0
      }
    }
  },
  computed: {
    tableLists() {
      return this.tableList.map(e => { e.CouponName = e.CouponName === '' ? '该类型不存在' : e.CouponName; return e })
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    updates(row) {
      this.update = true
      this.parsemsg = row
    },
    getTableList(queryFrom = this.queryForm) {
      queryCoupon(queryFrom).then(res => {
        if (JSON.parse(res.data.data).RowCnt) {
          console.log(this.queryForm)
          console.log(JSON.parse(res.data.data))
          this.tableList = JSON.parse(res.data.data).Records.map(e => {
            e.CreateTime = formatYmdhms(e.CreateTime)
            e.BeginTime = formatYmdhms(e.BeginTime)
            e.EndTime = formatYmdhms(e.EndTime)
            return e
          })
          this.queryForm.total = parseInt(JSON.parse(res.data.data).TotalSize)
        } else {
          this.$message.error('查询失败')
        }
      })
    },
    toDelete(row) {
      // console.log(row)
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {}
        params.CouponID = row.CouponID
        deleteCoupon(params).then((res) => {
          if (res.data.success === true) {
            this.$message({ type: 'success', message: '删除成功!' })
            this.getTableList()
          } else {
            this.$message({ type: 'error', message: '删除失败!' })
          }
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    },
    handleCurrentChange(current) {
      this.queryForm.current = current
      this.getTableList()
    },
    handleSizeChange(size) {
      this.queryForm.limit = size
      this.getTableList()
    },
    // execQueryForm() {
    //   this.getTableList({
    //     ...this.queryForm,
    //     FuzzyValue: this.SearchInfo
    //   })
    // },
    close() {
      this.add = false
      this.update = false
      // this.addType = false
      this.getTableList()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/container.scss'
</style>
