import moment from 'moment'
moment.locale('zh-cn')
// 格式化时间

const formatTime = {
    getTime: function (date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
}

export default formatTime