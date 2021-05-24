<template>
  <el-container>
    <el-header class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item>物料管理</el-breadcrumb-item>
        <el-breadcrumb-item>物料管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>

    <el-main class="main">
      <div class="query_form">
        <el-form label-width="auto" :model="queryForm" :inline="true">
          <el-row>
            <el-col :span="6">
              <el-form-item label="商户名称:">
                <el-input v-model="queryForm.BusinessName" placeholder="请输入商户名称" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="商户类型:">
                <el-select v-model="queryForm.BusinessType" clearable placeholder="请选择商户类型" style="width: 185px;">
                  <el-option v-for="(val, key) in typeOption" :key="key" :value="key" :label="val" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系电话:">
                <el-input v-model="queryForm.PhoneNo" placeholder="请输入联系电话" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="省:">
                <el-select v-model="queryForm.Province" clearable placeholder="请选择省" style="width: 185px;" @change="changeProvince" @clear="clearOption('Province')">
                  <el-option v-for="(item, index) in provOption" :key="index" :value="item.Code" :label="item.CnName" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="市:">
                <el-select v-model="queryForm.City" clearable placeholder="请选择市" style="width: 185px;" @change="changeCity" @clear="clearOption('City')">
                  <el-option v-for="(item, index) in cityOption" :key="index" :value="item.Code" :label="item.CnName" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="区:">
                <el-select v-model="queryForm.AddrCode" clearable placeholder="请选择区" style="width: 185px;" @change="changeAddrCode">
                  <el-option v-for="(item, index) in distOption" :key="index" :value="item.Code" :label="item.CnName" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="地址:">
                <el-input v-model="queryForm.Address" placeholder="请输入地址" style="width: 250px;" />
              </el-form-item>
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
          :header-cell-style="{ background: 'rgba(249,250,252,1)' }"
          border
          :data="records"
          style="width: 100%"
        >
          <el-table-column
            prop="BusinessId"
            label="商户ID"
            width="75"
            align="center"
          />
          <el-table-column
            prop="BusinessName"
            label="商户名称"
            width="175"
            align="center"
          />
          <el-table-column
            prop="BusinessType"
            label="商户类型"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              {{ typeOption[scope.row.BusinessType] }}
            </template>
          </el-table-column>
          <el-table-column
            prop="PhoneNo"
            label="联系电话"
            width="150"
            align="center"
          />
          <el-table-column
            label="省/市/区"
            width="250"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.ProvinceName }}/{{ scope.row.CityName }}/{{ scope.row.CnName }}
            </template>
          </el-table-column>
          <el-table-column
            prop="Address"
            label="详细地址"
            width="300"
            align="center"
          />
          <el-table-column
            prop="CreateBy"
            label="创建人"
            width="150"
            align="center"
          />
          <el-table-column
            prop="CreateTime"
            label="创建时间"
            width="200"
            align="center"
          />
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button style="color:rgb(150,150,150);" size="mini" type="text" @click="openDetailDialog(scope.row)">详情</el-button>
              <el-button style="color:rgb(233,195,65);" size="mini" type="text" @click="openEditDialog(scope.row)">修改</el-button>
              <el-button style="color:red;" size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

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

    <el-dialog :title="'新增商户信息'" :visible.sync="dialogAddFormVisible" width="45%">
      <el-form ref="addForm" label-width="auto" :inline="true" :model="addForm" :rules="addFormRules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="商户名称:" prop="BusinessName">
              <el-input v-model="addForm.BusinessName" auto-complete="off" placeholder="请输入商户名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式:" prop="PhoneNo">
              <el-input v-model="addForm.PhoneNo" auto-complete="off" placeholder="请输入联系方式" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="execAddForm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="'商户信息详情'" :visible.sync="dialogDetailFormVisible" width="45%">
      <el-form label-width="auto" :inline="true" :model="detailForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="商户ID:" prop="BusinessId">
              {{ detailForm.BusinessId }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商户名称:" prop="BusinessName">
              {{ detailForm.BusinessName }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商户类型:" prop="BusinessType">
              {{ typeOption[detailForm.BusinessType] }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话:" prop="PhoneNo">
              {{ detailForm.PhoneNo }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="省市区:">
              {{ detailForm.ProvinceName }}{{ detailForm.CityName }}{{ detailForm.CnName }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="详细地址:" prop="Address">
              {{ detailForm.Address }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注:" prop="Remarks">
              {{ detailForm.Remarks }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDetailFormVisible = false">退 出</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="'修改商户信息'" :visible.sync="dialogEditFormVisible" width="45%">
      <el-form ref="editForm" label-width="auto" :inline="true" :model="editForm" :rules="editFormRules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="商户ID:" prop="BusinessId">
              {{ editForm.BusinessId }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商户名称:" prop="BusinessName">
              <el-input v-model="editForm.BusinessName" auto-complete="off" placeholder="请输入商户名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商户类型:" prop="BusinessType">
              <el-select v-model="editForm.BusinessType" clearable placeholder="请选择商户类型" style="width: 185px;">
                <el-option v-for="(val, key) in typeOption" :key="key" :value="key" :label="val" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式:" prop="PhoneNo">
              <el-input v-model="editForm.PhoneNo" auto-complete="off" placeholder="请输入联系方式" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="省市区:">
              {{ editForm.ProvinceName }}{{ editForm.CityName }}{{ editForm.CnName }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="详细地址:" prop="Address">
              <el-input v-model="editForm.Address" auto-complete="off" placeholder="请输入详细地址" style="width: 570px" />
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
        <el-button type="primary" @click="execEditForm">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
// import { timeFormat } from '@/utils/index'
// import {
//   queryBusiness,
//   queryProvince,
//   queryCity,
//   queryBuildDistrict
// } from '@/api/usercenter/owner'

export default {
  data() {
    return {
      loading: false,
      labelPosition: 'right',
      queryForm: {
        current: 1,
        limit: 10,
        TotalSize: 0
      },
      records: [],
      dialogAddFormVisible: false,
      addForm: {},
      addFormRules: {
        BusinessName: [
          { required: true, message: '请输入商户名称', trigger: 'blur' }
        ],
        PhoneNo: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ]
      },
      dialogDetailFormVisible: false,
      detailForm: {},
      dialogEditFormVisible: false,
      editForm: {},
      editFormRules: {
        BusinessName: [
          { required: true, message: '请输入商户名称', trigger: 'blur' }
        ],
        BusinessType: [
          { required: true, message: '请选择商户类型', trigger: 'change' }
        ],
        PhoneNo: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        Address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      },
      typeOption: {
        '10': '工地业主',
        '20': '劳务公司',
        '30': '建设单位',
        '40': '设计单位',
        '50': '监理单位',
        '60': '施工单位'
      },
      provOption: [],
      cityOption: [],
      distOption: []
    }
  },
  created() {
    this.doQuery()
    this.queryProvince()
  },
  methods: {
    doQuery() {
      this.loading = true
      // queryBusiness(this.queryForm).then(({ data: { data }}) => {
      //   this.records = JSON.parse(data).Records
      //   this.records.forEach(row => {
      //     // console.log(row)
      //     row.CreateTime = timeFormat(row.CreateTime)
      //   })
      //   this.queryForm.TotalSize = parseInt(JSON.parse(data).TotalSize)
      //   this.loading = false
      // }).catch(error => {
      //   // console.log(error)
      //   this.loading = false
      // })
    },
    handleSizeChange(val) {
      this.queryForm.limit = val
      this.doQuery()
    },
    handleCurrentChange(val) {
      this.queryForm.current = val
      this.doQuery()
    },
    execQueryForm() {
      this.queryForm.current = 1
      this.doQuery()
    },
    resetForm() {
      this.queryForm.BusinessName = ''
      this.queryForm.BusinessType = ''
      this.queryForm.PhoneNo = ''
      this.queryForm.Province = ''
      this.queryForm.City = ''
      this.queryForm.AddrCode = ''
      this.queryForm.Address = ''
      this.cityOption = []
      this.distOption = []
    },
    openAddDialog() {
      this.addForm = {}
      this.dialogAddFormVisible = true
      this.$refs.addForm && this.$refs.addForm.resetFields()
    },
    execAddForm() {
      // this.$refs.addForm.validate(valid => {
      //   if (valid) {
      //     add(this.addForm).then(({ data: { code, msg, data }}) => {
      //       if (code === 0) {
      //         this.queryForm.current = 1
      //         this.doQuery()
      //         this.dialogAddFormVisible = false
      //       }
      //       this.$message({
      //         showClose: true,
      //         message: msg,
      //         type: code === 0 ? 'success' : 'error'
      //       })
      //     }).catch(error => {
      //       // console.log(error)
      //     })
      //   } else {
      //     // console.log('error submit!!')
      //     return false
      //   }
      // })
      this.dialogAddFormVisible = false
    },
    openDetailDialog(row) {
      this.detailForm = {
        BusinessId: row.BusinessId,
        BusinessName: row.BusinessName,
        BusinessType: row.BusinessType,
        PhoneNo: row.PhoneNo,
        ProvinceName: row.ProvinceName,
        CityName: row.CityName,
        CnName: row.CnName,
        Address: row.Address,
        Remarks: row.Remarks
      }
      this.dialogDetailFormVisible = true
      this.$refs.detailForm && this.$refs.detailForm.resetFields()
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // delete().then(({ data: { data, msg }}) => {
        this.queryForm.current = 1
        this.doQuery()
        this.$message({
          showClose: true,
          message: '操作成功',
          type: 'success'
        })
      })
      // }).catch(() => {})
    },
    openEditDialog(row) {
      this.editForm = {
        BusinessId: row.BusinessId,
        BusinessName: row.BusinessName,
        BusinessType: row.BusinessType,
        PhoneNo: row.PhoneNo,
        ProvinceName: row.ProvinceName,
        CityName: row.CityName,
        CnName: row.CnName,
        Address: row.Address,
        Remarks: row.Remarks
      }
      this.dialogEditFormVisible = true
      this.$refs.editForm && this.$refs.editForm.resetFields()
    },
    execEditForm() {
      // this.$refs.editForm.validate(valid => {
      //   if (valid) {
      //     edit(this.editForm).then(({ data: { code, msg, data }}) => {
      //       if (code === 0) {
      //         this.queryForm.current = 1
      //         this.doQuery()
      //         this.dialogEditFormVisible = false
      //       }
      //       this.$message({
      //         showClose: true,
      //         message: msg,
      //         type: code === 0 ? 'success' : 'error'
      //       })
      //     }).catch(error => {
      //       // console.log(error)
      //     })
      //   } else {
      //     // console.log('error submit!!')
      //     return false
      //   }
      // })
      this.dialogEditFormVisible = false
    },
    queryProvince() {
      // queryProvince().then(({ data: { data }}) => {
      //   this.provOption = JSON.parse(data).Records
      // }).catch(error => {
      //   // console.log(error)
      // })
    },
    changeProvince(val) {
      this.queryForm.City = ''
      this.queryForm.AddrCode = ''
      this.cityOption = []
      this.distOption = []
      // const params = {
      //   ProvinceCode: val
      // }
      // queryCity(params).then(({ data: { data }}) => {
      //   this.cityOption = JSON.parse(data).Records
      // }).catch(error => {
      //   // console.log(error)
      // })
    },
    changeCity(val) {
      this.queryForm.AddrCode = ''
      this.distOption = []
      // const params = {
      //   CityCode: val
      // }
      // queryBuildDistrict(params).then(({ data: { data }}) => {
      //   this.distOption = JSON.parse(data).Records
      // }).catch(error => {
      //   // console.log(error)
      // })
    },
    changeAddrCode(val) {
      this.$set(this.queryForm, this.queryForm.AddrCode, val)
    },
    clearOption(val) {
      switch (val) {
        case 'Province':
          this.queryForm.City = ''
          this.queryForm.AddrCode = ''
          this.cityOption = []
          this.distOption = []
          break
        case 'City':
          this.queryForm.AddrCode = ''
          this.distOption = []
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/container.scss'
</style>
