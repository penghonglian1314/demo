
<template>
  <el-container class="dialog_main">
    <el-main>
      <el-form ref="addForm" label-width="auto" :inline="true" :model="addForm" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="账号类型:" prop="AccountType">
              <el-input v-model="addForm.AccountType" auto-complete="off" placeholder="请输入账号类型" clearable />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="账号类型名称:" prop="AccountName">
              <el-input v-model="addForm.AccountName" auto-complete="off" placeholder="请输入账号类型名称" clearable />
            </el-form-item>
          </el-col>

        </el-row>
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
  addAccountType
} from '@/api/account'

export default {
  data() {
    return {
      addForm: {
      },
      rules: {
        AccountType: [{ required: true, message: '输入内容不能为空' }],
        AccountName: [{ required: true, message: '输入内容不能为空' }]
      }
    }
  },
  created() {
  },
  methods: {

    submit() {
      this.$refs['addForm'].validate(valid => {
        // console.log(valid, this.addForm.AvatarUrl, this.filenames === '')
        if (valid) {
          this.addAccountType()
        }
      })
    },

    addAccountType() {
      addAccountType(this.addForm).then(response => {
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

