import request from '@/utils/request'
export default {
    //查询前两条banner信息
    getIndexData() {
        return request({
            url: `/eduservice/indexfront/index`,
            method: 'get'
        })
    }
}