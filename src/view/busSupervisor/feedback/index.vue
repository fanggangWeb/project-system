<template>
  <div class="container">
    <div class="header">
      首页 > 反馈
      <div class="searchContent">
        <div class="searchProject">
          <el-input @change="nameSearch" placeholder="项目名称" v-model="projectName" clearable>
          </el-input>
          <a href="" @click.prevent="nameSearch"><i class="el-icon-search"></i></a>
        </div>
        <div class="selectChoose">
          <el-select v-model="projectStatus" clearable placeholder="跟进人员">
            <el-option v-for="item in followList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <el-button class="addProject" type="success" @click="showState = true">指派任务</el-button>
      </div>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{textAlign: 'center'}"  :data="projectsList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" label="项目名称">
        </el-table-column>
        <el-table-column prop="name" label="客户名称">
        </el-table-column>
        <el-table-column prop="name" label="跟进人员">
        </el-table-column>
        <el-table-column prop="name" label="跟进情况">
        </el-table-column>
        <el-table-column prop="startTime" align="center" label="创建时间">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="detailGo(scope.row)">修改</el-button>
            <el-button type="primary" size="small" @click="detailGo(scope.row)">详情</el-button>
            <el-button type="danger" size="small" @click="detailGo(scope.row)">签单</el-button>
            <!-- <el-button type="danger" size="small" disabled>已签单</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :close-on-click-modal="false" title="指派任务" :visible.sync="showState" width="50%" center>
      <el-form :model="form" ref="form" :rules="rules" label-width="120px">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="customer">
          <el-input v-model="form.customer" placeholder="请输入客户名称"></el-input>
        </el-form-item>
        <el-form-item label="客户公司" prop="corporationName">
          <el-input v-model="form.corporationName" placeholder="请输入客户公司"></el-input>
        </el-form-item>
        <el-form-item label="跟进人员" prop="follow">
          <el-select v-model="form.follow" clearable multiple placeholder="选择跟进人员">
            <el-option v-for="item in followList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="telephone">
          <el-input v-model="form.telephone" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <!-- <el-form-item label="添加附件">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-success="handleSuccess"
            :on-error="handleError"
            multiple
            :file-list="form.fileList">
            <el-button size="small" type="primary">上传附件</el-button>
          </el-upload>
        </el-form-item> -->
        <el-form-item label="项目简介" prop="desc">
          <el-input type="textarea" v-model="form.desc" placeholder="请输入项目简介"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="submit">提 交</el-button>
        <el-button @click="showState = false">取 消</el-button>
      </span>
    </el-dialog>
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
  import { getDepartmentUsersList, saleReleaseTask } from '@/api/request'
  import { mapGetters, mapMutations } from 'vuex'
  // 电话号码验证
  let isvalidPhone = (str) => {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    return reg.test(str)
  }
  let validPhone = (rule, value, callback) => {
    if (!value){
      callback(new Error('请输入联系电话'))
    }else if (!isvalidPhone(value)){
      callback(new Error('请输入正确的11位手机号码'))
    }else {
      callback()
    }
  }
  export default {
    data() {
      return {
        followList: [],
        projectStatus: '',
        page: 1,
        size: 10,
        projectsList: [1,2],
        status: {},
        totalElements: 10,
        projectName: '',
        showState: false,
        form: {
          name: '',
          customer: '',
          follow: [],
          telephone: '',
          desc: '',
          corporationName: ''
        },
        rules: {
          name:[{required: true, message: '请输入项目名称', trigger: 'blur'}],
          customer:[{required: true, message: '请输入客户名称', trigger: 'blur'}],
          follow:[{required: true, message: '请选择跟进人员', trigger: 'change'}],
          telephone:[{required: true, message:'请输入联系方式', trigger: 'blur'}],
          desc:[{required: true, message: '请输入项目简介', trigger: 'blur'}],
          corporationName:[{required: true, message: '请输入客户公司', trigger: 'blur'}]
        }
      }
    },
    watch: {
      showState: function (val, oldval) {
        if (val == false) {
          this.$refs['form'].resetFields();
        }
      }
    },
    mounted() {
      this.getDepartmentUsersList()
    },
    methods: {
      ...mapMutations([]),
      // 获取本部门人员列表
      getDepartmentUsersList () {
        getDepartmentUsersList({ page: 1, size: 100 }).then(res => {
          res = res.data
          this.followList = res.data.rows
        })
      },
      handleSuccess (response, file, fileList) {
        console.log(response)
      },
      handleError (err, file, fileList){
        this.MessageError('上传附件失败')
      },
      detailGo (item) {
        this.projectId(item)
        this.$router.push({path: '/home/busSuperfeedbackDetail'})
      },
      nameSearch () {},
      jump (data) {
        this.$router.push(data)
      },
      handleCurrentChange() {
        console.log(this.page)
      },
      // 提交表单
      submit () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            const data = {
              name: this.form.name,
              customer: {
                customerName: this.form.customer,
                customerMobile: this.form.telephone,
                corporationName: this.form.corporationName
              },
              salesPersons: this.form.follow,
              demandDesc: this.form.desc
            }
            saleReleaseTask(data).then(res => {
              res = res.data
              console.log(res)
              if (res.state === 200) {
                this.MessageSuccess(res.message)
                this.showState = false
              } else {
                this.MessageError(res.message)
              }
            })
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
