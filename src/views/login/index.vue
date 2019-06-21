<template>
  <div>
    <el-form :model="numberValidateForm" ref="numberValidateForm" class="demo-ruleForm">
      <img src="./images/logo_index.png" alt="黑马logo">
      <el-form-item>
        <el-input type="text" placeholder="手机号" v-model='loginMessage.mobile'></el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span="15">
          <el-input type="text" placeholder="验证码" v-model='loginMessage.code'></el-input>
        </el-col>
        <el-col :offset="1" :span="8">
          <el-button @click='handelGetCode'>获取验证码</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-checkbox checked>我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios/dist/axios.js'
export default {
  data () {
    return {
      loginMessage: {
        mobile: null,
        code: null
      }
    }
  },
  methods: {
    handelGetCode () {
      const {
        mobile
      } = this.loginMessage
      axios({
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/captchas/' + mobile,
        method: 'GET'
      }).then(res => {
        console.log(res)
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
    margin-bottom: 15px;
  }

  .el-button--primary {
    width: 100%;
  }

</style>
