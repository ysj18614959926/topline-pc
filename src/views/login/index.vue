<template>
  <div>
    <el-form :model='loginMessage' :rules='rules' ref='loginMessage'>
      <img src="./images/logo_index.png" alt="黑马logo">
      <el-form-item prop='mobile'>
        <el-input type="text" placeholder="手机号" v-model='loginMessage.mobile'></el-input>
      </el-form-item>
      <el-form-item class="el-form-item-code" prop='code'>
        <el-col :span="15">
          <el-input type="text" placeholder="验证码" v-model='loginMessage.code'></el-input>
        </el-col>
        <el-col :offset="1" :span="8">
          <el-button @click='handelGetCode' class="getCode" :disabled='!!disGetCode'>{{disGetCode?count:'获取验证码'}}</el-button>
        </el-col>
      </el-form-item>
      <el-form-item prop='isRead'>
        <el-checkbox :checked='loginMessage.isRead' v-model='loginMessage.isRead'>我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click='handelLogin'>提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios/dist/axios.js'
import '@/vendor/gt.js'
const num = 5
export default {
  data () {
    return {
      loginMessage: {
        mobile: null,
        code: null,
        isRead: true
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { len: 11, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入验证码', trigger: 'blur' }
        ],
        isRead: [
          { required: true, message: '必须已读' },
          { pattern: /true/, message: '必须已读' }
        ]
      },
      count: num,
      disGetCode: null
    }
  },
  methods: {
    daojishi () {
      this.disGetCode = setInterval(() => {
        this.count--
        if (this.count <= 0) {
          clearInterval(this.disGetCode)
          this.disGetCode = null
          this.count = num
        }
      }, 500)
    },
    sendCode () {
      const {
        mobile
      } = this.loginMessage
      axios({
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/captchas/' + mobile,
        method: 'GET'
      }).then(res => {
        const data = res.data.data
        window.initGeetest({
          // 以下配置参数来自服务端 SDK
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: true,
          product: 'float'
        }, (captchaObj) => {
          captchaObj.appendTo('.el-form-item-code')
          captchaObj.onReady(function () {
            captchaObj.verify()
          }).onSuccess(() => {
            this.daojishi()
            console.log(captchaObj.getValidate())
            const { geetest_challenge: challenge, geetest_seccode: seccode, geetest_validate: validate } = captchaObj.getValidate()
            axios({
              url: 'http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/' + mobile,
              method: 'GET',
              params: {
                challenge, seccode, validate
              }
            }).then(res => {
            })
          }).onError(function () {})
        })
      })
    },
    handelGetCode () {
      this.$refs.loginMessage.validateField('mobile', (e) => {
        if (e) {
          return
        }
        this.sendCode()
      })
    },
    handelLogin () {
      this.$refs['loginMessage'].validate((valid) => {
        if (valid) {
          axios({
            url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
            method: 'POST',
            data: this.loginMessage
          }).then(res => {
            window.localStorage.setItem('userLogin', JSON.stringify(res.data.data))
            this.$router.push('/')
          })
        }
      })
    }
  }
}

</script>
<style>
  #app {
    height: 100%;
    background: url('./images/login_bg.jpg') no-repeat;
    background-size: 100%;
  }

  .el-form {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 450px;
    height: 350px;
    background-color: #fff;
    box-sizing: border-box;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 20px;
    text-align: center;
  }

  img {
    width: 50%;
  }

  .el-input__inner {
    width: 100%;
    height: 40px;
  }

  .el-button--primary {
    width: 100%;
  }

</style>
