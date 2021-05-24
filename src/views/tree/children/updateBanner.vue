<template>
  <el-container>
    <el-main>
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item prop="FileUrl">
          <!-- <el-upload
            ref="upload"
            :class="{ hide: hideUpload }"
            :file-list="fileList"
            :auto-upload="false"
            :limit="1"
            :before-upload="beforeUpload"
            :on-preview="handlePreview"

            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :on-error="OnError"
            :on-change="handleChange"
            :action="uploadUrl"
            :data="postData"
            list-type="picture-card"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" append-to-body size="tiny">
            <img :src="dialogImageUrl" width="100%" alt>
          </el-dialog> -->
          <zfupload :limit="1" :file-list="fileList" @fileChange="fileChange" />

        </el-form-item>
        <el-form-item label="类型" prop="BannerType">
          <el-select v-model="form.BannerType" placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              v-cloak
              :key="item.BannerType * 1"
              :label="item.BannerName"
              :value="item.BannerType * 1"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="名称" prop="BannerName">
          <el-input v-model="form.BannerName"/>
        </el-form-item> -->
        <el-form-item label="跳转链接" prop="LinkUrl">
          <!-- <el-input v-model="form.LinkUrl" /> -->
          <zfselect
            class="sel"
            :img-link="form.LinkUrl"
            @setImgLink="setImgLink"
          />
        </el-form-item>
        <el-form-item label="备注" prop="Remarks">
          <el-input v-model="form.Remarks" />
        </el-form-item>
        <el-col :span="1" :offset="2">
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-col>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import { updateBanner, queryBannerType } from '@/api/banner'
// import { deleteFile } from '@/api/file'
// import imgupload from '@/mixins/ImgUpload'
import zfselect from '@/components/ZFSelect'
import zfupload from '@/components/ZFUpload'

export default {
  components: { zfselect, zfupload },
  // mixins: [imgupload],
  props: ['parentmsg'],
  data() {
    return {
      form: {
        BannerId: this.parentmsg.BannerId,
        BannerType: this.parentmsg.BannerType * 1,
        BannerName: this.parentmsg.BannerName,
        Remarks: this.parentmsg.Remarks,
        FileUrl: this.parentmsg.FileUrl,
        LinkUrl: this.parentmsg.LinkUrl
      },
      rules: {
        BannerName: [{ required: true, message: '请输入名称' }],
        Remarks: [{ required: false, message: '请输入简介' }],
        LinkUrl: [{ required: false, message: '请输入简介' }]
      },
      fileList: [],
      dialogImageUrl: '',
      hideUpload: true,
      dialogVisible: false,

      typeOptions: []
    }
  },
  created() {
    // this.fileList[0].url = this.imgUrl + this.form.FileUrl
    this.fileList.push({ url: this.form.FileUrl })
    this.QueryBannerType()
  },
  methods: {
    // 获取轮播图类型列表
    QueryBannerType() {
      queryBannerType().then(res => {
        if (res.data.success) {
          this.typeOptions = JSON.parse(res.data.data).Records
        }
      })
    },
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          // if (this.fileList[0].url === this.form.FileUrl) {
          //   // console.log('使用默认图片上传')
          //   this.update()
          // } else {
          // console.log('自定义图片')
          // this.submitUpload()
          // }
          this.update()
        }
      })
    },
    // submitUpload() {
    //   this.$refs.upload.submit()
    // },
    fileChange(filelist) {
      console.log('fileChange', filelist)
      this.form.FileUrl = filelist[0]
    },
    // async beforeUpload(file) {
    //   await this.getToken()
    //   // console.log(file)
    //   const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
    //   const isLt2M = file.size / 1024 / 1024 < 2
    //   if (!isJPG) this.$message.error('上传图片只能是 JPG 格式!')
    //   if (!isLt2M) this.$message.error('上传图片大小不能超过 2MB!')
    //   return isJPG && isLt2M
    // },
    // handlePreview(file) {
    //   console.log('file preview')
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // },
    // handleRemove(file, fileList) {
    //   console.log('file remove', file, fileList)
    //   this.deleteImg(file.FileUrl)
    //   // .then((response) => {
    //   //   if (response.data.success === true) {
    //   //     // console.log('删除服务器文件')
    //   //   }
    //   // })
    //   // this.fileList[0].url = '' // 删除默认图标则清空
    //   this.fileList = []
    //   this.hideUpload = fileList.length >= 1
    // },
    // handleSuccess(res, file, fileList) {
    //   // this.form.FileUrl = res.data
    //   console.log('file success', res, file, fileList)
    //   this.hideUpload = fileList.length >= 1
    //   this.deleteImg(this.form.FileUrl)
    //   this.form.FileUrl = this.getImgUrl(res)
    //   this.update()
    // },
    // OnError() {
    //   console.log('file error')
    //   this.$message({ type: 'error', message: '上传图片失败！' })
    // },
    // handleChange(file, fileList) {
    //   console.log('change file')
    //   // console.log(file)
    //   this.hideUpload = fileList.length >= 1
    // },
    update() {
      const params = {}
      params.BannerId = this.form.BannerId
      params.BannerType = this.form.BannerType
      // params.BannerName = this.form.BannerName
      params.Remarks = this.form.Remarks
      params.FileUrl = this.form.FileUrl
      params.LinkUrl = this.form.LinkUrl
      updateBanner(params).then(res => {
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
    setImgLink(url) {
      this.form.LinkUrl = url
    }
  }
}
</script>
