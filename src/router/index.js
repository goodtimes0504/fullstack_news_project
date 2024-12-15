import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/Login.vue";
import MainBox from "@/views/MainBox.vue";
import { constantRoutes, authRoutes, allRoutes } from "./config";
import { useUserStore } from "@/store/user";
import NotFound from "@/views/notfound/NotFound.vue";
// const userStore = useUserStore(); 直接用会报错 因为main.js还没加载完

// 基础路由配置，包含所有路由
const routes = [
  {
    path: "/",
    redirect: "/mainbox",
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/mainbox",
    name: "mainbox",
    component: MainBox,
    redirect: "/index",
    children: localStorage.getItem('userInfo').role === 1 ? constantRoutes : allRoutes
    // 直接添加所有子路由
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
// 重置路由方法
export function resetRouter() {
  // const newRouter = createRouter({
  //   history: createWebHashHistory(),
  //   routes: constantRoutes
  // })
  // router.matcher = newRouter.matcher
  //router 4已经不支持上面的方式了
  // 新办法- 删除所有动态添加的路由
  authRoutes.forEach(route => {
    if (router.hasRoute(route.name)) {
      router.removeRoute(route.name)
    }

  })
  console.log("重置路由成功", router.getRoutes());
}
// 添加权限路由的方法
export function addAuthRoutes() {
  // 1. 先删除mainbox下的404路由
  try {
    router.removeRoute('notFound')
  } catch (error) {
    console.warn('404路由不存在')
  }

  // 2. 添加权限路由到mainbox
  authRoutes.forEach(route => {
    try {
      router.addRoute('mainbox', route)
    } catch (error) {
      console.error(`添加路由失败: ${route.name}`, error)
    }
  })

  // 3. 重新添加404路由到mainbox
  router.addRoute('mainbox', {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFound
  })
}

router.beforeEach((to, from, next) => {
  // 白名单路径，不需要登录就可以访问
  const whiteList = ["/login"];
  const token = localStorage.getItem("token");
  if (token && to.path === "/login") {
    // 有token且访问登录页，重定向到首页
    next({
      path: "/index"
    });
  }
  else if (whiteList.includes(to.path)) {
    // 如果是白名单中的路径，直接放行
    next();
  } else if (!token) {
    // 没有token，重定向到登录页
    next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  } else {
    // 其他情况（有token且访问非登录页），正常放行
    next();
  }
});

export default router;
