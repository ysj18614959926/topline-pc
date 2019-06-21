<template>
  <div>
    <el-form>
      <img src="./images/logo_index.png" alt="黑马logo">
      <el-form-item :rules="[{required:true,message:'必填',trigger:['blur','change']}]">
        <el-input type="text" placeholder="手机号" v-model='loginMessage.mobile'></el-input>
      </el-form-item>
      <el-form-item class="el-form-item-code">
        <el-col :span="15">
          <el-input type="text" placeholder="验证码" v-model='loginMessage.code'></el-input>
        </el-col>
        <el-col :offset="1" :span="8">
          <el-button @click='handelGetCode' :disabled='disGetCode' class="getCode">获取验证码</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-checkbox checked>我已阅读并同意用户协议和隐私条款</el-checkbox>
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
export default {
  data () {
    return {
      loginMessage: {
        mobile: null,
        code: null
      },
      disGetCode: false
    }
  },
  methods: {
    handelGetCode () {
      if (this.loginMessage.mobile === null) {
        this.$message.error('手机号必填')
        return
      }
      const {
        mobile
      } = this.loginMessage
      axios({
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/captchas/' + mobile,
        method: 'GET'
      }).then(res => {
        this.disGetCode = true
        const data = res.data.data
        window.initGeetest({
          // 以下配置参数来自服务端 SDK
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: true,
          product: 'float'
        }, function (captchaObj) {
          captchaObj.appendTo('.el-form-item-code')
          captchaObj.onReady(function () {
            captchaObj.verify()
          }).onSuccess(function () {
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
    handelLogin () {
      axios({
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        method: 'POST',
        data: this.loginMessage
      }).then(res => {
        this.$router.push('/home')
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
