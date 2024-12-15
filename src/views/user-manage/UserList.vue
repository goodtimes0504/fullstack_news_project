<template>
  <div>
    <el-card>
      <el-page-header
        content="用户列表"
        icon=""
        title="用户管理"
      ></el-page-header>
    </el-card>
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          prop="username"
          label="用户名"
          width="180"
          align="center"
        />
        <el-table-column label="头像" width="180" align="center">
          <template #default="scope">
            <div v-if="scope.row.avatar">
              <el-avatar
                :size="50"
                :src="'http://localhost:3000' + scope.row.avatar"
              ></el-avatar>
            </div>
            <div v-else>
              <el-avatar
                :size="50"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              >
              </el-avatar>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="角色" width="180" align="center">
          <template #default="scope">
            <!-- {{ scope.row.role === 1 ? '管理员' : '编辑' }} -->

            <el-tag v-if="scope.row.role === 1" type="danger">管理员</el-tag>
            <el-tag v-else type="success">编辑</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">
              编辑
            </el-button>

            <el-popconfirm
              title="你确定要删除吗"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button size="small" type="danger"> 删除 </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" title="编辑用户" width="30%">
      <el-form
        ref="userFormRef"
        style="max-width: 600px"
        :model="userForm"
        :rules="userFormRules"
        label-width="80px"
        class="user-edit-form"
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
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEditConfirm">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUserListApi } from '@/api/userApi'
import { updateUserApi, deleteUserApi } from '@/api/userApi'
import { ElMessage } from 'element-plus'
const tableData = ref([])
const dialogVisible = ref(false)
const userFormRef = ref(null)
const userForm = ref({
  _id: '',
  username: '',
  password: '',
  introduction: '',
  role: 2, //1管理员 2编辑
})
const userFormRules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' },
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  introduction: [{ required: true, message: '请输入简介', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }],
})
const options = [
  {
    value: 1,
    label: '管理员',
  },
  {
    value: 2,
    label: '编辑',
  },
]

onMounted(() => {
  getTableData()
})
const getTableData = async () => {
  const result = await getUserListApi()
  // console.log(result.data)
  tableData.value = result.data.data
}
const handleEdit = async row => {
  dialogVisible.value = true
  userForm.value = {
    _id: row._id,
    username: row.username,
    password: '',
    introduction: row.introduction,
    role: row.role, //1管理员 2编辑
  }
  // const result = await updateUserApi(row._id)

  // console.log(row)
}
//编辑确认按钮
const handleEditConfirm = async () => {
  userFormRef.value.validate(async valid => {
    if (valid) {
      console.log(userForm.value)
      const result = await updateUserApi(userForm.value)
      // const result = 1
      console.log(result)
      if (result.data?.code === '1') {
        ElMessage({
          type: 'success',
          message: '修改成功',
        })
        getTableData()
        dialogVisible.value = false
      } else {
        ElMessage({
          type: 'error',
          message: '修改失败',
        })
      }
    }
  })
}
const handleDelete = async row => {
  // console.log(row)
  const result = await deleteUserApi(row._id)
  console.log(result)
  if (result.data.code === '1') {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getTableData()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 15px;
}

:deep(.el-dialog) {
  .el-form {
    // padding: 0 20px;

    .el-form-item {
      margin-right: 30px;
    }
  }
}

// .user-edit-form {
//   :deep(.el-form-item) {
//     margin-right: 30px;

//     // 可以更具体地控制表单项
//     .el-input {
//       width: 100%;
//     }

//     .el-select {
//       width: 100%;
//     }
//   }
// }
</style>
