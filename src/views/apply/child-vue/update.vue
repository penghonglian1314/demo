<template>
  <el-container class="dialog_main">
    <el-main>
      <el-form ref="editForm" label-width="auto" :model="editForm">
        <el-row :gutter="40">
          <el-col :span="10">
            <!-- <el-form-item label="账号:">
                <el-button type="primary" @click="toaccountNode()">
                  管理账号
                </el-button>
              </el-form-item> -->

            <el-form-item label="商户名称:" prop="BusinessName">
              <el-input v-model="editForm.BusinessName" disabled prefix-icon="el-icon-office-building" />
            </el-form-item>

            <!-- <el-row>
                <el-col :span="12">
                  <el-form-item  label="商店上限:" prop="ShopCnt">
                    <el-input v-model="editForm.ShopCnt" disabled  prefix-icon="el-icon-finished" />
                  </el-form-item>
                </el-col>
              </el-row> -->

            <el-form-item label="公司法人姓名:" prop="Corporate">
              <el-input v-model="editForm.Corporate" disabled prefix-icon="el-icon-s-custom" />
              <!-- {{ editForm.Corporate }} -->
            </el-form-item>

            <el-form-item label="公司法人电话:" prop="CorporateTelNo">
              <el-input v-model="editForm.CorporateTelNo" disabled prefix-icon="el-icon-phone" />
              <!-- {{ editForm.CorporateTelNo }} -->
            </el-form-item>

            <el-form-item label="公司法人身份证号:" prop="CorporateCardID">
              <el-input v-model="editForm.CorporateCardID" disabled prefix-icon="el-icon-postcard" />
              <!-- {{ editForm.CorporateCardID }} -->
            </el-form-item>

            <el-form-item label="管理员:" prop="ManagerMemberID">
              <el-input v-model="editForm.ManagerMemberID" disabled prefix-icon="el-icon-open" />
              <!-- {{ editForm.ManagerMemberID }} -->
            </el-form-item>
            <el-form-item label="备注:" prop="Remarks">
              <el-input v-model="editForm.Remarks" disabled prefix-icon="el-icon-tickets" />
              <!-- {{ editForm.Remarks }} -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业执照:" prop="BusinessLicenseFileID">
              <span v-if="editForm.BusinessLicenseFileID === ''">暂未上传</span>
              <img
                v-else
                :src="editForm.BusinessLicenseFileID"
                width="60%"
                style="cursor: pointer;"
                alt
              >
            </el-form-item>

            <el-form-item label="身份证正面照:" prop="CorporateCardFileID">
              <span v-if="editForm.CorporateCardFileID === ''">暂未上传</span>
              <img
                v-else
                :src="editForm.CorporateCardFileID"
                width="60%"
                style="cursor: pointer;"
                alt
              >
            </el-form-item>

            <el-form-item label="身份证反面照:" prop="CorporateCardFileID2">
              <span v-if="editForm.CorporateCardFileID2 === ''">暂未上传</span>
              <img
                v-else
                :src="editForm.CorporateCardFileID2"
                width="60%"
                style="cursor: pointer;"
                alt
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider />
        <el-row>
          <el-col :span="24">
            <el-form-item label="当前状态:" prop="ApplyStatus">
              <el-switch
                v-model="editForm.ApplyStatus"
                active-value="0"
                inactive-value="3"
                active-text="通过"
                inactive-text="不通过"
              />
            </el-form-item>
          </el-col>
          <!-- 当选择不通过时 弹出审核意见输入框 -->
          <el-col v-if="editForm.ApplyStatus==3" :span="20">
            <el-form-item label="审核意见:" prop="Reason">
              <el-input v-model="editForm.Reason" type="textarea" auto-complete="off" autosize placeholder="请输入" style="width:500px" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer" style="marginLeft:140px;">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-main>
  </el-container>
</template>
<script>

import {
  updateTabBusinessApply
} from '@/api/apply'
import {
  // queryTabBusiness,
  // addTabBusiness,
  updateTabBusiness
  // addTabShop,
  // updateUserInfomation
} from '@/api/business'
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['parsemsg'],
  data() {
    return {
      // ShopIDadd: '',
      // BusinessIDadd: '',
      // TotalSize: '',
      // dialogImageUrl: '',
      // dialogVisible: false,
      // hideUpload: false,
      // tableLists: [],
      editForm: {
        ApplyStatus: 3
      },
      // imgUrl: BASE_API.SERVER_IP + '/lxy_mall/file.action?fileUrl=',
      // addForm: {

      // },
      TypeMap: {
        '0': '正常',
        '1': '待审核',
        '2': '已暂停',
        '3': '未通过'
      },
      ApplyTypeMap: {
        '0': '添加',
        '1': '修改'
      }
    }
  },
  created() {
    console.log(this.parsemsg, 'parsemsg')
    this.editForm = { ...this.editForm, ...this.parsemsg }
    // this.openEditDialog()
    // this.queryTabBusiness()
  },
  methods: {
    submit() { // 判断操作函数
      console.log('submit函数触发')
      if (this.editForm.ApplyStatus * 1 === 3) { // 当状态为未通过
        this.updateTabBusinessApply()
      } else if (this.editForm.ApplyStatus * 1 === 0) { // 审核通过
        this.updateTabBusiness()
      } else {
        console.log('未触发')
      }
    },
    updateTabBusiness() {
      const params = this.editForm
      // params.BusinessID = this.editForm.BusinessID
      updateTabBusiness(params).then((res) => {
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.updateTabBusinessApply()
          this.close()
        } else {
          this.$message({
            type: 'error',
            message: '修改失败'
          })
          this.ApplyStatus = '2'
          this.updateTabBusinessApply()
          this.close()
        }
      })
    },
    // queryTabBusiness() {
    //   const queryParams = {}
    //   queryParams.BusinessName = this.editForm.BusinessName
    //   console.log(this.editForm.BusinessName, 'this.editForm.BusinessName')
    //   console.log(queryParams.BusinessName, 'this.queryParams.BusinessName')
    //   queryTabBusiness(queryParams).then(response => {
    //     if (JSON.parse(response.data.data).RowCnt) {
    //       this.TotalSize = JSON.parse(response.data.data).TotalSize
    //       console.log(this.TotalSize, 'this.TotalSize')
    //       // 打印当前时间
    //       // eslint-disable-next-line no-irregular-whitespace
    //       var date = new Date()
    //       console.log(date, '当前时间')
    //     }
    //   })
    // },
    // addTabShop() { // 添加商店
    //   const addFormTabShop = {}// ShopTitle ShopDes Region Remarks
    //   addFormTabShop.BusinessID = this.BusinessIDadd
    //   addFormTabShop.ShopTitle = this.editForm.BusinessName + '的默认商店'
    //   addFormTabShop.CreateTime = this.editForm.CreateTime
    //   addTabShop(addFormTabShop).then(response => {
    //     console.log(addFormTabShop, 'adddddddddddddd')
    //     if (response.data.success) {
    //       this.$message({ message: '添加成功', type: 'success' })
    //       this.ShopIDadd = JSON.parse(response.data.data).ShopID// 获取id
    //       console.log(this.ShopIDadd, 'ShopID')
    //       this.updateUserInfomation()
    //     } else {
    //       this.$message({ message: '添加失败', type: 'error' })
    //     }
    //   })
    // },
    // addTabBusiness() {
    //   this.addForm = this.editForm
    //   addTabBusiness(this.addForm).then(response => {
    //     console.log(this.addForm, 'adddddddddddddd')
    //     if (response.data.success) {
    //       this.$message({ message: '添加成功', type: 'success' })
    //       this.BusinessIDadd = JSON.parse(response.data.data).BusinessID// 获取id
    //       console.log(this.BusinessIDadd, 'BusinessIDadd')
    //       this.addTabShop()
    //     } else {
    //       this.$message({ message: '添加失败', type: 'error' })
    //     }
    //   })
    // },

    // updateUserInfomation() { // 主键：UserID 在Exten字段添加 BusinessID= ,ShopID=
    //   const updateUserInfomationList = {}
    //   updateUserInfomationList.UserID = this.editForm.ManagerMemberID
    //   updateUserInfomationList.Extend = 'BusinessID=' + this.BusinessIDadd + ',ShopID=' + this.ShopIDadd
    //   updateUserInfomation(updateUserInfomationList).then(response => {
    //     if (response.data.success) {
    //       this.$message({ message: '添加成功', type: 'success' })
    //     } else {
    //       this.$message({ message: '添加失败', type: 'error' })
    //     }
    //   })
    // },

    updateTabBusinessApply() {
      const params = {}
      params.ApplyID = this.editForm.ApplyID
      params.ApplyStatus = this.editForm.ApplyStatus
      params.Reason = this.editForm.Reason
      updateTabBusinessApply(params).then((res) => {
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
      this.$emit('func')
    }

  }
}
</script>
<style>

.editForm .el-form-item__error {
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

