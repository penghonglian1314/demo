<template>
  <el-container>
    <el-header class="topheader">
      <el-breadcrumb>
        <el-breadcrumb-item>员工信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main class="main">
      <div class="search">
        <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="员工ID">
            <el-input v-model="searchStaffID" placeholder="请输入员工ID" />
          </el-form-item>
          <el-form-item label="员工姓名">
            <el-input v-model="searchStaffName" placeholder="请输入员工ID" />
          </el-form-item>
          <el-form-item label="状态">
            <el-radio v-model="searchStatus" label="1">在职</el-radio>
            <el-radio v-model="searchStatus" label="0">离职</el-radio>
          </el-form-item>
          <el-form-item label="工地">
            <el-select v-model="searchSiteName" placeholder="请选择工地">
              <el-option v-for="item in buildWsite" :key="item.code" :label="item.SiteName" :value="item.SiteId" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <div class="searchbtn">
        <el-button type="primary" @click="searchStaff()">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button style="" type="primary" @click="addStaffDialog()">增加</el-button>
      </div>

      <div class="formorder">
        <el-table v-loading="loading" :header-cell-style="{background:'rgba(249,250,252,1)'}" stripe :data="staffsData" border style="width: 100%">
          <el-table-column align="center" label="员工ID" width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.StaffId }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="员工姓名" width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.Name }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="性别" width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.Sex">{{ scope.row.Sex === "1" ? '男' : scope.row.Sex === "0" ? '女' : scope.row.Sex === "" ? '' : '' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="工地" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.SiteName }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态" width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.Status === "1" ? "在职" : "离职" }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="入职时间" width="220">
            <template slot-scope="scope">
              <span v-if="scope.row.EntryTime">{{ (scope.row.EntryTime || '').slice(0,4)+'-'+(scope.row.EntryTime || '').slice(4,6)+'-'
                +(scope.row.EntryTime || '').slice(6,8)+' '+(scope.row.EntryTime || '').slice(8,10)+':'+(scope.row.EntryTime || '').slice(10,12)+':'
                +(scope.row.EntryTime || '').slice(12,14) }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="手机号" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.Phone }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="身份证号" width="240">
            <template slot-scope="scope">
              <span>{{ scope.row.IDCard }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button style="color:rgb(150,150,150);" size="mini" type="text" @click="handleDetails(scope.row)">详情</el-button>
              <el-button style="color:rgb(233,195,65);" size="mini" type="text" @click="handleUpdata(scope.row)">更改</el-button>
              <el-button style="color:#119FCB;" size="mini" type="text" @click="handleQuit(scope.row)">离职</el-button>
              <el-button style="color:red;" size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- dialog框增加 -->
      <el-dialog title="增加" :visible.sync="dialogFormVisible">
        <el-form ref="form" :rules="AddRules" class="formadd" :model="form" style="border: 1px solid #0000;">
          <el-form-item label="头像" :label-width="formLabelWidth">
            <el-upload
              class="avatar-uploader"
              :action="uploadurl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :with-credentials="true"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="form.Name" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身高" :label-width="formLabelWidth">
                <el-input v-model="form.Height" autocomplete="off" style="float:left;width:150px;" />cm
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-radio v-model="form.Sex" label="1" :border="true" style="margin:0;">男</el-radio>
                <el-radio v-model="form.Sex" label="2" :border="true">女</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="手机号" :label-width="formLabelWidth" prop="Phone">
                <el-input v-model="form.Phone" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="身份证号" :label-width="formLabelWidth" prop="IdCard">
                <el-input v-model="form.IdCard" autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="身份证复印件" :label-width="formLabelWidth">
            <el-upload
              class="upload-demo"
              :action="uploadurl"
              :on-change="handleChangeIdCardImgId"
              :on-success="uploadIdCardImageSuccess"
              :file-list="IdCardImgIdfileList"
              :with-credentials="true"
            >
              <el-button size="mini" type="primary" style="float:left;height:30px;fontSize:13px;">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth" prop="AddrCode">
            <el-col :span="5.5">
              <el-form-item>
                <el-select v-model="provincevalue" clearable placeholder="请选择省" @change="changeProvince()">
                  <el-option
                    v-for="item in provinceData"
                    :key="item.Code"
                    :label="item.CnName"
                    :value="item.Code"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5.5">
              <el-form-item>
                <el-select v-model="cityValue" clearable placeholder="请选择市" @change="changeCity()">
                  <el-option
                    v-for="item in cityData"
                    :key="item.Code"
                    :label="item.CnName"
                    :value="item.Code"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5.5">
              <el-form-item>
                <el-select v-model="districtValue" clearable placeholder="请选择区或县" @change="changeDistrict()">
                  <el-option
                    v-for="item in districtData"
                    :key="item.Code"
                    :label="item.CnName"
                    :value="item.Code"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="详细地址" :label-width="formLabelWidth" prop="Addr">
            <el-input v-model="form.Addr" autocomplete="off" />
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label="工地" :label-width="formLabelWidth" prop="SiteId">
                <el-select v-model="form.SiteId" placeholder="请选择类型" @change="changeWiste()">
                  <el-option v-for="item in buildWsite" :key="item.code" :label="item.SiteName" :value="item.SiteId" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属部门" :label-width="formLabelWidth">
                <el-input v-model="form.Department" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属班组" :label-width="formLabelWidth">
                <el-input v-model="form.Groups" autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="所属公司" :label-width="formLabelWidth" prop="CompanyId">
                <el-select v-model="form.CompanyId" placeholder="请选择类型">
                  <el-option v-for="item in businessData" :key="item.code" :label="item.BusinessName" :value="item.BusinessId" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入职时间" :label-width="formLabelWidth" prop="EntryTime">
                <el-date-picker
                  v-model="form.EntryTime"
                  type="datetime"
                  placeholder="选择开始日期"
                  value-format="yyyyMMddHHmmss"
                  default-time="['00:00:00':'23:59:59']"
                  style="width:185px"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态" :label-width="formLabelWidth" prop="Status">
                <el-radio v-model="form.Status" label="1" :border="true" style="margin:0;">在职</el-radio>
                <el-radio v-model="form.Status" label="2" :border="true">离职</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="入职文书" :label-width="formLabelWidth">
            <el-upload
              class="upload-demo"
              :action="uploadurl"
              :on-change="handleChangeEntryFileId"
              :on-success="uploadEntryFileIdSuccess"
              :file-list="EntryFileIdfileList"
              :with-credentials="true"
            >
              <el-button size="mini" type="primary" style="float:left;height:30px;fontSize:13px;">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label="学历" :label-width="formLabelWidth" prop="EduBackGrd">
                <el-select v-model="form.EduBackGrd" placeholder="请选择类型">
                  <el-option v-for="item in education" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="薪资类型" :label-width="formLabelWidth" prop="SalaryType">
                <el-select v-model="form.SalaryType" placeholder="请选择类型">
                  <el-option v-for="item in SalaryType" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否实名" :label-width="formLabelWidth" prop="Addr">
                <el-radio v-model="form.IsRealName" label="1" :border="true" style="margin:0;">是</el-radio>
                <el-radio v-model="form.IsRealName" label="2" :border="true">否</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="员工类型" :label-width="formLabelWidth" prop="StaffType">
                <el-select v-model="form.StaffType" placeholder="请选择类型">
                  <el-option v-for="item in StaffType" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职称" :label-width="formLabelWidth" prop="PositionalTitles">
                <el-select v-model="form.PositionalTitles" placeholder="请选择类型">
                  <el-option v-for="item in positionalTitles" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" />
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="是否是党员" :label-width="formLabelWidth" prop="IsParty">
                <el-select v-model="form.IsParty" placeholder="请选择类型" @change="changeIsParty()">
                  <el-option v-for="item in IsParty" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="党员类型" :label-width="formLabelWidth" prop="positionalTitles">
                <el-select v-model="formPartyType" placeholder="请选择类型" @change="changePartyType()">
                  <el-option v-for="item in PartyType" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" />
          </el-row>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.Remarks" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addChargedevice('form')">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>

      <!-- dialog框详情 -->
      <el-dialog title="详情" :visible.sync="dialogFormVisibleDetails">
        <el-form class="formadd" :model="formDetails">
          <el-row>
            <el-col :span="8">
              <el-form-item label="员工头像" :label-width="formLabelWidth">
                <img :src="downloadAvatarUrl" class="stassImg">
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="员工ID" :label-width="formLabelWidth">
                <span>{{ formDetails.StaffId }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="姓名" :label-width="formLabelWidth">
                <span>{{ formDetails.Name }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="手机号" :label-width="formLabelWidth">
                <span>{{ formDetails.Phone }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别" :label-width="formLabelWidth">
                <span>{{ formDetails.Sex === "1" ? '男' : '女' }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身高" :label-width="formLabelWidth">
                <span>{{ formDetails.Height }}cm</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="身份证号" :label-width="formLabelWidth">
                <span>{{ formDetails.IdCard }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="详细地址" :label-width="formLabelWidth">
                <span>{{ formDetails.ProvinceName + formDetails.CityName + formDetails.CnName + formDetails.Addr }}</span>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
            </el-col> -->
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="工地" :label-width="formLabelWidth">
                <span style="margin-left: 10px">{{ formDetails.SiteName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="身份证复印件" :label-width="formLabelWidth">
                <el-button v-if="formDetails.IdCardImgId" size="mini" type="primary" style="float:left;height:30px;fontSize:13px;" @click="preview(formDetails.IdCardImgId)">点击预览</el-button>
                <div class="dialog-body-content-base-style" style="display:none;">
                  <iframe frameborder="0" :src="pdfUrl" width="100%" />
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="所属公司" :label-width="formLabelWidth">
                <span style="margin-left: 10px">{{ formDetails.BusinessName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属部门" :label-width="formLabelWidth">
                <span style="margin-left: 10px">{{ formDetails.DepartmentName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属班组" :label-width="formLabelWidth">
                <span style="margin-left: 10px">{{ formDetails.GroupsName }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="状态" :label-width="formLabelWidth">
                <span>{{ formDetails.Status === "1" ? '在职' : '离职' }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="员工类型" :label-width="formLabelWidth">
                <span v-if="formDetails.IsParty === 1">{{ formDetails.StaffType }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="薪资类型" :label-width="formLabelWidth">
                <span>{{ formDetails.SalaryType === 'project' ? '包工' : formDetails.SalaryType === 'perdiem' ? '日薪' : formDetails.SalaryType === 'monthly' ? '月薪' : formDetails.SalaryType === 'yearly' ? '年薪' : '' }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="入职时间" :label-width="formLabelWidth">
                <span v-if="formDetails.EntryTime">{{ (formDetails.EntryTime || '').slice(0,4)+'-'+(formDetails.EntryTime || '').slice(4,6)+'-'
                  +(formDetails.EntryTime || '').slice(6,8)+' '+(formDetails.EntryTime || '').slice(8,10)+':'+(formDetails.EntryTime || '').slice(10,12)+':'
                  +(formDetails.EntryTime || '').slice(12,14) }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="入职文书" :label-width="formLabelWidth">
                <el-button v-if="formDetails.EntryFileId" size="mini" type="primary" style="float:left;height:30px;fontSize:13px;" @click="preview(formDetails.EntryFileId)">点击预览</el-button>
                <div class="dialog-body-content-base-style" style="display:none;">
                  <iframe frameborder="0" :src="pdfUrl" width="100%" />
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="离职时间" :label-width="formLabelWidth">
                <span v-if="formDetails.QuitTime">{{ (formDetails.QuitTime || '').slice(0,4)+'-'+(formDetails.QuitTime || '').slice(4,6)+'-'
                  +(formDetails.QuitTime || '').slice(6,8)+' '+(formDetails.QuitTime || '').slice(8,10)+':'+(formDetails.QuitTime || '').slice(10,12)+':'
                  +(formDetails.QuitTime || '').slice(12,14) }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="离职文书" :label-width="formLabelWidth">
                <el-button v-if="formDetails.QuitFileId" size="mini" type="primary" style="float:left;height:30px;fontSize:13px;" @click="preview(formDetails.QuitFileId)">点击预览</el-button>
                <div class="dialog-body-content-base-style" style="display:none;">
                  <iframe frameborder="0" :src="pdfUrl" width="100%" />
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="学历" :label-width="formLabelWidth">
                <span>{{ formDetails.EduBackGrd }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职称" :label-width="formLabelWidth">
                <span>{{ formDetails.PositionalTitles }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否实名" :label-width="formLabelWidth">
                <span>{{ formDetails.IsRealName === 0 ? '未实名' : '实名' }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <!-- <el-col :span="8">
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="是否党员" :label-width="formLabelWidth">
                <span>{{ formDetails.IsParty === 1 ? '是' : '不是' }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="党员类型" :label-width="formLabelWidth">
                <span v-if="formDetails.IsParty === 1">{{ formDetails.PartyType === 1 ? '正式党员' : '预备党员' }}</span>
                <span v-else>{{ formDetails.PartyType === 3 ? '积极分子' : '发展对象' }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="最近修改时间" :label-width="formLabelWidth">
                <span v-if="formDetails.LastUpdteTime">{{ (formDetails.LastUpdteTime || '').slice(0,4)+'-'+(formDetails.LastUpdteTime || '').slice(4,6)+'-'
                  +(formDetails.LastUpdteTime || '').slice(6,8)+' '+(formDetails.LastUpdteTime || '').slice(8,10)+':'+(formDetails.LastUpdteTime || '').slice(10,12)+':'
                  +(formDetails.LastUpdteTime || '').slice(12,14) }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册时间" :label-width="formLabelWidth">
                <span v-if="formDetails.CreateTime">{{ (formDetails.CreateTime || '').slice(0,4)+'-'+(formDetails.CreateTime || '').slice(4,6)+'-'
                  +(formDetails.CreateTime || '').slice(6,8)+' '+(formDetails.CreateTime || '').slice(8,10)+':'+(formDetails.CreateTime || '').slice(10,12)+':'
                  +(formDetails.CreateTime || '').slice(12,14) }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8" />
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注" :label-width="formLabelWidth">
                <span>{{ formDetails.Remarks }}</span>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
            </el-col>
            <el-col :span="8">
            </el-col> -->
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisibleDetails = false">确 定</el-button>
        </div>
      </el-dialog>

      <!-- dialog框修改 -->
      <el-dialog title="修改" :visible.sync="dialogFormVisibleUpdate">
        <el-form ref="formUpdate" :rules="AddRules" class="formadd" :model="formUpdate">
          <el-row>
            <el-col :span="8">
              <el-form-item label="头像" :label-width="formLabelWidth">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadurl"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :with-credentials="true"
                >
                  <img v-if="downloadAvatarUrl" :src="downloadAvatarUrl" class="stassImg">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="formUpdate.Name" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-radio v-model="formUpdate.Sex" label="1" :border="true" style="margin:0;">男</el-radio>
                <el-radio v-model="formUpdate.Sex" label="2" :border="true">女</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="手机号" :label-width="formLabelWidth">
                <el-input v-model="formUpdate.Phone" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号" :label-width="formLabelWidth" prop="IdCard">
                <el-input v-model="formUpdate.IdCard" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身高" :label-width="formLabelWidth">
                <el-input v-model="formUpdate.Height" autocomplete="off" style="float:left;width:150px;" />cm
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-col :span="5.5">
              <el-form-item>
                <el-select v-model="provincevalue" clearable placeholder="请选择省" @change="changeProvince()">
                  <el-option
                    v-for="item in provinceData"
                    :key="item.Code"
                    :label="item.CnName"
                    :value="item.Code"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5.5">
              <el-form-item>
                <el-select v-model="cityValue" clearable placeholder="请选择市" @change="changeCity()">
                  <el-option
                    v-for="item in cityData"
                    :key="item.Code"
                    :label="item.CnName"
                    :value="item.Code"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5.5">
              <el-form-item>
                <el-select v-model="districtValue" clearable placeholder="请选择区或县" @change="changeDistrict()">
                  <el-option
                    v-for="item in districtData"
                    :key="item.Code"
                    :label="item.CnName"
                    :value="item.Code"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="详细地址" :label-width="formLabelWidth">
            <el-input v-model="formUpdate.Addr" autocomplete="off" />
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label="工地" :label-width="formLabelWidth" prop="SiteId">
                <el-select v-model="formUpdate.SiteId" placeholder="请选择类型">
                  <el-option v-for="item in buildWsite" :key="item.code" :label="item.SiteName" :value="item.SiteId" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属部门" :label-width="formLabelWidth">
                <!-- <el-select v-model="formUpdate.Department" placeholder="请选择类型">
                  <el-option v-for="item in buildWsite" :key="item.code" :label="item.SiteName" :value="item.SiteId" />
                </el-select> -->
                <el-input v-model="formUpdate.Department" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属班组" :label-width="formLabelWidth">
                <!-- <el-select v-model="formUpdate.Department" placeholder="请选择类型">
                  <el-option v-for="item in buildWsite" :key="item.code" :label="item.SiteName" :value="item.SiteId" />
                </el-select> -->
                <el-input v-model="formUpdate.Groups" autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="所属公司" :label-width="formLabelWidth" prop="CompanyId">
                <el-select v-model="formUpdate.CompanyId" placeholder="请选择类型">
                  <el-option v-for="item in businessData" :key="item.code" :label="item.BusinessName" :value="item.BusinessId" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态" :label-width="formLabelWidth" prop="Status">
                <el-radio v-model="formUpdate.Status" label="1" :border="true" style="margin:0;">在职</el-radio>
                <el-radio v-model="formUpdate.Status" label="2" :border="true">离职</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="员工类型" :label-width="formLabelWidth" prop="StaffType">
                <el-select v-model="formUpdate.StaffType" placeholder="请选择类型">
                  <el-option v-for="item in StaffType" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="薪资类型" :label-width="formLabelWidth" prop="SalaryType">
                <el-select v-model="formUpdate.SalaryType" placeholder="请选择类型">
                  <el-option v-for="item in SalaryType" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入职时间" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="formUpdate.EntryTime"
                  type="datetime"
                  placeholder="选择开始日期"
                  value-format="yyyyMMddHHmmss"
                  default-time="['00:00:00':'23:59:59']"
                  style="width:185px"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="离职时间" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="formUpdate.QuitTime"
                  type="datetime"
                  placeholder="选择开始日期"
                  value-format="yyyyMMddHHmmss"
                  default-time="['00:00:00':'23:59:59']"
                  style="width:185px"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="学历" :label-width="formLabelWidth" prop="EduBackGrd">
                <el-select v-model="formUpdate.EduBackGrd" placeholder="请选择类型">
                  <el-option v-for="item in education" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职称" :label-width="formLabelWidth" prop="positionalTitles">
                <el-select v-model="formUpdate.PositionalTitles" placeholder="请选择类型">
                  <el-option v-for="item in positionalTitles" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否实名" :label-width="formLabelWidth" prop="Addr">
                <el-radio v-model="formUpdate.IsRealName" label="1" :border="true" style="margin:0;">是</el-radio>
                <el-radio v-model="formUpdate.IsRealName" label="2" :border="true">否</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" />
            <el-col :span="8">
              <el-form-item label="是否是党员" :label-width="formLabelWidth" prop="IsParty">
                <el-select v-model="formUpdate.IsParty" placeholder="请选择类型" @change="changeFormUpdateIsParty()">
                  <el-option v-for="item in IsParty" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="党员类型" :label-width="formLabelWidth" prop="positionalTitles">
                <el-select v-model="formPartyType" placeholder="请选择类型" @change="changeModifyIsParty()">
                  <el-option v-for="item in PartyType" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="formUpdate.Remarks" autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="upDatestaffDialog('formUpdate')">确 定</el-button>
          <el-button @click="dialogFormVisibleUpdate = false">取 消</el-button>
        </div>
      </el-dialog>

      <!-- dialog框离职 -->
      <el-dialog title="离职" :visible.sync="dialogFormVisibleformQuit">
        <el-form ref="formQuit" :rules="QuitAddRules" class="formaddQuit" :model="formQuit">
          <el-form-item label="状态" :label-width="formLabelWidth" prop="Status">
            <el-radio v-model="formQuit.Status" label="1" :border="true" style="margin:0;">在职</el-radio>
            <el-radio v-model="formQuit.Status" label="2" :border="true">离职</el-radio>
          </el-form-item>
          <el-form-item label="离职时间" :label-width="formLabelWidth" prop="QuitTime">
            <el-date-picker
              v-model="formQuit.QuitTime"
              type="datetime"
              placeholder="选择离职日期"
              value-format="yyyyMMddHHmmss"
              default-time="['00:00:00':'23:59:59']"
              style="width:185px"
            />
          </el-form-item>
          <el-form-item label="离职文书" :label-width="formLabelWidth" prop="QuitFileId">
            <el-upload
              class="upload-demo"
              :action="uploadurl"
              :on-change="handleChangeQuitFileId"
              :on-success="uploadQuitFileIdSuccess"
              :file-list="QuitFileIdfileList"
              :with-credentials="true"
            >
              <el-button size="mini" type="primary" style="height:30px;fontSize:13px;">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="formQuitDialog('formQuit')">确 定</el-button>
          <el-button @click="dialogFormVisibleformQuit = false">取 消</el-button>
        </div>
      </el-dialog>

      <!-- 分页 -->
      <div class="pagearea">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="pagesizes"
          :page-size="limitsize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="TotalSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

    </el-main>
  </el-container>
</template>

<script>
import { getStaffs, getBuildWsite, deleteStaff, getBusinessSite, getProvince, getCity, getDistrict, addStaff, updateStaff } from '@/api/usercenter/staffs'
export default {
  data() {
    return {
      loading: true,
      // 搜索条件
      searchStaffID: '',
      searchStaffName: '',
      searchSiteName: '',
      searchStatus: '',
      // 省市区
      provincevalue: '',
      cityValue: '',
      districtValue: '',
      provinceData: [],
      cityData: [],
      districtData: [],
      // 所有的工地
      buildWsite: [],
      // 所有的公司
      businessData: [],
      // 绑定的党员类型
      formPartyType: '',
      // 上传
      uploadurl: BASE_API.SERVER_IP + '/ibuilding/uploadFile.action',
      downloadurl: BASE_API.SERVER_IP + '/ibuilding/downloadFile.action?fileUrl=',
      IdCardImgIdfileList: [],
      EntryFileIdfileList: [],
      QuitFileIdfileList: [],
      downloadAvatarUrl: '',
      downloadIdCardImgId: '',
      downloadEntryFileId: '',
      updateProvincevalue: '',
      updateCityValue: '',
      imageUrl: '',
      formInline: {
        user: '',
        regionprovince: '',
        regioncity: '',
        regiondistrict: '',
        regiontown: ''
      },
      // 所有员工表单
      staffsData: [],
      formLabelWidth: '120px',
      form: {
        SiteId: '',
        CompanyId: '',
        IdCard: '',
        IdCardImgId: '',
        Name: '',
        EntryTime: '',
        EntryFileId: '',
        SalaryType: '',
        Status: '',
        AddrCode: '',
        Addr: '',
        AvatarUrl: '1',
        Phone: '',
        Sex: '',
        IsRealName: '',
        IsParty: '',
        PartyType: '',
        EduBackGrd: '',
        PositionalTitles: '',
        StaffType: '',
        Height: '',
        Department: '',
        Groups: '',
        Remarks: ''
      },
      // 员工详情dialog---------------------
      dialogFormVisibleDetails: false,
      formDetails: {},
      // 修改员工dialog---------------------
      dialogFormVisibleUpdate: false,
      formUpdate: {},
      // 增加员工dialog---------------------
      dialogFormVisible: false,
      // 学历类型
      education: [
        { value: '00', name: '文盲' },
        { value: '10', name: '小学' },
        { value: '20', name: '初中' },
        { value: '30', name: '高中' },
        { value: '31', name: '中专' },
        { value: '32', name: '职高' },
        { value: '33', name: '技校' },
        { value: '40', name: '大专' },
        { value: '41', name: '高专' },
        { value: '50', name: '本科' },
        { value: '60', name: '研究生' },
        { value: '70', name: '博士生' }
      ],
      // 职称类型
      positionalTitles: [
        { value: '00', name: '无' },
        { value: '10', name: '初级职称' },
        { value: '20', name: '中级职称' },
        { value: '30', name: '高级职称' }
      ],
      // 员工类型
      StaffType: [
        { value: '0', name: '临时工' },
        { value: '1', name: '正式工' },
        { value: '2', name: '实习生' },
        { value: '3', name: '外聘' }
      ],
      // 薪资类型
      SalaryType: [
        { value: 'project', name: '包工' },
        { value: 'perdiem', name: '日薪' },
        { value: 'monthly', name: '月薪' },
        { value: 'yearly', name: '年薪' }
      ],
      // 是否党员
      IsParty: [
        { value: '1', name: '是' },
        { value: '0', name: '不是' }
      ],
      // 党员类型
      PartyType: [],
      // 增加员工表单验证
      AddRules: {
        SiteId: [
          { required: true, message: '请选择工地', trigger: 'change' }
        ],
        CompanyId: [
          { required: true, message: '请选择公司', trigger: 'change' }
        ],
        IdCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { min: 0, max: 18, message: '请输入正确的身份证号', trigger: 'blur' }
        ],
        Status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        StaffType: [
          { required: true, message: '请选择员工类型', trigger: 'change' }
        ]
      },
      // 离职dialog---------------------
      dialogFormVisibleformQuit: false,
      // 离职表单规则验证
      QuitAddRules: {
        Status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        QuitTime: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        QuitFileId: [
          { required: true, message: '请输入离职文书', trigger: 'change' }
        ]
      },
      // 离职表单
      formQuit: {},
      // 分页
      currentPage: 1,
      limitsize: 10,
      TotalSize: 100,
      pagesizes: [10, 20, 30, 40],
      // 文件预览
      pdfUrl: ''
    }
  },
  created() {
    this.getStaffsData()
    this.getBuildWsiteDdata()
    this.getProvinceData()
  },
  methods: {
    // 获取所有员工
    getStaffsData() {
      this.loading = true
      const queryParams = {
        limit: this.limitsize,
        current: this.currentPage,
        StaffId: this.searchStaffID,
        Name: this.searchStaffName,
        SiteId: this.searchSiteName,
        Status: this.searchStatus
      }
      getStaffs(queryParams).then(data => {
        this.staffsData = JSON.parse(data.data.data).Records
        this.TotalSize = parseInt(JSON.parse(data.data.data).TotalSize)
        this.loading = false
        // // console.log(this.staffsData)
      }).catch(error => {
        // console.log(error)
        this.Loading = false
      })
    },
    // 获取省份
    getProvinceData() {
      const queryParams = {
        current: 1,
        limit: 31
      }
      getProvince(queryParams).then(data => {
        this.provinceData = JSON.parse(data.data.data).Records
      }).catch(error => {
        // console.log(error)
        this.listLoading = false
      })
    },
    // 改变省份
    changeProvince() {
      this.getCityData()
      this.cityValue = ''
      this.districtValue = ''
    },
    // 获取市
    getCityData() {
      const queryParams = {
        ProvinceCode: this.provincevalue
      }
      getCity(queryParams).then(data => {
        // console.log(JSON.parse(data.data.data))
        const queryParamsCity = {
          ProvinceCode: this.provincevalue,
          current: 1,
          limit: JSON.parse(data.data.data).TotalSize
        }
        getCity(queryParamsCity).then(data => {
          this.cityData = JSON.parse(data.data.data).Records
        }).catch(error => {
          // console.log(error)
          this.listLoading = false
        })
      }).catch(error => {
        // console.log(error)
        this.listLoading = false
      })
    },
    // 改变市
    changeCity() {
      this.getDistrictData()
      this.districtValue = ''
    },
    // 获取区或县
    getDistrictData() {
      const queryParams = {
        CityCode: this.cityValue
      }
      getDistrict(queryParams).then(data => {
        const queryParamsDistrict = {
          CityCode: this.cityValue,
          current: 1,
          limit: JSON.parse(data.data.data).TotalSize
        }
        getDistrict(queryParamsDistrict).then(data => {
          this.districtData = JSON.parse(data.data.data).Records
        }).catch(error => {
          // console.log(error)
          this.listLoading = false
        })
      }).catch(error => {
        // console.log(error)
        this.listLoading = false
      })
    },
    // 改变区或县
    changeDistrict() {
      if (this.dialogFormVisible) {
        this.form.AddrCode = this.districtValue
      } else {
        this.formUpdate.AddrCode = this.districtValue
      }
    },
    // 获取所有工地
    getBuildWsiteDdata() {
      getBuildWsite().then(data => {
        this.buildWsite = JSON.parse(data.data.data).Records
      }).catch(error => {
        // console.log(error)
        this.listLoading = false
      })
    },
    // 根据工地查询公司
    changeWiste() {
      // // console.log(this.form.SiteId)
      getBusinessSite().then(data => {
        this.businessData = JSON.parse(data.data.data).Records
      }).catch(error => {
        // console.log(error)
        this.listLoading = false
      })
    },
    // 查询员工------------------------------------------------------
    searchStaff() {
      this.getStaffsData()
    },
    // 重置------------------------------------------------------
    resetForm() {
      this.searchStaffID = ''
      this.searchStaffName = ''
      this.searchSiteName = ''
      this.searchStatus = ''
      this.getStaffsData()
    },
    // 增加员工dialog------------------------------------------------------
    // 增加员工按钮
    addStaffDialog() {
      this.IdCardImgIdfileList = []
      this.EntryFileIdfileList = []
      this.provincevalue = ''
      this.cityValue = ''
      this.district = ''
      this.formPartyType = ''
      this.imageUrl = ''
      this.form = {}
      this.dialogFormVisible = true
    },
    // 上传头像
    handleAvatarSuccess(res, file) {
      this.form.AvatarUrl = res.data
      this.imageUrl = URL.createObjectURL(file.raw)
      // console.log('2222222222')
      // console.log(URL.createObjectURL(file.raw))
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 增加员工dialog---改变是否是党员
    changeIsParty() {
      this.formPartyType = ''
      if (this.form.IsParty === '1') {
        this.PartyType = [
          { value: '1', name: '正式党员' },
          { value: '2', name: '预备党员' }
        ]
      } else if (this.form.IsParty === '0') {
        this.PartyType = [
          { value: '3', name: '积极分子' },
          { value: '4', name: '发展对象' }
        ]
      } else {
        this.PartyType = []
      }
    },
    // 增加员工dialog----改变党员类型
    changePartyType() {
      this.form.PartyType = this.formPartyType
    },
    // 改变身份证复印件
    handleChangeIdCardImgId(file, fileList) {
      // // console.log(this.IdCardImgIdfileList)
      if (fileList.length > 0) {
        this.IdCardImgIdfileList = [fileList[fileList.length - 1]]
      }
    },
    // 改变入职文书
    handleChangeEntryFileId(file, fileList) {
      // // console.log(this.EntryFileIdfileList)
      if (fileList.length > 0) {
        this.EntryFileIdfileList = [fileList[fileList.length - 1]]
      }
    },
    // 身份证复印件上传成功
    uploadIdCardImageSuccess(res, file) {
      this.form.IdCardImgId = res.data
      // // console.log(URL.createObjectURL(file.raw))
    },
    // 入职文书上传成功
    uploadEntryFileIdSuccess(res, file) {
      this.form.EntryFileId = res.data
    },
    // 增加员工提交
    addChargedevice(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          // console.log(this.form)
          addStaff(this.form).then(data => {
            this.dialogFormVisible = false
            this.getStaffsData()
          }).catch(error => {
            // console.log(error)
          })
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '请输入上述信息',
            type: 'warning'
          })
        }
      })
    },
    // 员工详情------------------------------------------------------
    handleDetails(row) {
      this.formDetails = row
      // console.log(row)
      this.dialogFormVisibleDetails = true
      this.downloadAvatarUrl = this.downloadurl + row.AvatarUrl
      // // console.log(this.downloadAvatarUrl)
      this.downloadIdCardImgId = this.downloadurl + row.IdCardImgId
      this.downloadEntryFileId = this.downloadurl + row.EntryFileId
      // // console.log("-------------")
      // // console.log(row)
      // // console.log(this.downloadEntryFileId)
    },
    // 点击预览
    preview(data) {
      this.pdfUrl = this.downloadurl + data
    },
    // 员工修改------------------------------------------------------
    // 员工修改按钮
    handleUpdata(row) {
      this.formUpdate = { ...row }
      // // console.log(row)
      this.provincevalue = row.AddrCode.slice(0, 2)
      this.getCityData()
      this.cityValue = row.AddrCode.slice(0, 4)
      this.getDistrictData()
      this.districtValue = row.AddrCode
      this.changeWiste()
      this.dialogFormVisibleUpdate = true
      this.changeModifyIsParty()
      this.downloadAvatarUrl = this.downloadurl + row.AvatarUrl
      this.IdCardImgIdfileList = this.downloadurl + row.IdCardImgId
    },
    // 修改dialog----改变党员类型
    changeFormUpdateIsParty() {
      this.formPartyType = ''
      if (this.formUpdate.IsParty === '1') {
        this.PartyType = [
          { value: '1', name: '正式党员' },
          { value: '2', name: '预备党员' }
        ]
      } else if (this.formUpdate.IsParty === '0') {
        this.PartyType = [
          { value: '3', name: '积极分子' },
          { value: '4', name: '发展对象' }
        ]
      } else {
        this.PartyType = []
      }
    },
    // 员工修改---判断党员
    changeModifyIsParty() {
      this.formUpdate.PartyType = this.formPartyType
    },
    // 员工修改提交
    upDatestaffDialog(formUpdate) {
      this.$refs[formUpdate].validate((valid) => {
        if (valid) {
          // console.log(this.formUpdate)
          updateStaff(this.formUpdate).then(data => {
            this.dialogFormVisibleUpdate = false
            this.getStaffsData()
          }).catch(error => {
            // console.log(error)
          })
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '请输入上述信息',
            type: 'warning'
          })
        }
      })
      // this.dialogFormVisibleDetails = false
    },
    // 员工离职
    handleQuit(row) {
      this.formQuit = row
      this.dialogFormVisibleformQuit = true
    },
    // 改变离职文书
    handleChangeQuitFileId(file, fileList) {
      if (fileList.length > 0) {
        this.QuitFileIdfileList = [fileList[fileList.length - 1]]
      }
    },
    // 离职文书上传成功
    uploadQuitFileIdSuccess(res, file) {
      this.formQuit.QuitFileId = res.data
    },
    // 员工离职提交
    formQuitDialog(formQuit) {
      this.$refs[formQuit].validate((valid) => {
        if (valid) {
          updateStaff(this.formQuit).then(data => {
            this.dialogFormVisibleformQuit = false
            this.getStaffsData()
          }).catch(error => {
            // console.log(error)
          })
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '请输入上述信息',
            type: 'warning'
          })
        }
      })
    },
    // 删除员工按钮------------------------------------------------------
    handleDelete(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const queryParams = {
          StaffId: row.StaffId
        }
        deleteStaff(queryParams).then(data => {
          this.getStaffsData()
        }).catch(error => {
          // console.log(error)
        })
        this.$message({
          showClose: true,
          message: '操作成功',
          type: 'success'
        })
      }).catch(() => {})
    },
    // 分页----------------------------------------
    // 分页--每页条数
    handleSizeChange(val) {
      this.limitsize = val
      this.currentPage = 1
      this.getStaffsData()
      // // console.log(`每页 ${val} 条`)
    },
    // 分页--第几页
    handleCurrentChange(val) {
      this.currentPage = val
      this.getStaffsData()
      // // console.log(`第 ${val} 页`)
    }
  }
}
</script>

<style lang="scss" scoped>
body,html,.el-container {
    width:100%;
    height:100%;
    background:#fff;
      ::-webkit-scrollbar {
      /*滚动条整体部分，其中的属性有width,height,background,border（就和一个块级元素一样）等。*/
      width: 3px;
    }
    ::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 1px;
    }
    ::-webkit-scrollbar-button {
      /*滚动条两端的按钮。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果。*/
      display: none;
    }
    ::-webkit-scrollbar-track {
      /*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果。*/
      display: none;
    }
    ::-webkit-scrollbar-track-piece {
      /*内层轨道，滚动条中间部分（除去）。*/
      display: none;
    }
    ::-webkit-scrollbar-thumb {
      /*滚动条里面可以拖动的那部分*/
      background: #ccc;
    }

}
::v-deep .el-table th.gutter {
  display: table-cell !important;
}
::v-deep .el-table {
  th.gutter,
  colgroup.gutter {
    display: block !important;
    width: 3px !important;
  }
}
::v-deep .el-table__body {
  width: 100% !important;
}
// .el-header, .el-footer {
//     text-align: center;
// }
.el-main {
    text-align: center;
}
// ----------------------更改的地方--------------------------------
.topheader {
    border-bottom: 1px solid rgba(228, 228, 228, 1);
    padding-top: 0.8%;

    ::v-deep .el-breadcrumb {
      padding-left: 0.42%;
      border-left: 5px solid rgba(75, 141, 254, 1);
    }
  }
  ::v-deep .el-header {
    height: 4.61% !important;
  }

::v-deep .el-form{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    /* align-content: center; */
}
::v-deep .el-table{
    line-height: 30px;
}
// ::v-deep .el-table--border td,.el-table--border th {
//     border-right:none;
// }
// ::v-deep .el-table--border th,.el-table--border th.gutter:last-of-type {
//     border-right: none;
// }
::v-deep .el-button--primary{
    background:linear-gradient(90deg,rgba(17,153,208,1) 0%,rgba(22,215,171,1) 100%);
}
::v-deep .el-button--default{
    background:rgba(70,76,91,1);
    color:#fff;
}
// .search{
//     width:100%;
//     height: 8.43%;
//     border:1px solid #ccc;
//     padding-top:1.3%;
// }
// ----------------------更改的地方--------------------------------
.main{
    display: flex;
    flex-direction: column;
    // justify-content: space-around;
}
  .search {
    padding-top: 1%;
    border: 1px solid rgba(220, 223, 229, 1);
    height: 8.43%;
    width: 100%;
    ::v-deep .el-form {
      display: flex;
    }
  }
  .searchbtn{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-top:1%;
    padding-bottom: 1%;
  }
.formorder{
// ----------------------更改的地方--------------------------------
  ::v-deep .el-button,
    .el-button--default,
    .el-button--medium {
      font-size: 14px;
      padding: 0;
    }

    width:100%;
    // height: 80%;

}
// ----------------------更改的地方--------------------------------
.pagearea{
    width:100%;
    // height: 10%;
    // padding-left: 57.5%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-top:1%;
}

.searchfirst{
    width:20%;
    height: 20%;
}
.formadd{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.formaddQuit{
  display: flex;
  flex-direction: column;
  .upload-demo{
    padding-left: 308px;
  }
}

// 增加员工样式------头像
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 90px;
  line-height: 90px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 90px;
  display: block;
}
.stassImg{
  width: 40px;
  height: 40px;
}
::v-deep .el-upload-list.el-upload-list--text{
  float: left;
}
::v-deep .el-upload.el-upload-list--text{
  margin-top:10px;
}
// 上传文件
.upload-demo {
  display: flex;
}
::v-deep .el-upload-list {
  li{
    margin-top: 2px;
  }
}
::v-deep .el-list-enter-active,
::v-deep .el-list-leave-active {
  transition: none;
}
</style>
