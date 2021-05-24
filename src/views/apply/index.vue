<template>
  <el-container>
    <el-header class="breadcrumb">
      <el-breadcrumb>
        <!-- <el-breadcrumb-item>物料管理</el-breadcrumb-item> -->
        <el-breadcrumb-item>审核管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>

    <el-main class="main">
      <div class="query_form">
        <el-form label-width="auto" :model="queryForm" :inline="true">
          <el-row>
            <el-col :span="6">
              <el-form-item label="商户名称:">
                <el-input v-model="queryForm.BusinessName" placeholder="请输入商户名称" @clear="empty_query()" @input="empty_query()" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="query_form_btn">
        <el-button type="primary" @click="execQueryForm">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
        <!-- <el-button type="primary" @click="add = true">增加</el-button> -->
      </div>

      <div class="table">
        <el-table
          :header-cell-style="{ background: 'rgba(249,250,252,1)' }"
          border
          :data="tableList"
          style="width: 100%"
        >
          <el-table-column prop="ApplyID" label="申请ID" width="75" align="center" />
          <el-table-column prop="BusinessName" label="商户名称" width="auto" align="center" />
          <!-- <el-table-column prop="BusinessID" label="商户ID" width="75" align="center" /> -->
          <el-table-column prop="ApplyType" label="申请类型" width="100" align="center">
            <template slot-scope="scope">
              <span>{{ ApplyTypeMap[scope.row.ApplyType] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ApplyTime" label="申请时间" width="180" align="center" />

          <!-- <el-table-column prop="MemberName" label="管理员" width="100" align="center" /> -->
          <el-table-column prop="ApplyStatus" label="当前状态" width="100" align="center">
            <template slot-scope="scope">
              <span>{{ TypeMap[scope.row.ApplyStatus] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="Reason" label="审核意见" width="auto" align="center" />
          <el-table-column align="center" label="操作" width="210">
            <template slot-scope="scope">
              <el-button v-if="scope.row.ApplyStatus==='1'" style="color:rgb(233,195,65);" size="mini" type="text" @click="updates(scope.row)">审核</el-button>
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

    <!-- <el-dialog v-if="add" :visible.sync="add" title="添加" width="50%">
      <add @func="close" />
    </el-dialog> -->

    <el-dialog v-if="update" :visible.sync="update" title="修改" width="80%">
      <update :parsemsg="parsemsg" @func="close" />
    </el-dialog>

  </el-container>
</template>

<script>
import {
  queryTabBusinessApply,
  deleteTabBusinessApply
} from '@/api/apply'
// import add from './child-vue/add'
import update from './child-vue/update'
import { formatYmdhms } from '@/utils/formattime'
export default {
  components: {
    // add: add,
    update: update
  },
  data() {
    return {
      update: false,
      parsemsg: {},
      IsShelves: '',
      test: '--',
      tableList: [],
      queryForm: {
        current: 1,
        limit: 10,
        TotalSize: 0,
        total: 0
      },
      TypeMap: {
        '0': '审核通过',
        '1': '待审核',
        '2': '已暂停',
        '3': '未通过'
      },
      ApplyTypeMap: {
        '0': '添加',
        '1': '修改'
      }
    }
  },
  created() {
    this.queryTabBusinessApply()
  },
  methods: {
    updates(row) {
      console.log(row, 'row')
      this.update = true
      this.parsemsg = row
    },
    empty_query() {
      console.log('清空触发查询')
      this.queryTabBusinessApply()
      // @clear="empty_query()" @input="empty_query()"
    },
    queryTabBusinessApply() {
      queryTabBusinessApply(this.queryForm).then(response => {
        if (JSON.parse(response.data.data).RowCnt) {
          this.tableList = JSON.parse(response.data.data).Records.map(e => {
            e.ApplyTime = formatYmdhms(e.ApplyTime)
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
        params.ApplyID = row.ApplyID
        deleteTabBusinessApply(params).then((response) => {
          if (response.data.success === true) {
            this.$message({ type: 'success', message: '删除成功!' })
            this.queryTabBusinessApply()
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
      this.queryTabBusinessApply()
    },
    handleCurrentChange(current) {
      this.queryForm.current = current
      this.queryTabBusinessApply()
    },
    handleSizeChange(size) {
      this.queryForm.limit = size
      this.queryTabBusinessApply()
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
