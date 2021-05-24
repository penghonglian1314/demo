<template>
  <el-container class="dialog_main">
    <el-main>
      <el-form ref="addForm" label-width="auto" :inline="true" :model="addForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称:" prop="BusinessName">
              <el-input v-model="addForm.BusinessName" auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间:" prop="CreateTime">
              <el-input v-model="addForm.CreateTime" auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商店上限:" prop="ShopCnt">
              <el-input v-model="addForm.ShopCnt" auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司法人姓名:" prop="Corporate">
              <el-input v-model="addForm.Corporate" auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司法人身份证号:" prop="CorporateCardID">
              <el-input v-model="addForm.CorporateCardID" auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司法人电话:" prop="CorporateTelNo">
              <el-input v-model="addForm.CorporateTelNo" auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理员:" prop="ManagerMemberID">
              <el-input v-model="addForm.ManagerMemberID" auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="营业执照:" prop="BusinessLicenseFileID">
              <el-input v-model="addForm.BusinessLicenseFileID" auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注:" prop="Remarks">
              <el-input v-model="addForm.Remarks" auto-complete="off" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态:" prop="Status">
              <el-select v-model="addForm.Status" clearable placeholder="">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="CorporateCardFileID" label="上传身份证图片：">
              <el-upload
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
        </el-row>
        <!--"addForm.PictureFileIDs" -->
      </el-form>
      <div class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-main>
  </el-container>
</template>
<script>

import {
  addTabBusiness,
  deleteFile
} from '@/api/business'
export default {
  data() {
    return {
      PictureFileIDsArr: [],
      dialogVisible: false,
      hideUpload: false,
      dialogImageUrl: '',
      addForm: {
      },
      fileList: [],
      fileListPs: [],
      options: [],
      tableLists: [],
      editorText: '',
      typeOptions: [
        {
          value: '0',
          label: '正常'
        },
        {
          value: '1',
          label: '待审核'
        },
        {
          value: '2',
          label: '已暂停'
        },
        {
          value: '3',
          label: '未通过'
        }
      ]
    }
  },
  created() {
  },
  methods: {
    /*  */
    handleSuccessPs(res, file, fileListPs) {
      this.PictureFileIDsArr.push(res.data)
      console.log(this.fileListPs, '121331')
      console.log(this.PictureFileIDsArr, '0----')
      // this.addTabBusiness()
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
      this.addForm.CorporateCardFileID = res.data
      console.log(this.addForm.CorporateCardFileID, 'CorporateCardFileID')
      this.hideUpload = fileList.length >= 1
      this.addTabBusiness()
    },
    handleUpdateSuccess(res, file, fileList) {
      console.log('update')
      const params = {}
      params.fileUrl = this.editForm.NewFhumbnailFileID
      deleteFile(params).then(response => {
        if (response.data.success) {
          console.log('删除服务器文件')
        }
      })
      this.editForm.CorporateCardFileID = res.data
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

    submit() {
      this.$refs['addForm'].validate(valid => {
        console.log(valid, this.addForm.CorporateCardFileID, this.filenames === '')
        if (valid) {
          if (this.filenames === '') {
            console.log('00000000002')
            this.addTabBusiness()
          } else {
            console.log('111')
            this.submitUpload()
          }
        }
      })
    },
    submitUpdate() {
      this.$refs['editForm'].validate(valid => {
        console.log(valid, this.editForm.CorporateCardFileID, this.filenames === '')
        if (valid) {
          if (this.fileList[0].url === '') {
            this.submitUpload()
          } else {
            this.updateTabGoods()
          }
        }
      })
    },
    uploadUrl() {
      console.log(BASE_API.SERVER_IP + '/lxy_mall/uploadFile.action')
      return BASE_API.SERVER_IP + '/lxy_mall/uploadFile.action'
    },
    addTabBusiness() {
      console.log('addTabBusiness')
      this.submitUpload()
      addTabBusiness(this.addForm).then(response => {
        console.log(this.addForm, 'adddddddddddddd')
        if (response.data.success) {
          this.$message({ message: '添加成功', type: 'success' })
          this.close()
        } else {
          this.$message({ message: '添加失败', type: 'error' })
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

