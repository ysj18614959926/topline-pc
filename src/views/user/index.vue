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
        <el-col :span='5' :offset='2'>
                <el-upload
                class="avatar-uploader"
                action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
                :show-file-list="false"
                :http-request='uploadImage'
                >
                <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" style="width:300px">
                <p>上传图片</p>
                </el-upload>
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
        email: null,
        photo: null
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
        this.$store.commit('changeUser', res)
        console.log(res)
      } catch (err) {
        this.$message.error = '更改用户信息失败'
      }
    },
    async uploadImage (e) {
      try {
        let formData = new FormData()
        formData.append('photo', e.file)
        const res = await this.$http({
          url: '/user/photo',
          method: 'patch',
          data: formData
        })
        this.userInfo.photo = res.photo
        this.$store.commit('changeUser', res)
        this.$message({
          type: 'success',
          message: '上传成功'
        })
      } catch (err) {
        this.$message.error = '上传图片失败'
      }
    }
  }
}
</script>
