<template>
  <div>
    <el-card
      ><el-page-header
        content="个人中心"
        icon=""
        title="企业门户网站管理系统"
      ></el-page-header
    ></el-card>

    <el-row :gutter="20" class="el-row">
      <el-col :span="8">
        <el-card class="box-card">
          <el-avatar :size="100" :src="avatarUrl" />
          <h3>{{ userStore.userInfo.username }}</h3>
          <h3>{{ userStore.userInfo.role === 1 ? '管理员' : '普通用户' }}</h3>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
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
            <el-form-item label="性别" prop="gender">
              <el-select v-model="userForm.gender" placeholder="Select">
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
              <el-button type="primary" @click="submitForm">添加用户</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'
import { computed } from 'vue'
import { ref } from 'vue'
import { uploadUserInfoApi } from '@/api/userApi'
import { ElMessage } from 'element-plus'
import Upload from '@/components/upload/Upload'
const userFormRef = ref({})
const userStore = useUserStore()
const avatarUrl = computed(() => {
  if (userStore.userInfo?.avatar) {
    return process.env.VUE_APP_BASE_URL + userStore.userInfo?.avatar
  } else
    return 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

const { username, gender, introduction, avatar } = userStore.userInfo

const userForm = ref({
  username,
  gender,
  introduction,
  avatar,
  file: null,
})
const userFormRules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' },
  ],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  introduction: [{ required: true, message: '请输入简介', trigger: 'blur' }],
  avatar: [{ required: true, message: '请上传头像', trigger: 'blur' }],
})
const options = [
  {
    label: '保密',
    value: 0,
  },
  {
    label: '男',
    value: 1,
  },
  {
    label: '女',
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
      // console.log(userForm.value)
    } else {
      return
    }
  })
}
//提交表单的回调函数
const handleSubmit = async () => {
  const params = new FormData()
  for (let i in userForm.value) {
    params.append(i, userForm.value[i])
  }
  const result = await uploadUserInfoApi(params)
  console.log(result)
  if (result.data.code === '1') {
    userStore.changeUserInfo(result.data.data)
    ElMessage({
      message: '修改成功',
      type: 'success',
    })
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-top: 20px;
  .box-card {
    text-align: center;
  }
}
</style>
