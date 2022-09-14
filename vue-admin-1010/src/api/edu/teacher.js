import request from '@/utils/request'

export default {
    //1 讲师列表（条件查询带分页）

    getTeacherListPage(current, limit, teacherQuery) {
        return request({
            url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            //data表示把对象转换成json 因为后端使用了@RequestBoby需要
            data: teacherQuery
        })
    },

    // 删除讲师

    deleteById(teacherId) {
        return request({
            url: `/eduservice/teacher/deleteTeacherById/${teacherId}`,
            method: 'delete',
        })
    },

    //添加讲师
    addTeacher(teacher) {
        return request({
            url: `/eduservice/teacher/addTeacher`,
            method: 'post',
            data:teacher
        })
    },

    //根据id查讲师信息
    getTeacherInfo(teacherId) {
        return request({
            url: `/eduservice/teacher/selectTeacherById/${teacherId}`,
            method: 'get',
        })
    },

    //修改讲师
    updateTeacherInfo(teacher) {
        return request({
            url: `/eduservice/teacher/updateTeacher`,
            method: 'post',
            data:teacher
        })
    }
}