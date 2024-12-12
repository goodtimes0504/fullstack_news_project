import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/Login.vue";
import MainBox from "@/views/MainBox.vue";
import routesConfig from "./config";
import { useUserStore } from "@/store/user";

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
    // mainbox的嵌套路由 后面会根据权限来动态添加
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.name === "login") {
    next();
  } else {
    if (!localStorage.getItem("token")) {
      next({
        path: "/login",
      });
    } else {
      if (!userStore.isGetterRouter) {
        configRouter(userStore);
        next({ path: to.fullPath });
      } else {
        next();
      }
    }
  }
});
const configRouter = (userStore) => {
  routesConfig.forEach((item) => {
    router.addRoute("mainbox", item);
  });

  userStore.changeGetterRouter(true);
};

export default router;
