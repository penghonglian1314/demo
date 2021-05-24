<template>
  <el-container>
    <el-header class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>

    <el-main class="main">
      <div class="query_form">
        <el-form label-width="auto" :model="queryForm" :inline="true">
          <el-row>
            <el-col :span="6">
              <el-form-item label="商店名称:">
                <el-input v-model="queryForm.ShopTitle" clearable placeholder="请输入商店名称" @clear="empty_query()" @input="empty_query()" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="商品名称:">
                <el-input v-model="queryForm.ShowTitle" clearable placeholder="请输入商品名称" @clear="empty_query()" @input="empty_query()" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="活动类型：" prop="ActivityType">
                <el-select v-model="queryForm.ActivityType" clearable placeholder="请选活动类型" @clear="empty_query()" @input="empty_query()">
                  <el-option
                    v-for="item in ActivityTypeOptions"
                    :key="item.ActivityType"
                    :label="item.ActivityName"
                    :value="item.ActivityType"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="query_form_btn">
        <!-- <el-button type="primary" @click="execQueryForm">查询</el-button> -->
        <!-- <el-button type="primary" @click="addType = true">添加活动类型</el-button> -->
        <!-- <el-button type="primary" @click="add = true">增加</el-button> -->
      </div>

      <div class="table">
        <el-table
          :header-cell-style="{ background: 'rgba(249,250,252,1)' }"
          border
          :data="tableList"
          style="width: 100%"
        >
          <!-- <el-table-column prop="RecordID" label="活动ID" width="75" align="center" /> -->
          <el-table-column prop="ShopTitle" label="商店名称" width="240" align="center" />
          <el-table-column prop="ShowTitle" label="商品名称" width="auto" align="center" />
          <el-table-column prop="IsOnShelves" label="是否上架" width="150" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.IsOnShelves === '0'">不上架</span>
              <span v-if="scope.row.IsOnShelves === '1'">上架</span>
            </template>
          </el-table-column>
          <el-table-column prop="ActivityName" label="活动名称" width="150" align="center" />
          <el-table-column prop="Priority" label="优先级" width="150" align="center" />
          <el-table-column align="center" width="240" label="操作">
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

    <el-dialog v-if="update" :visible.sync="update" title="修改" width="50%">
      <update :parsemsg="parsemsg" @func="close" />
    </el-dialog>

    <el-dialog v-if="addType" :visible.sync="addType" title="活动类型" width="50%">
      <addType @func="close" />
    </el-dialog>

  </el-container>
</template>

<script>
import {
  QueryMallGoodsActivity,
  deleteMallGoodsActivity,
  QueryMallGoodsActivityType
} from '@/api/activity'
import add from './child-vue/add'
import update from './child-vue/update'
import addType from './child-vue/addType'
export default {
  components: {
    add: add,
    update: update,
    addType: addType },
  data() {
    return {
      ActivityTypeOptions: [],
      addType: false,
      add: false,
      update: false,
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
    this.QueryMallGoodsActivity()
    this.QueryMallGoodsActivityType()
  },
  methods: {
    updates(row) {
      console.log(row, 'row')
      this.update = true
      this.parsemsg = row
    },
    empty_query() {
      console.log('清空触发查询')
      this.QueryMallGoodsActivity()
      // @clear="empty_query()"
    },
    QueryMallGoodsActivity() {
      QueryMallGoodsActivity(this.queryForm).then(response => {
        if (JSON.parse(response.data.data).RowCnt) {
          this.tableList = JSON.parse(response.data.data).Records
          this.queryForm.TotalSize = JSON.parse(response.data.data).TotalSize * 1
        }
      })
    },
    QueryMallGoodsActivityType() {
      QueryMallGoodsActivityType(this.queryForm).then(response => {
        if (JSON.parse(response.data.data).RowCnt) {
          this.ActivityTypeOptions = JSON.parse(response.data.data).Records
          console.log(this.ActivityTypeOptions, 'ActivityTypeOptions')
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
        params.RecordID = row.RecordID
        deleteMallGoodsActivity(params).then((response) => {
          if (response.data.success === true) {
            this.$message({ type: 'success', message: '删除成功!' })
            this.QueryMallGoodsActivity()
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
      this.QueryMallGoodsActivity()
    },
    handleSizeChange(size) {
      this.queryForm.limit = size
      this.QueryMallGoodsActivity()
    },
    resetForm() {
      console.log('重置方法')
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
      this.addType = false
      this.QueryMallGoodsActivity()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/container.scss'
</style>
