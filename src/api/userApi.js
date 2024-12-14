import axiosInstance from '../utils/axios.config.js';
//登录接口
export const loginApi = (data) => {
    return axiosInstance.post('/adminapi/user/login', data)
}
//上传用户信息接口
export const uploadUserInfoApi = (data) => {
    return axiosInstance.post('/adminapi/user/upload', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}




// 获取用户信息的接口函数
export const getUserInfo = () => {
    return axiosInstance.get('/api/user');
};

// 更新用户头像的接口，接收FormData类型的数据，使用POST请求
export const updateUserAvatar = (formData) => {
    return axiosInstance.post('/api/updateAvatar', formData);
};