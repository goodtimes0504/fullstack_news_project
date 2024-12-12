import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/Login.vue";
import MainBox from "@/views/MainBox.vue";
import routesConfig from "./config";
import { useUserStore } from "@/store/user";

// 创建路由之前，先检查是否需要添加动态路由
const token = localStorage.getItem("token");
const routes = [
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
    children: token ? routesConfig : [], // 如果有 token，直接添加动态路由
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.name === "login") {
    next();
  } else {
    if (!localStorage.getItem("token")) {
      next({
        path: "/login",
      });
    } else {
      next();
    }
  }
});

export default router;
