<template>
  <el-container class="dialog_main">
    <!-- 弃用 -->
    <el-main>
      <el-form ref="editForm" label-width="auto" :inline="true" :model="editForm" :rules="editFormRules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="会员ID:" prop="MemberNumber">
              {{ parsemsg.MemberNumber }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="MemberID:" prop="MemberID">
              {{ parsemsg.MemberID }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称:" prop="MemberName">
              <el-input v-model="editForm.MemberName" auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别:" prop="Sex">
              <el-switch
                v-model="editForm.Sex"
                active-color="#FFC0CB"
                inactive-color="#409EFF"
                active-value="1"
                inactive-value="0"
                active-text="女"
                inactive-text="男"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="等级:" prop="Level">
              <el-input v-model="editForm.Level" auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="推荐人:" prop="Reference">
              <!-- <el-input v-model="editForm.Reference" auto-complete="off" placeholder="请输入" /> -->
              {{ ReferenceName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="搜索推荐人:">
              <el-button @click="queryNode=true">
                点  击
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会员类型:" prop="MemberType">
              <el-input v-model="editForm.MemberType" auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话:" prop="Tel">
              <el-input v-model="editForm.Tel" auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注:" prop="Remarks">
              <el-input v-model="editForm.Remarks" type="textarea" auto-complete="off" placeholder="请输入备注" style="width: 570px" />
            </el-form-item>
          </el-col>
          <el-form-item prop="AvatarUrl" label="上传封面图片：">
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
              :action="uploadUrl"
              :data="postData"
              list-type="picture-card"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body size="tiny">
              <img :src="dialogImageUrl" width="100%" alt>
            </el-dialog>
          </el-form-item>
        </el-row>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="close()">
          取 消
        </el-button>
        <el-button type="primary" @click="submitUpdate()">
          确 定
        </el-button>
      </div>
    </el-main>

    <el-dialog
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
              <el-button type="primary" @click="queryMember">
                查询
              </el-button>
              <el-button @click="queryNode=false">
                取消
              </el-button>
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
            <el-button style="color:rgb(233,195,65);" size="mini" type="text" @click="submitReferees(scope.row)">
              确定
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-container>
</template>
<script>

import {
  updateMember,
  // deleteFile,
  queryMember
} from '@/api/member'
import imgupload from '@/mixins/ImgUpload'
export default { mixins: [imgupload],
  // eslint-disable-next-line vue/require-prop-types
  props: ['parsemsg'],
  data() {
    return {
      tableList: [],
      ReferenceName: this.parsemsg.ReferenceName,
      queryNode: false,
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      hideUpload: false,
      editForm: {},
      editFormRules: {
      },
      queryParams: {
        MemberName: ''
      }
    }
  },
  created() {
    console.log(this.parsemsg, 'parsemsg')
    this.openEditDialog()
  },
  methods: {
    submitReferees(row) {
      console.log(row.MemberNumber, 'row.MemberNumber')
      console.log(row.ReferenceName, 'this.tableList.ReferenceName')
      this.editForm.Reference = row.MemberNumber
      this.ReferenceName = row.ReferenceName
      this.queryNode = false
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    async beforeUpload(file) {
      await this.getToken()
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
      this.deleteImg(file.url)
      console.log('移除')
      console.log(file, fileList)
      this.fileList[0].url = '' // 删除默认图标则清空
      this.hideUpload = fileList.length >= 1
    },
    handleRemoves(file, fileList) {
      this.deleteImg(file.url)
      this.fileList[0].url = '' // 删除默认图标则清空
      this.hideUpload = fileList.length >= 1
    },
    handleSuccess(res, file, fileList) {
      console.log('ffffffffffffffff')
      this.addForm.AvatarUrl = this.getImgUrl(res)
      console.log(this.addForm.AvatarUrl, 'AvatarUrl')
      this.hideUpload = fileList.length >= 1
      this.addTabGoods()
    },
    handleUpdateSuccess(res, file, fileList) {
      console.log('update')
      const params = {}
      params.fileUrl = this.editForm.NewAvatarUrl
      console.log(params.fileUrl, '|||||', this.editForm.NewAvatarUrl)
      // deleteFile(params).then(response => {
      //   if (response.data.success) {
      //     console.log('删除服务器文件')
      //   }
      // })
      this.editForm.AvatarUrl = this.getImgUrl(res)
      this.updateMember()
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

    submit() {
      this.$refs['addForm'].validate(valid => {
        console.log(valid, this.addForm.AvatarUrl, this.filenames === '')
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
        console.log(valid, this.editForm.AvatarUrl, this.filenames === '')
        if (valid) {
          if (this.fileList[0].url === '') {
            console.log('lllllllllllllllll')
            this.submitUpload()
          } else {
            console.log('LLLLLLLLLLLLLLL')
            this.updateMember()
          }
        }
      })
    },
    // uploadUrl() {
    //   console.log(BASE_API.SERVER_IP + '/lxy_mall/uploadFile.action')
    //   return BASE_API.SERVER_IP + '/lxy_mall/uploadFile.action'
    // },
    openEditDialog(row) {
      this.editForm = {
        MemberNumber: this.parsemsg.MemberNumber,
        MemberID: this.parsemsg.MemberID,
        MemberName: this.parsemsg.MemberName,
        Level: this.parsemsg.Level,
        Reference: this.parsemsg.Reference,
        MemberType: this.parsemsg.MemberType,
        Tel: this.parsemsg.Tel,
        Sex: this.parsemsg.Sex,
        Remarks: this.parsemsg.Remarks
      }
      this.editForm.NewAvatarUrl = this.parsemsg.AvatarUrl
      this.fileList = [{ name: '', url: '' }]
      this.fileList[0].url = this.imgUrl + this.parsemsg.AvatarUrl
      this.$refs.editForm && this.$refs.editForm.resetFields()
    },
    updateMember() {
      const params = this.editForm
      console.log(params.AvatarUrl, 'params.AvatarUrl')
      updateMember(params).then((res) => {
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

