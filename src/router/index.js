import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/Login.vue";
import MainBox from "@/views/MainBox.vue";
import routesConfig from "./config";
import { useUserStore } from "@/store/user";

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
    children: routesConfig, // 直接添加所有子路由
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 路由守卫只负责权限控制
router.beforeEach((to, from, next) => {
  // 白名单路径，不需要登录就可以访问
  const whiteList = ["/login"];

  if (whiteList.includes(to.path)) {
    next();
  } else {
    // 检查是否有 token
    const token = localStorage.getItem("token");
    if (!token) {
      // 没有 token，重定向到登录页
      next({
        path: "/login",
        query: { redirect: to.fullPath }, // 保存原目标路径
      });
    } else {
      // 有 token，允许访问
      next();
    }
  }
});

export default router;
