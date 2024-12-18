<template>
  <div>
    <vue-particles id="tsparticles" :options="configs" />
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
          <el-button :loading="loading" type="primary" @click="submitForm">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
// import axios from 'axios'
import { loginApi } from '@/api/userApi'
import { useUserStore } from '@/store/user'
// import { authRoutes } from '@/router/config.js'
import { addAuthRoutes } from '@/router/index.js'
import { loadFull } from 'tsparticles'

const particlesInit = async engine => {
  await loadFull(engine)
}
const particlesLoaded = async container => {
  console.log('Particles container loaded', container)
}

const userStore = useUserStore()
const loading = ref(false)
const router = useRouter()
const route = useRoute()

//登录表单绑定的响应式数据
const loginForm = ref({
  username: '',
  password: '',
})
//登录表单验证
const loginRules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' },
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
  loginFormRef.value.validate(valid => {
    if (valid) {
      handleLogin()
    } else {
      return
    }
  })
}

//模拟token
const handleLogin = async () => {
  // const result = await axios.post('/adminapi/user/login', loginForm.value)
  const result = await loginApi(loginForm.value)
  console.log(result) //result.data.code 或者 result.data.msg
  if (result.data.code === '1') {
    userStore.changeUserInfo(result.data.data) //将用户信息存储到store中
    loginFormRef.value.resetFields()
    // localStorage.setItem('token', '123')
    // 获取重定向地址，如果没有则默认跳转到 mainbox
    const redirect = route.query.redirect || '/mainbox'

    ElMessage({
      message: '登录成功',
      type: 'success',
    })
    loading.value = true

    // if (result.data?.data?.role === 1) {
    //   addAuthRoutes()
    //   // console.log(
    //   //   result.data.data.role,
    //   //   typeof result.data.data.role,
    //   //   '添加成功',
    //   //   router.getRoutes()
    //   // )
    //   // await removeAuthRoutes() //移除不需要的路由
    //   // console.log('移除不需要的路由 ')
    //   // // await addAuthRoutes() //添加需要的路由
    // }
    // setTimeout(() => {
    //   router.push(redirect)
    // }, 1000)
    try {
      router.push(redirect).catch(err => {
        console.error('路由跳转错误：', err)
      })
    } finally {
      loading.value = false
    }
  } else {
    return ElMessage({
      message: result.data.msg,
      type: 'error',
    })
  }
}
// const removeAuthRoutes = () => {
//   // 找出需要删除的路由
//   routesConfig.forEach(route => {
//     if (route.requireAuth) {
//       // 删除该路由
//       router.removeRoute(route.name)
//     }
//   })
// }
//配置tsparticles/vue3粒子背景
// const options = {
//   background: {
//     color: {
//       value: '#2d3a4b',
//     },
//   },
//   fpsLimit: 120,
//   interactivity: {
//     events: {
//       onClick: {
//         enable: true,
//         mode: 'push',
//       },
//       onHover: {
//         enable: true,
//         mode: 'repulse',
//       },
//     },
//     modes: {
//       bubble: {
//         distance: 400,
//         duration: 2,
//         opacity: 0.8,
//         size: 40,
//       },
//       push: {
//         quantity: 4,
//       },
//       repulse: {
//         distance: 200,
//         duration: 0.4,
//       },
//     },
//   },
//   particles: {
//     color: {
//       value: '#ffffff',
//     },
//     links: {
//       color: '#ffffff',
//       distance: 150,
//       enable: true,
//       opacity: 0.5,
//       width: 1,
//     },
//     move: {
//       direction: 'none',
//       enable: true,
//       outModes: 'bounce',
//       random: false,
//       speed: 6,
//       straight: false,
//     },
//     number: {
//       density: {
//         enable: true,
//       },
//       value: 80,
//     },
//     opacity: {
//       value: 0.5,
//     },
//     shape: {
//       type: 'circle',
//     },
//     size: {
//       value: { min: 1, max: 5 },
//     },
//   },
//   detectRetina: true,
// }

// const configs = {
//   particles: {
//     number: {
//       value: 80,
//     },
//     color: {
//       value: [
//         '#3998D0',
//         '#2EB6AF',
//         '#A9BD33',
//         '#FEC73B',
//         '#F89930',
//         '#F45623',
//         '#D62E32',
//         '#EB586E',
//         '#9952CF',
//       ],
//     },
//     shape: {
//       type: 'circle',
//     },
//     opacity: {
//       value: 1,
//     },
//     size: {
//       value: {
//         min: 10,
//         max: 15,
//       },
//     },
//     collisions: {
//       enable: true,
//       mode: 'bounce',
//     },
//     move: {
//       enable: true,
//       speed: 3,
//       outModes: 'bounce',
//     },
//   },
//   interactivity: {
//     events: {
//       onClick: {
//         enable: true,
//         mode: 'pop',
//       },
//     },
//   },
//   background: {
//     color: '#000000',
//   },
// }
const configs = {
  particles: {
    destroy: {
      mode: 'split',
      split: {
        count: 1,
        factor: {
          value: {
            min: 2,
            max: 4,
          },
        },
        rate: {
          value: 100,
        },
        particles: {
          life: {
            count: 1,
            duration: {
              value: {
                min: 2,
                max: 3,
              },
            },
          },
          move: {
            speed: {
              min: 10,
              max: 15,
            },
          },
        },
      },
    },
    number: {
      value: 80,
    },
    color: {
      value: [
        '#3998D0',
        '#2EB6AF',
        '#A9BD33',
        '#FEC73B',
        '#F89930',
        '#F45623',
        '#D62E32',
        '#EB586E',
        '#9952CF',
      ],
    },
    shape: {
      type: 'circle',
    },
    opacity: {
      value: 1,
    },
    size: {
      value: {
        min: 10,
        max: 15,
      },
    },
    collisions: {
      enable: true,
      mode: 'bounce',
    },
    move: {
      enable: true,
      speed: 3,
      outModes: 'bounce',
    },
  },
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'pop',
      },
    },
  },
  background: {
    color: '#000000',
  },
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
