<template>
  <div class="second-container">
    <div class="header">
      <el-input class="addPlan" size="small" placeholder="项目名称" clearable @change="nameSearch"  v-model="projectName">
      </el-input>
      <el-select v-model="projectStatus" style="margin:0 16px 0 20px; width:140px;" @change="nameSearch" size="small" clearable placeholder="目前状态">
        <el-option v-for="item in options12" :key="item.id" :label="item.text" :value="item.id">
        </el-option>
      </el-select>
      <!-- <el-input size="small" placeholder="负责人名称" clearable style="margin-left:20px;" @change="nameSearch" v-model="principalName">
      </el-input>
      <el-input size="small" placeholder="任务名称" clearable style="margin: 0 16px 0 20px;" @change="nameSearch" v-model="taskName">
      </el-input> -->
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
        <el-table-column prop="projectStatus.text" align="center" label="状态" style="width: 20%">
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
  import { proProjectList } from '@/api/request'
  const SUCCESS_OK = '200'
  export default {
    name: "projectDetails",
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
        projectStatus: '',
        projectName: '',
        principalName: '',
        taskName: '',
        projectsList: [],
        page: 1,
        size: 9,
        totalElements: 0
      }
    },
    computed: {
      ...mapGetters([])
    },
    watch: {
    },
    mounted() {
      vm = this
      this._proProjectList()
    },
    methods: {
      ...mapMutations(['projectId']),
      nameSearch () {
        this.page = 1
        this._proProjectList()
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
          // console.log(res.data)
          if (res.state == SUCCESS_OK) {
            this.projectsList = res.data.rows
            this.totalElements = res.data.total
          } else {
            this.MessageError(res.message)
          }
        })
      },
      handleCurrentChange() {
        this._proProjectList()
      },
      // 获取下载模板
      downTem() {
      },
      detailGo (item) {
        this.$router.push('/home/daytaskDetail')
        this.projectId(item.id)
      },
    },
    destroyed() {
    }
  }
</script>

<style lang="less" scoped>
  .second-container {
    width: 100%;
    height: 100%;
    text-align: left;
    overflow: auto;
    background-color: white;
    padding: 0 20px 20px 20px;
    box-sizing: border-box;
    .header {
      height: 60px;
      line-height: 60px;
      background: white;
      font-size: 22px;
      color: #4d4d4d;
      padding-left: 30px;
      display: flex;
      align-items: center;
      a {
        color: #4d4d4d;
      }
      .addPlan {
        margin-left: auto;
      }
    }
    .project-table {
      padding: 0px 16px 0 16px;
    }
    .project-paging {
      text-align: center;
      padding: 10px 16px 0 16px;
    }
    .hidenBtn:hover {
      opacity: .85;
      transition: .2s;
    }
  }
</style>
<style lang="less" scoped>
  .hidenBtn.el-button {
    width: 108px;
    height: 40px;
    background: #45B68C;
    color: #fff;
    span {
      color: #fff;
    }
  }
  .el-input {
    width: 128px !important;
  }
</style>
