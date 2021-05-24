<template>
  <el-container style=" height:100%">
    <el-main>
      <el-form ref="tableList" :model="tableList" :rules="rules" class="demo-form-inline" size="medium" label-position="right" label-width="100px">
        <!-- 基础信息 -->
        <el-card class="topNews">
          <el-row class="steps">
            <div class="newsDetail">
              会员---详情
            </div>
            <div class="button">
              <!-- <el-button @click="submit()">保存</el-button> -->
              <el-button @click="goBack">
                返回
              </el-button>
            </div>
          </el-row>
        </el-card>
        <el-card class="baseNews">
          <el-row type="flex" class="row-bg">
            <el-col :span="24" align="middle">
              会员基础信息
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label-width="140px" label="会员名称:" prop="MemberName">
                <el-input v-model="tableList.MemberName" disabled :style="{width: '50%'}" prefix-icon="el-icon-chat-line-square" />
                <!-- {{ tableList.BusinessName }} -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="140px" label="注册时间:" prop="CreateTime">
                <el-input v-model="tableList.CreateTime" disabled :style="{width: '50%'}" prefix-icon="el-icon-time" />
                <!-- {{ tableList.ShelvesTime }} -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label-width="140px" label="会员类型:" prop="MemberType">
                <el-input v-model="tableList.MemberType" disabled :style="{width: '50%'}" prefix-icon="el-icon-files" />
                <!-- {{ tableList.ItemType }} -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="140px" label="会员推荐人:" prop="ReferenceName">
                <el-input v-model="tableList.ReferenceName" disabled :style="{width: '50%'}" prefix-icon="el-icon-notebook-2" />
                <!-- {{ tableList.ProductType }} -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label-width="140px" label="会员等级:" prop="Level">
                <el-input v-model="tableList.Level" disabled :style="{width: '50%'}" prefix-icon="el-icon-s-order" />
                <!-- {{ tableList.BrandModelCode }} -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="140px" label="电话:" prop="Tel">
                <el-input v-model="tableList.Tel" disabled :style="{width: '50%'}" prefix-icon="el-icon-s-data">
                  <!-- {{ tableList.Weigth }} -->
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label-width="140px" label="会员性别:" prop="Sex">
                <el-input v-model="tableList.Sex" disabled :style="{width: '50%'}" prefix-icon="el-icon-turn-off" />
                <!-- {{ tableList.IsShelves }} -->
              </el-form-item>
            </el-col><el-col :span="12">
              <el-form-item label-width="140px" label="备注:" prop="Remarks">
                <el-input v-model="tableList.Remarks" disabled :style="{width: '50%'}" prefix-icon="el-icon-tickets" />
                <!-- {{ tableList.Remarks }} -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label-width="140px" label="会员头像:" prop="AvatarUrl">
                <span v-if="tableList.AvatarUrl === ''">暂未上传</span>
                <img
                  v-else
                  :src="tableList.AvatarUrl"
                  width="20%"
                  style="cursor: pointer;"
                  alt
                >
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="24">
              <el-form-item label-width="140px" label="收货地址:" prop="Remarks">
                <div v-for="(item,index) in addresslist" :key="index">
                  <div :style="{width: '50%'}" prefix-icon="el-icon-tickets">{{ item.Address }}</div>
                </div>

              </el-form-item>
            </el-col>
          </el-row> -->

          <!-- <el-row>基本信息</el-row> -->
          <!-- <el-divider />
          <accountTable /> -->
        </el-card>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import {
  queryMember
  // queryMemberDeliveryAddress
} from '@/api/member'
// import accountTable from './detail-child/account'
export default {
  // components: { accountTable },
  data() {
    return {
      tableList: {},
      rules: {
      },
      TypeMap: {
        '0': '是',
        '1': '否'
      },
      addresslist: []
    }
  },
  created() {
    this.message = this.$route.query
    console.log(this.message.MemberID, 'MemberID')
    this.queryMember()
  },
  methods: {
    queryMember() {
      const queryParams = {}
      queryParams.MemberID = this.message.MemberID
      queryMember(queryParams).then(response => {
        if (JSON.parse(response.data.data).RowCnt) {
          this.tableList = JSON.parse(response.data.data).Records[0]
          if (this.tableList.Sex * 1 === 0) {
            this.tableList.Sex = '男'
          } else {
            this.tableList.Sex = '女'
          }
          console.log(this.tableList, 'this.tableList')
          // this.queryMemberDeliveryAddress()
        }
      })
    },
    // queryMemberDeliveryAddress() {
    //   const queryParams = {}
    //   queryParams.MemberID = this.message.MemberID
    //   queryMemberDeliveryAddress(queryParams).then(res => {
    //     if (res.data.success) {
    //       if (JSON.parse(res.data.data).Records) {
    //         this.addresslist = JSON.parse(res.data.data).Records
    //       } else {
    //         this.$message.error('没有查询到会员地址')
    //       }
    //     } else {
    //       this.$message.error('请求失败')
    //     }
    //   })
    // },

    goBack() { // 返回上一个界面
      this.$router.go(-1)
    }
    // close() {
    //   this.$router.push({ path: '/contract/contract.html' })
    // }

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
    .el-input--suffix .el-input__inner {
    padding-right: 18px !important;
}
</style>
