<template>
  <div>
    <el-card>
      <el-page-header
        content="编辑产品"
        @back="handleBack"
        title="产品管理"
      ></el-page-header>
    </el-card>
    <el-card class="box-card">
      <el-form
        ref="productFormRef"
        style="max-width: 600px"
        :model="productForm"
        :rules="productFormRules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="产品名称" prop="title">
          <el-input v-model="productForm.title" />
        </el-form-item>

        <el-form-item label="产品简要描述" prop="introduction">
          <el-input v-model="productForm.introduction" type="textarea" />
        </el-form-item>
        <el-form-item label="产品详情" prop="detail">
          <el-input v-model="productForm.detail" type="textarea" />
        </el-form-item>
        <el-form-item label="产品图片" prop="cover">
          <Upload
            :avatar="productForm.cover"
            @update:avatar="handleChange($event)"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">编辑产品</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Upload from '@/components/upload/Upload'
import {
  addProductApi,
  getProductDetailApi,
  updateProductApi,
} from '@/api/productApi'
import { useRouter } from 'vue-router'
import { ElMessage, ElLoading } from 'element-plus'

const router = useRouter()
const productFormRef = ref(null)
const productForm = ref({
  title: '',
  detail: '',
  introduction: '',
  cover: '',
  file: null,
})
const productFormRules = ref({
  title: [
    {
      required: true,
      message: '请输入产品名称',
      trigger: 'blur',
    },
  ],
  introduction: [
    {
      required: true,
      message: '请输入产品简要描述',
      trigger: 'blur',
    },
  ],
  detail: [
    {
      required: true,
      message: '请输入产品详情',
      trigger: 'blur',
    },
  ],
  cover: [
    {
      required: true,
      message: '请上传产品图片',
      trigger: 'blur',
    },
  ],
})
const handleBack = () => {
  router.back()
}
onMounted(async () => {
  const productId = router.currentRoute.value.params.id
  //   console.log(productId)
  // 根据产品ID获取产品详情
  const result = await getProductDetailApi(productId)
  if (result.data.code === '1') {
    productForm.value = result.data.data
  } else {
    ElMessage({
      message: result.data.message || '获取数据失败，请重试',
      type: 'error',
    })
  }
})

const handleChange = cover => {
  productForm.value.cover = URL.createObjectURL(cover)
  productForm.value.file = cover
}

//提交表单
const submitForm = () => {
  productFormRef.value.validate(valid => {
    if (valid) {
      handleSubmit()
    } else {
      return
    }
  })
}
// 定义状态变量
const isSubmitting = ref(false)
const loading = ref(false)
//提交表单的回调函数
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
    for (let i in productForm.value) {
      params.append(i, productForm.value[i])
    }
    const result = await updateProductApi(params)
    console.log(result)
    if (result.data.code === '1') {
      ElMessage({
        message: '提交成功',
        type: 'success',
        duration: 2000,
      })
      // 等待提示显示完成后再跳转
      setTimeout(() => {
        router.push('/product-manage/productlist')
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
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 15px;
}
</style>
