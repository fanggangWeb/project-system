<template>
  <div class="container">
    <div class="header">
      首页 > 人员
      <div class="searchContent">
        <div class="searchProject">
          <el-input placeholder="人员搜索" v-model="personName" clearable>
          </el-input>
          <a href="" @click.prevent="nameSearch"><i class="el-icon-search"></i></a>
        </div>
        <el-select style="width:130px;margin-left:20px;" v-model="projectStatus" clearable placeholder="选择部门">
          <el-option v-for="item in followList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select style="width:130px;margin-left:20px;" v-model="projectStatus" clearable placeholder="岗位筛选">
          <el-option v-for="item in followList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-date-picker
          style="width:130px;margin-left:20px;"
          v-model="searchTime"
          type="date"
          placeholder="入职时间">
        </el-date-picker>
        <el-button type="success" style="margin:0 20px" @click="showState = true">
          添加组员
        </el-button>
      </div>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{textAlign: 'center'}"  :data="projectsList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="name" label="岗位">
        </el-table-column>
        <el-table-column prop="name" label="所属部门">
        </el-table-column>
        <el-table-column prop="name" label="薪资">
        </el-table-column>
        <el-table-column prop="name" label="转正情况">
        </el-table-column>
        <el-table-column prop="startTime" align="center" label="入职时间">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="detailGo(scope.row)">详情</el-button>
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
    <el-dialog title="上传人员列表" :close-on-click-modal="false" :visible.sync="showState" width="35%" center>
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
  export default {
    data() {
      return {
        followList: [],
        projectStatus: '',
        page: 1,
        size: 10,
        searchTime: '',
        projectsList: [1,2],
        status: {},
        totalElements: 10,
        personName: '',
        showState: false,
        fileList: new Array(), //上传文件列表
        uploadUrl: this.api + '/projectsPlanNew/uploadFile',
        downUrl: ''
      }
    },
    mounted() {},
    methods: {
      ...mapMutations(['projectId']),
      handleSuccess (response, file, fileList) {
        console.log(response)
      },
      handleError (err, file, fileList){
        this.MessageError('上传附件失败')
      },
      detailGo (item) {
        this.projectId(item)
        this.$router.push({path: '/home/superDesPersonDetail'})
      },
      del (item) {},
      nameSearch () {},
      jump (data) {
        this.$router.push(data)
      },
      handleCurrentChange() {
        console.log(this.page)
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
      // 获取下载模板
      downTem() {
      },
      dataParams() {
        return {
          projectsId: this.getprojectId
        }
      },
      // 提交表单
      submit () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!');
            return false
          }
        })
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
        // width: 108px;
        height: 40px; // align-self: center;
        margin-left: 20px;
        margin-right: 20px;
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
