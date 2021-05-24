
<template>
  <el-container class="dialog_main">
    <el-main>
      <el-form ref="addForm" label-width="auto" :inline="true" :model="addForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称:" prop="MemberName">
              <el-input v-model="addForm.MemberName" auto-complete="off" placeholder="请输入名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别:" prop="Sex">
              <el-switch
                v-model="addForm.Sex"
                active-color="#FFC0CB"
                inactive-color="#409EFF"
                active-value="1"
                inactive-value="0"
                active-text="女"
                inactive-text="男"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="等级:" prop="Level">
              <el-input v-model="addForm.Level" auto-complete="off" placeholder="请输入等级：" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="openID:" prop="MemberID">
              <el-input v-model="addForm.MemberID" auto-complete="off" placeholder="请输入：" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="推荐人:" prop="Reference">
              {{ ReferenceName }}
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="12">
            <el-form-item label="搜索推荐人:">
              <el-button @click="queryNode=true">点  击</el-button>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="会员类型:" prop="MemberType">
              <el-input v-model="addForm.MemberType" auto-complete="off" placeholder="请输入类型：" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话:" prop="Tel">
              <el-input v-model="addForm.Tel" auto-complete="off" placeholder="请输入电话：" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注:" prop="Remarks">
              <el-input v-model="addForm.Remarks" type="textarea" auto-complete="off" placeholder="请输入备注" style="width: 500px" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="AvatarUrl" label="上传头像：">
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
                :data="postData"
                :action="uploadUrl"
                list-type="picture-card"
              >
                <i class="el-icon-plus" />
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" append-to-body size="tiny">
                <img :src="dialogImageUrl" width="100%" alt>
              </el-dialog> -->
              <zfupload :limit="1" @fileChange="fileChange" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-main>

    <!-- <el-dialog
      v-if="queryNode"
      :visible.sync="queryNode"
      title="搜索推荐人"
      width="50%"
      center
      append-to-body
    >
      <el-form ref="queryParams" :model="queryParams" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="一起搜索吧:">
              <el-input v-model="queryParams.MemberName" placeholder="搜索了个寂寞" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="queryMember">查询</el-button>
              <el-button @click="queryNode=false">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        border
        :data="tableList"
      >
        <el-table-column
          prop="MemberNumber"
          label="会员ID"
          width="75"
          align="center"
        />
        <el-table-column
          prop="MemberName"
          label="会员名称"
          width="150"
          align="center"
        />
        <el-table-column
          prop="Sex"
          label="性别"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.Sex === '0'">男</span>
            <span v-if="scope.row.Sex === '1'">女</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button style="color:rgb(233,195,65);" size="mini" type="text" @click="submitReferees(scope.row)">确定</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog> -->

  </el-container>
</template>
<script>

import {
  addMember,
  // deleteFile,
  queryMember
} from '@/api/member'
import {
  formatTimes
} from '@/utils/fortime'
// import imgupload from '@/mixins/ImgUpload'
import zfupload from '@/components/ZFUpload'
export default {
  components: { zfupload },
  // mixins: [imgupload],
  data() {
    return {
      ReferenceName: '',
      tableList: [],
      queryNode: false,
      queryParams: {
        MemberName: ''
      },
      dialogVisible: false,
      hideUpload: false,
      dialogImageUrl: '',
      addForm: {
      },
      fileList: [],

      editorText: '',
      rules: {
        UserID: [{ min: 3, max: 21, required: true, message: '输入长度应为3-21个字符' }],
        UserName: [{ required: true, message: '输入内容不能为空' }]
      }
    }
  },
  created() {
  },
  methods: {
    submitReferees(row) {
      // console.log(row.MemberNumber, 'row.MemberNumber')
      // console.log(row.ReferenceName, 'this.tableList.ReferenceName')
      this.addForm.Reference = row.MemberNumber
      this.ReferenceName = row.ReferenceName
      this.queryNode = false
    },
    // submitUpload() {
    //   this.$refs.upload.submit()
    // },
    // async  beforeUpload(file) {
    //   await this.getToken()
    //   // console.log(file)
    //   const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
    //   const isLt2M = file.size / 2048 / 2048 < 4
    //   if (!isJPG) this.$message.error('上传图片只能是 JPG 格式!')
    //   if (!isLt2M) this.$message.error('上传图片大小不能超过 4MB!')
    //   return isJPG && isLt2M
    // },
    // handlePreview(file) {
    //   // console.log(file)
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // },
    // handleRemove(file, fileList) {
    //   this.deleteImg(file.FileUrl)
    //   // console.log('移除')
    //   // console.log(file, fileList)
    //   this.fileList = []
    //   // this.fileList[0].url = '' // 删除默认图标则清空
    //   this.hideUpload = fileList.length >= 1
    // },

    // handleSuccess(res, file, fileList) {
    //   this.addForm.AvatarUrl = this.getImgUrl(res)
    //   // console.log(this.addForm.AvatarUrl, 'AvatarUrl')
    //   this.hideUpload = fileList.length >= 1
    //   this.addMember()
    // },

    // OnError() {
    //   this.$message({ type: 'error', message: '上传图片失败！' })
    // },
    // handleChange(file, fileList) {
    //   // console.log('change file')
    //   // console.log(file)
    //   this.filenames = file.name
    //   this.hideUpload = fileList.length >= 1
    // },
    fileChange(filelist) {
      console.log('fileChange', filelist)
      this.addForm.AvatarUrl = filelist[0]
    },
    submit() {
      this.$refs['addForm'].validate(valid => {
        // console.log(valid, this.addForm.AvatarUrl, this.filenames === '')
        if (valid) {
          this.addMember()
          // if (this.filenames === '') {
          //   // console.log('00000000002')
          //   this.addMember()
          // } else {
          //   // console.log('111')
          //   this.submitUpload()
          // }
        }
      })
    },
    // submitUpdate() {
    //   this.$refs['editForm'].validate(valid => {
    //     // console.log(valid, this.editForm.AvatarUrl, this.filenames === '')
    //     if (valid) {
    //       if (this.fileList[0].url === '') {
    //         this.submitUpload()
    //       } else {
    //         this.updateTabGoods()
    //       }
    //     }
    //   })
    // },
    // uploadUrl() {
    //   // // console.log(BASE_API.SERVER_IP + '/lxy_mall/uploadFile.action')
    //   return BASE_API.SERVER_IP + '/lxy_mall/uploadFile.action'
    // },
    addMember() {
      // console.log('addMember')
      // this.submitUpload()
      // eslint-disable-next-line no-irregular-whitespace
      var date = formatTimes(new Date())
      this.addForm.CreateTime = date
      // console.log(this.addForm.CreateTime, '时间')
      addMember(this.addForm).then(response => {
        // console.log(this.addForm, 'adddddddddddddd')
        if (response.data.success) {
          this.$message({ message: '添加成功', type: 'success' })
          this.close()
        } else {
          this.$message({ message: '添加失败', type: 'error' })
        }
      })
    },
    queryMember() {
      queryMember(this.queryParams).then(response => {
        if (JSON.parse(response.data.data).RowCnt) {
          this.tableList = JSON.parse(response.data.data).Records
        }
      })
    },
    close() {
      this.$emit('func', 'close')
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

