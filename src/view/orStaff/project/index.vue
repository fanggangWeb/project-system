<template>
  <div class="container">
    <div class="header">
      首页 > 项目
      <div class="searchContent">
        <div class="searchProject">
          <el-input placeholder="项目名称" v-model="projectName" clearable>
          </el-input>
          <a href="" @click.prevent="nameSearch"><i class="el-icon-search"></i></a>
        </div>
        <div class="selectChoose">
          <el-select v-model="projectStatus" clearable placeholder="目前状态">
            <el-option v-for="item in options12" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!-- <el-button class="addProject" @click="jump('/home/projectAdd')" type="primary">新增项目</el-button> -->
      </div>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}"  :data="projectsList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" label="项目名称" style="width: 20%">
        </el-table-column>
        <el-table-column prop="startTime" align="center" label="开始时间" style="width: 20%">
        </el-table-column>
        <el-table-column prop="endTime" align="center" label="结束时间" style="width: 20%">
        </el-table-column>
        <el-table-column prop="endTime" align="center" label="目前状态" style="width: 20%">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="detailGo(scope.row)">详情</el-button>
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
  let vm
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        options12: [{
          value: 'CONDUCTING',
          label: '进行中'
        }, {
          value: 'FINISH',
          label: '已完成'
        }, {
          value: 'NOT_FINISH',
          label: '未完成'
        }, {
          value: 'STOPPING',
          label: '暂停'
        }, {
          value: 'AUDITING',
          label: '审查中'
        }],
        projectStatus: null,
        options: [{
          value: 'CONDUCTING',
          label: '进行中'
        }, {
          value: 'FINISH',
          label: '已完成'
        }, {
          value: 'NOT_FINISH',
          label: '未完成'
        }],
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
        this.$router.push({path: '/home/orProjectDetail/'})
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
    background: #fafbfc;
    .header {
      height: 70px;
      line-height: 70px;
      background: #f4f6f7;
      font-size: 22px;
      color: #4d4d4d;
      padding-left: 30px;
      display: flex;
      justify-content: space-between;
      .searchContent {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        /*border: 1px solid;*/
        .searchProject {
          position: relative;
          .searchInput {
            width: 200px;
            height: 38px;
            vertical-align: middle;
            padding-left: 10px;
            border: 1px solid #cccccc;
            border-radius: 3px;
          }
          i {
            vertical-align: middle;
            position: absolute;
            top: 36%;
            right: 10px;
          }
        }
        .searchProject {
          width: 130px;
        }
        .selectChoose {
          width: 130px;
          margin-left: 30px;
          margin-right: 20px; 
        }
      }
      .not_current {
        color: #848484;
      }
      .current {
        color: #676767;
      }
      .addProject {
        width: 108px;
        height: 40px; // align-self: center;
        margin-left: 20px;
        margin-right: 54px;
        margin-top: 5px; // background-color: #45B68C;
        // cursor: pointer;
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
