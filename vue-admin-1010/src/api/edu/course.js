import request from '@/utils/request'

export default {
    //1.课程分类列表
    addCourseInfo(courseInfo) {
        return request({
            url: '/eduservice/course/addCourseInfo',
            method: 'post',
            data:courseInfo
        })
    }, 

    //2 查询所有讲师
    getListTeacher() {
        return request({
            url: '/eduservice/teacher/findAll',
            method: 'get'
        })
    },

    //根据课程id查询基本信息
    getCourseInfoId(courseId) {
        return request({
            url: `/eduservice/course/getCourseInfo/${courseId}`,
            method: 'get'
        })
    },

    //修改课程信息
    updateCourseInfo(courseInfoVo) {
        return request({
            url: `/eduservice/course/updateCourseInfo`,
            method: 'post',
            data:courseInfoVo
        })
    },

    //根据查询课程信息终极版
    getCoursePublish(courseId) {
        return request({
            url: `/eduservice/course/getPublishCourseInfo/${courseId}`,
            method: 'get',
        })
    },

    //课程最终发布
    publishCourse(id) {
        return request({
            url: `/eduservice/course/publishCourse/${id}`,
            method: 'post',
        })
    },

    //条件查询分页
    getPageCourse(current,limit,courseQuery) {
        return request({
            url: `/eduservice/course/pageCourseCondition/${current}/${limit}`,
            method: 'post',
            data:courseQuery
        })
    },

    //课程列表查询
    getCourseList() {
        return request({
            url: `/eduservice/course/getCourseList`,
            method: 'get'
        })
    },

    //删除课程
    removeCourse(courseId) {
        return request({
            url: `/eduservice/course/removeCourseById/${courseId}`,
            method: 'delete'
        })
    }
}