<template>
  <div id="zf-select">
    <!-- 跳转链接相关开始 -->
    <el-row class="row">
      <!-- <el-col :span="8">
        跳转链接：
      </el-col> -->
      <el-col :span="16">
        <el-select
          v-model="link2key"
          placeholder="请选择跳转链接"
          @change="selectChange"
        >
          <el-option
            v-for="(item, key) in imgLinkObj"
            :key="key"
            :label="item.title"
            :value="key"
          />
        </el-select>
      </el-col>
    </el-row>
    <!-- 绑定到自定义页面 -->
    <el-row v-show="ciVisible">
      <!-- <el-col :span="8">
        链接地址：
      </el-col> -->
      <el-col :span="16">
        <el-input :placeholder="ciLabel" :disabled="true" clearable />
      </el-col>
    </el-row>
    <!-- 绑定到手动页面 -->
    <el-row v-show="iiVisible">
      <!-- <el-col :span="8">
        链接地址：
      </el-col> -->
      <el-col :span="16">
        <el-input
          v-model="iimgLink"
          clearable
          placeholder="输入网址"
          @blur="handleblur"
        />
      </el-col>
    </el-row>
    <!-- 绑定到商品详情页面 -->
    <el-row v-show="diVisible">
      <!-- <el-col :span="8">
        商品名称：
      </el-col> -->
      <el-col :span="16">
        <el-input :placeholder="diLabel" :disabled="true" clearable />
      </el-col>
    </el-row>

    <!-- 跳转链接相关弹框 -->
    <el-dialog append-to-body title="自定义页面" :visible.sync="cVisible">
      <el-table :data="customLinkData">
        <el-table-column property="title" label="页面标题" width="150" />
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              style="color:rgb(150,150,150);"
              size="mini"
              type="text"
              @click="cbtnSubmit(scope.row)"
            >
              选择
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          :page-sizes="[5, 10, 20, 30]"
          :page-size="pageQueryForm.limit"
          :total="pageQueryForm.total"
          :current-page="pageQueryForm.current"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="chandleSizeChange"
          @current-change="chandleCurrentChange"
        />
      </div>
    </el-dialog>

    <el-dialog append-to-body title="商品列表" :visible.sync="dVisible">
      <el-table :data="goodList">
        <el-table-column
          prop="GoodsID"
          label="商品ID"
          width="75"
          align="center"
        />
        <el-table-column
          prop="ShowTitle"
          label="商品名称"
          width="100"
          align="center"
        />
        <!-- GoodsClassID -->
        <el-table-column
          prop="ItemType"
          label="商品分类"
          width="150"
          align="center"
        />
        <el-table-column
          prop="FhumbnailFileID"
          label="封面图片"
          width="250"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.FhumbnailFileID === ''" />
            <img
              v-else
              :alt="scope.row.FhumbnailFileID"
              :src="scope.row.FhumbnailFileID"
              width="80%"
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <el-button
              style="color:rgb(150,150,150);"
              size="mini"
              type="text"
              @click="gbtnSubmit(scope.row)"
            >
              选择
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          :page-sizes="[5, 10, 20, 30]"
          :page-size="goodQueryForm.limit"
          :total="goodQueryForm.total"
          :current-page="goodQueryForm.current"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="ghandleSizeChange"
          @current-change="ghandleCurrentChange"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { PromiseRequest } from '@/api/promise_api'
import { queryTabGoods } from '@/api/goods'
export default {
  props: {
    imgLink: { type: String, default: '' },
    emitflag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      imgLinkObj: [
        { title: '无链接', urls: '', key: 0 },
        { title: '自定义页面', urls: 'pages/customize/customize', key: 1 },
        { title: '商品详情页', urls: 'pages/goodsnews/goodsnews', key: 2 },
        { title: '购物车', urls: 'pages/shopcar/shopcar', key: 3 },
        { title: '个人中心', urls: 'pages/mine/mine', key: 4 },
        { title: '手动页面', urls: '', key: 5 }
      ],
      customLinkData: [],
      //   自定义页面弹窗
      cVisible: false,
      //   商品详情页面弹窗
      dVisible: false,
      //   手写页面的输入框值
      iimgLink: '',
      goodList: [],
      goodQueryForm: {
        current: 1,
        limit: 10,
        total: 0
      },
      pageQueryForm: {
        current: 1,
        limit: 5,
        total: 0
      }
    }
  },
  computed: {
    link2key: {
      get() {
        const imgLink = this.imgLink
        let res = null
        if (imgLink === '') {
          return 0
        } else {
          const temp = this.imgLinkObj.slice(1, -1)
          res =
            temp.findIndex(e => {
              return imgLink.includes(e.urls)
            }) + 1
        }
        if (res === 0) res = this.imgLinkObj.length - 1
        return res
      },
      set(val) {
        // 交给el-select的change事件处理
      }
    },
    // 自定义页面输入框是否显示
    ciVisible() {
      return this.link2key === 1
    }, // 手写页面输入框是否显示
    iiVisible() {
      return this.link2key === 5
    }, // 商品详情页面输入框是否显示
    diVisible() {
      return this.link2key === 2
    },
    // 自定义页面输入框占位符
    ciLabel() {
      // console.log(this.customLinkData)
      // this.customLinkData.length !== 0 &&
      if (
        this.link2key === 1 &&
        this.customLinkData.findIndex(e => e.urls === this.imgLink) !== -1
      ) {
        // console.log(
        //   this.customLinkData.filter(e => e.urls === this.imgLink)[0].title
        // )
        return this.customLinkData.filter(e => e.urls === this.imgLink)[0]
          .title
      } else {
        return ''
      }
    },
    // 商品详情页面输入框占位符
    diLabel() {
      if (
        this.link2key === 2 &&
        this.goodList.length > 0 &&
        this.imgLink.split('?').length > 1
      ) {
        return this.goodList.filter(
          e => e.GoodsID === this.imgLink.split('?')[1].split('=')[1]
        )[0].ShowTitle
      } else {
        return ''
      }
    }
  },
  async created() {
    console.log('---', this.imgLink)
    this.iimgLink = this.imgLink
    await this.getPageInfo()
    await this.getTabGoods()
    // --------------------------
    if (this.emitflag) {
      this.$emit('emitUrl2str', (url) => {
        let res = null
        if (url === '') {
          res = 0
        } else {
          const temp = this.imgLinkObj.slice(1, -1)
          res =
            temp.findIndex(e => {
              return url.includes(e.urls)
            }) + 1 ? temp.findIndex(e => {
                return url.includes(e.urls)
              }) + 1 : this.imgLinkObj.length - 1
        }
        switch (res) {
        // 自定义页面
          case 1:
            console.log(this.customLinkData)
            console.log(this.customLinkData.filter(e => e.urls === url)[0]
              .title)
            return this.imgLinkObj[res].title + ' ' + (this.customLinkData.filter(e => e.urls === url)[0]
              .title)
            // 手写页面
          case 5:
            console.log(url)
            return this.imgLinkObj[res].title + ' ' + url
            // 商品详情页面
          case 2:
            console.log(this.goodList)
            console.log(this.goodList.filter(
              e => e.GoodsID === url.split('?')[1].split('=')[1]
            )[0].ShowTitle)
            return this.imgLinkObj[res].title + ' ' + (this.goodList.filter(
              e => e.GoodsID === url.split('?')[1].split('=')[1]
            )[0].ShowTitle)

          default:
            return this.imgLinkObj[res].title
        }
      }
      )
    }
  },
  methods: {
    // 自定义页面弹窗提交按钮
    cbtnSubmit(row) {
      // this.imgLinkObj.push(row)
      // this.imgLink = 'pages/customize/customize?PageID=' + row.PageID
      //   this.imgLink = row.urls
      this.$emit('setImgLink', row.urls)
      this.close()
    },

    // 商品详情页面弹窗提交按钮
    gbtnSubmit(row) {
      // 此处对商品页面url拼接
      //   this.imgLink = this.imgLinkObj[2].urls + '?GoodsID=' + row.GoodsID
      this.$emit(
        'setImgLink',
        this.imgLinkObj[2].urls + '?GoodsID=' + row.GoodsID
      )
      this.close()
    },
    selectChange(value) {
      this.close()
      //   this.imgLink = this.imgLinkObj[value].urls
      this.$emit('setImgLink', this.imgLinkObj[value].urls)
      switch (value) {
        // 自定义页面
        case 1:
          this.cVisible = true
          // 赋初值
          // this.imgLink = this.customLinkData[0].urls
          break

        // 手写页面
        case 5:
          this.iimgLink = ''
          //   this.imgLink = '#'
          this.$emit('setImgLink', '#')
          break

        // 商品详情页面
        case 2:
          this.dVisible = true
          break
        default:
          break
      }
    },
    close() {
      this.cVisible = false
      this.dVisible = false
    },
    handleblur() {
      this.$emit('setImgLink', this.iimgLink)
      //   this.imgLink = this.iimgLink
    },
    getTabGoods() {
      return queryTabGoods(this.goodQueryForm).then(response => {
        if (response.data.success) {
          this.goodQueryForm.total = Number(
            JSON.parse(response.data.data).TotalSize
          )
          if (JSON.parse(response.data.data).RowCnt) {
            this.goodList = JSON.parse(response.data.data).Records
          }
        }
      })
    },
    getPageInfo() {
      return PromiseRequest(
        '/lxy_mall/queryPageInfo.action',
        this.pageQueryForm
      ).then(response => {
        if (response.success) {
          this.pageQueryForm.total = Number(
            JSON.parse(response.data).TotalSize
          )
          if (JSON.parse(response.data).RowCnt) {
            console.log(JSON.parse(response.data))
            if (JSON.parse(response.data).Records) {
              this.customLinkData = JSON.parse(response.data).Records.map(e => {
                const temp = {}
                temp.title = e.NavBarTitle
                temp.urls = 'pages/customize/customize?PageID=' + e.PageID
                return temp
              })
            } else {
              this.customLinkData = []
            }
          }
        }
      })
    },
    ghandleCurrentChange(current) {
      this.goodQueryForm.current = current
      this.getTabGoods()
    },
    ghandleSizeChange(val) {
      this.goodQueryForm.limit = val
      this.getTabGoods()
    },
    chandleCurrentChange(current) {
      this.pageQueryForm.current = current
      this.getPageInfo()
    },
    chandleSizeChange(val) {
      this.pageQueryForm.limit = val
      this.getPageInfo()
    }
  }
}
</script>

<style lang='scss' scoped>
// #zf-select {
.el-row {
  margin-left: 5px;
  margin-bottom: 10px;
  width: 100%;
  // color: #f0f;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  letter-spacing: 1px;
  //   color: #f00;
}
.el-input {
  width: 100%;
  max-width: 200px;
}
// }
</style>
