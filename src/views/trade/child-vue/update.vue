<template>
  <el-container class="dialog_main">
    <el-main>
      <el-form ref="editForm" label-width="auto" :inline="true" :model="editForm" :rules="editFormRules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="交易ID:" prop="TradeID">
              {{ editForm.TradeID }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="当前状态:" prop="Status">
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
            <el-form-item label="交易单号:" prop="TradeCode">
              <el-input v-model="editForm.TradeCode" auto-complete="off" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户ID:" prop="MemberID">
              <el-input v-model="editForm.MemberID" auto-complete="off" placeholder="请输入重量" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="25">
            <el-form-item label="备注:" prop="Remarks">
              <el-input v-model="editForm.Remarks" auto-complete="off" placeholder="请输入备注" type="textarea" style="width:590px" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="updateThcTrade">确 定</el-button>
      </div>
    </el-main>
  </el-container>
</template>
<script>

import {
  updateThcTrade
} from '@/api/trade'
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['parsemsg'],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      hideUpload: false,
      tableLists: [],
      editForm: {},
      editFormRules: {

      },
      typeOptions: [
        {
          value: '0',
          label: '待付款'
        },
        {
          value: '1',
          label: '已支付(待发货)'
        },
        {
          value: '2',
          label: '已发货(待收货)'
        },
        {
          value: '3',
          label: '已收货'
        },
        {
          value: '9',
          label: '已完成'
        }
      ]
    }
  },
  created() {
    // console.log(this.parsemsg, 'parsemsg')
    this.openEditDialog()
  },
  methods: {

    afterChange() {},

    submit() {

    },
    submitUpdate() {

    },

    openEditDialog(row) {
      this.editForm = {
        TradeID: this.parsemsg.TradeID,
        Status: this.parsemsg.Status,
        TradeCode: this.parsemsg.TradeCode,
        MemberID: this.parsemsg.MemberID,
        Remarks: this.parsemsg.Remarks
      }
      this.$refs.editForm && this.$refs.editForm.resetFields()
    },
    updateThcTrade() {
      const params = this.editForm
      updateThcTrade(params).then((res) => {
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

