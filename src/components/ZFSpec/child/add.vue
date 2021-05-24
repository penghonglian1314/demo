<template>
  <el-container style=" height:100%">
    <el-main>
      <el-form ref="addForm" label-width="100px" :inline="true" :model="addForm">
        <!-- ============================== -->
        <!-- 此处选择相应规格 -->
        <!-- ============================== -->
        <!-- {{ whichAttr }} -->
        <el-divider />
        <el-row v-for="(item,k1) in whichAttr" :key="k1">
          <!-- {{ addForm[item.title] }} -->
          <el-form-item :label="item.title+':'" :prop="item.title">
            <el-radio-group v-model="addForm[item.title]">
              <el-radio v-for="(type,k2) in item.types" :key="k2" :label="type.type" border :disabled="ifDisabled(item,type)">
                {{ type.type }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-divider />
        <!-- ============================== -->
        <!-- 以上选择相应规格 -->
        <!-- ============================== -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="价格:" prop="Price">
              <el-input-number v-model="addForm.Price" :precision="2" :step="0.1" controls-position="right" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="15">
            <el-form-item label="库存:" prop="StockNum">
              <el-input-number v-model="addForm.StockNum" :precision="0" controls-position="right" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="展示图片:" prop="PictureUrl">
              <!-- <el-upload
                ref="upload"
                :class="{hide:hideUpload}"
                :file-list="fileList"
                :auto-upload="true"
                :limit="1"
                :before-upload="beforeUpload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
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
              </el-dialog> -->
              <zfupload :limit="1" :file-list="fileList" @fileChange="fileChange" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="close">
          取 消
        </el-button>
        <el-button type="primary" @click="addGoodsModelsPrice">
          确 定
        </el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
// import {
//   addGoodsModelsPrice,
// } from '@/api/spec'

// import imgupload from '@/mixins/ImgUpload'
import zfupload from '@/components/ZFUpload'
export default {
  // mixins: [imgupload],
  components: { zfupload },
  props: ['whichAttr'],
  data() {
    return {
      addForm: {},
      hideUpload: false,
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  created() {
    console.log('created')
  },
  methods: {
    fileChange(filelist) {
      console.log('fileChange', filelist)
      this.addForm.PictureUrl = filelist[0]
    },
    ifDisabled(item, type) {
      // console.log(item,type)
      if (type.relyOnIndex) {
        // console.log(this.whichAttr.find(q => q.title === item.relyOn).types.findIndex(w => w.type === this.addForm[item.relyOn]))
        return !type.relyOnIndex.includes(this.whichAttr.find(q => q.title === item.relyOn).types.findIndex(w => w.type === this.addForm[item.relyOn]))
      } else {
        return false
      }
    },
    // async beforeUpload(file) {
    //   await this.getToken()
    //   console.log(file)
    //   const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
    //   const isLt2M = file.size / 2048 / 2048 < 4
    //   if (!isJPG) this.$message.error('上传图片只能是 JPG 格式!')
    //   if (!isLt2M) this.$message.error('上传图片大小不能超过 4MB!')
    //   return isJPG && isLt2M
    // },
    // handlePreview(file) {
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // },
    // handleRemove(file, fileList) {
    //   this.deleteImg(file.url)
    //   this.fileList = [] // 删除默认图标则清空
    //   this.hideUpload = fileList.length >= 1
    // },
    // handleSuccess(res, file, fileList) {
    //   this.addForm.PictureUrl = this.getImgUrl(res)
    //   this.hideUpload = fileList.length >= 1
    // },
    // OnExceed() {
    //   this.$message({
    //     type: 'info',
    //     message: '只能上传一张图片'
    //   })
    // },
    // OnError() {
    //   this.$message({ type: 'error', message: '上传图片失败！' })
    // },
    addGoodsModelsPrice() {
      this.$emit('addGoodsModelsPrice', this.addForm)
    //   this.addForm = {}
    //   this.fileList = []
    },
    close() {
    //   this.addForm = {}
    //   this.fileList = []
      this.$emit('close')
    }

  }
}
</script>

