<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import subject from "@/api/edu/subject";
export default {

  data() {
    return {
      filterText: '',
      data2: [], //表示返回的所有分类的数据
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },

  created() {
      this.getSubjectList()
  },

  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value) !== -1
    },
    getSubjectList() {
        subject.getSubjectList().then(response => {
            this.data2 = response.data.list
        })
    }
  }
}
</script>

