<template>
  <el-container class="dialog_main">
    <el-main>
      <div style="width:100%;height:1px;background:#EBEEF5;margin:0 0 40px 0" />
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" :inline="true" status-icon class="demo-form-inline">
        <el-form-item label="用户ID：" prop="UserID" style="width:45%" label-width="40%">
          <el-input v-model="ruleForm.UserID" disabled />
        </el-form-item>
        <el-form-item label="用户名：" prop="UserName" style="width:45%" label-width="40%">
          <el-input v-model="ruleForm.UserName" />
        </el-form-item>
        <el-form-item label="电话：" prop="TelNo" style="width:45%" label-width="40%">
          <el-input v-model="ruleForm.TelNo" />
        </el-form-item>
        <el-form-item label="邮箱：" prop="Email" style="width:45%" label-width="40%">
          <el-input v-model="ruleForm.Email" />
        </el-form-item>
      </el-form>
      <div style="width:100%;height:1px;background:#EBEEF5;margin:40px 0 20px 0" />
      <div style="width:30%;margin:0 auto;">
        <el-button type="primary" center @click="submitForm()">提交</el-button>
        <el-button @click="close()">取消</el-button>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { updateUserInfo } from '@/api/user'
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['parentmsg'],
  data() {
    return {
      ruleForm: {
        UserID: this.parentmsg.UserID,
        UserName: this.parentmsg.UserName,
        TelNo: this.parentmsg.TelNo,
        Email: this.parentmsg.Email
      },
      rules: {
        UserName: [{ required: true, message: '输入内容不能为空' }],
        TelNo: [{ required: true, message: '输入内容不能为空' }]
      },
      updateUrl: '/jy_lottery/updateUserInfo.action'
    }
  },
  created() {},
  methods: {
    submitForm() {
      this.$refs['ruleForm'].validate(valid => {
        // console.log(valid)
        if (valid) {
          this.updateUserInfo()
        }
      })
    },
    updateUserInfo() {
      // console.log(this.ruleForm)
      updateUserInfo(this.ruleForm, this.updateUrl).then(response => {
        // console.log(response)
        if (response.data.success) {
          this.$message({ message: '修改信息成功', type: 'success' })
          this.close()
        } else {
          this.$message({ message: '修改信息失败', type: 'error' })
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
/* .RoleruleForm .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
  content: ''
} */
.RoleruleForm .el-form-item__error {
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

