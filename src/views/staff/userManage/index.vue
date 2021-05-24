<template>
  <el-container>
    <el-header class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>

    <el-main>
      <div class="query_form">
        <el-form label-width="auto" :inline="true" :model="queryParams" class="demo-form-inline">
          <el-row>
            <!-- <el-col :span="6">
              <el-form-item label="用户ID" prop="UserID">
                <el-input v-model="queryParams.UserID" placeholder="请输入用户ID" clearable @clear="empty_query" @input="empty_query" />
              </el-form-item>
            </el-col> -->
            <el-col :span="6">
              <el-form-item label="用户名称：" prop="UserName">
                <el-input v-model="queryParams.UserName" placeholder="请输入用户名称" clearable @clear="empty_query" @input="empty_query" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="电话：" prop="TelNo">
                <el-input v-model="queryParams.TelNo" placeholder="请输入电话" clearable @clear="empty_query" @input="empty_query" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="query_form_btn">
        <!-- <el-button type="primary" @click="queryUserInfo">查询</el-button> -->
        <!-- <el-button @click="resetForm">重置</el-button> -->
        <el-button type="primary" @click="addUser = true">增加</el-button>
      </div>

      <div class="table">
        <el-table :header-cell-style="{ background: 'rgba(249,250,252,1)' }" border :data="tableList" style="width: 100%" stripe highlight-current-row>
          <el-table-column prop="UserID" label="用户ID">
            <template slot-scope="scope">
              <span>{{ scope.row.UserID }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="UserName" label="用户名称">
            <template slot-scope="scope">
              <span>{{ scope.row.UserName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="TelNo" label="电话">
            <template slot-scope="scope">
              <span>{{ scope.row.TelNo }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="Email" label="邮箱">
            <template slot-scope="scope">
              <span>{{ scope.row.Email }}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column prop="UserRoles" label="角色">
            <template slot-scope="scope">
              <span>{{ scope.row.UserRoles }}</span>
            </template>
          </el-table-column> -->

          <el-table-column prop="Extend" label="详情">
            <template slot-scope="scope">
              <span>{{ scope.row.Extend }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="40%">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="修改基本信息" placement="top-start" enterable>
                <i class="el-icon-edit" style="cursor:pointer" @click="updateUser(scope.row)" />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column align="center" width="40%">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="删除用户" placement="top-start" enterable>
                <i class="el-icon-delete" style="cursor:pointer;color:red" @click="deleteUser(scope.row)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="page">
        <el-pagination
          :current-page="queryParams.current"
          :page-sizes="[10,20,30,50]"
          :page-size="queryParams.limit"
          :total="queryParams.total"
          layout="total, sizes, prev, pager, next, jumper"
          prev-text="上一页"
          next-text="下一页"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-main>

    <el-dialog v-if="addUser" :visible.sync="addUser" title="添加用户" width="50%" class="dialog_class">
      <addUser @func="close" />
    </el-dialog>

    <el-dialog v-if="updataUserInfo" :visible.sync="updataUserInfo" title="修改用户信息" class="dialog_class">
      <updataUserInfotion :parentmsg="parentmsg" @func="close" />
    </el-dialog>
  </el-container>
</template>

<script>
import addUser from './child-vue/addUser'
import updataUserInfotion from './child-vue/updataUserInfo'
import { queryUserInfo, updateUserInfomation, getUserRole } from '@/api/user'
export default {
  components: { addUser, updataUserInfotion },
  data() {
    return {
      tableList: [],
      queryParams: {
        limit: 10,
        current: 1,
        UserStatus: '0'
      },
      options: [],
      UserRoleUrl: '/role/queryRole.action', // 查询角色
      queryUrl: '/lxy_mall/queryUserInfo.action', // 查询用户信息接口
      deleteUrl: '/lxy_mall/updateUserInfomation.action', // 删除用户信息接口，目前删除并不会删除数据库的数据，只会将状态修改为删除状态
      addUser: false,
      updataUserInfo: false,
      parentmsg: ''
    }
  },
  created() {
    this.queryUserInfo()
    this.getUserRole()
  },
  methods: {
    empty_query() {
      // console.log('清空触发查询')
      this.queryUserInfo()
    },
    handleCurrentChange(current) {
      this.queryParams.current = current
      this.queryUserInfo()
    },
    handleSizeChange(size) {
      this.queryParams.limit = size
      this.queryUserInfo()
    },
    queryUserInfo() {
      queryUserInfo(this.queryParams, this.queryUrl).then(response => {
        if (response.data.success) {
          this.queryParams.total = Number(JSON.parse(response.data.data).TotalSize)
          if (Number(JSON.parse(response.data.data).RowCnt)) {
            this.tableList = JSON.parse(response.data.data).Records
            console.log(this.tableList)
            return
          }
          this.tableList = []
        }
      })
    },

    deleteUser(row) {
      // console.log(row)
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(row, 8989)
        const params = {}
        params.UserID = row.UserID
        params.UserStatus = '9'
        params.EntCode = row.EntCode
        // OptIDList=DeleteUser|DeleteUserBelong
        // params.OptIDList = 'DeleteUser' + '|' + 'DeleteUserBelong'
        // // console.log(params)
        updateUserInfomation(params, this.deleteUrl).then(response => {
          // console.log(response)
          if (response.data.success) {
            this.$message({ type: 'success', message: '删除成功' })
            this.queryUserInfo()
          } else {
            this.$message({ type: 'fail', message: '删除失败' })
          }
        })
      })
    },

    getUserRole() {
      getUserRole({}, this.UserRoleUrl).then(response => {
        this.options = JSON.parse(response.data.data).Records
        console.log(this.options, 'this.options')
      })
    },
    insertProjectUser(row) {
      this.parentmsg = row
      this.addProjectUser = true
    },
    updateUser(row) {
      this.parentmsg = row
      this.updataUserInfo = true
    },
    close() {
      this.addUser = false
      this.updataUserInfo = false
      this.queryUserInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/container.scss'
</style>

<style>
.dialog_class .el-dialog__body{
  padding: 0;
}
.dialog_class .el-main{
  padding-top: 0;
}
</style>
