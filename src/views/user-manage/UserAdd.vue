<template>
  <div>
    <el-card>
      <el-page-header
        content="添加用户"
        icon=""
        title="用户管理"
      ></el-page-header>
    </el-card>
    <el-card class="box-card">
      <el-form
        ref="userFormRef"
        style="max-width: 600px"
        :model="userForm"
        :rules="userFormRules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password" type="password" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userForm.role" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="个人简介" prop="introduction">
          <el-input v-model="userForm.introduction" type="textarea" />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <Upload
            :avatar="userForm.avatar"
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
import { ref } from 'vue'
import Upload from '@/components/upload/Upload'
import { addUserApi } from '@/api/userApi'
import { useRouter } from 'vue-router'
import { ElMessage, ElLoading } from 'element-plus'

const router = useRouter()
const userFormRef = ref(null)
const userForm = ref({
  username: '',
  password: '',
  role: 2, //1是管理员 2是编辑
  introduction: '',
  avatar: '',
  file: null,
  gender: 0, //保密
})
const userFormRules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }],
  introduction: [{ required: true, message: '请输入简介', trigger: 'blur' }],
  avatar: [{ required: true, message: '请选择头像', trigger: 'change' }],
  file: [{ required: true, message: '请选择文件', trigger: 'change' }],
})
const options = [
  {
    label: '管理员',
    value: 1,
  },
  {
    label: '编辑',
    value: 2,
  },
]
//头像变动时的回调函数
const handleChange = avatar => {
  userForm.value.avatar = URL.createObjectURL(avatar)
  userForm.value.file = avatar
}

//提交表单
const submitForm = () => {
  userFormRef.value.validate(valid => {
    if (valid) {
      handleSubmit()
      console.log(userForm.value)
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
    for (let i in userForm.value) {
      params.append(i, userForm.value[i])
    }
    const result = await addUserApi(params)
    console.log(result)
    if (result.data.code === '1') {
      ElMessage({
        message: '提交成功',
        type: 'success',
        duration: 2000,
      })
      // 等待提示显示完成后再跳转
      setTimeout(() => {
        router.push('/user-manage/userlist')
      }, 1000)
    } else if (result.data.code === 11000) {
      ElMessage({
        message: '用户名已存在',
        type: 'error',
        duration: 2000,
      })
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
