<template>
  <el-container class="dialog_main">
    <el-main>
      <el-form ref="addForm" label-width="auto" :inline="true" :model="addForm">
        <!-- <el-row>
          <el-col :span="15">
            <el-form-item label="优惠券ID" prop="CouponID">
              <el-input v-model="addForm.CouponID" placeholder="请输入优惠券ID" show-word-limit clearable :style="{width: '200%'}" />
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- 可改为选择框 -->
        <el-row>
          <el-col :span="15">
            <el-form-item label="优惠券类型" prop="Type">
              <!-- <el-input v-model="addForm.Type" placeholder="请输入优惠券类型" show-word-limit clearable :style="{width: '100%'}" /> -->
              <el-select v-model="addForm.Type" placeholder="请输入优惠券类型">
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
              <el-input v-model="addForm.CouponValue" placeholder="请输入折扣值/满减数量" show-word-limit clearable :style="{width: '200%'}" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="使用条件" prop="Conditions">
              <el-input v-model="addForm.Conditions" placeholder="请输入使用条件" show-word-limit clearable :style="{width: '200%'}" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="用户最大持有量" prop="MemberCountLimit">
              <el-input-number v-model="addForm.MemberCountLimit" size="medium" show-word-limit clearable :min="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="最大发放数量" prop="MaxCount">
              <el-input-number v-model="addForm.MaxCount" size="medium" show-word-limit clearable :min="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="描述" prop="Remarks">
              <el-input v-model="addForm.Remarks" placeholder="请输入评论" show-word-limit clearable :style="{width: '200%'}" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="开始时间" prop="BeginTime">
              <el-date-picker
                v-model="addForm.BeginTime"
                type="datetime"
                value-format="yyyyMMddHHmmss"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="结束时间" prop="EndTime">
              <el-date-picker
                v-model="addForm.EndTime"
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
        <el-button type="primary" @click="addCoupons">确 定</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>

import {
  addCoupon
} from '@/api/coupon'
export default {
  data() {
    return {
      addForm: {
        MemberCountLimit: 0,
        MaxCount: 0
      },
      rules: {
        // UserID: [{ min: 3, max: 21, required: true, message: '输入长度应为3-21个字符' }],
        // UserName: [{ required: true, message: '输入内容不能为空' }]
      },
      CouponTypeList: ['折扣劵', '满减劵']
    }
  },
  created() {
  },
  methods: {
    addCoupons() {
      // console.log(addCoupon)
      console.log(this.addForm, 'addCoupons')
      addCoupon(this.addForm).then(response => {
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

