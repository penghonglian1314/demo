<template>
  <el-container>
    <el-header class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>

    <el-main class="main">
      <div class="query_form">
        <el-form label-width="auto" :model="queryForm" :inline="true">
          <el-form-item label="订单编号:">
            <el-input v-model="queryForm.TradeCode" clearable placeholder="请输入订单编号" />
          </el-form-item>
          <el-form-item label="客户名称:">
            <el-input v-model="queryForm.Name" clearable placeholder="请输入客户名称" />
          </el-form-item>
          <el-form-item label="客户手机号:">
            <el-input v-model="queryForm.Phone" clearable placeholder="请输入客户手机号" />
          </el-form-item>
          <el-form-item label="交易时间:" prop="TradeTime">
            <el-date-picker

              v-model="queryForm.TradeTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
              value-format="yyyyMMddHHmmss"
              @change="
                datePickerChange('TradeTime')
              "
            />
          </el-form-item>
          <!-- <el-row> -->
          <!-- <el-col :span="6">
              <el-form-item label="商户名称:">
                <el-input v-model="queryForm.BusinessName" clearable placeholder="请输入商户名称"  />
              </el-form-item>
            </el-col> -->
          <!-- <el-col :span="6">
              <el-form-item label="商品名称:">
                <el-input
                  v-model="SearchInfo"
                  placeholder="请输入商品名称"
                  clearable
                />
              </el-form-item>
            </el-col> -->
          <!-- </el-row> -->
        </el-form>
      </div>

      <div class="query_form_btn">
        <el-button type="primary" @click="queryThcTrade">
          查询
        </el-button>
        <!-- <el-button @click="resetForm">
          重置
        </el-button> -->
        <!-- <el-button type="primary" @click="add = true">
          增加
        </el-button> -->
        <!-- <el-button v-if="isAdmin" type="primary" icon="el-icon-download" @click="exportExcel">
          导出订单报价表
        </el-button> -->
      </div>

      <div class="table">
        <el-table
          :header-cell-style="{ background: 'rgba(249,250,252,1)' }"
          border
          :data="tableList"
          style="width: 100%"
        >
          <!-- <el-table-column prop="TradeID" label="交易ID" width="75" align="center" /> -->
          <!-- <el-table-column prop="TradeCode" label="交易单号" width="240" align="center" /> -->
          <!-- <el-table-column prop="ShowTitle" label="商品名称" width="100" align="center" /> -->

          <!-- <el-table-column prop="MemberID" label="用户ID" width="280" align="center" /> -->
          <el-table-column prop="Name" label="用户名" width="auto" align="center" />
          <el-table-column prop="Phone" label="手机号码" width="180" align="center" />
          <el-table-column prop="TradeTime" label="交易时间" width="170" align="center" />
          <!-- <el-table-column prop="ShopDes" label="商店名称" width="100" align="center" /> -->
          <el-table-column prop="Status" label="当前状态" width="180" align="center">
            <template slot-scope="scope">
              <span>{{ TypeMap[scope.row.Status] }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="GoodsID" label="交易商品ID" width="75" align="center" /> -->
          <!-- <el-table-column prop="Amount" label="交易数量" width="100" align="center" /> -->
          <el-table-column prop="TotalPrice" label="交易总价" width="120" align="center">
            <template slot-scope="scope">
              <span>{{ (scope.row.TotalPrice * 1).toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="TradePrice" label="优惠后总价" width="120" align="center">
            <template slot-scope="scope">
              <span>{{ (scope.row.TradePrice * 1).toFixed(2) }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="ExtParam" label="属性" width="150" align="center" /> -->
          <el-table-column prop="Remarks" label="备注" width="240" align="center" />

          <el-table-column align="center" width="310" label="操作">
            <template slot-scope="scope">
              <!-- <el-button style="color:rgb(65,150,250);" size="mini" type="text" @click="exportWord(scope.row)">
                导出报价表
              </el-button> -->
              <!-- <el-button style="color:rgb(65,150,250);" size="mini" type="text" @click="toGiftDialog(scope.row)">
                赠品详情
              </el-button> -->
              <el-button style="color:rgb(150,150,150);" size="mini" type="text" @click="toDetailDialog(scope.row)">
                订单详情
              </el-button>
              <el-button v-if="isAdmin" style="color:rgb(233,195,65);" size="mini" type="text" @click="updates(scope.row)">
                修改
              </el-button><!-- openEditDialog(scope.row) -->
              <el-button v-if="isAdmin" style="color:red;" size="mini" type="text" @click="toDelete(scope.row)">
                删除
              </el-button>
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

    <el-dialog v-if="DetailDialog" :visible.sync="DetailDialog" title="商品详情" width="50%">
      <DetailDialog :parsemsg="parsemsg" @func="close" />
    </el-dialog>

    <el-dialog v-if="update" :visible.sync="update" title="修改" width="50%">
      <update :parsemsg="parsemsg" @func="close" />
    </el-dialog>
  </el-container>
</template>

<script>
// const debounce = (func, wait) => {
//   let timer = ''
//   return v => {
//     if (timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(() => {
//       func(v)
//     }, wait)
//   }
// }

import {
  queryThcTrade,
  deleteThcTrade
} from '@/api/trade'
import add from './child-vue/add'
import update from './child-vue/update'
import DetailDialog from './child-vue/DetailDialog'
import { queryThcTradeAndGoodsBusiness } from '@/api/trade'

// import table2excel from 'js-table2excel'

// import Docxtemplater from 'docxtemplater'
// import PizZip from 'pizzip'
// import ImageModule from 'docxtemplater-image-module-free'
// import JSZipUtils from 'jszip-utils'
// import { saveAs } from 'file-saver'
import { formatYmdhms } from '@/utils/formattime'
export default {
  components: {
    add: add,
    update: update,
    DetailDialog: DetailDialog },
  data() {
    return {
      add: false,
      update: false,
      DetailDialog: false,
      parsemsg: [],
      tableList: [],
      queryForm: {
        current: 1,
        limit: 10,
        total: 0
      },
      dialogEditFormVisible: false,
      // 交易状态,0:待付款, 1:已支付(待发货),2:已发货(待收货),3:已收货: 9:已完成
      TypeMap: {
        '0': '待付款',
        '1': '已支付(待发货)',
        '2': '已发货(待收货)',
        '3': '已收货',
        '9': '已完成'
      },
      wordData: {}
      // SearchInfo: ''
    }
  },
  computed: {
    isAdmin() {
      // return JSON.parse(localStorage.getItem('roles'))[0] === '1200'
      return true
    }
  },
  // watch: {
  //   SearchInfo() {
  //     this.execQueryForm({ vm: this })
  //     // this.tableList = this.tableListClone.filter(e => e.Tel.includes(this.SearchInfo))
  //   }
  // },
  created() {
    this.queryThcTrade()
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
      // this.queryThcTrade()
    },
    toDetails(row, column, cell, event) { // 商店详情
      console.log(row.ShopID)
      this.$router.push({ path: '/business/todetails_shop.html', query: row })
      // todetails_shop.html
      console.log(column)
      console.log(cell)
      console.log(event)
    },
    toDetailDialog(row) { // 订单详情
      console.log(row.GoodsID, 'GOODSID')
      this.$router.push({ path: '/trade/trade_detail', query: row })
    },
    toGiftDialog(row) {
      this.$router.push({ path: '/trade/trade_gift', query: row })
    },
    updates(row) {
      console.log(row, 'row')
      this.update = true
      this.parsemsg = row
    },
    queryThcTrade() {
      queryThcTrade(this.queryForm).then(response => {
        this.queryForm.total = Number(JSON.parse(response.data.data).TotalSize)
        if (JSON.parse(response.data.data).RowCnt * 1) {
          this.tableList = JSON.parse(response.data.data).Records.map(e => {
            e.TradeTime = formatYmdhms(e.TradeTime)
            return e
          })
          this.queryForm.total = JSON.parse(response.data.data).TotalSize * 1
        } else {
          this.tableList = []
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
        params.TradeID = row.TradeID
        deleteThcTrade(params).then((response) => {
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
    openEditDialog(row) {
      this.editForm = {
        TradeID: row.TradeID
      }
      this.$refs.editForm && this.$refs.editForm.resetFields()
    },
    close() {
      this.add = false
      this.update = false
      this.DetailDialog = false
      this.queryThcTrade()
    },
    handleCurrentChange(current) {
      this.queryForm.current = current
      this.queryThcTrade()
    },
    handleSizeChange(size) {
      this.queryForm.limit = size
      this.queryThcTrade()
    },
    resetForm() {
    },
    // async queryThcTradeGoods() {
    //   const queryForm = {}
    //   queryForm.TradeCode = this.query.TradeCode
    //   // queryForm.ShopID = window.localStorage.getItem('ShopID')
    //   // console.log(queryForm)
    //   // const t = JSON.parse((await queryThcTradeGoods(queryForm)).data.data).Records.map(e => e.GoodsID)
    //   // console.log(t)
    //   // t.map(async e => {
    //   //   console.log(e, 'e')
    //   //   const r = await queryTabGoods({ GoodsID: e })
    //   //   console.log(r, 'r')
    //   //   if (JSON.parse(r.data.data).RowCnt * 1 === 1) { this.tableList.push(JSON.parse(r.data.data).Records[0]) }
    //   //   return 0
    //   // })
    //   this.tableList = JSON.parse((await queryThcTradeAndGoodsBusiness(queryForm)).data.data).Records
    //   console.log(this.tableList)
    // },
    async exportWord(row) {
      this.wordData = { ...row }

      this.wordData.Status = this.TypeMap[row.Status]
      const goodsList = JSON.parse((await queryThcTradeAndGoodsBusiness({ TradeCode: row.TradeCode })).data.data).Records
      this.wordData.goodsList = goodsList || []
      console.log(this.wordData)
      this.exportWords()
      return null
      // const params = {}
      // params.current = 1
      // params.limit = 400
      // queryInspection(params).then(response => {
      //   console.log(JSON.parse(response.data.data).Records)
      //   if (response.data.success) {
      //     this.queryParams.total = Number(JSON.parse(response.data.data).TotalSize)
      //     if (Number(JSON.parse(response.data.data).RowCnt)) {
      //       this.tableList = JSON.parse(response.data.data).Records
      //       this.tableList.forEach(element => {
      //         element.FileIDList = element.FileID.split(',')
      //         element.InspectionFileIDList = element.InspectionFileID.split(',')
      //       })
      //     }
      //   }
      //   this.exportWords()
      // })
    },

    // 导出列表

    exportWords(wordData, template, outputFilename) {
      const _this = this

      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent('./doc/1.docx', function(error, content) {
      // gy-agree-service.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
      // 抛出异常
        console.log(error, content)
        if (error) {
          console.log('err', error)
          throw error
        }
        var opts = {}
        opts.centered = false
        opts.getImage = function(tagValue, image) {
          return new Promise(function(resolve, reject) {
            JSZipUtils.getBinaryContent(tagValue, function(error, content) {
              if (error) {
                return reject(error)
              }
              return resolve(content)
            })
          })
        }
        // 图片有关代码，没有图片的可以删除
        opts.getSize = function(img, tagValue, tagName) {
          // FOR FIXED SIZE IMAGE :
          return [60, 60]// 图片大小 （这个可以写成动态的，开发文档上有）
          // return new Promise(function(resolve, reject) {
          //   var image = new Image()
          //   image.src = url
          //   image.onload = function() {
          //     resolve([image.width, image.height])
          //   }
          //   image.onerror = function(e) {
          //     console.log('img, tagValue, tagName : ', img, tagValue, tagName)
          //     reject(e)
          //   }
          // })
        }
        var imageModule = new ImageModule(opts)
        // 创建一个PizZip实例，内容为模板的内容
        // const zip = new PizZip(content)
        var zip = new PizZip(content)
        console.log(content, zip)
        // 创建并加载docxtemplater实例对象
        // const doc = new Docxtemplater().loadZip(zip)
        var doc = new Docxtemplater()
          .loadZip(zip)
          .attachModule(imageModule)
          .compile()

        // 设置模板变量的值
        // _this.wordData

        console.log('unready', _this.wordData)
        // 需要上传图片需要resolveData
        doc.resolveData({
          ...(_this.wordData)
        }).then(function() {
          console.log('ready')
          doc.render()
          const out = doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          })
          // 将目标文件对象保存为目标类型的文件，并命名
          saveAs(out, '订单报价表.docx')
        })
        // try {
        //   doc.setData({
        //     ...(_this.wordData)
        //   })
        // } catch (error) {
        //   console.log('setData err')
        // }

        // console.log('ready', doc)
        // doc.render()
        // const out = doc.getZip().generate({
        //   type: 'blob',
        //   mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        // })
        // // 将目标文件对象保存为目标类型的文件，并命名
        // saveAs(out, '订单报价表.docx')
      })
    }

  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/container.scss'
</style>
