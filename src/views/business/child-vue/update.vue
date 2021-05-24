<template>
  <el-container class="dialog_main">
    <el-main>
      <el-form ref="editForm" label-width="auto" :inline="true" :model="editForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称:" prop="BusinessName">
              <!-- {{ editForm.BusinessName }} -->
              <el-input v-model="editForm.BusinessName" auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间:" prop="CreateTime">
              <!-- {{ editForm.CreateTime }} -->
              <el-input v-model="editForm.CreateTime" auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商店上限:" prop="ShopCnt">
              <!-- {{ editForm.ShopCnt }} -->
              <el-input v-model="editForm.ShopCnt" auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司法人姓名:" prop="Corporate">
              <!-- {{ editForm.Corporate }} -->
              <el-input v-model="editForm.Corporate" auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司法人身份证号:" prop="CorporateCardID">
              <!-- {{ editForm.CorporateCardID }} -->
              <el-input v-model="editForm.CorporateCardID" auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司法人电话:" prop="CorporateTelNo">
              <!-- {{ editForm.CorporateTelNo }} -->
              <el-input v-model="editForm.CorporateTelNo" auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理员:" prop="ManagerMemberID">
              <!-- {{ editForm.ManagerMemberID }} -->
              <el-input v-model="editForm.ManagerMemberID" auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="营业执照:" prop="BusinessLicenseFileID">
              <!-- {{ editForm.BusinessLicenseFileID }} -->
              <el-input v-model="editForm.BusinessLicenseFileID" auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注:" prop="Remarks">
              <!-- {{ editForm.Remarks }} -->
              <el-input v-model="editForm.Remarks" auto-complete="off" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="当前状态:" prop="Status">
              <!-- {{ TypeMap[editForm.Status] }} -->
              <el-select v-model="editForm.Status" clearable placeholder="">
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
            <el-form-item prop="CorporateCardFileID" label="身份证正面图片：">
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
          <el-col :span="24">
            <el-form-item prop="CorporateCardFileID2" label="身份证反面图片：">
              <el-upload
                ref="upload"
                :class="{hide:hideUpload}"
                :file-list="fileList_s"
                :auto-upload="true"
                :limit="1"
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
        <!--"editForm.PictureFileIDs" -->
      </el-form>
      <div class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submitUpdate">确 定</el-button>
      </div>
    </el-main>
  </el-container>
</template>
<script>

import {
  updateTabBusiness
} from '@/api/business'
import up from '@/mixins/ImgUpload'
export default {
  mixins: [up],
  // eslint-disable-next-line vue/require-prop-types
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      hideUpload: false,
      editForm: {},
      editFormRules: {

      },
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
      ],
      TypeMap: {
        '0': '正常',
        '1': '待审核',
        '2': '已暂停',
        '3': '未通过'
      },
      fileList: [],
      fileList_s: []
    }
  },
  created() {
    this.message = this.$route.query
    this.openEditDialog()
  },
  methods: {
    afterChange() {},
    onContentChange(val) {
      this.editorTextCopy = val
      console.log(this.editorText)
    },
    submitUpload() {
      this.$refs.upload.submit()
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

    submit() {
      this.$refs['addForm'].validate(valid => {
        console.log(valid, this.addForm.CorporateCardFileID, this.filenames === '')
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
        console.log(valid, this.editForm.CorporateCardFileID, this.filenames === '')
        if (valid) {
          if (this.fileList[0].url === '') {
            this.submitUpload()
          } else {
            this.updateTabBusiness()
          }
        }
      })
    },

    openEditDialog(row) {
      this.editForm = {
        BusinessID: this.parsemsg.BusinessID,
        SysCustomerID: this.parsemsg.SysCustomerID,
        BusinessName: this.parsemsg.BusinessName,
        CreateTime: this.parsemsg.CreateTime,
        ShopCnt: this.parsemsg.ShopCnt,
        Corporate: this.parsemsg.Corporate,
        CorporateCardID: this.parsemsg.CorporateCardID,
        CorporateTelNo: this.parsemsg.CorporateTelNo,
        CorporateCardFileID: this.parsemsg.CorporateCardFileID,
        CorporateCardFileID2: this.parsemsg.CorporateCardFileID2,
        ManagerMemberID: this.parsemsg.ManagerMemberID,
        BusinessLicenseFileID: this.parsemsg.BusinessLicenseFileID,
        Status: this.parsemsg.Status,
        Remarks: this.parsemsg.Remarks
      }
      this.editForm.NewCorporateCardFileID = this.parsemsg.CorporateCardFileID
      this.fileList = [{ name: '', url: '' }]
      this.fileList[0].url = this.imgUrl + this.parsemsg.CorporateCardFileID
      this.$refs.editForm && this.$refs.editForm.resetFields()
    },
    updateTabBusiness() {
      const params = {}
      params.BusinessID = this.editForm.BusinessID
      params.BusinessName = this.editForm.BusinessName
      params.CorporateCardFileID = this.editForm.CorporateCardFileID
      updateTabBusiness(params).then((res) => {
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

