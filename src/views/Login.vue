<template>
  <div>
    <vue-particles id="tsparticles" :options="options" />
    <div class="formContainer">
      <h3>企业门户网站管理系统</h3>
      <el-form
        ref="loginFormRef"
        style="max-width: 600px"
        :model="loginForm"
        status-icon
        :rules="loginRules"
        label-width="80px"
        class="loginForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm"> 登录 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
//登录表单绑定的响应式数据
const loginForm = ref({
  username: '',
  password: '',
})
//登录表单验证
const loginRules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
  ],
})
//登录表单引用
const loginFormRef = ref(null)

//登录方法
const submitForm = () => {
  // 因为上面是失去焦点之后才会验证，但是啥都不输入 直接点提交也可以提交 所以这里还需要手动验证
  loginFormRef.value.validate(valid => {
    if (valid) {
      handleLogin()
      loginFormRef.value.resetFields()
      router.push('/index')
    } else {
      //弹窗提醒
      // ElMessage({
      //   message: '请输入正确的用户名和密码',
      //   type: 'error',
      // })
      return
    }
  })
}

//模拟token
const handleLogin = () => {
  localStorage.setItem('token', '123')
}
//配置tsparticles/vue3粒子背景
const options = {
  background: {
    color: {
      value: '#2d3a4b',
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push',
      },
      onHover: {
        enable: true,
        mode: 'repulse',
      },
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: '#ffffff',
    },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: 'bounce',
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
}
</script>

<style lang="scss" scoped>
.formContainer {
  width: 500px;
  height: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba($color: #000000, $alpha: 0.5);
  color: white;
  text-align: center;
  padding: 20px;

  h3 {
    font-size: 30px;
  }
  .loginForm {
    margin-top: 20px;
  }
}
:deep(.el-form-item__label) {
  color: white;
}
</style>
