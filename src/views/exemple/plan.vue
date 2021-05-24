<template>
  <el-container>
    <el-header class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item>物料管理</el-breadcrumb-item>
        <el-breadcrumb-item>物料计划</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main class="main">
      <div class="query_form">
        <el-form label-width="auto" :model="queryForm" :inline="true">
          <el-row>
            <el-col :span="6">
              <el-form-item label="工地名称:">
                <el-select v-model="queryForm.BusinessType" clearable placeholder="请选择工地类型" style="width: 185px;">
                  <el-option
                    v-for="(val, key) in wsiteData "
                    :key="key"
                    :value="val.SiteName"
                    :label="val.SiteName"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="物料类型:">
                <el-select v-model="queryForm.MaterialType " clearable placeholder="请选择物料类型" style="width: 185px;">
                  <el-option
                    v-for="(val, key) in MaterialData"
                    :key="key"
                    :value="val.ItemCode"
                    :label="val.Title"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="开始日期:">

                <div class="block">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    value-format="yyyyMMddHHmmss"
                    placeholder="选择日期"
                  />
                </div>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="结束日期:">
                <div class="block">
                  <el-date-picker
                    v-model="value2"
                    type="date"
                    value-format="yyyyMMddHHmmss"
                    placeholder="选择日期"
                  />
                </div></el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="query_form_btn">
        <el-button type="primary" @click="execQueryForm">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="openAddDialog">增加</el-button>
      </div>

      <div class="table">
        <el-table
          v-loading="loading"
          :header-cell-style="{ background: 'rgba(249,250,252,1)' }"
          border
          :data="querySiteData"
          style="width: 100%"
        >
          <el-table-column
            prop="RecordId"
            label="记录ID"
            width="210"
            align="center"
          />
          <el-table-column
            prop="SiteName"
            label="工地名称"
            width="210"
            align="center"
          />

          <el-table-column
            prop="Title"
            label="物料类型"
            width="210"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.Title }}
            </template>
          </el-table-column>
          <el-table-column
            prop="Amount"
            label="用量"
            width="210"
            align="center"
          >
            <!--<template slot-scope="scope">
              {{ construction[scope.row.BusinessType] }}
            </template> -->
          </el-table-column>
          <el-table-column
            prop="Weight"
            label="重量"
            width="210"
            align="center"
          />
          <el-table-column
            prop="Unit"
            label="用量单位"
            width="100"
            align="center"
          />

          <el-table-column>
            <template slot-scope="scope">
              <span v-if="scope.row.PlanUseDate">{{ (scope.row.PlanUseDate || '').slice(0,4)+'-'+(scope.row.PlanUseDate || '').slice(4,6)+'-'
                +(scope.row.PlanUseDate || '').slice(6,8) }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <!-- <el-button style="color:rgb(150,150,150);" size="mini" type="text" @click="openDetailDialog(scope.row)">详情</el-button> -->
              <el-button style="color:#409EFF;" size="mini" type="text" @click="addReceipt(scope.row)">添加收料</el-button>
              <el-button style="color:rgb(233,195,65);" size="mini" type="text" @click="openEditDialog(scope.row)">修改</el-button>
              <el-button style="color:red;" size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="page">
        <el-pagination
          :page-sizes="[10, 20, 30, 50]"
          :page-size="queryForm.limit"
          :total="queryForm.TotalSize"
          :current-page="queryForm.current"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-main>
    <!-- 点击添加按钮 -->
    <el-dialog :title="'新增工地信息'" :visible.sync="dialogAddFormVisible" width="45%">
      <el-form ref="addedform" label-width="auto" :inline="true" :model="addForm" :rules="addFormRules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="工地ID:" prop="SiteId">
              <el-select v-model="addForm.SiteId" clearable placeholder="请选择工地名称" style="width: 185px;">
                <el-option
                  v-for="(val, key) in wsiteData "
                  :key="key"
                  :value="val.SiteId"
                  :label="val.SiteName"
                />
              </el-select>
            </el-form-item>

          </el-col>

          <el-col :span="12">
            <el-form-item label="物料类型:" prop="MaterialType">
              <el-select v-model="addForm.MaterialType" clearable placeholder="请选择物料类型" style="width: 185px;">
                <el-option
                  v-for="(val, key) in MaterialData"
                  :key="key"
                  :value="val.ItemCode"
                  :label="val.Title"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="计划用量" prop="Amount">
              <el-input v-model="addForm.Amount" auto-complete="off" placeholder="请输入计划用量" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="预计重量" prop="Weight">
              <el-input v-model="addForm.Weight" auto-complete="off" placeholder="请输入预计重量" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="备注:">
              <el-input v-model="addForm.Remark" autocomplete="off" />
            </el-form-item>
          </el-col>

          <el-form-item label="计划使用日期" prop="PlanUseDate">
            <el-date-picker
              v-model="addForm.PlanUseDate"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyyMMddHHmmss"
            />
          </el-form-item></el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="getaddPlan('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 点击修改按钮 -->
    <el-dialog :title="'修改工地信息'" :visible.sync="dialogEditFormVisible" width="45%">
      <el-form ref="editForm" label-width="auto" :inline="true" :model="editForm" :rules="editFormRules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="记录ID:" prop="SiteId">
              {{ editForm.RecordId }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="重量:" prop="Weight">
              <el-input v-model="editForm.Weight" auto-complete="off" placeholder="请输入重量" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="物料类型:" prop="MaterialType">
              <el-select v-model="editForm.MaterialType" placeholder="请选择物料类型" style="width: 185px;">
                <el-option v-for="(val, key) in MaterialData" :key="key" :value="val.ItemCode" :label="val.Title" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用量:" prop="Amount">
              <el-input v-model="editForm.Amount" auto-complete="off" placeholder="请输入用量" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="备注:" prop="Remarks">
              <el-input v-model="editForm.Remarks" type="textarea" auto-complete="off" placeholder="请输入备注" style="width: 570px" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="execEditForm()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- dialog 添加收料 -->
    <el-dialog title="添加收料" :visible.sync="addMaterial" width="45%" @close="closeAddPlan('addPlanForm')">
      <el-form ref="addPlanForm" label-width="auto" :rules="AddPlanRules" :inline="true" :model="addPlanForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="工地名称 :">
              {{ addPlanForm.SiteName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="物料类型 :" prop="MaterialType">
              <el-select v-model="addPlanForm.MaterialType">
                <el-option
                  v-for="(val, key) in MaterialData"
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
            <el-form-item label="单据用量 :" prop="EvidenceAmout">
              <el-input v-model="addPlanForm.EvidenceAmout" auto-complete="off" placeholder="请输入单据用量" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实际用量 :" prop="RealAmout">
              <el-input v-model="addPlanForm.RealAmout" auto-complete="off" placeholder="请输入实际用量" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="单据重量:" prop="EvidenceWeight">
              <el-input v-model="addPlanForm.EvidenceWeight" auto-complete="off" placeholder="请输入单据重量" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实际重量:" prop="RealWeight">
              <el-input v-model="addPlanForm.RealWeight" auto-complete="off" placeholder="请输入实际重量" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="扣量 :" prop="Deduction">
              <el-input v-model="addPlanForm.Deduction" auto-complete="off" placeholder="请输入扣量" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纯量:" prop="PureWeight">
              <el-input v-model="addPlanForm.PureWeight" auto-complete="off" placeholder="请输入纯量" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="计划收料时间:" prop="PlanUseDate">
              <el-date-picker
                v-model="addPlanForm.PlanUseDate"
                type="datetime"
                value-format="yyyyMMddHHmmss"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实际收料时间:" prop="RealReceiveDate">
              <el-date-picker
                v-model="addPlanForm.RealReceiveDate"
                type="datetime"
                placeholder="请输入实际收料时间"
                value-format="yyyyMMddHHmmss"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="车牌号码 :" prop="CarNo">
              <el-input v-model="addPlanForm.CarNo" auto-complete="off" placeholder="请输入车牌号码" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAddPlan('addPlanForm')">确认添加</el-button>
        <el-button @click="closeAddPlan('addPlanForm')">重置</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>

// import { timeFormat } from '@/utils/index'
import {
  queryBuildWsite,
  queryMaterialPlan,
  deleteMaterialPlan,
  addMaterialPlan,
  updateMaterialPlan,
  queryTree,
  addMaterialReceive
} from '@/api/usercenter/party/plan'
export default {
  data() {
    return {
      addMaterial: false,
      value1: '',
      value2: '',
      loading: false,
      labelPosition: 'right',
      queryForm: {
        current: 1,
        limit: 10,
        TotalSize: 100,
        BusinessType: '',
        MaterialType: '',
        BeginTime: '',
        EndTime: ''
      },
      // 添加收料 -yws
      addPlanForm: {
        SiteId: '',
        SiteName: '',
        PlanRecordId: '',
        MaterialType: '',
        EvidenceAmout: '',
        RealAmout: '',
        EvidenceWeight: '',
        RealWeight: '',
        Deduction: '',
        PureWeight: '',
        PlanUseDate: '',
        RealReceiveDate: '',
        CarNo: ''
      },
      AddPlanRules: {
        EvidenceAmout: [
          { required: true, message: '请输入单据用量', trigger: 'change' }
        ],
        RealAmout: [
          { required: true, message: '请输入实际用量', trigger: 'change' }
        ],
        EvidenceWeight: [
          { required: true, message: '请输入单据重量', trigger: 'change' }
        ],
        RealWeight: [
          { required: true, message: '请输入实际重量', trigger: 'change' }
        ],
        Deduction: [
          { required: true, message: '请输入扣量', trigger: 'change' }
        ],
        PureWeight: [
          { required: true, message: '请输入纯量', trigger: 'change' }
        ],
        RealReceiveDate: [
          { required: true, message: '请输入实际收料时间', trigger: 'change' }
        ],
        CarNo: [
          { required: true, message: '请输入车牌号码', trigger: 'change' }
        ]

      },
      plan: [
        {
          SiteId: '1',
          MaterialType: '类型一',
          Amount: '数据一',
          Remark: '单位一',
          weight: '吨',
          PlanUseDate: '2020-10-20'
        }

      ],
      records: [],
      dialogAddFormVisible: false,
      // addForm: {},
      addFormRules: {
        SiteId: [
          { required: true, message: '请输入工地ID', trigger: 'change' }
        ],
        MaterialType: [
          { required: true, message: '请输入物料类型', trigger: 'change' }
        ],
        Amount: [
          { required: true, message: '请输入计划用量', trigger: 'blur' }
        ],
        Weight: [
          { required: true, message: '请输入预计重量', trigger: 'blur' }
        ],
        Remarks: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ],
        PlanUseDate: [
          { required: true, message: '请输入计划使用日期', trigger: 'blur' }
        ]
      },
      dialogDetailFormVisible: false,
      detailForm: {},
      dialogEditFormVisible: false,
      editForm: {},
      editFormRules: {
        Weight: [
          { required: true, message: '请输入重量', trigger: 'blur' }
        ],
        MaterialType: [
          { required: true, message: '请选择物料类型', trigger: 'change' }
        ],
        Amount: [
          { required: true, message: '请输入重量', trigger: 'blur' }
        ],
        Remarks: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ]
      },

      addForm: [
        {
          SiteId: '',
          MaterialType: '',
          Amount: '',
          Weight: '',
          Remark: '',
          PlanUseDate: '',
          Unit: ''
        }
      ],
      // provOption: [],
      addMaterialPlanData: [],
      querySiteData: [],
      cityOption: [],
      distOption: [],
      wsiteData: [],
      MaterialData: [],
      Sitedata: [],
      queryTree: [],
      time: ''
      // 工地数据
    }
  },
  created() {
    // this.doQuery()
    // this.queryProvince()
    this.getBuildWsite()
    this.getTree()
    this.getquerySite()
    this.getTree()
  },
  methods: {
    // 物料类型
    getTree() {
      const queryParams = {
        TreeType: 'materialClassification',
        GroupID: 0
      }
      queryTree(queryParams).then(res => {
        this.MaterialData = JSON.parse(res.data.data).Child
        // console.log(this.MaterialData, '--------------------------')
        // // console.log(list, '-------------')
        // this.MaterialOption = list.Child
      }).catch(error => {
        // console.log(error)
      })
    },
    // 修改
    // updateId() {
    //   // console.log(this.editForm)
    //   updateMaterialPlan(this.editForm).then(res => {
    //     this.getquerySite()
    //   })
    // },

    // 增加设备
    getaddPlan() {
      this.$refs.addedform.validate(vali => {
        if (vali) {
          addMaterialPlan(this.addForm)
            .then(({ data: { code, msg, data }}) => {
              if (code === '0000') {
                this.queryForm.current = 1
                this.getquerySite()
                this.dialogEditFormVisible = false
              }
              this.$message({
                showClose: true,
                message: msg,
                type: code === '0000' ? 'success' : 'error'
              })
            })
            .catch((error) => {
              // console.log(error)
              this.listLoading = false
            })
          this.dialogAddFormVisible = false
        }
      })
    },
    // 渲染全部数据的方法
    getquerySite() {
      queryMaterialPlan(this.queryForm).then(res => {
        this.querySiteData = JSON.parse(res.data.data).Records
        // console.log('aaaaaaaaaa', this.querySiteData)
        this.queryForm.TotalSize = parseInt(JSON.parse(res.data.data).TotalSize)
        // this.querySiteData.forEach(item => {
        //   item.PlanUseDate = timeFormat(item.PlanUseDate)
        // })
      }).catch(error => {
        // console.log(error)
        this.loading = false
      })
    },
    // 工地名称-y
    getBuildWsite() {
      this.loading = true
      queryBuildWsite(this.queryForm).then(({ data: { data }}) => {
        this.wsiteData = JSON.parse(data).Records
        this.loading = false
      }).catch(error => {
        // console.log(error)
        this.loading = false
      })
    },
    handleDelete(row) {
      // console.log(row.RecordId, '-----------')
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const queryParams = {
            RecordId: row.RecordId
          }
          deleteMaterialPlan(queryParams)
            .then((data) => {
              // console.log('删除成功')
              this.getquerySite()
              this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success'
              })
            })
            .catch((error) => {
              // console.log(error)
              this.listLoading = false
            })
        })
        .catch(() => {})
    },

    // 添加收料
    addReceipt(row) {
      this.addPlanForm = {
        SiteId: row.SiteId,
        SiteName: row.SiteName,
        PlanRecordId: row.RecordId,
        PlanUseDate: row.PlanUseDate,
        MaterialType: row.MaterialType
      }
      this.addMaterial = true
    },

    // 确认添加
    submitAddPlan(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const queryParams = this.addPlanForm
          // // console.log(queryParams)
          addMaterialReceive(queryParams).then(res => {
            // console.log(res)
            this.addMaterial = false
          }).catch(error => {
            // console.log(error)
          })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    // 重置
    closeAddPlan(formName) {
      this.$refs[formName].resetFields()
    },
    openEditDialog(row) {
      this.editForm = {
        RecordId: row.RecordId,
        MaterialType: row.MaterialType,
        Amount: row.Amount,
        Weight: row.Weight
      }
      // console.log(this.editForm, '=this.editForm---------')
      this.dialogEditFormVisible = true
      this.$refs.editForm && this.$refs.editForm.resetFields()
    },
    // doQuery() {
    //   this.loading = true
    // },
    handleSizeChange(val) {
      this.queryForm.limit = val
      // this.doQuery()
      this.getBuildWsite()
    },
    handleCurrentChange(val) {
      this.queryForm.current = val
      // this.doQuery()
      this.getBuildWsite()
    },
    // 查询
    execQueryForm() {
      // console.log(this.value1)
      this.queryForm.current = 1
      // // console.log(this.queryForm.BusinessType)
      const queryParams = {
        SiteName: this.queryForm.BusinessType,
        MaterialType: this.queryForm.MaterialType,
        BeginTime: this.value1,
        EndTime: this.value2
      }
      // console.log(queryParams)
      queryMaterialPlan(queryParams).then(res => {
        this.querySiteData = JSON.parse(res.data.data).Records

        // console.log('aaaaaaaaaa', this.querySiteData)
        this.queryForm.TotalSize = parseInt(JSON.parse(res.data.data).TotalSize)
        this.querySiteData.forEach(item => {
          item.PlanUseDate = this.gettime(item.PlanUseDate)
        })
      }).catch(error => {
        // console.log(error)
        this.loading = false
      })
    },
    resetForm() {
      this.queryForm.BusinessName = ''
      this.queryForm.BusinessType = ''
      this.queryForm.MaterialType = ''
      this.value1 = ''
      this.value2 = ''
      this.getquerySite()
    },
    openAddDialog() {
      this.addForm = {
        Unit: '吨'
      }
      this.dialogAddFormVisible = true
      this.$refs.addForm && this.$refs.addForm.resetFields()
    },
    // 修改
    execEditForm() {
      // console.log(this.editForm, '----------editForm')
      this.$refs.editForm.validate(valid => {
        if (valid) {
          updateMaterialPlan(this.editForm)
            .then(({ data: { code, msg, data }}) => {
              if (code === '0000') {
                this.queryForm.current = 1
                this.getquerySite()
                this.dialogEditFormVisible = false
              }
              this.$message({
                showClose: true,
                message: msg,
                type: code === '0000' ? 'success' : 'error'
              })
            }).catch(error => {
              // console.log(error)
            })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/container.scss'
</style>
