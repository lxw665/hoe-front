import request from '@/utils/request'

export default {
    //添加小节
    addVideoInfo(eduVideo) {
        return request({
            url: '/eduservice/video/addVideo',
            method: 'post',
            data:eduVideo
        })
    },

    //根据id查询章节
    getChapter(chapterId) {
        return request({
            url: `/eduservice/chapter/getChapterInfo/${chapterId}`,
            method: 'get',
        })
    },
    //修改章节
    updateVideo(video) {
        return request({
            url: `/eduservice/video/updateVideo`,
            method: 'post',
            data:video
        })
    },

    //删除章节
    deleteVideo(Id) {
        return request({
            url: `/eduservice/video/${Id}`,
            method: 'delete',
        })
    },
}