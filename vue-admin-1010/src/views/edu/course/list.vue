<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      border
      fit
      highlight-current-row
      element-loading-text="数据加载中"
    >
      <el-table-column prop="date" label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="课程名称" width="80">
      </el-table-column>
      <el-table-column label="发布状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === "Normal" ? "已发布" : "未发布" }}
        </template>
      </el-table-column>
      <el-table-column prop="lessonNum" label="课时数" width="200" />
      <el-table-column prop="gmtCreate" label="添加时间" width="300" />
      <el-table-column prop="viewCount" label="浏览数量" width="500" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/info/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >编辑课程基本信息</el-button
            >
          </router-link>
          <router-link :to="'/course/chapter/' + scope.row.id">
            <el-button type="info" size="mini" icon="el-icon-edit"
              >编辑课程大纲</el-button
            >
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeById(scope.row.id)"
            >课程删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      background
      layout="prev, pager, next,total,jumper"
      :total="total"
      :page-size="limit"
      style="padding: 30px 0; text-align: center"
      :current-page="page"
      @current-change="getList"
    >
    </el-pagination>
  </div>
</template>
    


<script>
//引入调用teacher.js文件
import course from "@/api/edu/course";

export default {
  //写核心代码的位置
  data() {
    //定义当前页面中使用的数据变量和初始值
    return {
      list: null, //查询之后给接口返回的数据装的集合
      page: 1, //当前页
      limit: 10, //每页显示记录数
      courseQuery: {}, //条件封装对象
      total: 0, //总记录数
    };
  },
  created() {
    //页面渲染之前执行，一般调用methods定义的方法
    this.getList();
  },
  methods: {
    
    //创建具体的方法，调用teacher.js定义的方法
    //讲师列表的方法
    getList(page = 1) {
      //不输入page就默认第一页
      this.page = page;
      course
        .getPageCourse(this.page, this.limit, this.courseQuery)
        .then((resp) => {
          //resp接口返回的数据
          this.list = resp.data.rows;
          this.total = resp.data.total;
        }) //请求成功
        .catch((err) => {
          console.log(err);
        }); //请求失败
    },
    resetData() {
      //清空表单数据
      this.courseQuery = {};
      //回退
      this.getList()
    },
    //删除课程方法
    removeById(courseId) {
      this.$confirm("此操作将永久删除该课程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          course
            .removeCourse(courseId).then((response) => {
              console.log(response);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getList(1);
            })
            .catch((error) => {
              alert("删除失败 ");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
          alert("删除失败了");
        });
    }
  },
};
</script>