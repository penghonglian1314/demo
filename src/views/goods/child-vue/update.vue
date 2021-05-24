<template>
  <el-container class="dialog_main">
    <el-main>
      <el-form ref="editForm" label-width="auto" :inline="true" :model="editForm" :rules="editFormRules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品ID:" prop="GoodsID">
              {{ editForm.GoodsID }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品分类:" prop="GoodsClassID">
              <!-- <el-input v-model="editForm.GoodsClassID" auto-complete="off" placeholder="请输入商户分类" /> -->
              <el-select v-model="editForm.GoodsClassID" clearable placeholder="">
                <el-option
                  v-for="item in tableLists"
                  :key="item.GoodsClassID"
                  :label="item.ItemType"
                  :value="item.ItemCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行驶证编号:" prop="ProductCode">
              <el-input v-model="editForm.ProductCode" auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="品牌型号编码:" prop="BrandModelCode">
              <el-input v-model="editForm.BrandModelCode" auto-complete="off" placeholder="请输入品牌型号编码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="重量:" prop="Weigth">
              <el-input v-model="editForm.Weigth" auto-complete="off" placeholder="请输入重量" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位:" prop="Unit">
              <el-input v-model="editForm.Unit" auto-complete="off" placeholder="请输入单位" />
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
          <el-col :span="12">
            <el-form-item label="参考价:" prop="ReferPrice">
              <el-input v-model="editForm.ReferPrice" auto-complete="off" placeholder="请输入参考价" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计价类型:" prop="ChargeType">
              <el-input v-model="editForm.ChargeType" auto-complete="off" placeholder="请选择计价类型" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="售价:" prop="Price">
              <el-input v-model="editForm.Price" auto-complete="off" placeholder="请输入售价" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="简介:" prop="Profiles">
              <el-input v-model="editForm.Profiles" auto-complete="off" placeholder="请输入简介" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注:" prop="Remarks">
              <el-input v-model="editForm.Remarks" type="textarea" auto-complete="off" placeholder="请输入备注" style="width: 570px" />
            </el-form-item>
          </el-col>
          <el-form-item prop="FhumbnailFileID" label="上传封面图片：">
            <el-upload
              ref="upload"
              :class="{hide:hideUpload}"
              :file-list="fileList"
              :auto-upload="false"
              :limit="1"
              :before-upload="beforeUpload"
              :on-preview="handlePreview"
              :on-remove="handleRemoves"
              :on-success="handleUpdateSuccess"
              :on-error="OnError"
              :on-change="handleChange"
              :with-credentials="true"
              :action="uploadUrl()"
              list-type="picture-card"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body size="tiny">
              <img :src="dialogImageUrl" width="100%" alt>
            </el-dialog>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="商品属性:" prop="Remarks">
            <el-form v-for="(item,index) in ParamOptions" ref="params_form" :key="item.ParamID" :model="{}" label-position="right">

              <!-- 手动输入 -->
              <el-form-item v-if="item.ParamInputType==='0'" :label="item.ParamName">
                <el-input v-model="inputArray[index]" size="small" clearable :placeholder="'请输入' + item.ParamName" />
              </el-form-item>

              <!-- 单选 -->
              <el-form-item v-if="item.ParamInputType==='1'" :label="item.ParamName">
                <el-select v-model="radioArray[index]" placeholder="请选择" clearable @change="radioChange()">
                  <el-option v-for="i in stringToArr(item.ParamInputList)" :key="i" :label="i" :value="item.ParamName + ':' + i" />
                </el-select>

                <!-- 如果存在子选项 -->
                <div :v-if="item.children">
                  <div v-for="(child, child_index) in item.children" :key="child.ParamID">
                    <el-input v-if="child.ParamInputType==='0'" v-model="radioChildArray[child_index]" clearable size="small" :placeholder="'请输入' + child.ParamName" />

                    <el-select v-if="child.ParamInputType==='1'" v-model="radioChildArray[child_index]" clearable :placeholder="'请选择' + child.ParamName">
                      <el-option v-for="child_item in childToArr(radioArray[index],child)" :key="child_item" :label="child_item" :value="child.ParamName + ':' + child_item" />
                    </el-select>

                    <el-select v-if="child.ParamInputType==='2'" v-model="radioChildArray[child_index]" multiple clearable collapse-tags :placeholder="'请选择' + child.ParamName">
                      <el-option v-for="child_item in childToArr(radioArray[index],child)" :key="child_item" :label="child_item" :value="child.ParamName + ':' + child_item" />
                    </el-select>
                  </div>
                </div>
              </el-form-item>

              <!-- 多选 -->
              <el-form-item v-if="item.ParamInputType==='2'" :label="item.ParamName">
                <el-select v-model="checkListArray[index]" multiple collapse-tags placeholder="请选择" clearable>
                  <el-option v-for="i in stringToArr(item.ParamInputList)" :key="i" :label="i" :value="item.ParamName + ':' + i" />
                </el-select>
              </el-form-item>

            </el-form>
          </el-form-item>
        </el-row>
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item prop="PictureFileIDs" label="上传详细图片：">
              <el-upload
                ref="uploadPs"
                :class="{hide:hideUpload}"
                :file-list="fileList"
                :auto-upload="false"
                :limit="9"
                :before-upload="beforeUpload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccessPs"
                :on-error="OnError"
                :on-change="handleChange"
                :with-credentials="true"
                :action="uploadUrl()"
                list-type="picture-card"
              >
                <i class="el-icon-plus" />
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" append-to-body size="tiny">
                <img :src="dialogImageUrl" width="100%" alt>
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
      <div class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="queryTabGoods">确 定</el-button>
      </div>
    </el-main>
  </el-container>
</template>
<script>

import {
  queryTabGoods,
  updateTabGoods,
  deleteFile,
  queryTrees,
  queryTabProductType,
  queryTabProductParam
} from '@/api/goods'
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['parsemsg'],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      hideUpload: false,
      tableLists: [],
      editForm: {},
      editFormRules: {

      },

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
    console.log(this.parsemsg, 'parsemsg')
    this.openEditDialog()
    this.queryTrees()
    this.queryDefaultType()
  },
  methods: {
    /*  */
    handleSuccessPs(res, file, fileListPs) {
      this.PictureFileIDsArr.push(res.data)
      console.log(this.fileListPs, '121331')
      console.log(this.PictureFileIDsArr, '0----')
      // this.addTabGoods()
    },
    /*  */
    afterChange() {},
    onContentChange(val) {
      this.editorTextCopy = val
      console.log(this.editorText)
    },
    submitUpload() {
      this.$refs.upload.submit()
      // this.$refs.uploadPs.submit()
    },
    beforeUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 2048 / 2048 < 4
      if (!isJPG) this.$message.error('上传图片只能是 JPG 格式!')
      if (!isLt2M) this.$message.error('上传图片大小不能超过 4MB!')
      return isJPG && isLt2M
    },
    handlePreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      console.log('移除')
      console.log(file, fileList)
      this.fileList[0].url = '' // 删除默认图标则清空
      this.hideUpload = fileList.length >= 1
    },
    handleRemoves(file, fileList) {
      this.fileList[0].url = '' // 删除默认图标则清空
      this.hideUpload = fileList.length >= 1
    },
    handleSuccess(res, file, fileList) {
      console.log('ffffffffffffffff')
      this.addForm.FhumbnailFileID = res.data
      console.log(this.addForm.FhumbnailFileID, 'FhumbnailFileID')
      this.hideUpload = fileList.length >= 1
      this.addTabGoods()
    },
    handleUpdateSuccess(res, file, fileList) {
      console.log('update')
      const params = {}
      params.fileUrl = this.editForm.NewFhumbnailFileID
      console.log(params.fileUrl, '|||||', this.editForm.NewFhumbnailFileID)
      deleteFile(params).then(response => {
        if (response.data.success) {
          console.log('删除服务器文件')
        }
      })
      this.editForm.FhumbnailFileID = res.data
      this.updateTabGoods()
    },
    OnError() {
      this.$message({ type: 'error', message: '上传图片失败！' })
    },
    handleChange(file, fileList) {
      console.log('change file')
      console.log(file)
      this.filenames = file.name
      this.hideUpload = fileList.length >= 1
    },

    queryTabGoods() {
      const queryParams = {}
      queryParams.ProductCode = this.editForm.ProductCode
      queryTabGoods(queryParams).then(response => {
        if ((JSON.parse(response.data.data).TotalSize) * 1 === 0) {
          this.submitUpdate()
        } else {
          this.$message({ message: '行驶证编号重复', type: 'error' })
        }
      })
    },

    submit() {
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
    submitUpdate() {
      this.$refs['editForm'].validate(valid => {
        console.log(valid, this.editForm.FhumbnailFileID, this.filenames === '')
        if (valid) {
          if (this.fileList[0].url === '') {
            console.log('lllllllllllllllll')
            this.submitUpload()
          } else {
            console.log('LLLLLLLLLLLLLLL')
            this.updateTabGoods()
          }
        }
      })
    },
    uploadUrl() {
      console.log(BASE_API.SERVER_IP + '/lxy_mall/uploadFile.action')
      return BASE_API.SERVER_IP + '/lxy_mall/uploadFile.action'
    },
    openEditDialog() {
      this.editForm = {
        GoodsID: this.parsemsg.GoodsID,
        GoodsClassID: this.parsemsg.GoodsClassID,
        BrandModelCode: this.parsemsg.BrandModelCode,
        ProductCode: this.parsemsg.ProductCode,
        Weigth: this.parsemsg.Weigth,
        Unit: this.parsemsg.Unit,
        IsShelves: this.parsemsg.IsShelves,
        ReferPrice: this.parsemsg.ReferPrice,
        ChargeType: this.parsemsg.ChargeType,
        Price: this.parsemsg.Price,
        Profiles: this.parsemsg.Profiles,
        Remarks: this.parsemsg.Remarks,
        FhumbnailFileID: this.parsemsg.FhumbnailFileID,
        PictureFileIDs: this.parsemsg.PictureFileIDs
      }
      console.log(this.parsemsg.GoodsClassID, '7777777777777')
      this.editForm.NewFhumbnailFileID = this.parsemsg.FhumbnailFileID
      this.fileList = [{ name: '', url: '' }]
      this.fileList[0].url = this.parsemsg.FhumbnailFileID
      this.$refs.editForm && this.$refs.editForm.resetFields()
    },
    queryTrees() {
      const params = {}
      params.TreeType = 'type_goods'
      params.Level = 1
      queryTrees(params).then(response => {
        if (JSON.parse(response.data.data).RowCnt) {
          this.tableLists = JSON.parse(response.data.data).Records
          console.log(this.tableLists)
        }
      })
    },
    updateTabGoods() {
      const params = {}
      params.GoodsID = this.editForm.GoodsID
      params.GoodsClassID = this.editForm.GoodsClassID
      params.BrandModelCode = this.editForm.BrandModelCode
      params.ProductCode = this.editForm.ProductCode
      params.Weigth = this.editForm.Weigth
      params.Unit = this.editForm.Unit
      params.IsShelves = this.editForm.IsShelves
      params.ReferPrice = this.editForm.ReferPrice
      params.ChargeType = this.editForm.ChargeType
      params.Price = this.editForm.Price
      params.Profiles = this.editForm.Profiles
      params.ExtParam = this.returnExtParams()
      params.Remarks = this.editForm.Remarks
      params.FhumbnailFileID = this.editForm.FhumbnailFileID
      params.PictureFileIDs = this.editForm.PictureFileIDs
      console.log(params.GoodsClassID, 'params.GoodsClassID')
      console.log(params.FhumbnailFileID, 'params.FhumbnailFileID')
      updateTabGoods(params).then((res) => {
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.close()
        } else {
          this.$message({
            type: 'error',
            message: '修改失败'
          })
        }
      })
    },
    close() {
      this.$emit('func', 'close')
    },
    // ----------------------------------------------------------------- 参数规格
    queryDefaultType() {
      const params = {}
      params.ProductTypeID = this.GLOBAL.DefaultProductType
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
      console.log(StringLine, 'StringLine')

      // ExtParam.StringLine = StringLine
      console.log(JSON.stringify(ExtParam), 'extparams')
      return JSON.stringify(ExtParam)
    },

    parseExtParam() {
      if (this.parsemsg.ExtParam === null || this.parsemsg.ExtParam === '') {
        return
      }
      const reg = /\\/g
      this.parsemsg.ExtParam = this.parsemsg.ExtParam.replace(reg, '')
      console.log(this.parsemsg.ExtParam)
      console.log(JSON.parse(this.parsemsg.ExtParam))
      this.editForm.ExtParam = JSON.parse(this.parsemsg.ExtParam).ExtParam
      this.inputArray = JSON.parse(this.parsemsg.ExtParam).inputArray
      this.radioArray = JSON.parse(this.parsemsg.ExtParam).radioArray
      this.radioChildArray = JSON.parse(this.parsemsg.ExtParam).radioChildArray
      this.checkListArray = JSON.parse(this.parsemsg.ExtParam).checkListArray
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

