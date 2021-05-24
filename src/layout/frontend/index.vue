<template>
  <div :class="classObj" class="app-wrapper">
    <theme-picker v-show="false" class="theme-switch right-menu-item" />
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar v-if="menuShow" :class="classObj" class="sidebar-container" />
    <div class="top-bar">
      <span class="logo" title="首页" @click="toIndex">
        管理员后台管理系统
      </span>
      <span class="time-tool" style="cursor: pointer;" @click="logout">
        <img class="indexImg" src="./assets/images/quit.png" alt="">
        <span class="indexText">{{ $t('navbar.logout') }}</span>
      </span>
      <span class="time-tool">
        <img class="indexImg" src="./assets/images/user.png" alt="">
        <el-dropdown style="font: unset;pointer-events: auto" trigger="click" @command="handleCommand">
          <span class="indexText"> {{ userName }}
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="personalDetailDialog">修改个人信息</el-dropdown-item>
              <el-dropdown-item command="passwordDialog">修改密码</el-dropdown-item>
            </el-dropdown-menu>
          </span>
        </el-dropdown>
      </span>
    </div>
    <div :class="{hasTagsView:needTagsView, menuHidden:!menuShow}" :style="mainStyle" class="main-container">
      <!--<el-tooltip v-show="device === 'mobile' && !sidebar.opened" content="打开" effect="dark" class="mobileHamburger">-->
      <!--  <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>-->
      <!--</el-tooltip>-->
      <!--<sidebar v-if="menuShow" :class="classObj" class="sidebar-container"/>-->
      <div :class="{'fixed-header':fixedHeader}" class="fixed-tags-view-wrapper">
        <!--<navbar />-->
        <tags-view v-show="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>

    <!-- 修改个人信息 -->
    <el-dialog title="修改个人信息" :visible.sync="personalDetailDialog.visible" width="30%">
      <el-form ref="personalDetailDialog" status-icon :rules="personalDetailDialog.formRules" :model="personalDetailDialog.form" label-position="left" label-width="100px">

        <el-form-item label="id" prop="userId">
          <el-input v-model="personalDetailDialog.form.userId" disabled />
        </el-form-item>
        <el-form-item label="登录帐号" prop="loginName">
          <el-input v-model="personalDetailDialog.form.loginName" disabled />
        </el-form-item>
        <el-form-item label="真实名称" prop="realName">
          <el-input v-model="personalDetailDialog.form.realName" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="personalDetailDialog.form.email" />
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-input v-model="personalDetailDialog.form.createTime" disabled />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="personalDetailDialog.visible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="updatePersonalDetail">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="passwordDialog.visible" top="12%" width="30%">
      <el-form ref="passwordDialogForm" status-icon :rules="passwordDialog.formRules" :model="passwordDialog.form" label-position="left" label-width="100px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="passwordDialog.form.oldPassword" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passwordDialog.form.newPassword" />
        </el-form-item>
        <el-form-item label="确认新密码" prop="reNewPassword">
          <el-input v-model="passwordDialog.form.reNewPassword" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passwordDialog.visible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="updatePassword">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars,vue/no-unused-components */
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import Hamburger from '@/components/Hamburger'
import RightPanel from '@/components/RightPanel'
import ThemePicker from '@/components/ThemePicker'
import ResizeMixin from './mixin/ResizeHandler'
import { parseTime } from '@/utils'
import { mapState } from 'vuex'
// import { updatePassword, updateUser } from '../api/usercenter/usermanager'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Hamburger,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
    ThemePicker
  },
  mixins: [ResizeMixin],
  data() {
    const validateLoginName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('登录名不能为空'))
      } else if (!/^[0-9a-zA-Z_]{1,}$/.test(value)) {
        callback(new Error('登录名只能由字母数字下划线组成'))
      } else {
        callback()
      }
    }

    const validatePassword = (rule, value, callback) => {
      if (!rule.required) {
        callback()
      } else {
        if (value === '' || value === undefined) {
          callback(new Error('密码不能为空'))
        } else if (!/^[0-9a-zA-Z_]{1,}$/.test(value)) {
          callback(new Error('密码只能由字母数字下划线组成'))
        } else if (value.length > 20) {
          callback(new Error('密码最长20位'))
        } else {
          callback()
        }
      }
    }

    const validaterePassword = (rule, value, callback) => {
      if (value === undefined || value.length === 0) {
        callback(new Error('请输入不少于6位的密码'))
      } else if (value !== this.passwordDialog.form.newPassword) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      PROJECTNAME: BASE_API.PROJECT_NAME,
      dialogVisible: false,
      showAll: false,
      mainStyle: {},
      personalDetailDialog: {
        visible: false,
        form: {
          userId: '',
          loginName: '',
          realName: '',
          email: '',
          createTime: ''
        },
        formRules: {
          realName: [{ required: true, message: '姓名不能为空', trigger: ['blur', 'change'] }],
          email: [{ required: true, message: '请输入邮箱地址', trigger: ['blur', 'change'] },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]
        }
      },
      passwordDialog: {
        visible: false,
        form: {
          userId: '',
          oldPassword: '',
          newPassword: '',
          reNewPassword: ''
        },
        formRules: {
          oldPassword: [{ required: true, trigger: ['blur', 'change'], validator: validatePassword }],
          newPassword: [{ required: true, trigger: ['blur', 'change'], validator: validatePassword }],
          reNewPassword: [{ required: true, trigger: ['blur', 'change'], validator: validaterePassword }]
        }
      }
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    userName() {
      const userName = this.$store.getters.name
      if (!userName) {
        this.logout()
      }
      return userName
    },
    user() {
      return this.$store.getters.user
    },
    userId() {
      return this.$store.getters.user.userId
    },
    menuShow() {
      return this.$store.state.app.menuHidden.indexOf(this.$route.fullPath) === -1
    },
    classObj() {
      const sidebarOpened = this.sidebar.opened && this.menuShow
      return {
        hideSidebar: !sidebarOpened,
        openSidebar: sidebarOpened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    dropdown() {
      return {
        'avatar-container': true,
        'right-menu-item': true,
        'mobile': this.device === 'mobile'
      }
    }
  },
  created() {
    // 获取当前的用户名，如果是大数据页面的，则跳转到指定页面
    // const username = JSON.parse(localStorage.getItem('user')).loginName
    // if (username === 'BigData') {
    //   this.$router.push('/aicar/transportBigData')
    // }
  },
  methods: {
    handleCommand(command) {
      this.passwordDialog.form.userId = this.userId
      this.passwordDialog.form.oldPassword = ''
      this.passwordDialog.form.newPassword = ''
      this.passwordDialog.form.reNewPassword = ''

      this.personalDetailDialog.form.userId = this.user.userId
      this.personalDetailDialog.form.loginName = this.user.loginName
      this.personalDetailDialog.form.realName = this.user.realName
      this.personalDetailDialog.form.email = this.user.email
      this.personalDetailDialog.form.createTime = this.user.createTime

      this[command].visible = true
    },
    updatePersonalDetail() {
      this.$refs.personalDetailDialog.validate(valid => {
        if (valid) {
          // updateUser(this.personalDetailDialog.form).then(resp => {
          //   // console.log(resp, typeof resp, 'resp')
          //   if (resp.data.success) {
          //     this.$notify({
          //       title: '成功',
          //       message: '修改个人信息成功',
          //       type: 'success',
          //       duration: 2000
          //     })
          //     const user = JSON.parse(localStorage.getItem('user'))
          //     user.realName = this.personalDetailDialog.form.realName
          //     user.email = this.personalDetailDialog.form.email
          //     localStorage.setItem('user', JSON.stringify(user))
          //     this.personalDetailDialog.visible = false
          //   }
          // }).catch(e => {
          //   // console.log('updatePassword error')
          // })
        } else {
          console.error('error submit!')
        }
      })
    },
    updatePassword() {
      this.$refs.passwordDialogForm.validate(valid => {
        if (valid) {
          // updatePassword(this.passwordDialog.form).then(({ data: { data }}) => {
          //   if (data.success) {
          //     this.$notify({
          //       title: '成功',
          //       message: '修改密码成功',
          //       type: 'success',
          //       duration: 2000
          //     })
          //     this.passwordDialog.visible = false
          //   }
          // }).catch(e => {
          //   // console.log('updatePassword error')
          // })
        } else {
          console.error('error submit!')
        }
      })
    },
    logout() {
      this.$store.dispatch('user/frontLogout').then(() => {
        this.$router.push('/login', () => {
          location.reload()// In order to re-instantiate the vue-router object to avoid bugs
        })
      })
    },
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    changeStyle(message) {
      this.mainStyle = JSON.parse(message)
    },
    toIndex() {
      this.$router.push('/')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/mixin";
@import "../../styles/variables";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  padding-top: $topBarHeight;

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 10;
  }

  .top-bar {
    // background:url("./assets/images/top_bar_bg.png");
    background: linear-gradient(to right,#1199D0,#16D7AB);
    width: 100%;
    height: $topBarHeight;
    position: fixed;
    z-index: 999;
    top: 0px;
    color: #fff;
    box-shadow: 0px 0px 3px #0e3465;
    .logo {
      font-size: 2.8rem;
      line-height: $topBarHeight;
      text-align: center;
      float:left;
      display:flex;
      align-items:center;
      margin-left: 2%;
      height:100%;
      cursor: pointer;
      img{
        height: 60%;
      }
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .el-dropdown {
      color: #fff;
      svg {
        margin-left: 10px;
      }
    }
    .avatar-container {
      //height: 50px;
      display: flex;
      align-items: center;
      margin-right: 30px;
      .el-dropdown {
        top: -25px;
      }
      .el-tag {
        background-color: $elTagBg;
        border-color: $elTagBorder;
        color: $elTagColor;
      }
      .avatar-wrapper {
        // margin-top: 5px;
        display: flex;
        position: relative;
        align-items: center;
        &:hover {
          cursor: pointer;
        }
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 10px;
          font-size: 12px;
        }
      }
    }
    // .avatar-container.el-dropdown {
    //   top: -25px;
    // }
    .avatar-container.el-dropdown.mobile {
      top: 0px;
    }

    .time-tool {
      cursor: pointer;
      line-height:  $topBarHeight;;
      font-size: 2.2rem;
      float: right;
      margin-right: 20px;

      .indexImg{
        padding-top: 1px;
        vertical-align: middle;
      }

      .indexText{
        padding: 1px;
        vertical-align: middle;
      }
    }
  }

  &.mobile.openSidebar{
    position: fixed;
    top: 0;
  }

  .main-container {
    height: calc(100vh - #{$topBarHeight});
    min-height: calc(100vh - #{$topBarHeight});
    background-color: #ededed;
    // transition: margin-left .28s;
    position: relative;

    .mobileHamburger {
      z-index: 9999;
      position: fixed;
      top: 100px;
      left: 0;
      width: 1em;
      height: 1em;
    }

    &.menuHidden {
      margin-left: 0 !important;
    }

    .app-main {
      width: 100%;
      height: 100%;
      min-height: 100%;
      position: relative;
      overflow: hidden;
    }

    &.hasTagsView {
      background-color: rgba(0,0,0,.15);
      .app-main {
        background-color: white;
        width: calc(100% - 10px);
        height: calc(100vh - #{$topBarHeight} - #{$tagsViewHeight} - 10px - 10px);
        min-height: calc(100vh - #{$topBarHeight} - #{$tagsViewHeight} - 10px - 10px);
        margin-left: 10px;
        box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.15);
      }

      .fixed-tags-view-wrapper{
        padding-top: 10px;
        #tags-view-container{
          width: calc(100% - 10px);
          margin-left: 10px;
        }
      }
    }
  }

  .indexDialog {
    .el-dialog {
      background: black!important;
      color: white!important;
      height: 12.5vw;
      *{
        color: white!important;
      }
    }
    .floatInfo{
      float: left;
      width: 48%;
      height: 1.2vw;
      font-size: 0.9rem;
      margin-bottom: 1%;
    }
  }
}

</style>

<style rel="stylesheet/scss" lang="scss">
@import "../../styles/variables";
.app-main {
  .sub-container {
    .sub-aside {
      border-radius: 3px;
      border-top: 2px solid#ededed;
      text-align: center;
      background: $tabBg;
      transition: width .28s;
      overflow-y: hidden;
      padding: 10px;
      display: block;
      line-height: 32px;
      font-size: 16px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      color: #2c3e50;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      a {
        color: #337ab7;
        cursor: pointer;

        &:hover {
          color: rgb(32, 160, 255);
        }
      }
      .el-scrollbar {
        height: 100%;
        .el-scrollbar__bar {
          z-index: 999;
        }
      }
      .el-tabs {
        background: $tabBg;
        border: none;
        box-shadow: none;
        .el-tabs__nav {
          width: 100%;
          .el-tabs__item {
            background: $tabBg;
            color: rgb(102, 102, 102);
            font-size: 18px;
            text-align: center;
            height: 48px;
            line-height: 48px;
            width: 50%;
            border: none;
            margin: 0 0;
          }
          // tree的行政，监控点击后样式
          .el-tabs__item.is-active {
            //background: $tabColor;
            //color: $tabBg;
            color: $tabColor;
            border-bottom: 1px solid $tabColor;
          }
        }
        .el-tabs__header {
          background: $tabBg;
          border: none;
        }
        .el-tabs__content {
          padding: 0px;
        }
      }
    }
    >.el-container >.el-main {
      padding: 0px 10px;
      //margin-top: 10px;
      background-color: #ededed;
      > div {
        border-radius: 3px 3px;
        background: $tabBg;
      }
      .el-tabs__content {
        padding: 10px;
      }
    }
    .scrollbar-wrapper {
      overflow-x: hidden!important;
      .el-scrollbar__view {
        height: 100%;
      }
    }
    .el-scrollbar__bar.is-vertical{
      right: 0px;
    }
    .is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss">
@import "../../styles/variables";

@media screen and (max-width: 1366px) { /*当屏幕尺寸小于1366px时，应用下面的CSS样式*/
  html {
    font-size: 8px;
  }

  .sidebar-container {
    width: 230px !important;
  }

  .openSidebar .main-container{
      margin-left: 230px !important;
  }

  .sub-container{
    .sub-aside {
      width: 240px !important;
    }
  }
}

@media screen and (min-width: 1366px) { /*当屏幕尺寸大于等于1366px时，应用下面的CSS样式*/
  html {
    font-size: 8px;
  }

  .sidebar-container {
    width: 230px !important;
  }

  .openSidebar .main-container{
      margin-left: 230px !important;
  }

  .sub-container{
    .sub-aside {
      width: 240px !important;
    }
  }
}

@media screen and (min-width: 1920px) {
  html {
    font-size: 10px;
  }
  .sidebar-container {
    width: $sideBarWidth !important;
  }

  .openSidebar .main-container{
    margin-left: $sideBarWidth !important;
  }

  .sub-container{
    .sub-aside {
      width: 300px !important;
    }
  }
}
</style>
