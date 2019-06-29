<template>
    <div>
        <el-col :span='15'>
            <el-form ref='userInfo' :model='userInfo'>
                <el-form-item label='名称'>
                    <el-input v-model='userInfo.name'></el-input>
                </el-form-item>
                <el-form-item label='个性签名'>
                    <el-input v-model='userInfo.intro'></el-input>
                </el-form-item>
                <el-form-item label='头条号ID'>
                    <el-input disabled v-model='userInfo.id'></el-input>
                </el-form-item>
                <el-form-item label='绑定手机号'>
                    <el-input disabled v-model='userInfo.mobile'></el-input>
                </el-form-item>
                <el-form-item label='邮箱'>
                    <el-input v-model='userInfo.email'></el-input>
                </el-form-item>
                <el-button type='primary' @click='editUser'>修改</el-button>
            </el-form>
        </el-col>
    </div>
</template>
<script>
export default {
  data () {
    return {
      userInfo: {
        name: null,
        intro: null,
        id: null,
        mobile: null,
        email: null
      }
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    async loadUser () {
      try {
        const res = await this.$http({
          url: '/user/profile',
          method: 'get'
        })
        this.userInfo = res
        console.log(res)
      } catch (err) {
        this.$message.error = '加载用户信息失败'
      }
    },
    async editUser () {
      try {
        const { name, intro, email } = this.userInfo
        const res = await this.$http({
          url: '/user/profile',
          method: 'patch',
          data: {
            name, intro, email
          }
        })
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        console.log(res)
      } catch (err) {
        this.$message.error = '更改用户信息失败'
      }
    }
  }
}
</script>
