<template>
  <el-menu :default-openeds="['1', '2']">
    <el-menu-item index=1>首页</el-menu-item>
    <el-submenu index="2">
      <template slot="title">内容管理</template>
      <el-menu-item index="2-1">发布文章</el-menu-item>
      <el-menu-item index="2-2">内容列表</el-menu-item>
      <el-menu-item index="2-2">评论列表</el-menu-item>
      <el-menu-item index="2-2">素材管理</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">粉丝管理</template>
      <el-menu-item index="3-1">图文数据</el-menu-item>
      <el-menu-item index="3-2">粉丝概况</el-menu-item>
      <el-menu-item index="3-2">粉丝画像</el-menu-item>
      <el-menu-item index="3-2">粉丝列表</el-menu-item>
    </el-submenu>
    <el-menu-item index='4'>账户信息</el-menu-item>
  </el-menu>
</template>
<style scoped>
</style>
