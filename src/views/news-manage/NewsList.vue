<template>
  <div>
    <el-card>
      <el-page-header
        content="新闻列表"
        icon=""
        title="新闻管理"
      ></el-page-header>
    </el-card>
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          prop="title"
          label="新闻标题"
          width="180"
          align="center"
        />
        <el-table-column
          prop="category"
          label="新闻分类"
          width="180"
          align="center"
        >
          <template #default="scope">
            {{ categoryFormat(scope.row.category) }}
          </template>
        </el-table-column>
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
        <el-table-column
          prop="isPublish"
          label="是否发布"
          width="180"
          align="center"
        >
          <template #default="scope">
            <el-switch
              v-model="scope.row.isPublish"
              :active-value="1"
              :inactive-value="0"
              @change="handleSwitch(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button
              @click="handlePreview(scope.row)"
              circle
              :icon="View"
              type="success"
            ></el-button>
            <el-button
              type="success"
              @click="editNews(scope.row)"
              :icon="Edit"
              circle
            ></el-button>
            <el-popconfirm
              title="你确定要删除吗"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="DelNews(scope.row)"
            >
              <template #reference>
                <el-button type="danger" :icon="Delete" circle></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" title="预览新闻" width="60%">
      <div class="preview">
        <h2>{{ previewData.title }}</h2>
        <div class="editTime">
          {{ formatTime.getTime(previewData.editTime) }}
        </div>
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <div class="content">
          <!-- 此处用v-html必须很信任客户才行 否则会遭到跨站脚本的攻击 -->
          <div v-html="previewData.content" class="htmlContent"></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  getNewsListApi,
  updateNewsStatusApi,
  deleteNewsApi,
} from '../../api/newsApi.js'
import formatTime from '../../utils/formatTime.js'
import { StarFilled, Edit, Delete, View } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()

const tableData = ref([])
const previewData = ref({})
const dialogVisible = ref(false)
onMounted(async () => {
  const res = await getNewsListApi()
  // console.log(res.data)
  tableData.value = res.data.data
  // //动态创建路由
  // router.addRoute('mainbox', {
  //   path: '/news-manage/editnews/:id',
  //   name: 'editnews',
  //   component: () => import('@/views/news-manage/NewsEdit.vue'),
  // })
})
const categoryFormat = category => {
  switch (category) {
    case 1:
      return '最新动态'
    case 2:
      return '典型案例'
    case 3:
      return '通知公告'
    default:
      return ''
  }
}
// 发布状态的切换
const handleSwitch = async item => {
  await updateNewsStatusApi(item)
  const result = await getNewsListApi()
  tableData.value = result.data.data
}
//预览回调函数
const handlePreview = item => {
  previewData.value = item
  dialogVisible.value = true
}
//删除新闻回调函数
const DelNews = async item => {
  await deleteNewsApi(item)
  const result = await getNewsListApi()
  tableData.value = result.data.data
  ElMessage({
    type: 'success',
    message: '删除成功!',
    duration: 1000,
  })
}
//编辑回调函数
const editNews = item => {
  //跳转到/news-manage/editnews/:id
  //跳转到/news-manage/editnews/:id
  router.push(`/news-manage/editnews/${item._id}`)

  // console.log(item)
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
