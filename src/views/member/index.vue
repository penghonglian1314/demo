<template>
  <el-container>
    <el-header class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item>会员管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>

    <el-main class="main">
      <div class="query_form">
        <el-form label-width="auto" :model="queryForm" :inline="true">
          <el-row>
            <el-col :span="6">
              <el-form-item label="会员名称:">
                <el-input v-model="queryForm.MemberName" placeholder="请输入会员名称" @clear="empty_query" @input="empty_query" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="query_form_btn">
        <!-- <el-button type="primary" @click="execQueryForm">
          查询
        </el-button>
        <el-button @click="resetForm">
          重置
        </el-button> -->
        <!-- <el-button type="primary" @click="add = true">
          增加
        </el-button> -->
      </div>

      <div class="table">
        <el-table
          :header-cell-style="{ background: 'rgba(249,250,252,1)' }"
          border
          :data="tableList"
          style="width: 100%"
          :cell-style="{padding:'2px 0'}"
        >
          <el-table-column prop="AvatarUrl" label="头像" width="60" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.AvatarUrl === ''" />
              <img
                v-else
                :src="scope.row.AvatarUrl"
                width="100%"
                :style="{display:'block'}"
                alt
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="MemberName"
            label="会员名称"
            width="auto"
            align="center"
          />
          <el-table-column
            prop="Sex"
            label="性别"
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.Sex === '0'">男</span>
              <span v-if="scope.row.Sex === '1'">女</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="Level"
            label="会员等级"
            width="80"
            align="center"
          />
          <!-- <el-table-column
            prop="ReferenceName"
            label="推荐人"
            width="150"
            align="center"
          /> -->
          <el-table-column
            prop="CreateTime"
            label="创建时间"
            width="180"
            align="center"
          />

          <el-table-column
            prop="MemberType"
            label="会员类型"
            width="180"
            align="center"
          />
          <el-table-column
            prop="Tel"
            label="电话"
            width="180"
            align="center"
          />
          <el-table-column align="center" width="160" label="操作">
            <template slot-scope="scope">
              <el-button style="color:rgb(150,150,150);" size="mini" type="text" @click="openDetailDialog(scope.row)">
                详情
              </el-button>
              <!-- <el-button style="color:rgb(233,195,65);" size="mini" type="text" @click="updates(scope.row)">修改</el-button> -->
              <!-- <el-button style="color:red;" size="mini" type="text" @click="toDelete(scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
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

    <el-dialog v-if="add" :visible.sync="add" title="添加" width="50%">
      <add @func="close" />
    </el-dialog>

    <el-dialog v-if="update" :visible.sync="update" title="修改" width="50%">
      <update :parsemsg="parsemsg" @func="close" />
    </el-dialog>
  </el-container>
</template>

<script>
import {
  queryMember,
  deleteMember
} from '@/api/member'
import add from './child-vue/add'
import update from './child-vue/update'
export default {
  components: {
    add: add,
    update: update },
  data() {
    return {
      add: false,
      update: false,
      parsemsg: [],
      tableList: [],
      queryForm: {
        current: 1,
        limit: 10,
        total: 0
      }
    }
  },
  created() {
    this.queryMember()
  },
  methods: {
    empty_query() {
      // console.log('清空触发查询')
      this.queryMember()
    },
    updates(row) {
      console.log(row, 'row')
      this.update = true
      this.parsemsg = row
    },
    queryMember() {
      queryMember(this.queryForm).then(response => {
        if (JSON.parse(response.data.data).RowCnt) {
          this.tableList = JSON.parse(response.data.data).Records
          this.queryForm.total = JSON.parse(response.data.data).TotalSize * 1
        }
      })
    },
    openDetailDialog(row) {
      // 此处打开会员详情
      this.$router.push({ path: '/member/member_detail.html', query: row })
    },
    toDelete(row) {
      console.log(row)
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {}
        params.MemberNumber = row.MemberNumber
        params.MemberID = row.MemberID
        deleteMember(params).then((response) => {
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
    handleCurrentChange(current) {
      this.queryForm.current = current
      this.queryMember()
    },
    handleSizeChange(size) {
      this.queryForm.limit = size
      this.queryMember()
    },
    resetForm() {
    },
    execQueryForm() {
      this.$confirm('什么都没搜到诶！', '提示', {
        confirmButtonText: '确定'
        // cancelButtonText: '取消'
      })
    },
    close() {
      this.add = false
      this.update = false
      this.queryMember()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/container.scss'
</style>
