<template>
  <el-container style=" height:100%">
    <el-main>
      <el-form ref="addForm" :model="addForm" :rules="rules" class="demo-form-inline" size="medium" label-position="right" label-width="100px">
        <!-- 基础信息 -->
        <el-card class="topNews">
          <el-row class="steps">
            <div class="newsDetail">
              添加-----商品
            </div>
            <div class="button">
              <!-- <el-button @click="submit()">保存</el-button> -->
              <el-button @click="goBack">
                返回
              </el-button>
            </div>
          </el-row>
        </el-card>
        <el-card class="baseNews">
          <el-row type="flex" class="row-bg">
            <el-col :span="24" align="middle">
              <h3>添加商品信息</h3>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="名称:" prop="ShowTitle">
                <el-input v-model="addForm.ShowTitle" placeholder="请输入名称" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否上架:" prop="IsShelves">
                <el-switch
                  v-model="addForm.IsShelves"
                  active-value="0"
                  inactive-value="1"
                  active-text="是"
                  inactive-text="否"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="商品分类:" prop="GoodsClassID">
                <el-select v-model="addForm.GoodsClassID" clearable placeholder="请选择分类" :style="{width: '50%'}">
                  <el-option
                    v-for="item in GoodsClassIDOptions"
                    :key="item.GoodsClassID"
                    :label="item.Title"
                    :value="item.ItemCode"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="品牌型号:" prop="BrandModelCode">
                <el-select v-model="addForm.BrandModelCode" clearable placeholder="请选择品牌型号" :style="{width: '50%'}">
                  <el-option
                    v-for="item in BrandModelCodeOptions"
                    :key="item.BrandModelCode"
                    :label="item.Title"
                    :value="item.ItemCode"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row> -->

          <el-row>
            <el-col :span="12">
              <el-form-item label="重量:" prop="Weigth">
                <el-input v-model="addForm.Weigth" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" placeholder="请输入重量" clearable :style="{width: '50%'}">
                  <template slot="append">
                    千克
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="行驶证编号:" prop="ProductCode">
                <el-input v-model="addForm.ProductCode" placeholder="请输入行驶证编号" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row> -->

          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="单位:" prop="Unit">
                <el-input v-model="addForm.Unit" placeholder="请输入单位" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row> -->

          <el-row>
            <el-col :span="12">
              <el-form-item label="参考价:" prop="ReferPrice">
                <el-input v-model="addForm.ReferPrice" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" placeholder="请输入参考价" clearable :style="{width: '50%'}">
                  <template slot="append">
                    元
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="保证金:" prop="Margin">
                <el-input v-model="addForm.Margin" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" placeholder="请输入保证金" clearable :style="{width: '50%'}">
                  <template slot="append">
                    元
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row> -->

          <el-row>
            <el-col :span="12">
              <el-form-item label="计价类型:" prop="ChargeType">
                <!-- 计价类型，0:基本价格,1: 规格计价, 3:竞价模式 -->
                <el-select v-model="addForm.ChargeType" placeholder="请输入计价类型" clearable :style="{width: '50%'}">
                  <el-option
                    v-for="(item, index) in ChargeTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="售价:" prop="Price">
                <el-input v-model="addForm.Price" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" placeholder="请输入售价" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row>

          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="地区:" prop="Region">
                <el-input v-model="addForm.Region" placeholder="请输入地区" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row> -->

          <el-row>
            <el-col :span="12">
              <el-form-item label="简介:" prop="Profiles">
                <el-input v-model="addForm.Profiles" placeholder="请输入简介" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="优先级:" prop="Priority">
                <!-- 优先级,数字越小，优先级越高, 默认20 -->
                <el-input-number v-model="addForm.Priority" :min="1" :max="20" controls-position="right" :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="备注:" prop="Remarks">
                <el-input v-model="addForm.Remarks" placeholder="请输入备注" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row>

          <!-- <el-row>
            <el-form-item label="商品属性:" prop="Remarks">
              <el-form v-for="(item,index) in ParamOptions" ref="params_form" :key="item.ParamID" :model="{}" label-position="right">

                <el-form-item v-if="item.ParamInputType==='0'" :label="item.ParamName">
                  <el-input v-model="inputArray[index]" size="small" clearable :placeholder="'请输入' + item.ParamName" :style="{width: '19.5%'}" />
                </el-form-item>

                >
                <el-form-item v-if="item.ParamInputType==='1'" :label="item.ParamName">
                  <el-select v-model="radioArray[index]" placeholder="请选择" clearable @change="radioChange()">
                    <el-option v-for="i in stringToArr(item.ParamInputList)" :key="i" :label="i" :value="item.ParamName + ':' + i" />
                  </el-select>

                  <div :v-if="item.children">
                    <div v-for="(child, child_index) in item.children" :key="child.ParamID">
                      <el-input v-if="child.ParamInputType==='0'" v-model="radioChildArray[child_index]" clearable size="small" :placeholder="'请输入' + child.ParamName" :style="{width: '23%'}" />

                      <el-select v-if="child.ParamInputType==='1'" v-model="radioChildArray[child_index]" clearable :placeholder="'请选择' + child.ParamName">
                        <el-option v-for="child_item in childToArr(radioArray[index],child)" :key="child_item" :label="child_item" :value="child.ParamName + ':' + child_item" />
                      </el-select>

                      <el-select v-if="child.ParamInputType==='2'" v-model="radioChildArray[child_index]" multiple clearable collapse-tags :placeholder="'请选择' + child.ParamName">
                        <el-option v-for="child_item in childToArr(radioArray[index],child)" :key="child_item" :label="child_item" :value="child.ParamName + ':' + child_item" />
                      </el-select>
                    </div>
                  </div>
                </el-form-item>

                <el-form-item v-if="item.ParamInputType==='2'" :label="item.ParamName">
                  <el-select v-model="checkListArray[index]" multiple collapse-tags placeholder="请选择" clearable>
                    <el-option v-for="i in stringToArr(item.ParamInputList)" :key="i" :label="i" :value="item.ParamName + ':' + i" />
                  </el-select>
                </el-form-item>
              </el-form>
            </el-form-item>
          </el-row> -->

          <el-row>
            <el-col :span="12">
              <el-form-item label="封面图片" prop="FhumbnailFileID">
                <el-upload
                  ref="upload"
                  :class="{hide:hideUpload}"
                  :file-list="fileList"
                  :auto-upload="false"
                  :limit="1"
                  :before-upload="BeforeUpload"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-success="OnSuccess"
                  :on-error="OnError"
                  :on-exceed="OnExceed"
                  :action="uploadUrl"
                  list-type="picture-card"
                  :data="postData"
                >
                  <i class="el-icon-plus" />
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" append-to-body size="tiny">
                  <img :src="dialogImageUrl" width="100%" alt>
                </el-dialog>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="详细图片" prop="PictureFileIDs">
                <el-upload
                  ref="upload"
                  :class="{hide:hideUpload}"
                  :file-list="fileList_s"
                  :auto-upload="false"
                  :limit="9"
                  :before-upload="BeforeUpload"
                  :on-preview="handlePictureCardPreview_s"
                  :on-remove="handleRemove_s"
                  :on-success="OnSuccess_s"
                  :on-error="OnError"
                  :on-exceed="OnExceed_s"
                  :action="uploadUrl"
                  list-type="picture-card"
                  :data="postData"
                >
                  <i class="el-icon-plus" />
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" append-to-body size="tiny">
                  <img :src="dialogImageUrl" width="100%" alt>
                </el-dialog>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="详细介绍:" prop="DetailsFileID">
                <editor
                  id="editor_id"
                  :content.sync="editorText"
                  :after-change="afterChange()"
                  :load-style-mode="false"
                  height="400px"
                  width="300px"
                  plugins-path="../../../static/kindeditor/plugins/"
                  @on-content-change="onContentChange"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>基本信息</el-row> -->
        </el-card>
      </el-form>
      <el-card class="topNews">
        <el-row class="steps">
          <div class="dialog-footer">
            <el-button @click="close">
              取 消
            </el-button>
            <el-button type="primary" @click="queryTabGoods">
              确 定
            </el-button>
            <!-- <el-button type="primary" @click="toaddExtension()">
              下一页
            </el-button> -->
          </div>
        </el-row>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import up from '@/mixins/ImgUpload'
import {
  queryTabGoods,
  addTabGoods,
  queryTrees,
  queryTabProductType,
  queryTabProductParam
} from '@/api/goods'
import { saveFileContent } from '@/api/file'
import {
  formatTimes
} from '@/utils/fortime'
export default {
  mixins: [up],
  data() {
    return {
      PictureFileIDsList: [],
      dialogVisible: false,
      hideUpload: false,
      dialogImageUrl: '',
      addForm: {
        IsShelves: '0',
        GoodsClassID: '',
        BrandModelCode: '',
        Weigth: '',
        Unit: '',
        ReferPrice: '',
        ChargeType: '',
        Price: '',
        Profiles: '',
        ExtParam: '',
        Priority: 20,
        Remarks: '',
        DetailsFileID: '',
        FhumbnailFileID: '',
        PictureFileIDs: ''
      },
      BrandModelCodeOptions: [],
      fileList: [],
      fileList_s: [],
      GoodsClassIDOptions: [],
      editorText: '',
      rules: {
        ShowTitle: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        GoodsClassID: [{ required: true, message: '请选择类别', trigger: 'change' }],
        // BrandModelCode: [{ required: true, type: 'array', message: '请至少选择一个类别', trigger: 'change' }],
        Weigth: [{ required: true, message: '请输入重量', trigger: 'blur' }],
        // ProductCode: [{ required: true, message: '请输入行驶证编号', trigger: 'blur' }],
        ReferPrice: [{ required: true, message: '请输入参考价格', trigger: 'blur' }],
        // Margin: [{ required: true, message: '请输入保证金', trigger: 'blur' }],
        ChargeType: [{ required: true, message: '请选择类型', trigger: 'change' }],
        Price: [{ required: true, message: '请输入售价', trigger: 'blur' }],
        // Region: [{ required: true, message: '请输入地区', trigger: 'blur' }],
        Priority: [{ required: true, message: '请选择优先级', trigger: 'blur' }]
      },
      ChargeTypeOptions: [{ 'label': '基本价格', 'value': '0' }, { 'label': '规格计价', 'value': '1' }, { 'label': '竞价模式', 'value': '3' }], // 计价类型，0:基本价格,1: 规格计价, 3:竞价模式
      ParamOptions: [],
      inputArray: [],
      radioArray: [],
      radioChildArray: [],
      checkListArray: [],
      inputKey: '',
      props: { multiple: true }
    }
  },
  created() {
    this.queryTree_GoodsClassID()
    this.queryTree_BrandModelCode()
    this.queryDefaultType()
  },
  methods: {
    toaddExtension() {
      console.log('toaddExtension')
      this.$router.push({ path: '/goods/toaddExtension.html' })
    },
    afterChange() {

    },
    onContentChange(val) {
      this.editorTextCopy = val
      console.log(this.editorText)
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    async BeforeUpload(file) {
      await this.getToken()
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 和 PNG 格式!')
      }
      return isJPG
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlePictureCardPreview_s(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlePreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      this.deleteImg(file.url)
      console.log(file, fileList)
      this.hideUpload = fileList.length >= 1
    },
    handleRemove_s(file, fileList_s) {
      this.deleteImg(file.url)
      console.log(file, fileList_s)
      this.hideUpload = fileList_s.length >= 9
    },
    OnSuccess(response, file, fileList) {
      console.log(response)
      console.log(file)
      console.log(fileList)
      const data = response.data
      console.log(data, 'FhumbnailFileID')
      this.addForm.FhumbnailFileID = this.getImgUrl(response)
      this.hideUpload = fileList.length >= 1
    },
    OnSuccess_s(response, file, fileList_s) {
      console.log(response)
      console.log(file)
      console.log(fileList_s)
      const data = this.getImgUrl(response)
      console.log(data, 'PictureFileIDsList')
      this.PictureFileIDsList.push(data)
      this.hideUpload = fileList_s.length >= 9
    },
    OnError() {
      this.$message({
        type: 'error',
        message: '上传图片失败！'
      })
    },
    OnExceed() {
      this.$message({
        type: 'info',
        message: '只能上传一张图片'
      })
    },
    OnExceed_s() {
      this.$message({
        type: 'info',
        message: '只能上传九张图片'
      })
    },

    queryTabGoods() { // 查询行驶证编号
      const queryParams = {}
      queryParams.ProductCode = this.addForm.ProductCode
      queryTabGoods(queryParams).then(response => {
        // 本次添加如果未上架则直接添加不查询 tab_good表里的行驶证编号，如果添加时为上架则查询tab_goods里的行驶证编号 如果有重复的则不能执行添加
        if ((JSON.parse(response.data.data).TotalSize) * 1 === 0) { // 查询结果大于0意味着有记录则不能添加
          console.log('执行添加')
          this.submitForm()
        } else {
          this.$message({ message: '行驶证编号重复', type: 'error' })
        }
      })
    },

    submit() {
      // addForm.ProductCode
      // console.log(this.inputArray, 'inputArray')
      // console.log(this.radioArray, 'radioArray')
      // console.log(this.radioChildArray, 'radioChildArray')
      // console.log(this.checkListArray, 'checkListArray')
      this.returnExtParams()
      this.$refs['addForm'].validate(valid => {
        console.log(valid, this.addForm.FhumbnailFileID, this.filenames === '')
        if (valid) {
          if (this.filenames === '') {
            console.log('00000000002')
            this.addTabGoods()
          } else {
            console.log('111')
            this.submitUpload()
          }
        }
      })
    },
    submitForm() {
      this.$refs['addForm'].validate(valid => {
        console.log(valid)
        if (valid) {
          if (this.editorText) {
            const params = {}
            params.FileName = 'editorText'
            console.log(this.editorText, '-----1111-------')
            var data = escape(this.editorText)
            saveFileContent(params, data).then(response => {
              if (response.data.success) {
                console.log(response.data.data, '=============')
                this.addForm.DetailsFileID = response.data.data
                this.addTabGoods()
              }
            })
          } else {
            this.addTabGoods()
          }
        }
      })
    },
    addTabGoods() {
      console.log('addTabGoods')
      // eslint-disable-next-line no-irregular-whitespace
      var date = formatTimes(new Date())
      if ((this.addForm.IsShelves) * 1 === 0) {
        this.addForm.ShelvesTime = date
      }
      this.addForm.ExtParam = this.returnExtParams()
      this.addForm.ShopID = 1
      this.addForm.PictureFileIDs = this.PictureFileIDsList.join(',')
      console.log(this.addForm.PictureFileIDs, 'ppppppppppppppp')
      addTabGoods(this.addForm).then(response => {
        console.log(this.addForm, 'adddddddddddddd')
        if (response.data.success) {
          this.$message({ message: '添加成功', type: 'success' })
          this.close()
        } else {
          this.$message({ message: '添加失败', type: 'error' })
        }
      })
    },
    queryTree_GoodsClassID() {
      const params = {}
      params.TreeType = 'type_goods'
      params.Level = 1
      queryTrees(params).then(response => {
        if (JSON.parse(response.data.data).RowCnt) {
          this.GoodsClassIDOptions = JSON.parse(response.data.data).Records
          console.log(this.GoodsClassIDOptions)
        }
      })
    },
    queryTree_BrandModelCode() { // 查询树品牌型号编码
      const params = {}
      params.TreeType = 'type_brand'
      params.SuperiorItemCode = '33_2_002'
      queryTrees(params).then(response => {
        if (JSON.parse(response.data.data).RowCnt) {
          this.BrandModelCodeOptions = JSON.parse(response.data.data).Records
          console.log(this.BrandModelCodeOptions)
        }
      })
    },
    close() {
      // this.$router.push({ path: '/contract/contract.html' })
      this.$router.push({ path: '/goods/goods_index.html' })
    },
    // ----------------------------------------------------------------- 参数规格
    queryDefaultType() {
      const params = {}
      params.ProductTypeID = 1 // this.GLOBAL.DefaultProductType
      queryTabProductType(params).then(response => {
        if (JSON.parse(response.data.data).RowCnt) {
          var result = JSON.parse(response.data.data).Records
          // console.log(result[0].ParamIds, 'queryTabProductType result')
          this.ParamOptions = []
          this.queryProductParam(null, result[0].ParamIds)
        }
      })
    },

    queryProductParam(ParamID, ParamIds) {
      const params = {}
      if (ParamID) {
        params.ParamID = ParamID
      }
      if (ParamIds) {
        params.ParamIds = ParamIds
      }
      queryTabProductParam(params).then(response => {
        if (JSON.parse(response.data.data).RowCnt) {
          var result = JSON.parse(response.data.data).Records
          // console.log(result, 'queryTabProductParam result')
          // this.ParamOptions = result
          // result.forEach(element => {
          //   this.ParamOptions.push(element)
          //   this.ParamOptions.forEach(item => {
          //     if (element.RelyParamID === item.ParamID) {
          //       item.Children = []
          //       item.Children.push(element)
          //       console.log(item, 'item')
          //     }
          //   })
          // })
          result.forEach(element => {
            if (element.RelyParamID !== '0' && element.ParamInputType !== '0') {
              element.opt_list = []
              // console.log(element.ParamInputList, 'ParamInputList')
              var type_list = element.ParamInputList.split(';')
              // console.log(type_list, 'type_list')
              type_list.forEach(item => {
                // console.log(item, 'type_list item')
                var type_name = item.split(':')[0]
                var type_value = item.split(':')[1]
                // console.log(type_name, 'type_name')
                // console.log(type_value, 'type_value')
                // const opt_list = {}
                // opt_list.name = type_name
                // opt_list.value = type_value.split(',')
                // element.opt_list.push(opt_list)

                element[type_name] = type_value.split(',')
              })
            }
            // console.log(element, 'element')
          })
          this.unionJson(result)
        }
      })
    },

    unionJson(result) {
      var returnList = []
      var tmp = {}
      for (var i = 0, len = result.length; i < len; i++) {
        var obj = result[i]
        if (obj.RelyParamID in tmp) {
          if (!tmp[obj.RelyParamID].children) {
            tmp[obj.RelyParamID].children = []
          }
          tmp[obj.RelyParamID].children.push(obj)
        } else {
          tmp[obj.ParamID] = obj
        }
      }
      for (var key in tmp) {
        returnList.push(tmp[key])
      }
      this.ParamOptions = returnList
      console.log(this.ParamOptions, 'ParamOptions')
    },
    handleRadioClick(item) {
      // console.log(item, 'item')
    },
    stringToArr(str) {
      var arr = str.split(',')
      // console.log('paramsL')
      // console.log(arr, 'arr')
      return arr
    },
    childToArr(value, child) {
      // console.log(value, 'value')
      // console.log(child, 'child')
      if (value !== null && value !== undefined && value !== '') {
        var select_val = value.split(':')[1]
        return child[select_val]
      }
    },
    getInputValue(line, value) {
      // this.inputKey = value
      // console.log(line)
      // console.log(value)
      return line + ':' + value
    },
    radioChange() {
      // console.log(this.radioChildArray, 'radioChildArray')
      this.radioChildArray = []
    },
    returnExtParams() {
      const ExtParam = {}
      ExtParam.inputArray = this.inputArray
      ExtParam.radioArray = this.radioArray
      ExtParam.radioChildArray = this.radioChildArray
      ExtParam.checkListArray = this.checkListArray

      var StringLine = ''
      this.inputArray.forEach(item => {
        console.log(item)
        StringLine = item + '|$|' + StringLine
      })
      this.radioArray.forEach(item => {
        StringLine = item + '|$|' + StringLine
      })

      this.radioChildArray.forEach(item => {
        console.log(typeof item)
        if (typeof item === 'string') {
          StringLine = item + '|$|' + StringLine
          return
        }
        if (item instanceof Array) {
          item.forEach(element => {
            StringLine = element + '|$|' + StringLine
          })
          return
        }
      })
      this.checkListArray.forEach(item => {
        if (typeof item === 'string') {
          StringLine = item + '|$|' + StringLine
          return
        }
        if (item instanceof Array) {
          item.forEach(element => {
            StringLine = element + '|$|' + StringLine
          })
        }
      })
      console.log(StringLine, 'StringLine')

      // ExtParam.StringLine = StringLine
      console.log(JSON.stringify(ExtParam), 'extparams')
      return JSON.stringify(ExtParam)
    },
    goBack() { // 返回上一个界面
      this.$router.go(-1)
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
  float:right;
  margin-right: 0px;
  width: 300px;
  display: inline-block;
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
