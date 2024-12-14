import { defineStore } from "pinia";
// 定义名为user的store
export const useUserStore = defineStore("user", {
    // state是一个函数，返回包含初始状态的对象
    state: () => ({
        isGetterRouter: false,
        isCollapsed: true,
        userInfo: {}
    }),
    // getters用于派生状态，类似计算属性
    getters: {},
    // actions用于定义改变状态的方法，可包含异步操作
    actions: {
        changeGetterRouter(value) {
            this.isGetterRouter = value;
        },
        changeCollapsed() {
            this.isCollapsed = !this.isCollapsed;
        },
        changeUserInfo(value) {
            this.userInfo = {
                ...this.userInfo,
                ...value
            };
        },
        clearUserInfo() {
            this.userInfo = {};
        }
    },
    // 添加持久化配置
    persist: {
        enabled: true,
        strategies: [
            {
                key: "customized", // 存储的 key
                storage: localStorage, // 存储方式
                paths: ["isCollapsed"], // 需要持久化的状态
            },
            {
                key: "userInfo", // 存储的 key
                storage: localStorage, // 存储方式
                paths: ["userInfo"], // 需要持久化的状态
            },
        ],
    },
});
