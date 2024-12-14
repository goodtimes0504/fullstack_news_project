import axios from "axios";
import router from "@/router";
import { ElMessage } from "element-plus";

const getAxiosInstance = () => {
    // 添加一个变量来追踪是否正在跳转
    let isRedirecting = false;
    const instance = axios.create();

    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => {
            const { authorization } = response.headers;
            if (authorization) {
                localStorage.setItem("token", authorization);
            }
            return response;
        },
        //   当出现错误时（非2xx状态码或者其他请求相关错误），会调用第二个函数并传入error对象，在函数内部可以进行错误处理，如显示错误消息、记录错误日志等操作，最后返回Promise.reject(error)来继续传播这个错误，让调用链中的其他错误处理机制能够捕获到这个错误。
        (error) => {
            if (error.response?.status === 401 && !isRedirecting) {
                isRedirecting = true;
                localStorage.removeItem("token");
                ElMessage.error({
                    message: "登录已过期，请重新登录",
                    duration: 1000,
                    onClose: () => {
                        router
                            .replace({
                                path: "/login",
                                query: {
                                    redirect: router.currentRoute.value.fullPath,
                                },
                            })
                            .finally(() => {
                                isRedirecting = false;
                            });
                    },
                });
            }
            return Promise.reject(error);
        }
    );
    return instance;
}
export default getAxiosInstance();