<template>
  <div class="container">
    <div class="header">首页&nbsp;>&nbsp;<a href="" @click.prevent="jump('/home/project', '')">项目</a>&nbsp;&gt;&nbsp;<a href="#">项目详情</a>
      <el-select class="addPlan" style="margin-right:10px" v-if="$route.path === '/home/projectDetail/plan'" v-model="personId" @change="searchByPerson" clearable placeholder="负责人">
        <el-option v-for="(item, index) in personList" :key="index" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-button class="hidenBtn" v-if="$route.path === '/home/projectDetail/plan'" @click="showState = true" style="margin-right:10px">
        添加计划
      </el-button>
    </div>
    <div class="details-content">
      <div class="details-menu">
        <ul>
          <li>
            <router-link to="/home/projectDetail/" exact>概况</router-link>
          </li>
          <li>
            <router-link to="/home/projectDetail/landmark">里程碑</router-link>
          </li>
          <li>
            <router-link to="/home/projectDetail/participants">参与人员</router-link>
          </li>
          <li>
            <router-link to="/home/projectDetail/data">资料</router-link>
          </li>
          <li>
            <router-link to="/home/projectDetail/statistics">统计</router-link>
          </li>
          <li>
            <router-link to="/home/projectDetail/feedback">反馈</router-link>
          </li>
          <li>
            <router-link to="/home/projectDetail/demand">需求变更</router-link>
          </li>
        </ul>
      </div>
      <router-view :isCreatePanelShow="isCateShow" @toHide="hideCate"></router-view>
    </div>
    <el-dialog title="上传计划列表" :visible.sync="showState" width="35%" center>
      <el-row style="margin-top:20px">
        <el-col :offset="3" :span="9">
          <el-button type="primary"><a style="color:white" :href="downUrl">下载计划excel模板</a></el-button>
        </el-col>
        <el-col :span="6">
          <el-upload :action="uploadUrl" :file-list="fileList" :data="dataParams()" :on-success="isDemand" :show-file-list="false">
            <el-button style="background-color:#45B78D;border-color:none;color:white">上传计划列表
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
    name: "projectDetails",
    data() {
      return {
        personList: [],
        personId: '',
        isCateShow: false,
        showState: false,
        otherUsers: [],
        userId: '',
        fileList: new Array(), //上传文件列表
        uploadUrl: this.api + '/projectsPlanNew/uploadFile',
        moduleState: false,
        downUrl: '',
        moduleInput: '',
        form: {
          name: ''
        },
        rules: {
          name: [{
            required: true,
            message: '请输入功能模块名称',
            trigger: 'blur'
          }, ],
        }
      }
    },
    computed: {
      ...mapGetters(['getcurrentSelect1', 'getprojectId'])
    },
    watch: {
      // 隐藏后清楚输入框
      moduleState: function(val, oldval) {
        if (val == false) {
          this.$refs['form'].resetFields();
        }
      }
    },
    mounted() {
      vm = this
      console.log(this.$route)
    },
    methods: {
      ...mapMutations([]),
      searchByPerson() {
        vm.selectPerson(vm.personId)
      },
      // 切换新增和修改需求
      changeDemand () {
        if (this.demandValue == 'edit') {
          this.demandText = '修改需求'
        } else {
          this.demandText = '新增需求'
        }
      },
      // 需求增加和修改的按钮
      demandBtn () {
        if (this.demandValue == 'edit') {
          // 修改需求
        } else {
          // 新增需求
        }
      },
      createModule() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let data = {
              moduleName: vm.form.name,
              projectId: vm.getprojectId
            }
          } else {
            return false;
          }
        })
      },
      // 获取下载模板
      downTem() {
      },
      dataParams() {
        return {
          projectsId: this.getprojectId
        }
      },
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
      // 跳转到添加计划
      addPlan() {
        vm.$router.push({
          name: 'planAdd'
        })
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
  .container {
    width: 100%;
    height: 100%;
    text-align: left;
    overflow: auto;
    background-color: #FAFBFC;
    .header {
      height: 70px;
      line-height: 70px;
      background: #f4f6f7;
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
    .details-content {
      padding: 29px 22px 0 23px;
      .details-menu {
        ul li {
          color: #676767;
          display: inline-block;
          width: 95px;
          height: 45px;
          line-height: 45px;
          text-align: center;
          margin-right: 5px;
          font-size: 16px;
          background: rgba(255, 255, 255, 1);
          border-radius: 4px;
          // box-shadow: 7px 12px 21px rgba(162, 160, 160, 0.05);
          a {
            display: inline-block;
            width: 100%;
            height: 100%;
          }
          .router-link-active {
            background-color: #45B78D;
            color: white;
          }
        } 
      }
    }
    .hidenBtn:hover {
      opacity: .85;
      transition: .2s;
    }
  }
</style>

