<template>
  <el-container class="dialog_main">
    <el-main>
      <el-form ref="updateForm" label-width="auto" :inline="true" :model="updateForm" :rules="rules">
        <!-- <el-row> -->
        <!-- <el-row> -->
        <el-form-item label="账号类型:" prop="AccountType">
          <el-input v-model="updateForm.AccountType" disabled />
        </el-form-item>
        <!-- </el-row> -->

        <!-- <el-row> -->
        <el-form-item label="账号类型名称:" prop="AccountName">
          <el-input v-model="updateForm.AccountName" auto-complete="off" placeholder="请输入账号类型名称" clearable />
        </el-form-item>
        <!-- </el-row> -->
        <!-- <el-col :span="12">
            <el-form-item label="会员ID:" prop="MemberNumber">
              {{ parsemsg.MemberNumber }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="MemberID:" prop="MemberID">
              {{ parsemsg.MemberID }}
            </el-form-item>
          </el-col> -->
        <!-- </el-row> -->
      </el-form>

      <div class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-main>

  </el-container>
</template>
<script>

import {
  updateAccountType
} from '@/api/account'
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['parentmsg'],
  data() {
    return {
      updateForm: {
        AccountType: '', AccountName: ''
      },
      rules: {
        AccountType: [{ required: true, message: '输入内容不能为空' }],
        AccountName: [{ required: true, message: '输入内容不能为空' }]
      }
    }
  },
  created() {
    console.log(this.parentmsg)
    this.updateForm.AccountType = this.parentmsg.AccountType
    this.updateForm.AccountName = this.parentmsg.AccountName
  },
  methods: {
    submit() {
      this.$refs['updateForm'].validate(valid => {
        // console.log(valid, this.updateForm.AvatarUrl, this.filenames === '')
        if (valid) {
          this.updateAccountType()
        }
      })
    },

    updateAccountType() {
      updateAccountType(this.updateForm).then((res) => {
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

