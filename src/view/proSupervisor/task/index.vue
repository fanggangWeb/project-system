<template>
  <div class="container">
    <div class="header">
      首页 > 任务
      <div class="searchContent">
        <div class="searchProject">
          <el-input placeholder="项目名称" @change="nameSearch" v-model="projectName" clearable>
          </el-input>
        </div>
        <div class="selectChoose">
          <el-select v-model="PMId" @change="PMSearch" clearable placeholder="项目PM">
            <el-option v-for="item in PMList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <el-date-picker
          v-model="searchTime"
          type="date"
          @change="timeQuery"
          value-format="yyyy-MM-dd"
          placeholder="项目开始日期">
        </el-date-picker>
        <el-button style="margin:0 20px" type="success" @click="showState = true">指派任务</el-button>
      </div>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{textAlign: 'center'}"  :data="projectsList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="managerTaskBaseInfo.name" label="项目名称" align="center" style="width: 20%">
        </el-table-column>
        <el-table-column prop="projectManager.name" label="项目经理" align="center" style="width: 20%">
        </el-table-column>
        <el-table-column prop="managerTaskBaseInfo.startTime" align="center" label="开始时间" style="width: 20%">
        </el-table-column>
        <el-table-column prop="managerTaskBaseInfo.endTime" align="center" label="结束时间" style="width: 20%">
        </el-table-column>
        <el-table-column prop="customer.customerName" align="center" label="客户名称" style="width: 20%">
        </el-table-column>
        <el-table-column prop="customer.customerMobile" align="center" label="客户电话" style="width: 20%">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="detailGo(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :close-on-click-modal="false" title="指派任务" :visible.sync="showState" width="50%" center>
      <el-form :model="form" ref="form" :rules="rules" label-width="120px">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="项目开始时间" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="项目开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目结束时间" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="项目结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目PM" prop="projectManagerId">
          <el-select v-model="form.projectManagerId" clearable placeholder="选择项目PM">
            <el-option v-for="item in PMList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联销售任务" prop="saleTaskId">
          <el-select v-model="form.saleTaskId" clearable placeholder="选择关联销售任务">
            <el-option v-for="item in signedList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目预算" prop="budgetAmount">
          <el-input v-model="form.budgetAmount" placeholder="请输入项目预算"></el-input>
        </el-form-item>
        <el-form-item label="项目奖金" prop="bonusAmount">
          <el-input v-model="form.bonusAmount" placeholder="请输入项目奖金"></el-input>
        </el-form-item>
        <el-form-item label="项目客户" prop="customerName">
          <el-input v-model="form.customerName" placeholder="请输入项目客户"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="customerMobile">
          <el-input v-model="form.customerMobile" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="添加附件">
          <el-upload
            class="upload-demo"
            :action="this.uploadApi"
            :on-success="handleSuccess"
            :on-error="handleError"
            :on-remove="handleRemove"
            multiple>
            <el-button size="small" type="primary">上传附件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="项目简介" prop="text">
          <el-input type="textarea" v-model="form.text" placeholder="请输入项目简介"></el-input>
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
  const SUCCESS_OK = '200'
  import { getPMList, addProjectTask, projectTaskList, getAllSigned } from '@/api/request'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        PMList: [],
        PMId: '',
        signedList: [],
        page: 1,
        size: 10,
        uploadUrl: this.uploadApi,
        searchTime: '',
        projectsList: [],
        status: {},
        totalElements: 10,
        projectName: '',
        showState: false,
        form: {
          name: '',
          startTime: '',
          endTime: '',
          projectManagerId: '',
          budgetAmount: '',
          saleTaskId: '',
          bonusAmount: '',
          customerName: '',
          customerMobile: '',
          text: '',
          fileList: []
        },
        rules: {
          name:[{required: true, message: '请输入项目名称', trigger: 'blur'}],
          startTime:[{required: true, message: '请选择项目开始时间', trigger: 'blur'}],
          endTime:[{required: true, message: '请选择项目结束时间', trigger: 'blur'}],
          projectManagerId:[{required: true, message: '请选择项目PM', trigger: 'blur'}],
          budgetAmount:[{required: true, message: '请输入项目预算', trigger: 'blur'}],
          bonusAmount:[{required: true, message: '请输入项目奖金', trigger: 'blur'}],
          customerName:[{required: true, message: '请输入项目客户', trigger: 'blur'}],
          customerMobile:[{required: true, message: '请输入联系电话', trigger: 'blur'}],
          text:[{required: true, message: '请输入项目简介', trigger: 'blur'}],
          saleTaskId:[{required: true, message: '请选择关联销售任务', trigger: 'blur'}]
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
      this._getPMList()
      this._getAllSigned()
      this._projectTaskList()
    },
    methods: {
      ...mapMutations(['projectId']),
      _projectTaskList () {
        const data = {
          page: this.page,
          size: this.size,
          name: this.projectName,
          startTime: this.searchTime,
          managerId: this.PMId
        }
        projectTaskList(data).then(res => {
          res = res.data
          // console.log(res)
          if (res.state == SUCCESS_OK) {
            this.projectsList = res.data.rows
            this.totalElements = res.data.total
          } else {
            this.MessageError(res.message)
          }
        })
      },
      handleSuccess (response, file, fileList) {
        // console.log(response)
        this.form.fileList.push(response.data[0])
        console.log(this.form.fileList)
      },
      handleError (err, file, fileList){
        this.MessageError('上传附件失败')
      },
      handleRemove(file, fileList) {
        // console.log(file)
        for (let i = 0; i < this.form.fileList.length; i++) {
          if (file.name == this.form.fileList[i].fileName) {
            this.form.fileList.splice(i,1)
          }
        }
        console.log(this.form.fileList)
      },
      detailGo (item) {
        this.projectId(item.id)
        this.$router.push({path: '/home/superTaskDetail'})
      },
      nameSearch () {
        this.page = 1
        this._projectTaskList()
      },
      PMSearch () {
        this.page = 1
        this._projectTaskList()
      },
      timeQuery () {
        this.page = 1
        if (this.searchTime == null) {
          this.searchTime = ''
        }
        this._projectTaskList()
      },
      jump (data) {
        this.$router.push(data)
      },
      handleCurrentChange() {
        this._projectTaskList()
      },
      // 提交表单
      submit () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            addProjectTask(this.form).then(res => {
              res = res.data
              if (res.state == SUCCESS_OK) {
                this.showState = false
                this.MessageSuccess(res.message)
                this._projectTaskList()
              } else {
                this.MessageError(res.message)
              }
            })
          } else {
            console.log('error submit!!');
            return false
          }
        })
      },
      // 获取项目经理的列表
      _getPMList () {
        getPMList().then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.PMList = res.data
          }
        })
      },
      // 获取销售所有签约任务
      _getAllSigned () {
        getAllSigned().then(res => {
          res = res.data
          console.log(res)
          if (res.state == SUCCESS_OK) {
            this.signedList = res.data
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
