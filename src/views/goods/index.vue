<template>
  <el-container>
    <el-header class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>

    <el-main class="main">
      <div class="query_form">
        <el-form label-width="auto" :model="queryForm" :inline="true">
          <el-row>
            <!-- <el-col :span="6">
              <el-form-item label="商户名称:">
                <el-input v-model="queryForm.BusinessName" clearable placeholder="请输入商户名称" @clear="empty_query()" @input="empty_query()" />
              </el-form-item>
            </el-col>  -->
            <el-col :span="5">
              <el-form-item label="商品名称:">
                <el-input v-model="queryForm.ShowTitle" clearable placeholder="请输入商品名称" @clear="empty_query()" @input="empty_query()" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="是否上架:" prop="IsShelves">
                <el-select
                  v-model="queryForm.IsShelves"
                  clearable
                  placeholder="请选择是否上架"
                  @change="empty_query()"
                >
                  <el-option
                    v-for="(item, key) in ['是', '否']"
                    :key="key"
                    :label="item"
                    :value="key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发布时间:" prop="CreationTime">
                <el-date-picker

                  v-model="queryForm.CreationTime"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']"
                  value-format="yyyyMMddHHmmss"
                  @change="
                    datePickerChange('CreationTime')
                  "
                />
              </el-form-item>
            </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="商品分类:" prop="GoodsClassID">
              <el-select v-model="queryForm.GoodsClassID" clearable placeholder="请选择商品分类" @clear="empty_query()" @input="empty_query()">
                <el-option
                  v-for="item in GoodsClassIDOptions"
                  :key="item.GoodsClassID"
                  :label="item.Title"
                  :value="item.ItemCode"
                />
              </el-select>
            </el-form-item>
          </el-col> -->
          </el-row>

        </el-form>
      </div>

      <div class="query_form_btn">
        <!-- <el-button type="primary" @click="queryTabGoods">查询</el-button>
        <el-button @click="resetForm">重置</el-button> -->
        <!-- <el-button type="primary" @click="addgoods()">增加</el-button>  --> <!-- 管理员无添加功能 -->
      </div>

      <div class="table">
        <el-table
          :header-cell-style="{ background: 'rgba(249,250,252,1)' }"
          border
          :data="tableList"
          style="width: 100%"
        >
          <!-- <el-table-column prop="GoodsID" label="商品ID" width="75" align="center" /> -->
          <el-table-column prop="FhumbnailFileID" label="封面图片" align="center" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.FhumbnailFileID === ''" />
              <img
                v-else
                :src="scope.row.FhumbnailFileID"
                width="100%"
                style="cursor: pointer;"
                alt
              >
            </template>
          </el-table-column>
          <el-table-column prop="ShowTitle" label="商品名称" width="auto" align="center" />
          <!-- <el-table-column prop="GoodsClassIDName" label="商品分类" width="150" align="center" /> -->
          <el-table-column prop="ItemType" label="商品分类" width="150" align="center" />
          <el-table-column prop="Price" label="售价" width="100" align="center" />
          <!-- <el-table-column prop="BusinessName" label="商户名称" width="100" align="center" /> -->
          <!-- <el-table-column prop="BusinessID" label="商户ID" width="100" align="center" />
          <el-table-column prop="ShopID" label="商店ID" width="100" align="center" /> -->
          <!-- <el-table-column prop="BrandModelCodeName" label="品牌型号编码" width="130" align="center" /> -->
          <el-table-column prop="IsShelves" label="是否上架" width="100" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.IsShelves === '0'">是</span>
              <span v-if="scope.row.IsShelves === '1'">否</span>
            </template>
          </el-table-column>
          <el-table-column prop="ReferPrice" label="参考价格" width="100" align="center" />
          <!-- <el-table-column prop="Margin" label="保证金" width="100" align="center" /> -->
          <el-table-column prop="ChargeType" label="计价类型" width="100" align="center">
            <template slot-scope="scope">
              <span>{{ ChargeTypeMap[scope.row.ChargeType] }}</span>  <!-- 计价类型，0:基本价格,1: 规格计价, 3:竞价模式 -->
            </template>
          </el-table-column>
          <el-table-column prop="Weigth" label="重量(吨)" width="100" align="center" />
          <!-- <el-table-column prop="ExtParam" label="商品属性" width="100" align="center">
            <template slot-scope="scope">
              <span>{{ returnExtParams(scope.row.ExtParam) }}</span>
            </template>
          </el-table-column> -->
          <el-table-column align="center" width="300" label="操作">
            <template slot-scope="scope">
              <!-- <el-button style="color:rgb(150,150,150);" size="mini" type="text" @click="GoodsOfferRecords(scope.row)">竞价</el-button> -->
              <!-- <el-button style="color:rgb(233,195,65);" size="mini" type="text" @click="updategoods(scope.row)">修改</el-button> -->
              <el-button style="color:rgb(21,203,178);" size="mini" type="text" @click="toDetail(scope.row)">
                详情
              </el-button>
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

    <!-- <el-dialog title="添加" width="50%" />

    <el-dialog v-if="update" :visible.sync="update" title="修改" width="50%">
      <update :parsemsg="parsemsg" @func="close" />
    </el-dialog> -->

    <el-dialog v-if="GoodsOfferRecord" :visible.sync="GoodsOfferRecord" title="竞价" width="50%">
      <GoodsOfferRecord :parsemsg="parsemsg" @func="close" />
    </el-dialog>

  </el-container>
</template>

<script>
import {
  queryTabGoods,
  deleteTabGoods
} from '@/api/goods'//
// import update from './child-vue/update'
import GoodsOfferRecord from './child-vue/GoodsOfferRecord'
import upi from '@/mixins/ImgUpload'
export default {
  components: {
    // update: update,
    GoodsOfferRecord: GoodsOfferRecord }, mixins: [upi],
  data() {
    return {
      update: false,
      GoodsOfferRecord: false,
      parsemsg: [],
      FhumbnailFileIDArr: [],
      IsShelves: '',
      tableList: [],
      loading: false,
      labelPosition: 'right',
      queryForm: {
        current: 1,
        limit: 10,
        TotalSize: 0,
        total: 0
      },

      addForm: {},
      dialogDetailFormVisible: false,
      detailForm: {},
      dialogEditFormVisible: false,

      provOption: [],
      cityOption: [],
      distOption: [],
      ChargeTypeMap: {
        '0': '基本价格',
        '1': '规格计价',
        '3': '竞价模式'
      }
    }
  },
  created() {
    this.queryTabGoods()
  },
  methods: {
    datePickerChange(key, newKeys = ['StartTime', 'EndTime']) {
      if (this.queryForm[key]) {
        newKeys.forEach((newkey, index) => {
          this.queryForm[newkey] = this.queryForm[key][index]
        })
        // delete this.queryForm[key]
      } else {
        newKeys.forEach((newkey, index) => {
          delete this.queryForm[newkey]
        })
      }
      this.queryTabGoods()
    },
    toDetail(row) {
      this.$router.push({ path: '/goods/todetails_goods.html', query: { GoodsID: row.GoodsID }})
    },
    addgoods() {
      console.log('addgoods')
      this.$router.push({ path: '/goods/addgoods.html' })
    },
    GoodsOfferRecords(row) {
      this.GoodsOfferRecord = true
      this.parsemsg = row
    },
    updategoods(row) {
      console.log(row, 'updategoods,row')
      this.$router.push({ path: '/goods/updategoods.html', query: row })
    },
    empty_query() {
      console.log('清空触发查询')
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
    },
    resetForm() {
      console.log('重置方法')
    },
    execQueryForm() {
    },
    queryTabGoods() {
      queryTabGoods(this.queryForm).then(response => {
        if (JSON.parse(response.data.data).RowCnt) {
          this.tableList = JSON.parse(response.data.data).Records
          console.log(this.tableList)
          this.queryForm.TotalSize = JSON.parse(response.data.data).TotalSize * 1
        }
      })
    },
    // openAddDialog() {
    //   this.addForm = {}
    //   this.dialogAddFormVisible = true
    //   this.$refs.addForm && this.$refs.addForm.resetFields()
    // },
    // 删除界面
    toDelete(row) {
      console.log(row)
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {}
        params.GoodsID = row.GoodsID
        deleteTabGoods(params).then((response) => {
          if (response.data.success === true) {
            this.$message({ type: 'success', message: '删除成功!' })
            this.queryTabGoods()
            this.deleteImg(row.FhumbnailFileID)
            row.PictureFileIDs.split(',').map(e => this.deleteImg(e))
          } else {
            this.$message({ type: 'error', message: '删除失败!' })
          }
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    },
    // 修改界面
    openEditDialog(row) {
      this.editForm = {
        GoodsID: row.GoodsID,
        GoodsClassID: row.GoodsClassID,
        BrandModelCode: row.BrandModelCode,
        Weigth: row.Weigth,
        Unit: row.Unit,
        IsShelves: row.IsShelves,
        ReferPrice: row.ReferPrice,
        ChargeType: row.ChargeType,
        Price: row.Price,
        Profiles: row.Profiles,
        ExtParam: row.ExtParam,
        Remarks: row.Remarks,
        FhumbnailFileID: row.FhumbnailFileID
      }
      console.log(row.GoodsClassID, '7777777777777')
      this.editForm.NewFhumbnailFileID = row.FhumbnailFileID
      // this.fileList = [{ name: '', url: '' }]
      // this.fileList[0].url = row.FhumbnailFileID
      this.dialogEditFormVisible = true
      this.$refs.editForm && this.$refs.editForm.resetFields()
    },
    close() {
      // this.add = false
      // this.update = false
      this.GoodsOfferRecord = false
      this.queryTabGoods()
    },

    // --------------------------------------商品属性
    returnExtParams(value) {
      // console.log(value)
      if (value === null || value === '') {
        return
      }
      var StringLine = ''
      const reg = /\\/g
      var ExtParam = value.replace(reg, '')
      var inputArray = JSON.parse(ExtParam).inputArray
      var radioArray = JSON.parse(ExtParam).radioArray
      var radioChildArray = JSON.parse(ExtParam).radioChildArray
      var checkListArray = JSON.parse(ExtParam).checkListArray
      inputArray.forEach(item => {
        console.log(item)
        StringLine = item + ';' + StringLine
      })
      radioArray.forEach(item => {
        StringLine = item + ';' + StringLine
      })
      radioChildArray.forEach(item => {
        console.log(typeof item)
        if (typeof item === 'string') {
          StringLine = item + ';' + StringLine
          return
        }
        if (item instanceof Array) {
          item.forEach(element => {
            StringLine = element + ';' + StringLine
          })
          return
        }
      })
      checkListArray.forEach(item => {
        if (typeof item === 'string') {
          StringLine = item + ';' + StringLine
          return
        }
        if (item instanceof Array) {
          item.forEach(element => {
            StringLine = element + ';' + StringLine
          })
        }
      })
      return StringLine
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/container.scss'
</style>
