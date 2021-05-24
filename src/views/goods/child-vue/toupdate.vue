<template>
  <el-container style=" height:100%">
    <el-main>
      <el-form ref="editForm" :model="editForm" :rules="editFormRules" class="demo-form-inline" size="medium" label-position="right" label-width="100px">
        <!-- 基础信息 -->
        <el-card class="topNews">
          <el-row class="steps">
            <div class="newsDetail">
              修改-----商品
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
              <h3>修改商品信息</h3>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="商品ID:" prop="GoodsID">
                {{ editForm.GoodsID }}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="名称:" prop="ShowTitle">
                <el-input v-model="editForm.ShowTitle" placeholder="请输入名称" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否上架:" prop="IsShelves">
                <el-switch
                  v-model="editForm.IsShelves"
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
                <el-select v-model="editForm.GoodsClassID" clearable placeholder="请选择分类" :style="{width: '50%'}">
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
                <el-select v-model="editForm.BrandModelCode" clearable placeholder="请选择品牌型号" :style="{width: '50%'}">
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
                <el-input v-model="editForm.Weigth" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" placeholder="请输入重量" clearable :style="{width: '50%'}">
                  <template slot="append">
                    吨
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="行驶证编号:" prop="ProductCode">
                <el-input v-model="editForm.ProductCode" placeholder="请输入行驶证编号" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row> -->

          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="单位:" prop="Unit">
                <el-input v-model="editForm.Unit" placeholder="请输入单位" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row> -->

          <el-row>
            <el-col :span="12">
              <el-form-item label="参考价:" prop="ReferPrice">
                <el-input v-model="editForm.ReferPrice" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" placeholder="请输入参考价" clearable :style="{width: '50%'}">
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
                <el-input v-model="editForm.Margin" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" placeholder="请输入保证金" clearable :style="{width: '50%'}">
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
                <el-select v-model="editForm.ChargeType" placeholder="请输入计价类型" clearable :style="{width: '50%'}">
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
                <el-input v-model="editForm.Price" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" placeholder="请输入售价" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row>

          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="地区:" prop="Region">
                <el-input v-model="editForm.Region" placeholder="请输入地区" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row> -->

          <el-row>
            <el-col :span="12">
              <el-form-item label="简介:" prop="Profiles">
                <el-input v-model="editForm.Profiles" placeholder="请输入简介" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="优先级:" prop="Priority">
                <!-- 优先级,数字越小，优先级越高, 默认20 -->
                <el-input-number v-model="editForm.Priority" :min="1" :max="20" controls-position="right" :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="备注:" prop="Remarks">
                <el-input v-model="editForm.Remarks" placeholder="请输入备注" clearable :style="{width: '50%'}" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="封面图片" prop="FhumbnailFileID">
                <el-upload
                  ref="upload"
                  :class="{hide:hideUpload}"
                  :file-list="fileList"
                  :auto-upload="true"
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
                  :auto-upload="true"
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
              <el-form-item label="富文本:" prop="DetailsFileID">
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
      <div class="dialog-footer">
        <el-button @click="close">
          取 消
        </el-button>
        <el-button type="primary" @click="queryTabGoods">
          确 定
        </el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import up from '@/mixins/ImgUpload'
import {
  queryTabGoods,
  updateTabGoods,
  queryTrees,
  queryTabProductType,
  queryTabProductParam
} from '@/api/goods'
import { downloadFile, saveFileContent } from '@/api/file'
export default {
  mixins: [up],
  // eslint-disable-next-line vue/require-prop-types
  data() {
    return {
      editorText: '',
      dialogImageUrl: '',
      dialogVisible: false,
      hideUpload: false,
      tableLists: [],
      editForm: {
        DetailsFileID: ''
      },
      fileList: [],
      fileList_s: [],
      PictureFileIDsList: [],
      editFormRules: {
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
      GoodsClassIDOptions: [],
      BrandModelCodeOptions: [],
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
    this.message = this.$route.query
    console.log(this.message.GoodsID, 'GoodsID')

    this.PictureFileIDsList = this.message.PictureFileIDs.split(',')
    console.log(this.PictureFileIDsList, 'PictureFileIDsList')
    this.openEditDialog()
    this.queryTree_GoodsClassID()
    this.queryTree_BrandModelCode()
    // this.queryDefaultType()
  },
  methods: {
    openEditDialog() {
      this.editForm = this.message
      // 富文本
      this.editForm.DetailsFileID = this.message.DetailsFileID
      if (this.editForm.DetailsFileID) {
        this.downloadFile(this.editForm.DetailsFileID)
      }
      // 封面
      // this.editForm.NewFhumbnailFileID = this.message.FhumbnailFileID
      this.fileList.push({ url: this.editForm.FhumbnailFileID })
      // 详细图片
      // for (var j = 0, len = this.PictureFileIDsList.length; j < len; j++) {
      //   this.PictureFileIDsList[j] = this.PictureFileIDsList[j]
      // }
      for (var j = 0, len = this.PictureFileIDsList.length; j < len; j++) {
        this.fileList_s.push({ url: this.PictureFileIDsList[j] })
      }
      // var arry1 = this.PictureFileIDsList.map(item => { return { 'url': item } })
      // console.log(arry1, 'ppppppaaa')
      // this.fileList_s = arry1
      this.$refs.editForm && this.$refs.editForm.resetFields()
    },
    onContentChange(val) {
      this.editorTextCopy = val
      console.log(this.editorText)
    },
    downloadFile(value) { // 下载文件
      const params = {}
      params.fileUrl = value
      downloadFile(params).then(response => {
        this.editorText = unescape(response.data)
      })
    },
    afterChange() {
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
      var that = this
      console.log(file, fileList_s)
      console.log(fileList_s, '目前的')
      that.fileList_s = fileList_s
      this.hideUpload = fileList_s.length >= 9
    },
    OnSuccess(response, file, fileList) {
      console.log('success 1')
      console.log(response)
      console.log(file)
      console.log(fileList)
      const data = response.data
      console.log(data, 'FhumbnailFileID')
      this.editForm.FhumbnailFileID = this.getImgUrl(response)
      this.hideUpload = fileList.length >= 1
    },
    OnSuccess_s(response, file, fileList_s) {
      console.log('success 2')
      console.log(response)
      console.log(file)
      console.log(fileList_s, 'fileList_s')
      const data = this.getImgUrl(response)
      console.log(data, 'PictureFileIDsList')
      // var obj = this.getImgUrl(response)
      this.fileList_s.push({ uid: file.uid, url: data })
      this.hideUpload = fileList_s.length >= 9
      this.PictureFileIDsList.push(data)
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
    queryTabGoods() {
      if (this.editForm.ProductCode === this.message.ProductCode) {
        this.submitForm()
      } else if (this.editForm.ProductCode !== this.message.ProductCode) {
        const queryParams = {}
        queryParams.ProductCode = this.editForm.ProductCode
        queryTabGoods(queryParams).then(response => {
          if ((JSON.parse(response.data.data).TotalSize) * 1 === 0) {
            this.submitForm()
          } else {
            this.$message({ message: '行驶证编号重复', type: 'error' })
          }
        })
      }
    },
    submitForm() {
      this.$refs['editForm'].validate(valid => {
        // console.log(valid, 'valid')
        if (valid) {
          if (this.editorText) {
            const params = {}
            params.FileName = 'editorText'
            console.log(this.editorText, 'this.editorText')
            var data = escape(this.editorText)
            saveFileContent(params, data).then(response => {
              if (response.data.success) {
                console.log(response.data.data, 'response.data.data')
                this.editForm.DetailsFileID = response.data.data
                this.updateTabGoods()
              }
            })
          } else {
            this.updateTabGoods()
          }
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
          // console.log(this.GoodsClassIDOptions)
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
          // console.log(this.BrandModelCodeOptions)
        }
      })
    },
    updateTabGoods() {
      const params = {}
      params.GoodsID = this.editForm.GoodsID
      params.GoodsClassID = this.editForm.GoodsClassID
      params.BrandModelCode = this.editForm.BrandModelCode
      params.ShowTitle = this.editForm.ShowTitle
      params.ProductCode = this.editForm.ProductCode
      params.Weigth = this.editForm.Weigth
      params.Unit = this.editForm.Unit
      params.IsShelves = this.editForm.IsShelves
      params.ReferPrice = this.editForm.ReferPrice
      params.ChargeType = this.editForm.ChargeType
      params.Price = this.editForm.Price
      params.Region = this.editForm.Region
      params.Profiles = this.editForm.Profiles
      params.ExtParam = this.returnExtParams()
      params.Remarks = this.editForm.Remarks
      params.DetailsFileID = this.editForm.DetailsFileID
      params.FhumbnailFileID = this.editForm.FhumbnailFileID
      // params.PictureFileIDs = this.PictureFileIDsList.join(',')
      console.log(this.editForm, 'edit form')
      console.log(this.fileList_s, 'fileList_s')
      params.PictureFileIDs = this.fileList_s.map(item => { return item.url }).join(',')
      // console.log(params.GoodsClassID, 'params.GoodsClassID')
      // console.log(params.FhumbnailFileID, 'params.FhumbnailFileID')
      console.log(params, 'params')
      updateTabGoods(params).then((res) => {
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          console.log('success change')
          this.close()
        } else {
          this.$message({
            type: 'error',
            message: '修改失败'
          })
          console.log('fail change')
        }
      })
    },
    close() {
      this.$router.push({ path: '/goods/goods_index.html' })
    },
    // ----------------------------------------------------------------- 参数规格
    queryDefaultType() {
      const params = {}
      params.ProductTypeID = 1
      queryTabProductType(params).then(response => {
        if (JSON.parse(response.data.data).RowCnt) {
          var result = JSON.parse(response.data.data).Records
          console.log(result[0].ParamIds, 'queryTabProductType result')
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
          console.log(result, 'queryTabProductParam result')
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

      this.parseExtParam()
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
      // console.log(StringLine, 'StringLine')

      // ExtParam.StringLine = StringLine
      // console.log(JSON.stringify(ExtParam), 'extparams')
      return JSON.stringify(ExtParam)
    },

    parseExtParam() {
      if (this.message.ExtParam === null || this.message.ExtParam === '') {
        return
      }
      const reg = /\\/g
      this.message.ExtParam = this.message.ExtParam.replace(reg, '')
      console.log(this.message.ExtParam)
      console.log(JSON.parse(this.message.ExtParam))
      this.editForm.ExtParam = JSON.parse(this.message.ExtParam).ExtParam
      this.inputArray = JSON.parse(this.message.ExtParam).inputArray
      this.radioArray = JSON.parse(this.message.ExtParam).radioArray
      this.radioChildArray = JSON.parse(this.message.ExtParam).radioChildArray
      this.checkListArray = JSON.parse(this.message.ExtParam).checkListArray
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
