import axiosInstance from '../utils/axios.config.js';
export const addNewsApi = (data) => {
    return axiosInstance.post('/adminapi/news/add', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
export const getNewsListApi = () => {
    return axiosInstance.get('/adminapi/news/list')
}

export const updateNewsStatusApi = (item) => {
    return axiosInstance.put('/adminapi/news/publish', {
        _id: item._id,
        isPublish: item.isPublish
    })
}
export const deleteNewsApi = (item) => {
    return axiosInstance.delete(`/adminapi/news/delete/${item._id}`,)
}
export const getNewsDetailApi = (id) => {
    return axiosInstance.get(`/adminapi/news/detail/${id}`)
}
export const updateNewsApi = (data) => {
    return axiosInstance.put('/adminapi/news/update', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}