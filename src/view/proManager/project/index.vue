<template>
  <div class="container">
    <div class="header">
      首页 > 项目
      <div class="searchContent">
        <div class="searchProject">
          <el-input placeholder="项目名称" @change="nameSearch" v-model="projectName" clearable>
          </el-input>
          <!-- <a href="" @click.prevent="nameSearch"><i class="el-icon-search"></i></a> -->
        </div>
        <div class="selectChoose">
          <el-select v-model="projectStatus" @change="statusChange" clearable placeholder="目前状态">
            <el-option v-for="item in options12" :key="item.id" :label="item.text" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <!-- <el-button class="addProject" @click="jump('/home/projectAdd')" type="primary">新增项目</el-button> -->
      </div>
    </div>
    <div class="project-content">
      <div class="project-top">
        <div class="project-top-up">{{summary.projectStatusAll}}</div>
        <div class="project-top-under"><img src="../../../assets/project-statistics-slices/projectNumber.png">项目数量</div>
      </div>
       <div class="project-top">
        <div class="project-top-up">{{summary.projectStatusOne}}</div>
        <div class="project-top-under"><img src="../../../assets/project-statistics-slices/haveInHand.png"> 进行中</div>
      </div>
      <div class="project-top">
        <div class="project-top-up">{{summary.projectStatusTwo}}</div>
        <div class="project-top-under"><img src="../../../assets/project-statistics-slices/complete.png"> 已结项</div>
      </div>
      <div class="project-top">
        <div class="project-top-up">{{summary.projectStatusThree}}</div>
        <div class="project-top-under"><img src="../../../assets/project-statistics-slices/hangInTheAir.png"> 交付状态</div>
      </div>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}"  :data="projectsList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="projectBaseInfo.name" align="center" label="名称" style="width: 20%">
        </el-table-column>
        <el-table-column prop="projectBaseInfo.startTime" align="center" label="开始时间" style="width: 20%">
        </el-table-column>
        <el-table-column prop="projectBaseInfo.endTime" align="center" label="结束时间" style="width: 20%">
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
  // path: '/home/project' // 项目经理项目首页
  const SUCCESS_OK = '200'
  import { allProSummary, proProjectList } from '@/api/request'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        options12: [{
          "id": 1,
          "text": "进行中"
        },
        {
          "id": 2,
          "text": "已结项"
        },
        {
          "id": 3,
          "text": "已交付"
        }],
        summary: {},
        projectStatus: '',
        page: 1,
        size: 5,
        projectsList: [],
        status: {},
        totalElements: 10,
        projectName: ''
      }
    },
    watch: {},
    mounted() {
      this._allProSummary()
      this._proProjectList()
    },
    methods: {
      ...mapMutations(['projectId']),
      detailGo (item) {
        this.projectId(item.id)
        this.$router.push({path: '/home/projectDetail'})
      },
      // 获取头部所有项目的统计
      _allProSummary () {
        allProSummary().then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            // console.log(res.data)
            this.summary = res.data
          } else {
            this.MessageError(res.message)
          }
        })
      },
      // 获取项目列表
      _proProjectList () {
        const data = {
          page: this.page,
          size: this.size,
          name: this.projectName,
          status: this.projectStatus
        }
        proProjectList(data).then(res => {
          res = res.data
          console.log(res.data)
          if (res.state == SUCCESS_OK) {
            this.projectsList = res.data.rows
            this.totalElements = res.data.total
          } else {
            this.MessageError(res.message)
          }
        })
      },
      statusChange () {
        this.page = 1
        this._proProjectList()
      },
      nameSearch () {
        this.page = 1
        this._proProjectList()
      },
      jump (data) {
        this.$router.push(data)
      },
      handleCurrentChange() {
        // console.log(this.page)
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
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        box-shadow: 7px 12px 21px rgba(162, 160, 160, 0.05);
        .project-top-up {
          font-size: 60px;
          color: rgba(103, 103, 103, 1);
          height: 80px;
          line-height: 80px;
        }
        .project-top-under {
          font-size: 16px;
          color: rgba(171, 171, 171, 1);
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
    }
  }
</style>
