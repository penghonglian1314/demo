<template>
  <el-container>
    <el-header class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item>商户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>

    <el-main class="main">
      <div class="query_form">
        <el-form label-width="auto" :model="queryForm" :inline="true">
          <el-row>
            <el-col :span="6">
              <el-form-item label="商户名称:">
                <el-input v-model="queryForm.BusinessName" clearable placeholder="请输入商户名称" @clear="empty_query" @input="empty_query" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="query_form_btn">
        <el-button type="primary" @click="add = true">增加</el-button>
        <!-- <el-button type="primary" @click="queryTabBusiness">查询</el-button> -->
        <!-- <el-button @click="resetForm">重置</el-button>-->

      </div>

      <div class="table">
        <el-table
          :header-cell-style="{ background: 'rgba(249,250,252,1)' }"
          border
          :data="tableList"
          style="width: 100%"
        >
          <!-- <el-table-column prop="BusinessID" label="商户ID" width="75" align="center" /> -->
          <el-table-column prop="BusinessName" label="商户名称" width="auto" align="center" />
          <el-table-column prop="Corporate" label="法人姓名" width="140" align="center" />
          <el-table-column prop="CorporateTelNo" label="法人电话" width="160" align="center" />
          <el-table-column prop="CreateTime" label="创建时间" width="190" align="center" />
          <el-table-column prop="Status" label="当前状态" width="120" align="center">
            <template slot-scope="scope">
              <span>{{ TypeMap[scope.row.Status] }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="CorporateCardID" label="法人身份证号" width="290" align="center" />
          <!-- <el-table-column prop="MemberName" label="管理员" width="100" align="center" /> --> <!-- ManagerMemberID -->
          <!-- <el-table-column prop="ShopCnt" label="店铺上限" width="100" align="center" /> -->
          <!-- <el-table-column prop="BusinessLicenseFileID" label="营业执照" width="150" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.BusinessLicenseFileID === ''" />
              <img
                v-else
                :src="scope.row.BusinessLicenseFileID"
                width="100%"
                style="cursor: pointer;"
                alt
              >
            </template>
          </el-table-column> -->
          <!-- 状态, 0: 正常, 1: 待审核,2: 已暂停,3:未通过 -->
          <el-table-column align="center" width="210" label="操作">
            <template slot-scope="scope">
              <el-button style="color:rgb(233,195,65);" size="mini" type="text" @click="toDetails(scope.row)">详情</el-button>
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
          prev-text="上一页"
          next-text="下一页"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-main>

    <el-dialog v-if="add" :visible.sync="add" title="添加" width="50%">
      <add @func="close" />
    </el-dialog>

    <el-dialog v-if="update" :visible.sync="update" title="详情" width="50%">
      <update :parsemsg="parsemsg" @func="close" />
    </el-dialog>

  </el-container>
</template>

<script>
import {
  queryTabBusiness,
  deleteTabBusiness
} from '@/api/business'
import add from './child-vue/add'
import update from './child-vue/update'
import { formatYmdhms } from '@/utils/formattime'
export default {
  components: {
    add: add,
    update: update
  },
  data() {
    return {
      add: false,
      update: false,
      parsemsg: [],
      IsShelves: '',
      tableList: [],
      queryForm: {
        current: 1,
        limit: 10,
        TotalSize: 0,
        total: 0
      },
      // imgUrl: BASE_API.SERVER_IP + '/lxy_mall/file.action?fileUrl=',
      TypeMap: {
        '0': '正常',
        '1': '待审核',
        '2': '已暂停',
        '3': '未通过'
      }
    }
  },
  created() {
    this.queryTabBusiness()
  },
  methods: {
    toDetails(row) {
      this.$router.push({ path: '/business/todetails.html', query: row })
    },
    updates(row) {
      console.log(row, 'row')
      this.update = true
      this.parsemsg = row
    },
    empty_query() {
      console.log('清空触发查询')
      this.queryTabBusiness()
      // @clear="empty_query()" @input="empty_query()"
    },
    queryTabBusiness() {
      queryTabBusiness(this.queryForm).then(response => {
        if (JSON.parse(response.data.data).RowCnt) {
          this.tableList = JSON.parse(response.data.data).Records.map(e => {
            e.CreateTime = formatYmdhms(e.CreateTime)
            return e
          })
          this.queryForm.TotalSize = JSON.parse(response.data.data).TotalSize * 1
        }
      })
    },
    toDelete(row) {
      console.log(row)
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {}
        params.BusinessID = row.BusinessID
        deleteTabBusiness(params).then((response) => {
          if (response.data.success === true) {
            this.$message({ type: 'success', message: '删除成功!' })
            this.close()
          } else {
            this.$message({ type: 'error', message: '删除失败!' })
          }
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    },
    close() {
      this.add = false
      this.update = false
      this.queryTabBusiness()
    },
    handleCurrentChange(current) {
      this.queryForm.current = current
      this.queryTabBusiness()
    },
    handleSizeChange(size) {
      this.queryForm.limit = size
      this.queryTabBusiness()
    },
    resetForm() {
      console.log('重置方法')
    },
    execQueryForm() {
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/container.scss'
</style>
