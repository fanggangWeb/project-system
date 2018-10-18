<template>
  <div class="second-container">
    <!-- <div class="header">
      <el-input class="addPlan" size="small" placeholder="人员搜索" style="margin-right:10px" v-model="personName">
      </el-input>
      <el-select  style="margin-right:10px" size="small" v-model="job" clearable placeholder="岗位筛选">
        <el-option v-for="(item, index) in jobList" :key="index" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </div> -->
    <div class="project-table">
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}" @selection-change="handleSelectionChange" :data="taskList" :stripe="true" style="width: 100%">
        <el-table-column prop="name" type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="job" label="所属项目" style="width: 20%">
        </el-table-column>
        <el-table-column prop="salary" label="功能模块" style="width: 20%">
        </el-table-column>
        <!-- <el-table-column prop="zhuanzheng" label="描述" style="width: 20%">
        </el-table-column> -->
        <el-table-column prop="startTime" align="center" label="发布时间" style="width: 20%">
        </el-table-column>
        <el-table-column prop="finish" align="center" label="子任务" style="width: 20%">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="detailGo(scope.row)">详情</el-button>
            <!-- <el-button type="success" size="small" @click="receive(scope.row)">领取</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="详情" :visible.sync="showState" width="60%" :close-on-click-modal="false" center>
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}" @selection-change="handleSelectionChange" :data="moduleList" :stripe="true" style="width: 100%">
        <el-table-column type="selection" align="center" width="50">
        </el-table-column>
        <el-table-column prop="name" type="index" label="序号" style="width: 20%">
        </el-table-column>
        <el-table-column prop="job" label="功能模块" style="width: 20%">
        </el-table-column>
        <el-table-column prop="salary" label="负责人" style="width: 20%">
        </el-table-column>
        <el-table-column prop="zhuanzheng" label="描述" style="width: 20%">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="receiveOne(scope.row)">领取</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="receiveAll">领 取</el-button>
          <el-button @click="showState = false">取 消</el-button>
        </span>
    </el-dialog>
    <div class="project-paging">
      <!-- <el-button type="success" size="small">领取</el-button> -->
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
  import { groupMemberList } from '@/api/request'
  export default {
    data() {
      return {
        jobList: [],
        job: '',
        personName: '',
        otherUsers: [],
        showState: false,
        userId: '',
        taskList: [1,2], // 任务列表
        moduleList: [1,2,3],
        moduleState: false,
        downUrl: '',
        page: 1,
        size: 10,
        totalElements: 10,
        chooseModule: []
      }
    },
    computed: {
      ...mapGetters([])
    },
    mounted() {
      vm = this
    },
    methods: {
      ...mapMutations([]),
      handleCurrentChange() {
        console.log(this.page)
      },
      // 获取下载模板
      downTem() {
      },
      dataParams() {
        return {
          projectsId: this.getprojectId
        }
      },
      handleSelectionChange(val) {
        // console.log(val)
        this.chooseModule = val
      },
      detailGo (item) {
        this.showState = true
        // this.$router.push('/home/staffDetail')
      },
      receiveOne () {},
      receiveAll (item) {
        if (this.chooseModule.length > 0) {

        } else {
          this.MessageError('请选取要领取的功能模块')
        }
      },
      jump(url, id) {
        vm.$router.push(url)
        vm.currentSelect = id
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .el-input {
    width: 140px !important;
  }
  .second-container {
    width: 100%;
    height: 100%;
    text-align: left;
    overflow: auto;
    background-color: white;
    .header {
      height: 70px;
      line-height: 70px;
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
      .addCate {
        margin-right: 36px;
      }
    }
    .project-table {
      padding: 20px 20px 0 20px;
    }
    .project-paging {
      // text-align: center;
      .el-button{
        float: left;
      }
      padding: 20px 16px 15px 20px;
      .el-pagination {
        text-align: center;
      }
    }
    .hidenBtn:hover {
      opacity: .85;
      transition: .2s;
    }
  }
</style>