<template>
  <el-row>
    <el-col :span='20'>
      传智播客
    </el-col>
    <el-col :span='4'>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{userLogin}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>用户设置</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      userLogin: JSON.parse(window.localStorage.getItem('userLogin')).name
    }
  }
}

</script>
