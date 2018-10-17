<template>
  <div class="container">
    <div class="project-content">
      <div class="project-top">
        <div class="project-top-up">100</div>
        <div class="project-top-under"><img style="margin-right:3px;" src="../../../assets/project-statistics-slices/projectNumber.png">领取任务</div>
      </div>
      <div class="project-top">
        <div class="project-top-up">100</div>
        <div class="project-top-under"><img src="../../../assets/project-statistics-slices/complete.png"> 完成数量</div>
      </div>
      <div class="project-top">
        <div class="project-top-up">100</div>
        <div class="project-top-under"><img src="../../../assets/project-statistics-slices/hangInTheAir.png"> 未完成</div>
      </div>
      <div class="project-top">
        <div class="project-top-up">100</div>
        <div class="project-top-under"><img src="../../../assets/project-statistics-slices/deadline.png"> 完成率</div>
      </div>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}"  :data="projectsList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" label="功能模块" style="width: 20%">
        </el-table-column>
        <el-table-column prop="name" label="功能">
        </el-table-column>
        <el-table-column prop="startTime" align="center" label="开始时间" style="width: 20%">
        </el-table-column>
        <el-table-column prop="endTime" align="center" label="结束时间" style="width: 20%">
        </el-table-column>
        <el-table-column prop="endTime" align="center" label="完成状态" style="width: 20%">
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
  let vm
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        page: 1,
        size: 10,
        projectsList: [1,2],
        status: {},
        totalElements: 10,
        projectName: ''
      }
    },
    watch: {},
    mounted() {},
    methods: {
      ...mapMutations(['projectId']),
      detailGo (item) {
        this.projectId(item)
        this.$router.push({path: '/home/projectDetail'})
      },
      nameSearch () {},
      jump (data) {
        this.$router.push(data)
      },
      handleCurrentChange() {
        console.log(this.page)
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
    text-align: left;
    overflow: auto;
    background: white;
    .project-content {
      padding: 10px 16px 0 16px;
      .project-top:not(:first-child) {
        margin-left: 2%;
      }
      .project-top {
        display: inline-block;
        text-align: center;
        width: 23.1%;
        height: 150px;
        background: white;
        border-radius: 4px;
        box-shadow: 7px 12px 21px rgba(162, 160, 160, 0.05);
        .project-top-up {
          font-size: 60px;
          color: rgba(103, 103, 103);
          line-height: 80px;
        }
        .project-top-under {
          font-size: 16px;
          color: rgb(171, 171, 171);
          line-height: 80px;
          img {
            position: relative;
            top: 1px;
          }
        }
      }
    }
    .project-table {
      padding: 30px 16px 0 16px;
    }
    .project-paging {
      text-align: center;
      padding: 10px 16px 0 16px;
    } // .addProject:hover{
    //   opacity: .85;
    //   transition: .2s;
    // }
  }
</style>
