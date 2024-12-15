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
//添加用户接口
export const addUserApi = (data) => {
    return axiosInstance.post('/adminapi/user/add', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
//获取用户列表接口
export const getUserListApi = () => {
    return axiosInstance.get('/adminapi/user/list')
}
//删除用户接口
export const deleteUserApi = (id) => {
    return axiosInstance.delete(`/adminapi/user/delete/${id}`)
}
//修改用户接口
export const updateUserApi = (data) => {
    return axiosInstance.put(`/adminapi/user/update/${data._id}`, data)
}




// 获取用户信息的接口函数
export const getUserInfo = () => {
    return axiosInstance.get('/api/user');
};

// 更新用户头像的接口，接收FormData类型的数据，使用POST请求
export const updateUserAvatar = (formData) => {
    return axiosInstance.post('/api/updateAvatar', formData);
};