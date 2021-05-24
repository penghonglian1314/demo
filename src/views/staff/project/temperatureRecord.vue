<template>
  <el-container>
    <el-header class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item>员工信息</el-breadcrumb-item>
        <el-breadcrumb-item>员工体温测温</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>

    <el-main class="main">
      <div class="query_form">
        <el-form label-width="auto" :model="queryForm" :inline="true">
          <el-row>
            <el-col :span="6">
              <el-form-item label="测温人:">
                <el-select v-model="queryForm.name" clearable filterable placeholder="请选择测温人名称" style="width: 185px;" :remote-method="personRemoteMethod" remote>
                  <el-option v-for="(val, key) in staffList" :key="key" :value="val.Name" :label="val.Name" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="测温点:">
                <el-select v-model="queryForm.location" clearable placeholder="请选择测温点名称" style="width: 185px;">
                  <el-option v-for="(val, key) in locationList" :key="key" :value="val.LocationName" :label="val.LocationName" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>

      <div class="query_form_btn">
        <el-button type="primary" @click="execQueryForm">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </div>

      <div class="table">
        <el-table
          v-loading="loading"
          :header-cell-style="{ background: 'rgba(249,250,252,1)' }"
          border
          :data="records"
          style="width: 100%"
        >
          <el-table-column
            prop="LocationName"
            label="检测地点"

            align="center"
          />
          <el-table-column
            prop="Name"
            label="测温人"

            align="center"
          />

          <el-table-column
            prop="Temperature"
            label="测温温度"
            align="center"
          />

          <el-table-column
            label="测温时间"

            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.TestTime | secondformat }}
            </template>
          </el-table-column>

        </el-table>
      </div>

      <div class="page">
        <el-pagination
          :page-sizes="[10, 20, 30, 50]"
          :page-size="queryForm.limit"
          :total="TotalSize"
          :current-page="queryForm.current"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-main>

  </el-container>
</template>

<script>
import { queryStaff, queryLocation, queryTemperatureRecord } from '@/api/usercenter/production/temperatureRecords'
export default {
  data() {
    return {
      loading: false,
      labelPosition: 'right',
      queryForm: {
        current: 1,
        limit: 10,
        name: '',
        location: ''
      },
      DeviceOption: [],
      TotalSize: 0,
      records: [],

      dialogDetailFormVisible: false,
      detailForm: {},
      dialogEditFormVisible: false,
      editForm: {},
      staffList: [],
      locationList: []
    }
  },
  created() {
    this.getLocation()
    this.getstaff()
    this.getlist()
  },
  methods: {
    personRemoteMethod(query) {
      // console.log(query, 'query')
    },
    execQueryForm() {
      this.getlist()
      // console.log(this.queryForm)
    },
    resetForm() {
      this.queryForm = {
        current: 1,
        limit: 10,
        name: '',
        location: ''
      }
      this.getlist()
    },
    getstaff() {
      queryStaff().then((data) => {
      // // console.log(JSON.parse(data.data.data),"--------------")
        this.staffList = JSON.parse(data.data.data).Records
      })
    },
    getLocation() {
      queryLocation().then((data) => {
        this.locationList = JSON.parse(data.data.data).Records
        // console.log(JSON.parse(data.data.data), '--------------')
      })
    },

    getlist() {
      queryTemperatureRecord({
        Name: this.queryForm.name,
        LocationName: this.queryForm.location,
        limit: this.queryForm.limit,
        current: this.queryForm.current
      }).then((data) => {
        // console.log(JSON.parse(data.data.data))
        this.records = JSON.parse(data.data.data).Records
        this.TotalSize = parseInt(JSON.parse(data.data.data).TotalSize)
      })
    },
    handleSizeChange(value) {
      this.queryForm.limit = value
      this.getlist()
    },
    handleCurrentChange(value) {
      this.queryForm.current = value
      this.getlist()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/container.scss'
</style>
