<template>
  <div class="upload-container">
    <el-button :disabled="disabled" :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">
      上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <!-- <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        action="https://httpbin.org/post"
        list-type="picture-card"
      >
        <el-button size="small" type="primary">
          Click upload
        </el-button>
      </el-upload> -->
      <el-row class="editor-slide-upload">
        <zfupload v-if="dialogVisible" :limit="100" :drag="false" @fileChange="fileChanges" />
      </el-row>
      <el-row class="editor-btn-upload">
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="handleSubmit">
          确认
        </el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import zfupload from '@/components/ZFUpload'

export default {
  name: 'EditorSlideUpload',
  components: { zfupload },
  props: {
    color: {
      type: String,
      default: '#1890ff'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: []
    }
  },
  methods: {
    fileChanges(filelist) {
      filelist.map((v, k) => this.listObj[k] = ({ url: v }))
    },
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      // if (!this.checkAllSuccess()) {
      //   this.$message('Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!')
      //   return
      // }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      console.log(this.listObj,
        this.fileList)
      this.dialogVisible = false
    }
    // handleSuccess(response, file) {
    //   const uid = file.uid
    //   const objKeyArr = Object.keys(this.listObj)
    //   for (let i = 0, len = objKeyArr.length; i < len; i++) {
    //     if (this.listObj[objKeyArr[i]].uid === uid) {
    //       this.listObj[objKeyArr[i]].url = response.files.file
    //       this.listObj[objKeyArr[i]].hasSuccess = true
    //       return
    //     }
    //   }
    // }
    // handleRemove(file) {
    //   const uid = file.uid
    //   const objKeyArr = Object.keys(this.listObj)
    //   for (let i = 0, len = objKeyArr.length; i < len; i++) {
    //     if (this.listObj[objKeyArr[i]].uid === uid) {
    //       delete this.listObj[objKeyArr[i]]
    //       return
    //     }
    //   }
    // },
    // beforeUpload(file) {
    //   const _self = this
    //   const _URL = window.URL || window.webkitURL
    //   const fileName = file.uid
    //   this.listObj[fileName] = {}
    //   return new Promise((resolve, reject) => {
    //     const img = new Image()
    //     img.src = _URL.createObjectURL(file)
    //     img.onload = function() {
    //       _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
    //     }
    //     resolve(true)
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  ::v-deep .el-upload--picture-card {
    width: 100%;
  }

}
// .el-upload-dragger{
//     height:140px!important;
// }
.editor-btn-upload{
  margin-top:20px
}
</style>
