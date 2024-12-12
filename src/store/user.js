import { defineStore } from 'pinia';
// 定义名为user的store
export const useUserStore = defineStore('user', {
    // state是一个函数，返回包含初始状态的对象
    state: () => ({
        isGetterRouter: false
    }),
    // getters用于派生状态，类似计算属性
    getters: {

    },
    // actions用于定义改变状态的方法，可包含异步操作
    actions: {
        changeGetterRouter(value) {
            this.isGetterRouter = value
        }
    }
});