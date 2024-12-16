<template>
  <div>
    <el-card>
      <!-- 去掉 icon="" 就有返回图标按钮了  -->
      <el-page-header
        content="编辑新闻"
        title="新闻管理"
        @back="handleBack"
      ></el-page-header>
    </el-card>
    <el-card class="box-card">
      <el-form
        ref="newsFormRef"
        style="max-width: 1200px"
        :model="newsForm"
        :rules="newsFormRules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="新闻标题" prop="title">
          <el-input v-model="newsForm.title" />
        </el-form-item>
        <el-form-item label="新闻内容" prop="content">
          <editor
            @update:valueHtml="handleHTMLChange"
            :content="newsForm.content"
          />
        </el-form-item>
        <el-form-item label="类别" prop="category">
          <el-select v-model="newsForm.category" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="封面" prop="cover">
          <Upload
            :avatar="newsForm.cover"
            @update:avatar="handleChange($event)"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Editor from '@/components/editor/Editor'
import Upload from '@/components/upload/Upload'
import { updateNewsApi } from '@/api/newsApi'
import { ElLoading, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { getNewsDetailApi } from '@/api/newsApi'
// import route from 'vue-router'
import { useRoute } from 'vue-router'

const route = useRoute()

const router = useRouter()

const newsFormRef = ref(null)
const newsForm = ref({
  _id: '',
  title: '',
  content: '',
  category: 1, //分类 1是最新动态 2是典型案例 3是通知公告
  cover: '', //封面图片 URL.createObjectURL(file.raw) file.raw是原始的未经处理的文件文件相关数据 file是经过处理的 添加了各种属性的文件对象比如name size type等
  file: null, //图片对应的文件对象
  isPublish: 0, //是否发布 0未发布 1已发布 发布了才能在前台官网显示
})
const newsFormRules = ref({
  title: [{ required: true, message: '请输入新闻标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入新闻内容', trigger: 'blur' }],
  category: [{ required: true, message: '请选择分类', trigger: 'change' }],
  cover: [{ required: true, message: '请上传封面图片', trigger: 'blur' }],
})
const options = [
  {
    label: '最新动态',
    value: 1,
  },
  {
    label: '典型案例',
    value: 2,
  },
  {
    label: '通知公告',
    value: 3,
  },
]
//每次editor内容改变的回调函数
const handleHTMLChange = newHTML => {
  //   console.log(newHTML)
  newsForm.value.content = newHTML
}
//新闻图片变动时的回调函数
const handleChange = cover => {
  newsForm.value.cover = URL.createObjectURL(cover)
  newsForm.value.file = cover
}
//提交表单按钮的回调函数
const submitForm = () => {
  newsFormRef.value.validate(async valid => {
    if (valid) {
      //   console.log(newsForm.value)
      //TODO 发送请求到后台保存修改后的新闻数据
      handleSubmit()
    } else {
      return false
    }
  })
}
// 定义状态变量
const isSubmitting = ref(false)
const loading = ref(false)
//发送表单的回调函数
const handleSubmit = async () => {
  // 防止重复提交
  if (isSubmitting.value) return
  try {
    // 显示加载状态
    isSubmitting.value = true
    // 显示加载提示
    loading.value = ElLoading.service({
      lock: true,
      text: '正在提交...',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    const params = new FormData()
    for (let i in newsForm.value) {
      params.append(i, newsForm.value[i])
    }
    const result = await updateNewsApi(params)
    // console.log(result)
    if (result.data.code === '1') {
      ElMessage({
        message: '提交成功',
        type: 'success',
        duration: 2000,
      })
      // 等待提示显示完成后再跳转
      setTimeout(() => {
        router.push('/news-manage/newslist')
      }, 1000)
    } else {
      // 失败提示
      ElMessage({
        message: result.data.message || '提交失败，请重试',
        type: 'error',
      })
    }
  } catch (error) {
    // 异常处理
    ElMessage({
      message: '系统异常，请稍后重试',
      type: 'error',
    })
    console.error('提交错误：', error)
  } finally {
    // 关闭加载提示
    loading.value.close()
    // 重置提交状态
    isSubmitting.value = false
  }
}
const handleBack = () => {
  router.back()
}
//取当前页面数据
onMounted(async () => {
  //   console.log(route.params.id)
  const result = await getNewsDetailApi(route.params.id)
  //   console.log(result) result.data.data是新闻数据
  if (result.data.code === '1') {
    newsForm.value = result.data.data
    console.log(newsForm.value)
  } else {
    ElMessage({
      message: result.data.message || '获取数据失败，请重试',
      type: 'error',
    })
  }
})
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 15px;
}
</style>
