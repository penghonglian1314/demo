<template>
  <el-container class="login-container">
    <el-header class="login-header" height="28%">
      <div class="login-title">管理员后台管理系统</div>
      <!-- <div class="login-title">{{PROJECTNAME}}</div> -->
    </el-header>
    <el-main class="login-main">
      <div class="tabs-container">
        <el-tabs v-model="activeTabName" @tab-click="changEntCode">
          <el-tab-pane label="帐号密码登录" name="password" class="password-tab">
            <el-form ref="loginForm" :rules="loginRules" :model="loginForm" class="password-form">
              <el-form-item prop="username">
                <el-input v-model="loginForm.username" placeholder="请输入帐号">
                  <i slot="prefix" class="el-icon el-icon-user-solid" />
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="loginForm.password" placeholder="请输入密码" type="password">
                  <i slot="prefix" class="el-icon el-icon-lock" />
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="submit" @click="handleLogin">登录</el-button>
              </el-form-item>
            </el-form>
            <!-- <el-radio v-model="noticeRead" label="1">
              <div class="login-notice">
                我已阅读并同意 <a class="notice" href="javascript:void(0)">《用户服务协议》</a>
                <span>、</span>
                <a class="notice" href="javascript:void(0)">《隐私协议》</a>
                <span>、</span>
                <a class="notice" href="javascript:void(0)">《用户授权协议》</a>
              </div>
            </el-radio> -->
          </el-tab-pane>
          <el-tab-pane label="手机验证码登录" name="phone" class="phone-tab">
            <el-form ref="form" :model="loginForm" class="phone-form">
              <el-form-item>
                <el-input v-model="loginForm.phone" placeholder="请输入手机号">
                  <i slot="prefix" class="el-icon el-icon-mobile-phone" />
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="loginForm.entCode" placeholder="请输入验证码">
                  <i slot="prefix" class="el-icon el-icon-chat-line-round" />
                  <template slot="suffix">
                    <canvas ref="entCode" class="ent-code" @click="changEntCode" />
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="loginForm.entCode" type="password" placeholder="请输入短信验证码">
                  <i slot="prefix" class="el-icon el-icon-chat-line-round" />
                  <template slot="append">
                    <el-button type="primary" round>发送</el-button>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="submit" @click="handleLogin">登录</el-button>
              </el-form-item>
            </el-form>
            <!-- <el-radio v-model="noticeRead" label="1">
              <div class="login-notice">
                我已阅读并同意 <a class="notice" href="javascript:void(0)">《用户服务协议》</a>
                <span>、</span>
                <a class="notice" href="javascript:void(0)">《隐私协议》</a>
                <span>、</span>
                <a class="notice" href="javascript:void(0)">《用户授权协议》</a>
              </div>
            </el-radio> -->
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { validUsername } from '@/utils/validate'
import Cookies from 'js-cookie'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      // console.log(value, 'validateUsername value')
      if (!validUsername(value)) {
        callback(new Error('请输入完整的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value === undefined || value.length === 0) {
        callback(new Error('请输入不少于6位的密码'))
      } else {
        callback()
      }
    }
    const validateEntCode = (rule, value, callback) => {
      if (value === undefined || value.length === 0) {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      PROJECTNAME: BASE_API.PROJECT_NAME,
      activeTabName: 'password',
      noticeRead: '1',
      loginForm: {
        username: '',
        password: '',
        phone: '',
        entCode: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        entCode: [
          {
            required: true,
            trigger: 'blur',
            validator: validateEntCode
          }
        ]
      },
      loading: false,
      redirect: '/',
      changeSystem: 11,
      show_num: []
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    window.addEventListener('keyup', e => {
      if (e.keyCode === 13) {
        const input = document.getElementsByTagName('input')
        const name = input[0].value
        const pwd = input[1].value
        if (name === '') {
          input[0].focus()
          return
        }
        if (pwd === '') {
          input[1].focus()
          return
        }
        this.handleLogin()
      }
    })
  },
  mounted() {
    // 初始化验证码
    this.draw(this.show_num)
  },
  methods: {
    language() {
      // console.log(navigator, 'navigator')
      var language
      language = navigator.appName ? navigator.language : navigator.browserLanguage
      language = language === '' ? 'zh-CN' : language
      var nowLanguage = Cookies.get('language')
      if (nowLanguage === null || nowLanguage === undefined) {
        Cookies.set('language', language)
        location.reload()
      } else if (nowLanguage !== language) {
        this.$confirm('检测到系统语言与浏览器语言不一致, 是否使用浏览器语言?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'info'
        }).then(() => {
          Cookies.set('language', language)
          location.reload()
        }).catch(() => {
          return
        })
      }
    },
    // 切换验证码
    changEntCode() {
      // 初始化验证码
      this.$nextTick(() => {
        this.draw(this.show_num)
      })
    },
    // 绘制验证码
    draw(show_num) {
      const canvas_width = this.$refs['entCode'].clientWidth
      const canvas_height = this.$refs['entCode'].clientHeight
      const canvas = this.$refs['entCode']
      const context = canvas.getContext('2d')
      canvas.width = canvas_width
      canvas.height = canvas_height
      const sCode =
        'A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0,q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m'
      const aCode = sCode.split(',')
      const aLength = aCode.length // 获取到数组的长度

      for (let i = 0; i <= 3; i++) {
        const j = Math.floor(Math.random() * aLength) // 获取到随机的索引值
        const deg = (Math.random() * 15 * Math.PI) / 180 // 产生0~15之间的随机弧度
        const txt = aCode[j] // 得到随机的一个内容
        show_num[i] = txt
        const x = 5 + i * 13 // 文字在canvas上的x坐标
        const y = 10 + Math.random() * 8 // 文字在canvas上的y坐标
        context.font = 'italic normal 16px 微软雅黑'

        context.translate(x, y)
        context.rotate(deg)

        context.fillStyle = this.randomColor()
        context.fillText(txt, 0, 0)

        context.rotate(-deg)
        context.translate(-x, -y)
      }
      for (let i = 0; i <= 5; i++) {
        // 验证码上显示线条
        context.strokeStyle = this.randomColor()
        context.beginPath()
        context.moveTo(
          Math.random() * canvas_width,
          Math.random() * canvas_height
        )
        context.lineTo(
          Math.random() * canvas_width,
          Math.random() * canvas_height
        )
        context.stroke()
      }
      for (let i = 0; i <= 15; i++) {
        // 验证码上显示小点
        context.strokeStyle = this.randomColor()
        context.beginPath()
        const x = Math.random() * canvas_width
        const y = Math.random() * canvas_height
        context.moveTo(x, y)
        context.lineTo(x + 1, y + 1)
        context.stroke()
      }
    },
    // 随机颜色
    randomColor() {
      // 得到随机的颜色值
      const r = Math.floor(Math.random() * 256)
      const g = Math.floor(Math.random() * 256)
      const b = Math.floor(Math.random() * 256)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.loading = false
            // TODO 跳转
            if (this.allowedJump) {
              this.$store.dispatch('user/loadPermission', this.changeSystem).then(() => {
                this.jumpLoading.close()
                this.$nextTick(() => {
                  this.$router.push({ path: this.redirect || '/' })
                  // console.log('nextTick')
                })
              })
            } else {
              // console.log(this.$router, 'else this.$router')
              this.$router.push({ path: this.redirect || '/' })
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    attributeCount(obj) {
      if (obj instanceof Object) {
        var count = 0
        for (var i in obj) {
          // eslint-disable-next-line no-prototype-builtins
          if (obj.hasOwnProperty(i)) {
            // 建议加上判断,如果没有扩展对象属性可以不加
            count++
          }
        }
        return count
      }
      return 0
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
html,
body {
  height: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
}

.login-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: url("./assets/images/login_bg.png") no-repeat center;
  background-size: 100% 100%;
  overflow: hidden;

  .login-header {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .login-title {
      font-size: 5rem;
      line-height: 100%;
      font-weight: bold;
      color: rgba(254, 253, 253, 1);
      text-align: center;
      margin-top: 1.5em;
    }
  }

  .login-main {
    z-index: 1;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;

    .tabs-container {
      width: 561px;
      padding: 0 20px 30px 20px;
      background: rgba(26, 68, 95, 0.3) url("./assets/images/tabs_bg.png") top no-repeat;
      background-size: 100% 100%;
      border-radius: 15px;

      ::v-deep .el-tabs.el-tabs--top {
        .el-tabs__header {
          margin-bottom: 0;

          .el-tabs__nav-wrap {
            &:after {
              content: none;
            }
          }

          .el-tabs__item {
            height: 66px;
            line-height: 66px;
            color: #cff6fe;
            font-size: 18px;

            &.is-active {
              color: #5cb7e6;
            }
          }

          .el-tabs__active-bar {
            bottom: 2px;
          }
        }

        .el-tabs__content {
          padding: 50px 30px 0;
        }
      }

      .password-tab {
        .password-form {
          .el-form-item {
            margin-bottom: 34px;

            .el-icon {
              font-size: 24px;
              line-height: 50px;
              color: #5cb7e6;
              position: relative;

              &:after {
                display: inline-block;
                content: "";
                height: 60%;
                position: absolute;
                top: 20%;
                right: -20px;
                border: 0 solid #65a5a5;
                border-right-width: 1px;
              }
            }

            ::v-deep .el-input {
              .el-input__prefix {
                left: 25px;
                top: 0;
                color: #c0c4cc;
                transition: all 0.3s;
              }

              .el-input__inner {
                padding-left: 90px;
                height: 50px;
                color: #f9fafa;
                font-size: 16px;
                border: 2px solid rgba(249, 250, 250, 0.27);
                background-color: transparent;
                border-radius: 25px;
              }
            }

            .submit {
              height: 50px;
              width: 100%;
              border-radius: 25px;
              margin-bottom: 14px;
            }
          }
        }

        ::v-deep .el-radio__inner {
          border-width: 3px;
          background-color: transparent;

          &:after {
            content: none;
          }
        }

        // .login-notice {
        //   color: #fafbfc;
        //   cursor: default;
        //   display: inline-block;

        //   .notice {
        //     cursor: pointer;
        //     color: #5cb7e6;
        //     text-decoration: none;

        //     &:hover {
        //       text-decoration: underline;
        //     }
        //   }
        // }
      }

      .phone-tab {
        .phone-form {
          .el-form-item {
            margin-bottom: 34px;

            .el-icon {
              font-size: 24px;
              line-height: 50px;
              color: #5cb7e6;
              position: relative;

              &:after {
                display: inline-block;
                content: "";
                height: 60%;
                position: absolute;
                top: 20%;
                right: -20px;
                border: 0 solid #65a5a5;
                border-right-width: 1px;
              }
            }

            ::v-deep .el-input {
              .el-input__prefix {
                left: 25px;
                top: 0;
                color: #c0c4cc;
                transition: all 0.3s;
              }

              .el-input__inner {
                padding-left: 90px;
                height: 50px;
                color: #f9fafa;
                font-size: 16px;
                border: 2px solid rgba(249, 250, 250, 0.27);
                background-color: transparent;
                border-radius: 25px;
              }

              &.el-input--suffix .el-input__inner {
                padding-right: 110px;
              }

              &.el-input-group--append {
                .ent-code {
                  right: 4px;
                }

                .el-input__inner {
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }

                .el-input-group__append {
                  background-color: transparent;
                  border-width: 2px;
                  border-color: rgba(249, 250, 250, 0.27);
                  border-top-right-radius: 25px;
                  border-bottom-right-radius: 25px;
                }
              }
            }

            .ent-code {
              height: 80%;
              width: 80px;
              position: relative;
              top: 10%;
              right: 25px;
              background-color: white;
            }

            .submit {
              height: 50px;
              width: 100%;
              border-radius: 25px;
              margin-bottom: 14px;
            }
          }
        }

        ::v-deep .el-radio__inner {
          border-width: 3px;
          background-color: transparent;

          &:after {
            content: none;
          }
        }

        .login-notice {
          color: #fafbfc;
          cursor: default;
          display: inline-block;

          .notice {
            cursor: pointer;
            color: #5cb7e6;
            text-decoration: none;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }

    &::-webkit-scrollbar {
      width: 0;
    }
  }
}
</style>
