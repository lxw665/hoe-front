<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目"
        ></el-input>
      </el-form-item>
      <!-- 所属分类 TODO -->

      <el-form-item label="课程分类">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="请选择"
          @change="subjectLevelOneChanged"
        >
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>

        <!--二级分类-->
        <el-select v-model="courseInfo.subjectId" placeholder="请选择">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <!-- 课程讲师 TODO -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="数"
        />
      </el-form-item>

      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description" />
      </el-form-item>

      <!-- 课程封面 TODO -->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API + '/eduoss/fileoss'"
          class="avatar-uploader"
        >
          <img :src="courseInfo.cover" />
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="dasdad"
        ></el-input-number>
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdata"
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from "@/api/edu/course";
import subject from "@/api/edu/subject";
import Tinymce from "@/components/Tinymce";
export default {
  components: { Tinymce },
  data() {
    return {
      saveBtnDisable: false,
      courseInfo: {
        title: "",
        subjectId: "",
        teacherId: "",
        lessonNum: 0,
        description: "",
        cover:
          "https://edu-66656.oss-cn-beijing.aliyuncs.com/2022/03/062f73d75119fd4c579bf102e99e4a79dbfile.png",
        price: 0,
        subjectParentId: "",
      },
      courseId: "",
      OSS_PATH: "https://edu-66656.oss-cn-beijing.aliyuncs.com/",
      BASE_API: process.env.BASE_API, // 接口API地址
      teacherList: [], //封装所有讲师
      subjectOneList: [], //一级分类
      subjectTwoList: [], //二级分类
    };
  },
  created() {
    //获取路由id值
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
      this.getInfo()
    } else {
      //初始化所有讲师
    this.getListTeacher();
    this.getOneSubject();
    }
    
  },
  methods: {
    //根据课程ID查询信息
    getInfo() {
      course.getCourseInfoId(this.courseId).then((response) => {
        this.courseInfo = response.data.courseInfoVo;
        //查询出所有分类
        subject.getSubjectList().then(response => {
          this.subjectOneList = response.data.list
          for(var i = 0; i < this.subjectOneList.length; i++) {
            var oneSubject = this.subjectOneList[i]
            if(this.courseInfo.subjectParentId == oneSubject.id) {
              this.subjectTwoList = oneSubject.children
            }

          }
        })
      });
    },
    //上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //上传成功
    handleAvatarSuccess(res, file) {
      this.courseInfo.cover = res.data.url;
    },

    //当点击一级分类 触发change显示对应的二级列表
    subjectLevelOneChanged(value) {
      this.courseInfo.subjectId = "";
      this.courseInfo.subjectParentId = value;

      //value就是一级分类的id值

      for (var i = 0; i < this.subjectOneList.length; i++) {
        var oneSubject = this.subjectOneList[i];
        if (value === oneSubject.id) {
          this.subjectTwoList = oneSubject.children;
        }
      }
    },

    //查询所有一级分类
    getOneSubject() {
      subject.getSubjectList().then((response) => {
        this.subjectOneList = response.data.list;
      });
    },

    //查询所有讲师
    getListTeacher() {
      course.getListTeacher().then((response) => {
        this.teacherList = response.data.item;
      });
    },

    addCourse() {
      course.addCourseInfo(this.courseInfo).then((response) => {
        //提示信息
        this.$message({
          type: "success",
          message: "添加课程信息成功",
        });
        //跳转到第二步
        this.$router.push({
          path: "/course/chapter/" + response.data.courseId,
        });
      });
    },

    updateCourse() {
      course.updateCourseInfo(this.courseInfo).then(response => {
        this.$message({
          type: "success",
          message: "修改信息成功",
        });
        this.$router.push({
          path: "/course/chapter/" + this.courseId,
        });
      })
    },

    saveOrUpdata() {
      if(!this.courseInfo.id) {
        this.addCourse()
      } else {
        this.updateCourse()
      }
    }


  },
};
</script>

<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>
