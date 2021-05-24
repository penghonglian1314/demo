
<template>
  <el-container class="dialog_main">
    <el-main>
      <el-form ref="addForm" label-width="auto" :inline="true" :model="addForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动名称:" prop="ActivityName">
              <el-input v-model="addForm.ActivityName" auto-complete="off" placeholder="请输入名称" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="商店ID:" prop="ShopID">
              <el-input v-model="addForm.ShopID" auto-complete="off" placeholder="请输入ShopID" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="15">
            <el-form-item label="备注" prop="Remarks">
              <el-input v-model="addForm.Remarks" placeholder="请输入备注" show-word-limit clearable :style="{width: '200%'}" />
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="addMallGoodsActivityType">确 定</el-button>
      </div>
    </el-main>
  </el-container>
</template>
<script>

import {
  addMallGoodsActivityType
} from '@/api/activity'
export default {
  data() {
    return {
      addForm: {
      },
      rules: {
        UserID: [{ min: 3, max: 21, required: true, message: '输入长度应为3-21个字符' }],
        UserName: [{ required: true, message: '输入内容不能为空' }]
      }
    }
  },
  created() {
  },
  methods: {
    addMallGoodsActivityType() {
      console.log(this.addForm, 'adddddddddddddd')
      addMallGoodsActivityType(this.addForm).then(response => {
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

