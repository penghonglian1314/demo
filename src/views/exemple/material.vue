<template>
  <el-container>
    <el-header class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item>物料管理</el-breadcrumb-item>
        <el-breadcrumb-item>物料收料</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main class="main">
      <div class="query_form">
        <el-form ref="queryForm" label-width="auto" :model="queryForm" :inline="true">
          <el-row>
            <el-col :span="6">
              <el-form-item label="工地:" prop="SiteId">
                <el-select v-model="queryForm.SiteId" placeholder="请选择工地">
                  <el-option
                    v-for="(val, key) in SiteOption "
                    :key="key"
                    :value="val.SiteId"
                    :label="val.SiteName"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="物料类型:" prop="MaterialType">
                <el-select v-model="queryForm.MaterialType" placeholder="请选择物料类型">
                  <el-option
                    v-for="(val, key) in MaterialOption"
                    :key="key"
                    :value="val.ItemCode"
                    :label="val.Title"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收料时间:" prop="BeginTime">
                <el-date-picker
                  v-model="queryForm.BeginTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  value-format="yyyyMMddHHmmss"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="车牌号码:" prop="CarNo">
                <el-input v-model="queryForm.CarNo" placeholder="请输入车牌号码" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="query_form_btn">
        <el-button type="primary" @click="render">查询</el-button>
        <el-button @click="reset('queryForm')">重置</el-button>
      </div>
      <!-- table  -->
      <div class="table">
        <el-table
          :data="tableData"
          align="center"
          style="width: 100%"
          :header-cell-style="{background:'rgba(249,250,252,1)'}"
          stripe
        >
          <el-table-column prop="SiteName" label="工地名称:" align="center" width="170" />
          <el-table-column prop="Title" label="物料类型" align="center" width="170" />
          <el-table-column label="收料时间" align="center" prop="RealReceiveDate" width="240">
            <template slot-scope="scope">
              <span v-if="scope.row.RealReceiveDate">{{ (scope.row.RealReceiveDate || '').slice(0,4)+'-'+(scope.row.RealReceiveDate || '').slice(4,6)+'-'
                +(scope.row.RealReceiveDate || '').slice(6,8) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="EvidenceWeight" label="单据重量" align="center" width="240">
            <template slot-scope="scope">
              {{ Number(scope.row.EvidenceWeight).toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column prop="RealWeight" label="实称重量" align="center" width="240">
            <template slot-scope="scope">
              {{ Number(scope.row.RealWeight).toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column prop="CarNo" label="车牌号码" align="center" width="170" />
          <el-table-column prop="ReceiveBy" label="收料人" align="center" width="170" />
          <el-table-column align="center" label="操作" min-width="150">
            <template slot-scope="scope">
              <el-button style="color:#409EFF;" size="mini" type="text" @click="addPlan(scope.row)">查询计划</el-button>
              <el-button style="color:rgb(233,195,65);" size="mini" type="text" @click="handleReceipt( scope.row)">修改</el-button>
              <el-button style="color:rgb(150,150,150);" size="mini" type="text" @click="handleDetails( scope.row)">详情</el-button>
            </template>
          </el-table-column>

        </el-table>
        <el-pagination
          align="right"
          :current-page="queryForm.current"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="queryForm.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="queryForm.totalSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-main>
    <!-- dialog 查询计划 -->
    <el-dialog title="收料详情" :visible.sync="addPlanDialog" width="45%">
      <el-form :inline="true">
        <el-row>
          <el-col :span="12">
            <el-form-item label="记录ID :">
              {{ planData.RecordId }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="物料类型 :">
              {{ planData.MaterialType }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用量 :">
              {{ Number(planData.Amount).toFixed(2) }} {{ planData.Unit }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="重量 :">
              {{ Number(planData.Weight).toFixed(2) }} {{ planData.Unit }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="时间 :">
              {{ (planData.PlanUseDate || '').slice(0,4)+'-'+(planData.PlanUseDate || '').slice(4,6)+'-'
                +(planData.PlanUseDate || '').slice(6,8) }}
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addPlanDialog = false">退 出</el-button>
      </div>
    </el-dialog>
    <!-- dialog 修改 -->
    <el-dialog title="修改收料详情" :visible.sync="editUser" width="45%" @close="closeEdit('editForm')">
      <el-form ref="editForm" :rules="editRules" :inline="true" :model="editForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="工地名称 :">
              {{ editForm.SiteName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="物料类型 :" prop="Title">
              <el-select v-model="editForm.Title" placeholder="请选择物料类型" @change="changeTitle">
                <el-option
                  v-for="(val, key) in MaterialOption"
                  :key="key"
                  :value="val.ItemCode"
                  :label="val.Title"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="单据重量 :" prop="EvidenceWeight">
              <el-input v-model="editForm.EvidenceWeight" auto-complete="off" placeholder="请输入单据重量" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实称重量 :" prop="RealWeight">
              <el-input v-model="editForm.RealWeight" auto-complete="off" placeholder="请输入实称重量" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="车牌号码 :" prop="CarNo">
              <el-input v-model="editForm.CarNo" auto-complete="off" placeholder="请输入车牌号码" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submiteditForm">确认修改</el-button>
        <el-button @click="closeEdit('editForm')">取消</el-button>
      </div>
    </el-dialog>
    <!-- dialog 详情 -->
    <el-dialog title="物料信息详情" :visible.sync="detailsUser" width="45%">
      <el-form :inline="true">
        <el-row>
          <el-col :span="12">
            <el-form-item label="工地ID :" prop="BusinessId">
              {{ detailsData.SiteId }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工地名称 :" prop="BusinessName">
              {{ detailsData.SiteName }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="物料类型 :" prop="Title">
              {{ detailsData.Title }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收料时间 :" prop="PhoneNo">
              {{ (detailsData.RealReceiveDate || '').slice(0,4)+'-'+(detailsData.RealReceiveDate || '').slice(4,6)+'-'
                +(detailsData.RealReceiveDate || '').slice(6,8) }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="单据重量 :">
              {{ Number(detailsData.EvidenceWeight).toFixed(2) }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实称重量 :" prop="Address">
              {{ Number(detailsData.RealWeight).toFixed(2) }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="扣量 :">
              {{ Number(detailsData.Deduction).toFixed(2) }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纯量 :" prop="Address">
              {{ Number(detailsData.PureWeight).toFixed(2) }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="车牌号码 :" prop="Address">
              {{ detailsData.CarNo }}
            </el-form-item>
          </el-col><el-col :span="12">
            <el-form-item label="收料人 :" prop="Address">
              {{ detailsData.ReceiveBy }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsUser = false">退 出</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
import { queryBuildWsite, queryMaterialReceive, queryTree, updateMaterialReceive, queryMaterialPlan } from '@/api/usercenter/material'
export default {
  components: {

  },
  data() {
    return {
      type: '',
      addPlanDialog: false, // 查询计划
      editUser: false, // 修改
      detailsUser: false, // 详情
      SiteOption: [],
      MaterialOption: [],
      queryForm: {
        SiteId: '',
        MaterialType: '',
        BeginTime: '',
        CarNo: '',
        limit: 10, // 每页个数
        current: 1, // 当前页数
        totalSize: 40 // 总个数
      },
      planData: {}, // 查询计划data
      // 修改
      RecordId: '',
      editForm: {},
      detailsData: {}, // 详情
      tableData: [],
      editRules: {
        Title: [
          { required: true, message: '请输入物料类型', trigger: 'change' }
        ],
        EvidenceWeight: [
          { required: true, message: '请输入单据重量', trigger: 'change' }
        ],
        RealWeight: [
          { required: true, message: '请输入实称重量', trigger: 'change' }
        ],
        CarNo: [
          { required: true, message: '请输入车牌号码', trigger: 'change' }
        ],
        ReceiveBy: [
          { required: true, message: '请输入收料人', trigger: 'change' }
        ]

      }

    }
  },
  created() {
    this.getSiteIdName()
    this.render()
  },
  methods: {
    // 工地option
    getSiteIdName() {
      queryBuildWsite().then(res => {
        const list = JSON.parse(res.data.data)
        this.SiteOption = list.Records
      }).catch(error => {
        // console.log(error)
      })
      const queryParams = {
        TreeType: 'materialClassification',
        GroupID: 0
      }
      queryTree(queryParams).then(res => {
        const list = JSON.parse(res.data.data)
        // console.log(list, '-------------')
        this.MaterialOption = list.Child
      }).catch(error => {
        // console.log(error)
      })
    },
    // render
    render() {
      const queryParams = this.queryForm
      // console.log(queryParams)
      queryMaterialReceive(queryParams).then(res => {
        // console.log(JSON.parse(res.data.data))
        const list = JSON.parse(res.data.data)
        this.queryForm.totalSize = parseInt(list.TotalSize)
        this.tableData = list.Records
        // console.log(this.tableData)
        // console.log(res)
      }).catch(error => {
        // console.log(error)
      })
    },

    // 重置
    reset(rule) {
      this.current = 1
      this.$refs[rule].resetFields()
      this.render()
    },

    // 查询计划
    addPlan(row) {
      // console.log(row,'_______________')
      this.addPlanDialog = true
      const queryParams = {
        PlanRecordId: row.PlanRecordId
      }
      // console.log(queryParams)
      queryMaterialPlan(queryParams).then(res => {
        const list = JSON.parse(res.data.data).Records
        // console.log(list)
        this.planData = list[0]
        this.editUser = false
      }).catch(error => {
        // console.log(error)
      })
    },
    // 修改
    handleReceipt(row) {
      this.editForm = row
      this.type = row.MaterialType
      this.editUser = true
    },
    changeTitle(e) {
      this.editForm.MaterialType = e
      // console.log(e)
    },
    // 确认修改
    submiteditForm() {
      const queryParams = this.editForm
      // // console.log(this.editForm,"{{{{{{{{{{{{{{{[")
      updateMaterialReceive(queryParams).then(res => {
        // console.log(res)
        this.render()
        this.editUser = false
      }).catch(error => {
        // console.log(error)
      })
    },
    // 取消
    closeEdit(formName) {
      this.editUser = false
      this.$refs[formName].resetFields()
    },
    // 详情
    handleDetails(row) {
      this.detailsData = row
      this.detailsUser = true
    },
    // 分页
    handleSizeChange(val) {
      this.queryForm.limit = val
      this.queryForm.current = 1
      this.render()
    },
    handleCurrentChange(val) {
      this.queryForm.current = val
      this.render()
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../../styles/container.scss';
.table {
    ::v-deep .el-tableel-tab,
    .le--fit,
    .el-table--enable-row-hover,
    .el-table--enable-row-transition,
    .el-table--medium {
      border: 1px solid rgba(228, 228, 228, 1);
    }
}
</style>
