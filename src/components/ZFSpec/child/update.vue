<template>
  <el-container style=" height:100%">
    <el-main>
      <el-form ref="updateForm" label-width="100px" :model="updateForm">
        <!-- <el-row>
          <el-col :span="24"> -->
        <el-form-item label="规格:" prop="Models">
          {{ updateForm.Models }}
          <!-- <el-input v-model="" disabled /> -->
        </el-form-item>
        <!-- </el-col>
        </el-row> -->

        <!-- <el-row>
          <el-col :span="24"> -->
        <el-form-item label="价格:" prop="Price">
          <el-input-number v-model="updateForm.Price" :precision="2" :step="0.1" controls-position="right" />
        </el-form-item>
        <!-- </el-col>
        </el-row> -->

        <!-- <el-row>
          <el-col :span="24"> -->
        <el-form-item label="库存:" prop="StockNum">
          <el-input-number v-model="updateForm.StockNum" :precision="0" controls-position="right" />
        </el-form-item>
        <!-- </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"> -->
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
        <!-- </el-col>
        </el-row> -->
      </el-form>
      <div class="dialog-footer">
        <el-button @click="close">
          取 消
        </el-button>
        <el-button type="primary" @click="updateGoodsModelsPrice">
          确 定
        </el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import zfupload from '@/components/ZFUpload'

export default {
  // mixins: [up],
  components: { zfupload },
  props: ['updateProps'],
  // eslint-disable-next-line vue/require-prop-types
  data() {
    return {
      updateForm: {},
      hideUpload: true,
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  created() {
    this.updateForm = Object.assign({}, this.updateProps)
    this.fileList.push({ url: this.updateForm.PictureUrl })
  },
  methods: {
    fileChange(filelist) {
      console.log('fileChange', filelist)
      this.updateForm.PictureUrl = filelist[0]
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
    //   this.updateForm.PictureUrl = this.getImgUrl(res)
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
    updateGoodsModelsPrice() {
      this.$emit('updateGoodsModelsPrice', this.updateForm)
    //   this.updateForm = {}
    //   this.fileList = []
    },
    close() {
    //   this.updateForm = {}
    //   this.fileList = []
      this.$emit('close')
    }
  }
}
</script>
