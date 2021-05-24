<template>
  <el-container style=" height:100%">
    <el-main>
      <el-form ref="tableList" label-width="200px" :model="tableList" :rules="rules" class="demo-form-inline" size="medium" label-position="right">
        <!-- 基础信息 -->
        <el-card class="topNews">
          <el-row class="steps">
            <h2 class="newsDetail" style="margin:0">
              商品详情
            </h2>
            <div class="button">
              <!-- <el-button @click="submit()">保存</el-button> -->
              <el-button @click="goBack">
                返回
              </el-button>
            </div>
          </el-row>
        </el-card>

        <el-tabs v-model="activeName">
          <el-tab-pane label="基本信息" name="first">
            <el-card class="baseNews">
              <el-row type="flex" class="row-bg">
                <el-col :span="24" align="middle">
                  商品基础信息
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品ID:" prop="GoodsID">
                    <el-input v-model="message.GoodsID" disabled :style="{width: '50%'}" prefix-icon="el-icon-chat-line-square" />
                    <!-- {{ tableList.BusinessName }} -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品名称:" prop="ShowTitle">
                    <el-input v-model="tableList.ShowTitle" disabled :style="{width: '50%'}" prefix-icon="el-icon-chat-line-square" />
                    <!-- {{ tableList.BusinessName }} -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="上架时间:" prop="ShelvesTime">
                    <el-input v-model="tableList.ShelvesTime" disabled :style="{width: '50%'}" prefix-icon="el-icon-time" />
                    <!-- {{ tableList.ShelvesTime }} -->
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :span="12">
                  <el-form-item label="行驶证:" prop="ProductCode">
                    <el-input v-model="tableList.ProductCode" disabled :style="{width: '50%'}" prefix-icon="el-icon-postcard" />
                  </el-form-item>
                </el-col>
              </el-row> -->
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品分类:" prop="ItemType">
                    <el-input v-model="tableList.ItemType" disabled :style="{width: '50%'}" prefix-icon="el-icon-files" />
                    <!-- {{ tableList.ItemType }} -->
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :span="12">
                  <el-form-item label="商品类型:" prop="ProductType">
                    <el-input v-model="tableList.ProductType" disabled :style="{width: '50%'}" prefix-icon="el-icon-notebook-2" />

                  </el-form-item>
                </el-col>
              </el-row> -->
              <!-- <el-row>
                <el-col :span="12">
                  <el-form-item label="品牌型号编码:" prop="BrandModelCode">
                    <el-input v-model="tableList.BrandModelCode" disabled :style="{width: '50%'}" prefix-icon="el-icon-s-order" />

                  </el-form-item>
                </el-col>
              </el-row> -->
              <el-row>
                <el-col :span="12">
                  <el-form-item label="重量:" prop="Weigth">
                    <el-input v-model="tableList.Weigth" disabled :style="{width: '50%'}" prefix-icon="el-icon-s-data">
                      <!-- {{ tableList.Weigth }} -->
                      <template slot="append">
                        千克
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="是否上架:" prop="IsShelves">
                    <el-input v-model="TypeMap[tableList.IsShelves]" disabled :style="{width: '50%'}" prefix-icon="el-icon-turn-off" />
                    <!-- {{ tableList.IsShelves }} -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="参考价格:" prop="ReferPrice">
                    <el-input v-model="tableList.ReferPrice" disabled :style="{width: '50%'}" prefix-icon="el-icon-coin">
                      <template slot="append">
                        元
                      </template>
                    </el-input>
                    <!-- {{ tableList.ReferPrice }} -->
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :span="12">
                  <el-form-item label="保证金:" prop="Margin">
                    <el-input v-model="tableList.Margin" disabled :style="{width: '50%'}" prefix-icon="el-icon-s-finance" />
                  </el-form-item>
                </el-col>
              </el-row> -->
              <el-row>
                <el-col :span="12">
                  <el-form-item label="售价:" prop="Price">
                    <el-input v-model="tableList.Price" disabled :style="{width: '50%'}" prefix-icon="el-icon-coin" />
                    <!-- {{ tableList.Price }} -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="封面照片:" prop="FhumbnailFileID">
                    <span v-if="tableList.FhumbnailFileID === ''" />
                    <img v-else alt :src="tableList.FhumbnailFileID" :style="{width: '80%'}" :preview-src-list="[tableList.FhumbnailFileID]">
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="备注:" prop="Remarks">
                    <el-input v-model="tableList.Remarks" disabled :style="{width: '50%'}" prefix-icon="el-icon-tickets" />
                    <!-- {{ tableList.Remarks }} -->
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item label="详细图片" prop="PictureFileIDs">
                    <el-row>
                      <el-col v-for="(item,k) in PictureFileIDsList" :key="k" :span="4">
                        <img alt :src="item" :style="{width: '80%'}" :preview-src-list="[item]">
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>test:<img :src="tableList.DetailsFileID" alt></el-row> -->
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品详情:" prop="DetailsFileID">
                    <!-- <editor
                      id="editor_id"
                      :content.sync="editorText"
                      :load-style-mode="false"
                      height="400px"
                      width="300px"
                    /> -->
                    <tinymce v-model="editorText" disabled :width="760" :height="400" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="商品规格" name="secord">
            <el-row style="fontSize:20px;padding:10px 20px;height:60px;alignItems:center;" type="flex">
              <el-col :span="2">
                已选规格:
              </el-col>
              <!-- {{ OptionModelsName }} -->
              <el-col :span="22">
                <el-tag
                  v-for="(tag,i) in OptionModelsName"
                  :key="i"
                  style="fontSize:14px;marginLeft:16px;"
                >
                  {{ tag }}
                </el-tag>
              </el-col>
            </el-row>
            <el-divider />
            <el-row>
              <el-row style="fontSize:20px;padding:10px 20px;height:60px;alignItems:center;" type="flex">
                <el-col :span="20">
                  规格价格表：
                </el-col>
              </el-row>
              <el-table
                border
                :data="specPriceList"
                style="width:80vw"
                max-height="520"
              >
                <el-table-column prop="Models" label="规格" align="center" width="420" />
                <el-table-column prop="Price" label="价格" width="240" align="center" />
                <el-table-column prop="StockNum" label="库存数" width="240" align="center" />
                <el-table-column prop="PictureUrl" align="center" label="展示图片" width="140">
                  <template slot-scope="scope">
                    <img :src="scope.row.PictureUrl" style="width:80%" alt>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import {
  queryTabGoods
} from '@/api/goods'
import {
  queryGoodsModelsPrice
} from '@/api/spec'
import Tinymce from '@/components/Tinymce'
import request from '@/utils/request'
export default {
  components: { Tinymce },
  data() {
    return {
      tableList: {},
      rules: {
      },
      // imgUrl: BASE_API.SERVER_IP + '/lxy_mall/file.action?fileUrl=',
      TypeMap: {
        '0': '是',
        '1': '否'
      },
      activeName: 'first',
      specPriceList: [],
      OptionModelsName: [],
      editorText: '',
      PictureFileIDsList: []
    }
  },
  created() {
    this.message = this.$route.query
    // console.log(this.message.GoodsID, 'GoodsID')
    this.queryTabGoods()
    this.queryGoodsModelsPrice()
  },
  methods: {
    // 查询规格价格
    async queryGoodsModelsPrice() {
      const res = await queryGoodsModelsPrice({
        GoodsID: this.message.GoodsID,
        current: 1,
        limit: 100
      })
      this.specPriceList = JSON.parse(res.data.data).Records
    },
    queryTabGoods() {
      const queryParams = {}
      queryParams.GoodsID = this.message.GoodsID
      queryTabGoods(queryParams).then(response => {
        if (JSON.parse(response.data.data).RowCnt) {
          this.tableList = JSON.parse(response.data.data).Records[0]
          // console.log(this.tableList, 'this.tableList')
          this.OptionModelsName = (this.tableList.OptionModelsName) ? (this.tableList.OptionModelsName).split(',') : []
          // console.log(this.tableList.DetailsFileID, 'this.tableList.DetailsFileID')
          if (this.tableList.DetailsFileID) {
            request({ url: this.tableList.DetailsFileID, method: 'get', withCredentials: false }).then(res => {
              this.editorText = unescape(res.data)
            })
          }
          if (this.tableList.PictureFileIDs) {
            this.PictureFileIDsList = this.tableList.PictureFileIDs.split(',')
          }
        }
      })
    },

    goBack() { // 返回上一个界面
      this.$router.go(-1)
    },
    close() {
      this.$router.push({ path: '/contract/contract.html' })
    }

  }
}
</script>

<style scoped>
.block {
  display: inline-block;
}
.block .el-form-item {
  display: inline-block
}
.el-form-item .EndTime .is-required .el-form-item--medium .el-form-item__content {
  margin-left: 1px;
}
.newsDetail {
  display: inline-block;
  width: 400px;
  line-height: 45px;
}
.slot {
  display: inline-block;
  margin-left: 20px;
}

.button {
  margin-right: 0px;
  width: 300px;
  display: inline-block;
  float:right;
  text-align: center;
  line-height: 45px;
}

.topNews {
  margin-bottom: 40px;
}
.baseNews {
  margin-bottom: 40px;
}.el-form-item__label
/* .baseNews label {
  font-weight: 400 !important;
} */
.row-bg {
  margin-bottom: 25px;
}
.el-form-item__label:after {
        content: "";
        display: inline-block;
        width: 100%;
    }

    .el-form-item__label {
        text-align: justify;
        height: 50px;
    }

    .el-form-item.is-required .el-form-item__label:before {
        content: none !important;
    }
    .el-input--suffix .el-input__inner {
    padding-right: 18px !important;
}
</style>
