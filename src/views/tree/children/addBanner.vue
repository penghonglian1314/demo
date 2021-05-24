<template>
  <el-container>
    <el-main>
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="图片" prop="FileUrl">
          <!-- <el-upload
            ref="upload"
            :class="{hide:hideUpload}"
            :file-list="fileList"
            :auto-upload="false"
            :limit="1"
            :before-upload="beforeUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :on-error="OnError"
            :on-change="handleChange"
            list-type="picture-card"

            :data="postData"
            :action="uploadUrl"
          >

            <i class="el-icon-plus" />
          </el-upload>
              <el-dialog :visible.sync="dialogVisible" append-to-body size="tiny">
            <img :src="dialogImageUrl" width="100%" alt>
          </el-dialog> -->
          <zfupload :limit="1" @fileChange="fileChange" />

        </el-form-item>
        <!-- <el-form-item label="名称" prop="BannerName">
          <el-input v-model="form.BannerName"/>
        </el-form-item>
        <el-form-item label="优先级" prop="SequenceId">
          <el-input v-model="form.SequenceId"/>
        </el-form-item> -->
        <el-form-item label="名称" prop="BannerName">
          <el-select v-model="form.BannerName" placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              :key="item.BannerType*1"
              :label="item.BannerName"
              :value="item.BannerName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="跳转链接" prop="LinkUrl">
          <!-- <el-input v-model="form.LinkUrl" /> -->
          <zfselect class="sel" :img-link="form.LinkUrl" @setImgLink="setImgLink" />
        </el-form-item>
        <el-form-item label="备注" prop="Remarks">
          <el-input v-model="form.Remarks" />
        </el-form-item>
        <el-col :span="1" :offset="2">
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <!--  -->
          <!-- <el-button type="primary" @click="testadd()">测试提交</el-button> -->
        </el-col>
      </el-form>
    </el-main></el-container>
</template>

<script>
import { addBanner, queryBannerType } from '@/api/banner'
// import imgupload from '@/mixins/ImgUpload'
import zfselect from '@/components/ZFSelect'
import zfupload from '@/components/ZFUpload'
export default {
  components: { zfselect, zfupload },
  // mixins: [imgupload],
  data() {
    return {
      form: {
        // SequenceId: 9,
        BannerType: 0,
        BannerName: '',
        LinkUrl: '',
        Remarks: '',
        FileUrl: ''
      },
      rules: {
        // SequenceId: [{ required: true, message: '请输入优先级' }],
        // BannerType: [{ required: true, message: '请选择类型' }],
        BannerName: [{ required: true, message: '请输入名称' }]
        // Remarks: [{ required: true, message: '请输入简介' }]
      },
      fileList: [],
      dialogImageUrl: '',
      hideUpload: false,

      dialogVisible: false,
      typeOptions: []
    }
  },
  created() {
    this.QueryBannerType()
  },
  methods: {
    QueryBannerType() {
      queryBannerType().then(res => {
        if (res.data.success) {
          // console.log(JSON.parse(res.data.data))
          this.typeOptions = JSON.parse(res.data.data).Records
        }
      })
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    fileChange(filelist) {
      console.log('fileChange', filelist)
      this.form.FileUrl = filelist[0]
    },
    // async  beforeUpload(file) {
    //   await this.getToken()
    //   // console.log(file, '上传的图片函数')
    //   const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
    //   const isLt2M = file.size / 1024 / 1024 < 2
    //   if (!isJPG) this.$message.error('上传图片只能是 JPG 格式!')
    //   if (!isLt2M) this.$message.error('上传图片大小不能超过 2MB!')
    //   return isJPG && isLt2M
    // },
    // handlePreview(file) {
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // },
    // handleRemove(file, fileList) {
    //   this.deleteImg(file.FileUrl)
    //   console.log('add banner handleRemove', file, fileList)
    //   this.fileList = []
    //   // this.fileList[0].url = '' // 删除默认图标则清空
    //   this.hideUpload = fileList.length >= 1
    // },
    // handleSuccess(res, file, fileList) {
    //   // this.form.FileUrl = res.data
    //   this.form.FileUrl = this.getImgUrl(res)
    //   this.hideUpload = fileList.length >= 1
    //   this.add()
    // },
    // OnError() { this.$message({ type: 'error', message: '上传图片失败！' }) },
    // handleChange(file, fileList) {
    //   // console.log('change file')
    //   // console.log(file)
    //   // this.form.FileUrl = file.uid
    //   this.hideUpload = fileList.length >= 1
    // },
    submitForm() {
      this.$refs['form'].validate(valid => {
        // console.log('验证', valid)
        if (valid) {
          // this.submitUpload()
          this.add()
        }
      })
    },
    add() {
      const params = {}
      // params.SequenceId = this.form.SequenceId
      // params.BannerName = this.form.BannerName
      // params.BannerType = this.form.BannerType
      params.BannerType = this.typeOptions.filter(v => v.BannerName === this.form.BannerName)[0].BannerType
      params.LinkUrl = this.form.LinkUrl
      params.Remarks = this.form.Remarks
      params.FileUrl = this.form.FileUrl
      // console.log('?', this.typeOptions)
      // console.log('提交数据', params)
      addBanner(params).then(response => {
        if (response.data.success === true) {
          this.$message({
            message: '添加成功！',
            type: 'success'
          })
          this.close()
        } else {
          this.$message({
            message: '添加失败！',
            type: 'error'
          })
        }
      })
    },
    close() {
      this.$emit('func', 'close')
    },
    testadd() {
      this.$refs['form'].validate(valid => {
        // console.log('验证', valid)
        if (valid) {
          this.add()
        }
      })
    },
    setImgLink(url) {
      this.form.LinkUrl = url
    }
  }
}
</script>
<style>
.hide .el-upload--picture-card {
	display: none;
}
</style>
