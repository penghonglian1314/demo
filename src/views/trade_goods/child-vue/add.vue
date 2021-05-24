
<template>
  <el-container class="dialog_main">
    <el-main>
      <el-form ref="addForm" label-width="auto" :inline="true" :model="addForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态:" prop="Status">
              <el-select v-model="addForm.Status" clearable placeholder="">
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
              <el-input v-model="addForm.TradeCode" auto-complete="off" placeholder="请输入品牌型号编码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户ID:" prop="MemberID">
              <el-input v-model="addForm.MemberID" auto-complete="off" placeholder="请输入品牌型号编码" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="25">
            <el-form-item label="备注:" prop="Remarks">
              <el-input v-model="addForm.Remarks" auto-complete="off" placeholder="请输入备注" type="textarea" style="width:590px" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="addThcTrade">确 定</el-button>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import {
  formatTimes
} from '@/utils/fortime'
import {
  addThcTrade
} from '@/api/trade'
export default {
  data() {
    return {
      addForm: {
      },
      tableLists: [],
      rules: {
        UserID: [{ min: 3, max: 21, required: true, message: '输入长度应为3-21个字符' }],
        UserName: [{ required: true, message: '输入内容不能为空' }]
      },
      // 交易状态,0:待付款, 1:已支付(待发货),2:已发货(待收货),3:已收货: 9:已完成
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
  },
  methods: {
    afterChange() {},
    submit() {

    },
    addThcTrade() {
      // console.log('addTabGoods')
      // eslint-disable-next-line no-irregular-whitespace
      var date = formatTimes(new Date())
      this.addForm.TradeTime = date
      // console.log(this.addForm.TradeTime, '时间')
      // TradeTime
      addThcTrade(this.addForm).then(response => {
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

