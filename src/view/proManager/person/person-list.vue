<template>
  <div class="second-container">
    <div class="header">
      <el-input class="addPlan" size="small" placeholder="人员搜索" style="margin-right:10px" v-model="personName">
      </el-input>
      <el-select  style="margin-right:10px" size="small" v-model="job" clearable placeholder="岗位筛选">
        <el-option v-for="(item, index) in jobList" :key="index" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-button size="small" type="success" class="hidenBtn" @click="showState = true">
        导入表格
      </el-button>
      <el-button size="small" type="primary" style="margin-right:20px">导出表格</el-button>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}"  :data="personList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" label="名字" style="width: 20%">
        </el-table-column>
        <el-table-column prop="job" label="岗位" style="width: 20%">
        </el-table-column>
        <el-table-column prop="salary" label="薪资" style="width: 20%">
        </el-table-column>
        <el-table-column prop="zhuanzheng" label="转正情况" style="width: 20%">
        </el-table-column>
        <el-table-column prop="startTime" align="center" label="入职时间" style="width: 20%">
        </el-table-column>
        <el-table-column prop="finish" align="center" label="日任务完成率" style="width: 20%">
        </el-table-column>
        <el-table-column prop="time" align="center" label="调薪节点" style="width: 20%">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="detailGo(scope.row)">详情</el-button>
            <el-button type="danger" size="small" @click="delPerson(scope.row)">删除</el-button>
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
    <el-dialog title="上传人员列表" :visible.sync="showState" width="35%" center>
      <el-row style="margin-top:20px">
        <el-col :offset="4" :span="8">
          <el-button type="primary"><a style="color:white" :href="downUrl">下载excel模板</a></el-button>
        </el-col>
        <el-col :span="8">
          <el-upload :action="uploadUrl" :file-list="fileList" :data="dataParams()" :on-success="isDemand" :show-file-list="false">
            <el-button style="background-color:#45B78D;border-color:none;color:white">上传excel表格
            </el-button>
          </el-upload>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
          <el-button @click="showState = false">取 消</el-button>
          <el-button type="primary" @click="showState = false">确 定</el-button>
        </span>
    </el-dialog>
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
        showState: false,
        personName: '',
        otherUsers: [],
        userId: '',
        personList: [1,2], // 人员列表
        fileList: new Array(), //上传文件列表
        uploadUrl: this.api + '/projectsPlanNew/uploadFile',
        downUrl: '',
        moduleInput: '',
        form: {
          name: ''
        },
        page: 1,
        size: 10,
        totalElements: 10
      }
    },
    computed: {
      ...mapGetters(['getcurrentSelect1', 'getprojectId'])
    },
    mounted() {
      vm = this
      this._groupMemberList()
    },
    methods: {
      ...mapMutations([]),
      // 组员人员列表获取
      _groupMemberList () {
        let data = {
          page: this.page,
          size: this.size,
          userInfo: ''
        }
        groupMemberList(data).then(res => {
          res = res.data
          // console.log(res)
          if (res.state == 200) {

          }
        })
      },
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
      detailGo (item) {
        this.$router.push('/home/staffDetail')
      },
      delPerson (item) {},
      jump(url, id) {
        vm.$router.push(url)
        vm.currentSelect = id
      },
      // 上传计划表格的成功回调函数
      isDemand(response, file, fileList) {
        if (response.code == 0) {
          this.MessageSuccess(response.msg)
          vm.planUploadState(1)
        } else {
          this.MessageError(response.msg)
          vm.planUploadState(0)
        }
      },
      // 弹出新增类别输入框
      addCategory() {
        vm.isCateShow = true;
      },
      hideCate() {
        vm.isCateShow = false;
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
      padding: 0px 20px 0 20px;
    }
    .project-paging {
      text-align: center;
      padding: 10px 16px 15px 16px;
    }
    .hidenBtn:hover {
      opacity: .85;
      transition: .2s;
    }
  }
</style>