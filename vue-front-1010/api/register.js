import request from '@/utils/request'

export default {
    //根据手机号码发送短信
    sendCode(mobile) {
        return request({
            url: `/edumsm/message/sendMsm/${mobile}`,
            method: 'get'
        })
    },

    registerMember(formItem) {
        return request({
            url: `/centerservice/member/register`,
            method: 'post',
            data:formItem
        })
    }
}