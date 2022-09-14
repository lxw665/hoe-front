import request from '@/utils/request'

export default {
    //登陆
    submitLogin(userInfo) {
        return request({
            url: `/centerservice/member/login`,
            method: 'post',
            data:userInfo
        })
    },
    //根据token获取用户信息
    getLoginUserInfo() {
        return request({
            url: `/centerservice/member/getMemberInfo`,
            method: 'get'
        })
    }
}