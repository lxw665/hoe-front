import request from '@/utils/request'

export default {
    //讲师分页查询
    getTeacherList(page, limit) {
        return request({
            url: `/eduservice/teacherfront/getTeacherFrontList/${page}/${limit}`,
            method: 'get',
        })
    },

    //讲师详情信息的方法
    getTeacherInfo(teacherId) {
        return request({
            url:`/eduservice/teacherfront/getTeacherInfo/${teacherId}`,
            method:'get'
        })
    }
}