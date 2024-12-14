<template>
  <el-aside width="auto">
    <el-menu
      :collapse="userStore.isCollapsed"
      :router="true"
      :default-active="route.path"
    >
      <el-menu-item index="/index">
        <el-icon><home-filled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/center">
        <el-icon><avatar /></el-icon>
        <span>个人中心</span>
      </el-menu-item>
      <el-sub-menu index="/user-manage">
        <template #title>
          <el-icon><UserFilled /></el-icon>
          <span>用户管理</span>
        </template>

        <el-menu-item index="/user-manage/adduser">添加用户</el-menu-item>
        <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/news-manage">
        <template #title>
          <el-icon><MessageBox /></el-icon>
          <span>新闻管理</span>
        </template>

        <el-menu-item index="/news-manage/addnews">添加新闻</el-menu-item>
        <el-menu-item index="/news-manage/newslist">新闻列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/product-manage">
        <template #title>
          <el-icon><Reading /></el-icon>
          <span>产品管理</span>
        </template>

        <el-menu-item index="/product-manage/addproduct">添加产品</el-menu-item>
        <el-menu-item index="/product-manage/productlist"
          >产品列表</el-menu-item
        >
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import {
  HomeFilled,
  Avatar,
  UserFilled,
  MessageBox,
  Reading,
  Pointer,
} from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user'
// useRoute函数返回的是一个表示当前路由信息的对象。这个对象包含了当前激活路由（active route）的各种参数，如路径参数（params）、查询参数（query）、路由元信息（meta）等。它主要用于在组件内部获取当前路由的状态相关信息。
import { useRoute } from 'vue-router'
const route = useRoute()
const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;
  .el-menu {
    height: 100vh;
  }
}
</style>
