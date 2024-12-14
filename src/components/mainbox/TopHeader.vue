<template>
  <el-header>
    <div class="left">
      <el-tooltip
        effect="dark"
        :content="userStore.isCollapsed ? '展开菜单' : '折叠菜单'"
        placement="bottom"
      >
        <el-icon @click="handleCollapsed">
          <Menu />
        </el-icon>
      </el-tooltip>
      <span class="title">企业门户网站管理系统</span>
    </div>
    <div class="right">
      <span
        >欢迎 <span>{{ userStore.userInfo.username }}</span> 回来</span
      >
      <el-dropdown trigger="hover">
        <span class="el-dropdown-link">
          <el-icon :size="30">
            <user />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleCommand('center')">
              个人中心
            </el-dropdown-item>
            <el-dropdown-item @click="handleCommand('logout')">
              退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
import { Menu, User } from '@element-plus/icons-vue'

const userStore = useUserStore()
const router = useRouter()

const handleCollapsed = () => {
  userStore.changeCollapsed()
}

const handleCommand = command => {
  if (command === 'center') {
    router.push('/center')
  } else if (command === 'logout') {
    localStorage.removeItem('token')
    // localStorage.removeItem('userInfo')// 清除用户信息 上下这俩都可以
    userStore.clearUserInfo()
    router.push('/login')
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #2d3a4b;
  color: white;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    .el-icon {
      font-size: 30px;
      margin: auto;
      cursor: pointer;
    }
    .title {
      font-size: 20px;
      font-weight: 700;
      margin-left: 10px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .el-dropdown {
      margin: auto 20px;
      color: white;
      cursor: pointer;
    }
  }
}
</style>
