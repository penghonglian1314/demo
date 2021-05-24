<template>
  <el-container>
    <el-main>
      <span>积分账户数:
      </span>
      <el-input disabled :value="total" class="input" />
      <el-button
        class="addbtn"
        icon="el-icon-plus"
        type="primary"
        size="small"
        @click="add = true"
      >添加</el-button>
      <!-- <el-form ref="form" :model="form" label-width="80px">

      <el-form-item v-for="(account,key) in formlist" :key="key" :label="account.AccountType">
        <el-input v-model="account.AccountName" />
      </el-form-item>

      <el-button type="primary" @click="onSubmit">确认</el-button>
      <el-button>取消</el-button>

    </el-form> -->
      <el-table
        v-loading="listLoading"
        :data="dataList"
        border
        stripe
        highlight-current-row
        style="width:100%;margin:20px 0 20px 0"
      >
        <el-table-column label="账号类型" prop="AccountType" align="center" />

        <el-table-column
          label="账号类型名称"
          prop="AccountName"
          align="center"
        />

        <el-table-column align="center" label="操作">
          <template v-slot="scope">
            <el-button style="color:rgb(233,195,65);" size="mini" type="text" @click="updateRole(scope.row)">修改</el-button>
            <el-button style="color:red;" size="mini" type="text" @click="Delete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <!-- 编辑 -->
        <!-- <el-table-column align="center" width="40%">
          <template v-slot="scope">
            <el-row>
              <i
                class="el-icon-edit"
                style="cursor:pointer;color:blue"
                @click="updateRole(scope.row)"
              />
            </el-row>
          </template>
        </el-table-column> -->
        <!-- 删除 -->
        <!-- <el-table-column align="center" width="40%">
          <template v-slot="scope">
            <el-row>
              <i
                class="el-icon-delete"
                style="cursor:pointer;color:red"
                @click="Delete(scope.row)"
              />
            </el-row>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="pagination-container">
        <el-pagination
          :current-page="queryParams.current"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="queryParams.limit"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          prev-text="上一页"
          next-text="下一页"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

      <el-dialog
        v-if="update"
        :visible.sync="update"
        title="修改"
        append-to-body
        width="50%"
      >
        <update :parentmsg="updatemsg" @func="getService" />
      </el-dialog>
      <el-dialog
        v-if="add"
        :visible.sync="add"
        title="添加"
        append-to-body
        width="50%"
      >
        <add @func="getService" />
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script>
import { queryAccountType, deleteAccountType } from '@/api/account'
import add from './admin-child/add'
import update from './admin-child/update'
export default {
  components: {
    update,
    add
  },
  data() {
    return {
      dataList: [],
      updatemsg: {},
      listLoading: false,
      update: false,
      add: false,
      queryParams: {
        current: 1,
        limit: 5
      //
      },
      total: 0
    }
  },
  created() {
    this.query()
  },
  methods: {
    Delete(row) {
      this.$confirm('此操作将永久删除该服务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const _params = {}
          // console.log(row);
          _params.AccountType = row.AccountType
          deleteAccountType(_params).then(response => {
            if (response.data.success === true) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.query()
            } else {
              this.$message({
                type: 'info',
                message: '删除失败!'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    updateRole(row) {
      console.log('row', row)
      this.update = true
      this.updatemsg = row
    },

    query() {
      this.listLoading = true
      console.log('+++++', this.queryParams)
      queryAccountType(this.queryParams)
        .then(res => {
          this.dataList = JSON.parse(res.data.data).Records
          this.total = parseInt(JSON.parse(res.data.data).TotalSize)
          this.listLoading = false
        })
        .catch(error => {
          console.log(error)
          this.listLoading = false
        })
    },

    getService() {
      this.add = false
      this.update = false
      this.showadmin = false
      this.query()
    },
    handleCurrentChange(current) {
      this.queryParams.current = current
      this.query()
    },
    handleSizeChange(size) {
      this.queryParams.limit = size
      this.query()
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "../../styles/container.scss";

    .input{
        display: inline-block;
        width:300px;
    }
    .addbtn{
        margin-left: 500px;
    }
</style>
