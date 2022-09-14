import request from '@/utils/request'

export default {
    //课程条件查询
    getCourseList(page, limit, searchObj) {
        return request({
            url: `/eduservice/coursefront/getFrontCourseList/${page}/${limit}`,
            method: 'post',
            data:searchObj
        })
    },

    //查询所有分类
    getAllSubject() {
        return request({
            url:`/eduservice/subject/getAllSubject`,
            method:'get'
        })
    },

    //课程详情的方法
    getCourseInfo(courseId) {
        return request ({
            url: `/eduservice/coursefront/getFrontCourseInfo/${courseId}`,
            method:'get'
        })
    }
}