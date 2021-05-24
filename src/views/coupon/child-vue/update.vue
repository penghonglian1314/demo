<template>
  <el-container class="dialog_main">
    <el-main>
      <el-form ref="updateForm" label-width="auto" :inline="true" :model="updateForm" :rules="editFormRules">
        <el-row>
          <el-col :span="15">
            <el-form-item label="优惠券ID" prop="CouponID">
              <el-input v-model="updateForm.CouponID" :disabled="true" placeholder="请输入优惠券ID" show-word-limit clearable :style="{width: '200%'}" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="优惠券类型" prop="Type">
              <el-select v-model="updateForm.Type" placeholder="请输入优惠券类型">
                <el-option
                  v-if="CouponTypeList.length<=Number(updateForm.Type)"
                  label="该类型不存在"
                  :value="updateForm.Type"
                  disabled
                />
                <el-option
                  v-for="(value,key) in CouponTypeList"
                  :key="key"
                  :label="value"
                  :value="String(key)"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="折扣值/满减数量" prop="CouponValue">
              <el-input v-model="updateForm.CouponValue" placeholder="请输入折扣值/满减数量" show-word-limit clearable :style="{width: '200%'}" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="使用条件" prop="Conditions">
              <el-input v-model="updateForm.Conditions" placeholder="请输入使用条件" show-word-limit clearable :style="{width: '200%'}" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="用户最大持有量" prop="MemberCountLimit">
              <el-input-number v-model="updateForm.MemberCountLimit" placeholder="请输入用户最大持有量" show-word-limit clearable :min="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="最大发放数量" prop="MaxCount">
              <el-input-number v-model="updateForm.MaxCount" placeholder="请输入最大发放数量" show-word-limit clearable :min="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="描述" prop="Remarks">
              <el-input v-model="updateForm.Remarks" placeholder="请输入评论" show-word-limit clearable :style="{width: '200%'}" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="开始时间" prop="BeginTime">
              <el-date-picker
                v-model="updateForm.BeginTime"
                type="datetime"
                value-format="yyyyMMddHHmmss"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>
        </el-row><el-row>
          <el-col :span="15">
            <el-form-item label="结束时间" prop="EndTime">

              <el-date-picker
                v-model="updateForm.EndTime"
                type="datetime"
                value-format="yyyyMMddHHmmss"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="updateCoupons">确 定</el-button>
      </div>
    </el-main>
  </el-container>
</template>
<script>

import {
  updateCoupon
} from '@/api/coupon'
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['parsemsg'],
  data() {
    return {
      editForm: '',
      updateForm: {},
      editFormRules: {
      },
      CouponTypeList: ['折扣劵', '满减劵']
    }
  },
  created() {
    // console.log(this.parsemsg, 'parsemsg')
    this.openEditDialog()
  },
  methods: {
    openEditDialog(row) {
      this.updateForm = this.parsemsg
    },
    updateCoupons() {
      // console.log(this.editForm, 'this.editForm')
      // console.log(this.updateForm, 'this.updateForm')

      updateCoupon(this.updateForm).then((res) => {
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          // console.log(res.data)
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

