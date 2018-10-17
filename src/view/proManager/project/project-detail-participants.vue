<template>
  <div class="container">
    <el-button type="success" size="small" class="addStaff" @click="jump('/home/addStaff')">添加人员</el-button>
    <div class="project-table">
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}"  :data="staffList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" label="名称" style="width: 20%">
        </el-table-column>
        <el-table-column prop="number" align="center" label="工号" style="width: 20%">
        </el-table-column>
        <el-table-column prop="position" align="center" label="岗位" style="width: 20%">
        </el-table-column>
        <el-table-column prop="department" align="center" label="所属部门" style="width: 20%">
        </el-table-column>
        <el-table-column prop="positive" align="center" label="转正情况" style="width: 20%">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="project-paging">
      <el-pagination background layout="prev, pager, next" 
      :page-size="size" @current-change="handleCurrentChange"
      :current-page.sync="page"
      :total="totalElements">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        page: 1,
        size: 10,
        staffList: [1,2],
        totalElements: 10
      }
    },
    methods: {
      handleCurrentChange() {
        console.log(this.page)
      },
      del (item) {
        console.log(item)
      },
      jump (url) {
        this.$router.push(url)
      }
    }
  }
</script>
<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
    text-align: left;
    background: white;
    overflow: auto;
    padding: 0 0 20px 0px;
    .addStaff {
      float: right;
      margin: 0 20px 20px 0;
    }
    .project-table {
      padding: 30px 16px 0 16px;
    }
    .project-paging {
      text-align: center;
      padding: 10px 16px 0 16px;
    }
  }
</style>
