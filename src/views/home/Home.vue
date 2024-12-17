<template>
  <div>
    <el-card>
      <el-page-header
        content="首页"
        icon=""
        title="企业门户网站管理系统"
      ></el-page-header>
    </el-card>

    <el-card class="box-card">
      <el-row>
        <el-col :span="4">
          <el-avatar :size="100" :src="avatarUrl" />
        </el-col>
        <el-col :span="20">
          <h3 style="line-height: 100px; margin-left: 20px">
            欢迎回来,{{ userStore.userInfo.username }}~{{ welcomeText }}
          </h3>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>公司产品</span>
        </div>
      </template>
      <el-carousel
        :interval="4000"
        type="card"
        height="500px"
        v-if="loopList.length"
      >
        <el-carousel-item
          v-for="item in loopList"
          :key="item._id"
          class="carousel-item"
        >
          <div class="carousel-item-container">
            <!-- <img :src="'http://localhost:3000' + item.cover" alt="图片描述" /> -->
            <img :src="`http://localhost:3000${item.cover}`" />
            <h3 text="2xl" justify="center">{{ item.title }}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useUserStore } from '@/store/user'
import { getProductListApi } from '@/api/productApi'
const userStore = useUserStore()
const loopList = ref([])
const avatarUrl = computed(() => {
  if (userStore.userInfo?.avatar) {
    return 'http://localhost:3000' + userStore.userInfo?.avatar
  } else
    return 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})
const welcomeText = computed(() => {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 12) {
    return '早上好'
  } else if (hour >= 12 && hour < 18) {
    return '下午好'
  } else {
    return '晚上好'
  }
})

onMounted(async () => {
  const res = await getProductListApi()
  // console.log(res.data)
  // tableData.value = res.data.data
  loopList.value = res.data.data
  console.log(loopList.value)
})
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 15px;
}
.el-carousel__item h3 {
  position: absolute;
  color: #fff;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.carousel-item-container {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
}
.carousel-item-container :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
// :deep(.carousel-item) {
//   height: 500px;
// }
</style>
