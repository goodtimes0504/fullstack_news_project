<template>
  <el-container>
    <SideMenu />
    <el-container direction="vertical">
      <TopHeader />
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import SideMenu from '@/components/mainbox/SideMenu.vue'
import TopHeader from '@/components/mainbox/TopHeader.vue'
</script>

<style lang="scss" scoped></style>
