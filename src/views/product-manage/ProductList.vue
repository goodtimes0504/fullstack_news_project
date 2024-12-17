<template>
  <div>
    <el-card>
      <el-page-header
        content="产品列表"
        icon=""
        title="产品管理"
      ></el-page-header>
    </el-card>
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%" v-if="!isEmpty">
        <el-table-column
          prop="title"
          label="产品名称"
          width="180"
          align="center"
        />
        <el-table-column
          prop="introduction"
          label="简要描述"
          width="180"
          align="center"
        />

        <el-table-column
          prop="editTime"
          label="更新时间"
          width="180"
          align="center"
        >
          <template #default="scope">
            {{ formatTime.getTime(scope.row.editTime) }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button
              type="success"
              @click="editProduct(scope.row)"
              :icon="Edit"
              circle
            ></el-button>
            <el-popconfirm
              title="你确定要删除吗"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="DelProduct(scope.row)"
            >
              <template #reference>
                <el-button type="danger" :icon="Delete" circle></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="empty" v-else>目前，目前暂无产品</div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProductListApi, deleteProductApi } from '../../api/productApi.js'
import formatTime from '../../utils/formatTime.js'
import { StarFilled, Edit, Delete, View } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
const isEmpty = ref(false)
const tableData = ref([])
const previewData = ref({})
const dialogVisible = ref(false)
onMounted(async () => {
  const res = await getProductListApi()
  // console.log(res.data)
  tableData.value = res.data.data
  if (res.data.data.length === 0) {
    isEmpty.value = true
  }
})

//删除新闻回调函数
const DelProduct = async item => {
  const res = await deleteProductApi(item)
  if (res.data.code === '1') {
    const result = await getProductListApi()
    tableData.value = result.data.data
    ElMessage({
      type: 'success',
      message: '删除成功!',
      duration: 1000,
    })
  } else {
    ElMessage({
      type: 'error',
      message: res.data.message,
      duration: 1000,
    })
  }
}
//编辑回调函数
const editProduct = item => {
  router.push(`/product-manage/editproduct/${item._id}`)

  console.log(item)
}
</script>

<style lang="scss" scoped>
.preview {
  h2 {
    font-size: 24px;
  }
  .editTime {
    font-size: 14px;
    color: #999;
  }
}
.htmlContent {
  :deep(img) {
    // width: 100%;
    max-width: 100%;
  }
  :deep(p) {
    text-indent: 0 !important;
  }
}
</style>
