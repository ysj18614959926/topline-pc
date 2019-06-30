<template>
  <el-menu :default-openeds="['1', '2']" router  background-color="#545c64" text-color="#fff">
    <el-menu-item index='/'>首页</el-menu-item>
    <el-submenu>
      <template slot="title">内容管理</template>
      <el-menu-item index="/publish">发布文章</el-menu-item>
      <el-menu-item index="/articals">内容列表</el-menu-item>
      <el-menu-item index="/comment">评论列表</el-menu-item>
      <el-menu-item index="/media">素材管理</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">粉丝管理</template>
      <el-menu-item index="3-1">图文数据</el-menu-item>
      <el-menu-item index="3-2">粉丝概况</el-menu-item>
      <el-menu-item index="3-2">粉丝画像</el-menu-item>
      <el-menu-item index="3-2">粉丝列表</el-menu-item>
    </el-submenu>
    <el-menu-item index='/user'>账户信息</el-menu-item>
  </el-menu>
</template>
<style scoped>
</style>
