<template>
  <div>
    <el-card>
      <el-page-header
        content="创建新闻"
        icon=""
        title="新闻管理"
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
          <editor @update:valueHtml="handleHTMLChange" />
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
          <el-button type="primary" @click="submitForm">添加新闻</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Editor from '@/components/editor/Editor'
import Upload from '@/components/upload/Upload'

const newsFormRef = ref(null)
const newsForm = ref({
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
  console.log(newHTML)
  newsForm.value.content = newHTML
}
//新闻图片变动时的回调函数
const handleChange = cover => {
  newsForm.value.cover = URL.createObjectURL(cover)
  newsForm.value.file = cover
}
//提交表单的回调函数
const submitForm = async () => {
  newsFormRef.value.validate(valid => {
    if (valid) {
      console.log(newsForm.value)
      //TODO 发送请求到后台保存新闻数据
    } else {
      return false
    }
  })
}
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 15px;
}
</style>
