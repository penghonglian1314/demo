
<template>
  <el-container class="dialog_main">
    <el-main>
      <el-form ref="addForm" label-width="auto" :inline="true" :model="addForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否上架:" prop="IsOnShelves">
              <el-switch
                v-model="addForm.IsOnShelves"
                active-color="#909399"
                inactive-color="#409EFF"
                active-value="0"
                inactive-value="1"
                active-text="不上架"
                inactive-text="上架"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="活动类型：" prop="ActivityType">
              <el-select v-model="addForm.ActivityType" clearable placeholder="请选活动类型" :style="{width: '100%'}">
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

        <el-row>
          <el-col :span="12">
            <el-form-item label="商品名称:">
              <el-input v-model="ReferenceName" auto-complete="off" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" @click="toqueryNode()">
              点击搜索
            </el-button>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="15">
            <el-form-item label="优先级：" prop="Priority">
              <!-- <el-input v-model="addForm.Priority" placeholder="请输入优先级，数字越小优先级越高，默认50" show-word-limit clearable :style="{width: '200%'}" /> -->
              <el-input-number v-model="addForm.Priority" :min="1" :max="50" controls-position="right" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="close">
          取 消
        </el-button>
        <el-button type="primary" @click="addMallGoodsActivity">
          确 定
        </el-button>
      </div>
    </el-main>

    <el-dialog
      v-if="queryNode"
      :visible.sync="queryNode"
      title="搜索商品"
      width="50%"
      center
      append-to-body
    >
      <div class="query_form">
        <el-form label-width="auto" :model="queryForm" :inline="true">
          <el-row>
            <el-col :span="6">
              <el-form-item label="商品名称:">
                <el-input v-model="queryForm.ShowTitle" clearable placeholder="请输入商品名称" @clear="empty_query()" @input="empty_query()" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-table
        border
        :data="GoodsIDOptions"
      >
        <el-table-column prop="GoodsID" label="商品ID" width="75" align="center" />
        <el-table-column prop="ShowTitle" label="商品名称" width="150" align="center" />
        <el-table-column prop="ItemType" label="商品分类" width="150" align="center" />
        <el-table-column prop="IsShelves" label="是否上架" width="100" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.IsShelves === '0'">是</span>
            <span v-if="scope.row.IsShelves === '1'">否</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button style="color:rgb(233,195,65);" size="mini" type="text" @click="submitReferees(scope.row)">
              确定
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
    </el-dialog>
  </el-container>
</template>
<script>

import {
  addMallGoodsActivity,
  QueryMallGoodsActivityType
} from '@/api/activity'
import {
  queryTabGoods
} from '@/api/goods'
export default {
  data() {
    return {
      ReferenceName: '',
      ActivityTypeOptions: [],
      GoodsIDOptions: [],
      addForm: {
        Priority: 50
      },
      queryForm: {
        current: 1,
        limit: 10,
        TotalSize: 0,
        total: 0
      },
      queryNode: false,
      rules: {
      }
    }
  },
  created() {
    this.QueryMallGoodsActivityType()
  },
  methods: {
    submitReferees(row) {
      // console.log(row.GoodsID, 'GoodsID')
      // console.log(row.ShowTitle, 'ShowTitle')
      this.addForm.GoodsID = row.GoodsID
      this.addForm.ShopID = row.ShopID
      this.ReferenceName = row.ShowTitle
      this.queryNode = false
    },
    toqueryNode() {
      console.log('toqueryNode')
      this.queryNode = true
      this.queryTabGoods()
    },
    addMallGoodsActivity() {
      // console.log(this.addForm, 'adddddddddddddd')
      // this.addForm.ShopID = 4
      addMallGoodsActivity(this.addForm).then(response => {
        if (response.data.success) {
          this.$message({ message: '添加成功', type: 'success' })
          this.close()
        } else {
          this.$message({ message: '添加失败', type: 'error' })
        }
      })
    },
    close() {
      this.$emit('func', 'close')
    },
    QueryMallGoodsActivityType() {
      QueryMallGoodsActivityType(this.queryForm).then(response => {
        if (JSON.parse(response.data.data).RowCnt) {
          this.ActivityTypeOptions = JSON.parse(response.data.data).Records
          console.log(this.ActivityTypeOptions, 'ActivityTypeOptions')
        }
      })
    },
    queryTabGoods() {
      queryTabGoods(this.queryForm).then(response => {
        if (JSON.parse(response.data.data).RowCnt) {
          this.GoodsIDOptions = JSON.parse(response.data.data).Records
          this.queryForm.TotalSize = JSON.parse(response.data.data).TotalSize * 1
        }
      })
    },
    empty_query() {
      console.log('触发查询')
      this.queryTabGoods()
      // @clear="empty_query()"
    },
    handleCurrentChange(current) {
      this.queryForm.current = current
      this.queryTabGoods()
    },
    handleSizeChange(size) {
      this.queryForm.limit = size
      this.queryTabGoods()
    }
  }
}
</script>
<style>

.ruleForm .el-form-item__error {
  color: #F56C6C;
    font-size: 12px;
    line-height: 7px;
    /* padding-top: 4px; */
    position: absolute;
    top: 11px;
    left: 400px;
    width: 200px;
    text-align: left;
}

</style>

