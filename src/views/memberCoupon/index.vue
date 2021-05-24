<template>
  <el-container>
    <el-header class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item>用户优惠券管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>

    <el-main class="main">
      <div class="query_form">
        <el-row>
          <el-col :span="4">
            <el-input v-model="SearchInfo" placeholder="请输入用户名或手机号" clearable size="medium" />
          </el-col>
          <!-- <el-button type="primary" @click="execQueryForm">查询</el-button> -->
        </el-row>
      </div>

      <div class="table">
        <el-table
          :header-cell-style="{ background: 'rgba(249,250,252,1)' }"
          border
          :data="tableList"
          :default-sort="{prop: 'UseTime', order: 'descending'}"
          style="width: 100%"
        >
          <el-table-column
            prop="CouponID"
            label="优惠券ID"
            width="130"
            align="center"
          />
          <!-- <el-table-column
            prop="MemberID"
            label="用户ID"
            width="170"
            align="center"
          /> -->
          <el-table-column
            prop="MemberName"
            label="用户名称"

            align="center"
          />
          <el-table-column
            prop="Tel"
            label="用户电话"
            width="230"
            align="center"
          />
          <el-table-column
            prop="Status"
            label="优惠券状态"
            width="170"
            align="center"
          >
            <template slot-scope="scope">
              <span>
                {{ couponTypeList[scope.row.Status*1] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="UseTime"
            label="使用时间"
            width="220"
            align="center"
          />
          <el-table-column
            prop="BeginTime"
            label="开始时间"
            width="220"
            align="center"
          />
          <el-table-column
            prop="EndTime"
            label="结束时间"
            width="220"
            align="center"
          />
          <!-- <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button style="color:rgb(150,150,150);" size="mini" type="text" @click="openDetailDialog(scope.row)">详情</el-button>
              <el-button style="color:rgb(233,195,65);" size="mini" type="text" @click="updates(scope.row)">修改</el-button>
              <el-button style="color:red;" size="mini" type="text" @click="toDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table> -->
        </el-table>
      </div>

      <div class="page">
        <el-pagination
          :page-sizes="[10, 20, 30, 50]"
          :page-size="queryForm.limit"
          :total="queryForm.total"
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
  queryMemberCoupon
} from '@/api/membercoupon'
import { formatYmdhms } from '@/utils/formattime'
export default {
  data() {
    return {
      tableList: [],
      SearchInfo: '',
      queryForm: {
        current: 1,
        limit: 10,
        total: 0
      },
      couponTypeList: ['未使用', '已使用']
    }
  },
  watch: {
    SearchInfo() {
      this.execQueryForm()
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    execQueryForm() {
      this.getTableList({
        ...this.queryForm,
        FuzzyValue: this.SearchInfo
      })
    },
    getTableList(queryForm = this.queryForm) {
      queryMemberCoupon(queryForm).then(res => {
        if (res.data.success) {
          // console.log(JSON.parse(res.data.data))
          this.tableList = JSON.parse(res.data.data).Records.map(e => {
            e.UseTime = formatYmdhms(e.UseTime)
            e.BeginTime = formatYmdhms(e.BeginTime)
            e.EndTime = formatYmdhms(e.EndTime)
            return e
          })
          this.queryForm.total = parseInt(JSON.parse(res.data.data).TotalSize)
          // console.log(this.queryForm)
        } else {
          this.$message.error('查询失败')
        }
      })
    },
    handleCurrentChange(current) {
      this.queryForm.current = current
      this.getTableList()
    },
    handleSizeChange(size) {
      this.queryForm.limit = size
      this.getTableList()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/container.scss';

.query_form{
  padding: 10px;
}
</style>
