<template>
  <el-container>
    <el-header class="breadcrumb">
      <el-breadcrumb>
        <!-- <el-breadcrumb-item>物料管理</el-breadcrumb-item> -->
        <el-breadcrumb-item>咨讯管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>

    <el-main class="main">
      <div class="query_form">
        <el-form label-width="auto" :model="queryForm" :inline="true">
          <el-row>
            <el-col :span="6">
              <el-form-item label="咨讯标题:">
                <el-input v-model="queryForm.ArticleTitle" placeholder="请输入咨讯标题" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="query_form_btn">
        <el-button type="primary" @click="execQueryForm">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="addarticle()">增加</el-button>
      </div>

      <div class="table">
        <el-table
          :header-cell-style="{ background: 'rgba(249,250,252,1)' }"
          border
          :data="tableList"
          style="width: 100%"
        >
          <el-table-column
            prop="ArticleID"
            label="咨讯编号"
            align="center"
          />
          <el-table-column
            prop="ArticleTitle"
            label="咨讯标题"
            align="center"
          />
          <!-- GoodsClassID -->
          <el-table-column
            prop="CreateTime"
            label="创建时间"
            align="center"
          />
          <el-table-column
            prop="Priority"
            label="咨讯优先级"
            align="center"
          />
          <el-table-column
            prop="DetailsFileUrl"
            label="咨讯内容"
            align="center"
          />
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <!-- <el-button style="color:rgb(150,150,150);" size="mini" type="text" @click="GoodsOfferRecords(scope.row)">竞价</el-button> -->
              <el-button style="color:rgb(233,195,65);" size="mini" type="text" @click="Updatearticle(scope.row)">修改</el-button>
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
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-main>

    <el-dialog v-if="add" :visible.sync="add" title="增加文章咨讯" width="50%">
      <add :parentmsg="parentmsg" @func="close" />
    </el-dialog>
    <el-dialog v-if="update" :visible.sync="update" title="修改" width="50%">
      <update :parentmsg="parentmsg" @func="close" />
    </el-dialog>
    <!-- <el-dialog title="添加" width="50%" />

 -->

  </el-container>
</template>

<script>
import {
  queryMallArticle, deleteMallArticle
} from '@/api/article'//
import add from './child/addarticle'
import update from './child/updatearticle'
// import GoodsOfferRecord from './child-vue/GoodsOfferRecord'
export default {
  components: {
    add,
    update
  },
  data() {
    return {
      update: false,
      GoodsOfferRecord: false,
      add: false,
      parsemsg: [],
      FhumbnailFileIDArr: [],
      IsShelves: '',
      tableList: [],
      tableLists: [],
      loading: false,
      labelPosition: 'right',
      queryForm: {
        current: 1,
        limit: 10,
        TotalSize: 0,
        total: 0
      },
      imgUrl: BASE_API.SERVER_IP + '/lxy_mall/file.action?fileUrl=', // http://192.168.1.143:8088/lxy_mall/file.action?fileUrl=
      dialogAddFormVisible: false,
      addForm: {},
      dialogDetailFormVisible: false,
      detailForm: {},
      dialogEditFormVisible: false,

      provOption: [],
      cityOption: [],
      distOption: []
    }
  },
  created() {
    this.QueryMallArticle()
    // this.queryTrees()
  },
  methods: {
    execQueryForm() {
      queryMallArticle(this.queryForm).then(res => {
        if (JSON.parse(res.data.data).RowCnt) {
          this.tableList = JSON.parse(res.data.data).Records
          this.queryForm.TotalSize = parseInt(JSON.parse(res.data.data).TotalSize)
          // console.log(this.tableList)
        }
      })
    },
    handleCurrentChange(current) {
      this.queryForm.current = current
      this.QueryMallArticle()
    },
    handleSizeChange(size) {
      this.queryForm.limit = size
      this.QueryMallArticle()
    },
    addarticle() {
      this.add = true
    },
    GoodsOfferRecords(row) {
      this.GoodsOfferRecord = true
      this.parsemsg = row
    },
    Updatearticle(row) {
      // // console.log(row, 'updategoods,row')
      // this.$router.push({ path: '/goods/updategoods.html', query: row })
      this.update = true
      this.parentmsg = row
      // console.log(row, '111')
    },
    QueryMallArticle() {
      const params = {}
      queryMallArticle(params).then(response => {
        if (JSON.parse(response.data.data).RowCnt) {
          this.tableList = JSON.parse(response.data.data).Records
          this.queryForm.TotalSize = parseInt(JSON.parse(response.data.data).TotalSize)
          // console.log(this.tableList)
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
      // console.log(row)
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {}
        params.ArticleID = row.ArticleID
        deleteMallArticle(params).then((response) => {
          if (response.data.success === true) {
            this.$message({ type: 'success', message: '删除成功!' })
            this.QueryMallArticle()
          } else {
            this.$message({ type: 'error', message: '删除失败!' })
          }
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    },
    // 修改界面
    // openEditDialog(row) {
    //   this.editForm = {
    //     GoodsID: row.GoodsID,
    //     GoodsClassID: row.GoodsClassID,
    //     BrandModelCode: row.BrandModelCode,
    //     Weigth: row.Weigth,
    //     Unit: row.Unit,
    //     IsShelves: row.IsShelves,
    //     ReferPrice: row.ReferPrice,
    //     ChargeType: row.ChargeType,
    //     Price: row.Price,
    //     Profiles: row.Profiles,
    //     ExtParam: row.ExtParam,
    //     Remarks: row.Remarks,
    //     FhumbnailFileID: row.FhumbnailFileID
    //   }
    //   // console.log(row.GoodsClassID, '7777777777777')
    //   this.editForm.NewFhumbnailFileID = row.FhumbnailFileID
    //   this.fileList = [{ name: '', url: '' }]
    //   this.fileList[0].url = this.imgUrl + row.FhumbnailFileID
    //   this.dialogEditFormVisible = true
    //   this.$refs.editForm && this.$refs.editForm.resetFields()
    // },
    close() {
      this.add = false
      // this.update = false
      // this.GoodsOfferRecord = false
      this.QueryMallArticle()
    },

    // --------------------------------------商品属性
    returnExtParams(value) {
      // // console.log(value)
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
        // console.log(item)
        StringLine = item + ';' + StringLine
      })
      radioArray.forEach(item => {
        StringLine = item + ';' + StringLine
      })
      radioChildArray.forEach(item => {
        // console.log(typeof item)
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
