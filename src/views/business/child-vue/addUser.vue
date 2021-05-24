
<template>
  <el-container class="dialog_main">
    <el-main>
      <div style="width:100%;height:1px;background:#EBEEF5;margin:0 0 40px 0" />
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon class="demo-form-inline" label-width="140px">
        <el-form-item label="帐号：" prop="UserID">
          <el-input v-model="ruleForm.UserID" style="width:100%" />
        </el-form-item>
        <el-form-item label="用户名：" prop="UserName">
          <el-input v-model="ruleForm.UserName" />
        </el-form-item>
        <el-form-item label="密码：" prop="Passwd">
          <el-input v-model="ruleForm.Passwd" />
        </el-form-item>
        <el-form-item label="电话：" prop="TelNo">
          <el-input v-model="ruleForm.TelNo" />
        </el-form-item>
        <el-form-item label="邮箱：" prop="Email">
          <el-input v-model="ruleForm.Email" />
        </el-form-item>
        <!-- <el-form-item label="角色：" prop="UserRoles"  >
          <el-select v-model="ruleForm.UserRoles" clearable placeholder="请选择用户角色" style="width:92%">
            <el-option v-for="item in options" :key="item.RoleCode" :label="item.RoleName" :value="item.RoleCode" />
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="选择：" style="width:90%" label-width="20%">
          <el-checkbox v-model="inToProject" label="true" border>增加项目用户</el-checkbox>
          <el-checkbox v-model="isChecked" :disabled="!inToProject" label="true" border>增加账户信息</el-checkbox>
        </el-form-item> -->
      </el-form>

      <div style="width:100%;height:1px;background:#EBEEF5;margin:40px 0 20px 0" />
      <div style="width:30%;margin:0 auto;">
        <el-button type="primary" center @click="submitForm()">添加</el-button>
        <el-button @click="close()">取消</el-button>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { updateUserInfomation } from '@/api/business'
import {
  // addProjectUser,
  // addAccount,
  getUserRole,
  addUser
} from '@/api/user'
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['parentmsg'],
  data() {
    return {
      ruleForm: {
        UserID: '',
        Passwd: '',
        UserName: '',
        CustomerType: 0,
        CustomerID: 0,
        UserRoles: '1200'
      },
      options: [],
      rules: {
        UserID: [{ min: 3, max: 21, required: true, message: '输入长度应为3-21个字符' }],
        UserName: [{ required: true, message: '输入内容不能为空' }],
        Passwd: [{ min: 6, max: 12, required: true, message: '输入长度应为6-12个字符' }],
        TelNo: [{ required: true, message: '输入内容不能为空' }],
        // UserRoles: [{ required: true, message: '输入内容不能为空' }],
        Region: [{ required: true, message: '输入内容不能为空' }],
        Parking: [{ required: true, message: '输入内容不能为空' }]
      }

      // UserRoleUrl: '/role/queryRole.action',
      // addUserUrl: '/jy_lottery/addUserAccount.action',

      // inToProject: false, // 是否添加项目用户
      // addProjectUserUrl: '/jy_lottery/addProjectUser.action',
      // isChecked: false, // 是否添加账户信息
      // addAccountUrl: '/jy_lottery/addAccount.action'
    }
  },
  created() {
    this.getUserRole()
  },
  methods: {
    getUserRole() {
      getUserRole({}
      // , this.UserRoleUrl
      ).then(response => {
        this.options = JSON.parse(response.data.data).Records
      })
    },
    submitForm() {
      this.$refs['ruleForm'].validate(valid => {
        // console.log(valid)
        if (valid) {
          this.addUser()
        }
      })
    },
    addUser() {
      addUser(this.ruleForm
      // , this.addUserUrl
      ).then(response => {
        if (response.data.success) {
          // if (this.isChecked) {
          //   this.addProjectUser()
          // } else {
          // this.$message({ message: '操作成功', type: 'success' })
          this.updateUserInfomation()
          // }
        } else {
          this.$message({ message: '添加用户失败', type: 'error' })
        }
      })
    },
    updateUserInfomation() { // 主键：UserID 在Exten字段添加 BusinessID= ,ShopID=
      const updateUserInfomationList = {}
      updateUserInfomationList.UserID = this.ruleForm.UserID
      updateUserInfomationList.Extend = 'BusinessID=' + this.parentmsg.BusinessID + ',ShopID=0'
      updateUserInfomation(updateUserInfomationList).then(response => {
        if (response.data.success) {
          this.$message({ message: '操作成功', type: 'success' })
          this.close()
        } else {
          this.$message({ message: '操作Extend失败', type: 'error' })
        }
      })
    },
    // changeCheck() {
    //   // console.log(this.isChecked)
    // },
    // addProjectUser() {
    //   // console.log(this.ruleForm)
    //   addProjectUser(this.ruleForm, this.addProjectUserUrl).then(response => {
    //     // console.log(response)
    //     if (response.data.success) {
    //       if (this.isChecked) {
    //         this.addAccount()
    //       } else {
    //         this.$message({ message: '操作成功', type: 'success' })
    //         this.close()
    //       }
    //     } else {
    //       this.$message({ message: '操作失败', type: 'error' })
    //     }
    //   })
    // },
    // addAccount() {
    //   const params = {}
    //   params.UserID = this.ruleForm.UserID
    //   params.Balance = 0
    //   addAccount(params
    //   // , this.addAccountUrl
    //   ).then(response => {
    //     // console.log(response)
    //     if (response.data.success) {
    //       this.$message({ message: '操作成功', type: 'success' })
    //       this.close()
    //     } else {
    //       this.$message({ message: '操作失败', type: 'error' })
    //     }
    //   })
    // },
    close() {
      this.$emit('func', 'close')
    }
  }
}
</script>
<style>
/* .ruleForm .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
  content: ''
} */
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

