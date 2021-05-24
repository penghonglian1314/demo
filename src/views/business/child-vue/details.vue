<template>
  <el-container style=" height:100%">
    <el-main>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-form-inline" size="medium" label-position="right" label-width="140px">
        <!-- 基础信息 -->
        <el-card class="topNews">
          <el-row class="steps">
            <div class="newsDetail">商户详情</div>
            <div class="button">
              <!-- <el-button @click="submit()">保存</el-button> -->
              <el-button @click="goBack">返回</el-button>
            </div>
          </el-row>
        </el-card>
        <el-card class="baseNews">
          <el-row slot="header" type="flex" class="row-bg">
            <el-col :span="24" align="middle">商户基础信息</el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="账号:">
                <el-button type="primary" @click="toaccountNode()">
                  管理账号
                </el-button>
              </el-form-item>
              <el-divider />
              <el-form-item label="商户名称:" prop="BusinessName">
                <el-input v-model="ruleForm.BusinessName" disabled :style="{width: '50%'}" prefix-icon="el-icon-office-building" />
              </el-form-item>

              <el-form-item label="创建时间:" prop="CreateTime">
                <el-input v-model="ruleForm.CreateTime" disabled :style="{width: '50%'}" prefix-icon="el-icon-time" />
                <!-- {{ ruleForm.CreateTime }} -->
              </el-form-item>

              <el-form-item label="当前状态:" prop="Status">
                <el-input v-model="TypeMap[ruleForm.Status]" disabled :style="{width: '50%'}" prefix-icon="el-icon-more" />
                <!-- {{ TypeMap[ruleForm.Status] }} -->
              </el-form-item>

              <!-- <el-row>
                <el-col :span="12">
                  <el-form-item  label="商店上限:" prop="ShopCnt">
                    <el-input v-model="ruleForm.ShopCnt" disabled :style="{width: '50%'}" prefix-icon="el-icon-finished" />
                  </el-form-item>
                </el-col>
              </el-row> -->

              <el-form-item label="公司法人姓名:" prop="Corporate">
                <el-input v-model="ruleForm.Corporate" disabled :style="{width: '50%'}" prefix-icon="el-icon-s-custom" />
                <!-- {{ ruleForm.Corporate }} -->
              </el-form-item>

              <el-form-item label="公司法人电话:" prop="CorporateTelNo">
                <el-input v-model="ruleForm.CorporateTelNo" disabled :style="{width: '50%'}" prefix-icon="el-icon-phone" />
                <!-- {{ ruleForm.CorporateTelNo }} -->
              </el-form-item>

              <el-form-item label="公司法人身份证号:" prop="CorporateCardID">
                <el-input v-model="ruleForm.CorporateCardID" disabled :style="{width: '50%'}" prefix-icon="el-icon-postcard" />
                <!-- {{ ruleForm.CorporateCardID }} -->
              </el-form-item>

              <el-form-item label="管理员:" prop="ManagerMemberID">
                <el-input v-model="ruleForm.ManagerMemberID" disabled :style="{width: '50%'}" prefix-icon="el-icon-open" />
                <!-- {{ ruleForm.ManagerMemberID }} -->
              </el-form-item>
              <el-form-item label="备注:" prop="Remarks">
                <el-input v-model="ruleForm.Remarks" disabled :style="{width: '50%'}" prefix-icon="el-icon-tickets" />
                <!-- {{ ruleForm.Remarks }} -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="营业执照:" prop="BusinessLicenseFileID">
                <span v-if="ruleForm.BusinessLicenseFileID === ''">暂未上传</span>
                <img
                  v-else
                  :src=" ruleForm.BusinessLicenseFileID"
                  width="40%"
                  height="170px"
                  style="cursor: pointer;"
                  alt
                >
              </el-form-item>

              <el-form-item label="身份证正面照:" prop="CorporateCardFileID">
                <span v-if="ruleForm.CorporateCardFileID === ''">暂未上传</span>
                <img
                  v-else
                  :src=" ruleForm.CorporateCardFileID"
                  width="40%"
                  height="170px"
                  style="cursor: pointer;"
                  alt
                >
              </el-form-item>

              <el-form-item label="身份证反面照:" prop="CorporateCardFileID2">
                <span v-if="ruleForm.CorporateCardFileID2 === ''">暂未上传</span>
                <img
                  v-else
                  :src=" ruleForm.CorporateCardFileID2"
                  width="40%"
                  height="170px"
                  style="cursor: pointer;"
                  alt
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-form>

      <el-dialog
        v-if="accountNode"
        :visible.sync="accountNode"
        title="账号管理"
        width="70%"
        center
        append-to-body
      >
        <div class="query_form_btn">
          <el-button type="primary" @click="toaddUser">增加</el-button>
        </div>
        <div class="table">
          <el-table :header-cell-style="{ background: 'rgba(249,250,252,1)' }" border :data="tableList" style="width: 100%" stripe highlight-current-row>
            <el-table-column prop="UserID" label="用户ID">
              <template slot-scope="scope">
                <span>{{ scope.row.UserID }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="UserName" label="用户名称">
              <template slot-scope="scope">
                <span>{{ scope.row.UserName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="TelNo" label="电话">
              <template slot-scope="scope">
                <span>{{ scope.row.TelNo }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="Email" label="邮箱">
              <template slot-scope="scope">
                <span>{{ scope.row.Email }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="UserRoles" label="角色">
              <template slot-scope="scope">
                <span>{{ scope.row.UserRoles }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="Extend" label="详情">
              <template slot-scope="scope">
                <span>{{ scope.row.Extend }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="40%">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="修改基本信息" placement="top-start" enterable>
                  <i class="el-icon-edit" style="cursor:pointer" @click="updateUser(scope.row)" />
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column align="center" width="40%">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="删除用户" placement="top-start" enterable>
                  <i class="el-icon-delete" style="cursor:pointer;color:red" @click="deleteUser(scope.row)" />
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="page">
          <el-pagination
            :current-page="queryParams.current"
            :page-sizes="[10,20,30,50]"
            :page-size="queryParams.limit"
            :total="queryParams.total"
            layout="total, sizes, prev, pager, next, jumper"
            prev-text="上一页"
            next-text="下一页"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-dialog>

      <el-dialog v-if="addUser" :visible.sync="addUser" title="添加用户" width="50%" class="dialog_class">
        <addUser :parentmsg="parentmsg" @func="closeUser" />
      </el-dialog>

      <el-dialog v-if="updataUserInfo" :visible.sync="updataUserInfo" title="修改用户信息" class="dialog_class">
        <updataUserInfotion :parentmsg="parentmsg" @func="closeUser" />
      </el-dialog>

    </el-main>
  </el-container>
</template>
<script>
import addUser from '@/views/business/child-vue/addUser'
import updataUserInfotion from '@/views/business/child-vue/updataUserInfo'
import { queryTabBusiness } from '@/api/business'
import { queryUserInfo, deleteUserInfo } from '@/api/user'
import { formatYmdhms } from '@/utils/formattime'
export default {
  components: { addUser, updataUserInfotion },
  data() {
    return {
      addUser: false,
      updataUserInfo: false,
      accountNode: false,
      ruleForm: {},
      tableList: [],
      rules: {},
      queryParams: {
        limit: 10,
        current: 1,
        UserStatus: '0'
      },
      // imgUrl: BASE_API.SERVER_IP + '/lxy_mall/file.action?fileUrl=',
      // queryUrl: '/lxy_mall/queryUserInfo.action', // 查询用户信息接口
      TypeMap: {
        '0': '正常',
        '1': '待审核',
        '2': '已暂停',
        '3': '未通过'
      }
    }
  },
  created() {
    this.message = this.$route.query
    console.log(this.message.BusinessID)
    this.queryTabBusiness()
  },
  methods: {
    toaccountNode() {
      console.log('toaccountNode')
      this.accountNode = true
      this.queryUserInfo()
    },
    toaddUser() {
      this.parentmsg = this.$route.query
      this.addUser = true
    },
    updateUser(row) {
      this.parentmsg = row
      this.updataUserInfo = true
    },
    deleteUser(row) {
      console.log('deleteUserInfo', row)
      deleteUserInfo(
        {
          UserID: row.UserID,
          UserStatus: '9'
        }
      ).then(res => {
        this.queryUserInfo()
      })
    },
    queryTabBusiness() {
      const queryParams = {}
      queryParams.BusinessID = this.message.BusinessID
      queryTabBusiness(queryParams).then(response => {
        if (JSON.parse(response.data.data).RowCnt) {
          this.ruleForm = JSON.parse(response.data.data).Records.map(e => {
            e.CreateTime = formatYmdhms(e.CreateTime)
            return e
          })[0]
          console.log(this.ruleForm, 'this.ruleForm')
        }
      })
    },
    queryUserInfo() {
      this.queryParams.Extend = 'BusinessID=' + this.message.BusinessID + ',ShopID=0'
      // , this.queryUrl
      queryUserInfo(this.queryParams).then(response => {
        if (response.data.success) {
          this.queryParams.total = Number(JSON.parse(response.data.data).TotalSize)
          if (Number(JSON.parse(response.data.data).RowCnt)) {
            this.tableList = (JSON.parse(response.data.data).Records)
            console.log('queryUserInfo', this.tableList)
            return
          }
          this.tableList = []
        }
      })
    },
    handleCurrentChange(current) {
      this.queryParams.current = current
      this.queryUserInfo()
    },
    handleSizeChange(size) {
      this.queryParams.limit = size
      this.queryUserInfo()
    },
    goBack() { // 返回上一个界面
      this.$router.go(-1)
    },
    // close() {
    //   this.addUser = false
    //   this.updataUserInfo = false
    //   // this.$router.push({ path: '/business/todetails.html' })
    //   this.queryTabBusiness()
    // },
    closeUser() {
      // this.queryTabBusiness()
      this.addUser = false
      this.updataUserInfo = false
      this.queryUserInfo()
    }

  }
}
</script>

<style scoped>
.block {
  display: inline-block;
}
.block .el-form-item {
  display: inline-block
}
.el-form-item .EndTime .is-required .el-form-item--medium .el-form-item__content {
  margin-left: 1px;
}
.newsDetail {
  display: inline-block;
  width: 400px;
  line-height: 45px;
}
.slot {
  display: inline-block;
  margin-left: 20px;
}

.button {
  margin-right: 0px;
  width: 300px;
  display: inline-block;
  float:right;
  text-align: center;
  line-height: 45px;
}

.topNews {
  margin-bottom: 40px;
}
.baseNews {
  margin-bottom: 40px;
}.el-form-item__label
/* .baseNews label {
  font-weight: 400 !important;
} */
.row-bg {
  margin-bottom: 25px;
}
.el-form-item__label:after {
        content: "";
        display: inline-block;
        width: 100%;
    }

    .el-form-item__label {
        text-align: justify;
        height: 50px;
    }

    .el-form-item.is-required .el-form-item__label:before {
        content: none !important;
    }
    .el-input disabled--suffix .el-input disabled__inner {
    padding-right: 18px !important;
}
</style>
