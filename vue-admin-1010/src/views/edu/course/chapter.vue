<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="2"
      process-status="wait"
      align-center
      style="margin-
bottom: 40px;"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <el-button type="text" @click="openChapterDialog">添加章节</el-button>
    <!-- 章节 -->
    <ul class="chanpterList">
      <li v-for="chapter in chapterVideoList" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button type="text" @click="openVideo(chapter.id)"
              >添加小节</el-button
            >
            <el-button style="" type="text" @click="openEditChatper(chapter.id)"
              >编辑</el-button
            >

            <el-button type="text" @click="removeChapterById(chapter.id)"
              >删除</el-button
            >
          </span>
        </p>
        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>
              {{ video.title }}
              <span class="acts">
                <el-button
                  style=""
                  type="text"
                  @click="openUpdateVideo(video.id)"
                  >编辑小节</el-button
                >

                <el-button type="text" @click="removeVideo(video.id)"
                  >删除</el-button
                >
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>

    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
        >下一步</el-button
      >
    </div>

    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title" />
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number
            v-model="chapter.sort"
            :min="0"
            controls-
            position="right"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加小节">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title" />
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number
            v-model="video.sort"
            :min="0"
            controls-
            position="right"
          />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.isfree">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <!-- TODO -->
          <el-upload
            :on-success="handleVodUploadSuccess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="BASE_API + '/eduvod/video/uploadAlyVideo'"
            :limit="1"
            class="upload-demo"
          >
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">
                最大支持1G，<br />
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br />
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br />
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br />
                SWF、TS、VOB、WMV、WEBM 等视频格式上传
              </div>
              <i class="el-icon-question" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button
          :disabled="saveVideoBtnDisabled"
          type="primary"
          @click="saveOrUpdateVideo"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

  <script>
import chapter from "@/api/edu/chapter";
import video from "@/api/edu/video";
export default {
  data() {
    return {
      saveBtnDisable: false,
      courseId: "",
      chapterVideoList: [],
      chapter: {
        //
      },
      video: {
        videoOriginalName: "", //视频名称
        videoSourceId:""
      },
      dialogChapterFormVisible: false,
      dialogVideoFormVisible: false,
      fileList: [],//上传文件列表
      BASE_API: process.env.BASE_API // 接口API地址
    };
  },
  created() {
    //获取路由中的id值
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
      this.getChapterVideo();
    }
  },
  methods: {
    //上传视频成功调用的方法
    handleVodUploadSuccess(response, file, fileList) {
      this.video.videoSourceId = response.data.videoId;
      this.video.videoOriginalName = file.name;
    },
    headleUploadExceed() {
      this.$message.warning('想要重新上传视频，请先删除已上传的视频！')
    },

    //*********************************小节操作************************************************** */

    //修改小节  这个功能没做
    openUpdateVideo(videoId) {
      this.video.chapterId = this.chapterId;

      this.dialogVideoFormVisible = true;
    },

    updateVideo() {
      video.addVideoInfo(this.video).then((response) => {
        this.dialogVideoFormVisible = false;
        this.$message({
          type: "success",
          message: "修改小节成功!",
        });
        this.getChapterVideo();
      });
    },

    //删除小节
    removeVideo(videoId) {
      this.$confirm("此操作将永久删除小节信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //点击确定，执行then方法
        video.deleteVideo(videoId).then((resp) => {
          //删除成功
          //提示信息
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //刷新页面
          this.getChapterVideo();
        });
      });
    },

    openVideo(chapterId) {
      this.video = {};
      this.dialogVideoFormVisible = true;
      //设置章节id
      this.video.chapterId = chapterId;
    },

    //添加小节
    addVideo() {
      //设置课程id
      this.video.courseId = this.courseId;
      video.addVideoInfo(this.video).then((response) => {
        this.dialogVideoFormVisible = false;
        this.$message({
          type: "success",
          message: "添加小节成功!",
        });
        this.getChapterVideo();
      });
    },

    saveOrUpdateVideo() {
      this.addVideo();
    },

    //***********************************章节操作*************************************************************** */

    removeChapterById(chapterId) {
      this.$confirm("此操作将永久此章节, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          chapter
            .deleteChapter(chapterId)
            .then((response) => {
              console.log(response);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getChapterVideo();
            })
            .catch((error) => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //修改章节弹框数据回显
    openEditChatper(chapterId) {
      this.dialogChapterFormVisible = true;
      chapter.getChapter(chapterId).then((response) => {
        this.chapter = response.data.chapter;
      });
    },

    openChapterDialog() {
      this.dialogChapterFormVisible = true;
      this.chapter.title = "";
      this.chapter.sort = 0;
    },
    //添加
    addChapter() {
      this.chapter.courseId = this.courseId;
      chapter.addChapter(this.chapter).then((response) => {
        //关闭弹窗
        this.dialogChapterFormVisible = false;
        //提示信息
        this.$message({
          type: "success",
          message: "添加章节成功！",
        });
        //刷新页面
        this.getChapterVideo();
      });
    },

    updateChapter() {
      chapter.updateChapter(this.chapter).then((response) => {
        this.dialogChapterFormVisible = false;
        this.$message({
          type: "success",
          message: "修改成功！",
        });
        this.getChapterVideo();
      });
    },
    //添加或修改章节
    saveOrUpdate() {
      if (!this.chapter.id) {
        this.addChapter();
      } else {
        this.updateChapter();
      }
    },

    //查询章节和小节
    getChapterVideo() {
      chapter.getAllChapterVideo(this.courseId).then((response) => {
        this.chapterVideoList = response.data.allChapterVideo;
      });
    },

    previous() {
      //跳转到上一步
      this.$router.push({ path: "/course/info/" + this.courseId });
    },
    next() {
      //跳转到下一步
      this.$router.push({ path: "/course/publish/" + this.courseId });
    },
  },
};
</script>


<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li {
  position: relative;
}
.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.chanpterList .acts {
  float: right;
  font-size: 14px;
}
.videoList {
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd;
}
</style>