import axiosInstance from '../utils/axios.config.js';

//添加用户接口
export const addProductApi = (data) => {
    return axiosInstance.post('/adminapi/product/add', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
//获取商品列表接口
export const getProductListApi = () => {
    return axiosInstance.get('/adminapi/product/list')
}
export const deleteProductApi = (item) => {
    return axiosInstance.delete(`/adminapi/product/delete/${item._id}`)
}
export const getProductDetailApi = (id) => {
    return axiosInstance.get(`/adminapi/product/detail/${id}`)
}
export const updateProductApi = (data) => {
    return axiosInstance.put('/adminapi/product/update', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}