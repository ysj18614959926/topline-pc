<template>
  <el-container>
    <el-aside width="200px">
      <layoutSlides></layoutSlides>
    </el-aside>
    <el-container>
      <el-header>
        <layoutHeader />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import layoutHeader from './components/header'
import layoutSlides from './components/slides'
export default {
  data () {
    return {
      name: 'layout'
    }
  },
  components: {
    layoutHeader,
    layoutSlides
  }
}
</script>
<style>
.el-container{
    height: 100%;
}
.el-aside {
  height: 100%;
  background-color: #323745;
}
</style>
