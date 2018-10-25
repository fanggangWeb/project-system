<template>
  <div class="container">
    <div class="header">
      <router-link to="" class="not_current">首页&nbsp;&gt;</router-link>
      <router-link to="/home/superTask" class="not_current">&nbsp;任务&nbsp;&gt;</router-link>
      <span class="current">&nbsp;任务详情</span>
    </div>
    <el-form ref="form" :model="form" :rules="rules" :inline="true" label-width="120px" class="form" label-position="right">
      <el-row type="flex" :gutter="20" class="form-row">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name" placeholder="输入项目名称" :disabled="editState"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" :disabled="editState" placeholder="选择开始时间" v-model="form.startTime">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" :disabled="editState" placeholder="选择结束时间" v-model="form.endTime">
          </el-date-picker>
        </el-form-item>
      </el-row>
      <el-row type="flex" :gutter="20" class="form-row">
        <el-form-item label="项目预算" prop="budgetAmount">
          <el-input v-model="form.budgetAmount" :disabled="editState" placeholder="请输入项目预算"></el-input>
        </el-form-item>
        <el-form-item label="项目客户" prop="customerName">
          <el-input v-model="form.customerName" :disabled="editState" placeholder="请输入项目客户"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="customerMobile">
          <el-input v-model="form.customerMobile" :disabled="editState" placeholder="请输入联系电话"></el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex" :gutter="20" class="form-row">
        <el-form-item label="项目PM" prop="projectManagerId">
          <el-select v-model="form.projectManagerId" clearable :disabled="editState" placeholder="选择项目PM">
            <el-option v-for="item in PMList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目奖金" prop="bonusAmount">
          <el-input v-model="form.bonusAmount" :disabled="editState" placeholder="请输入项目奖金"></el-input>
        </el-form-item>
        <el-form-item label="关联销售任务"  prop="saleTaskId">
          <el-select v-model="form.saleTaskId" :disabled="editState" clearable placeholder="选择关联销售任务">
            <el-option v-for="item in signedList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row type="flex" :gutter="20">
        <el-form-item class="form-row" label="添加附件" prop="fileList">
          <el-upload
            ref="upload"
            class="upload-demo"
            :action="this.uploadApi"
            :on-success="handleSuccess"
            :on-error="handleError"
            :on-remove="handleRemove"
            :disabled="editState"
            multiple>
            <el-button size="small" type="primary">上传附件</el-button>
          </el-upload>
        </el-form-item>
      </el-row>
      <el-row type="flex" :gutter="20" class="form-row">
        <el-form-item label="已上传附件">
          <!-- 附件列表 -->
          <div class="row-title annex">
            <!-- <div class="title">已上传附件：</div> -->
            <div v-for="(item,index) in annexList" :key="index" class="annex-list">
              <span class="annex-value annex-name">{{item.fileName}}</span>
              <!-- <span class="annex-value annex-size">(64kb)</span> -->
              <a :href="item.fullFileAddress" class="annex-value annex-path">下载</a>
              <span class="annex-value annex-del" v-if="!editState" @click="delAnnex(index)">删除</span>
            </div>
          </div>
        </el-form-item>
      </el-row>
      <el-row type="flex" :gutter="20" class="form-row">
        <el-form-item label="项目简介" prop="text">
          <el-input style="width:600px !important;" v-model="form.text" :disabled="editState" type="textarea" placeholder="请输入项目简介"></el-input>
        </el-form-item>
      </el-row>
      <el-row type="flex" style="padding-left: 8.5rem;">
        <el-col :offset="10" :span="6">
          <el-button type="success" v-if="!editState" @click="submit">提交</el-button>
          <el-button v-if="!editState" @click="cancel">取消</el-button>
          <el-button v-if="editState" type="primary" @click="changeState">修改</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import common from "../../../utils/common"
  const SUCCESS_OK = '200'
  import { getPMList, projectTaskDetail, editProjectTask, getAllSigned } from '@/api/request'
  import { mapGetters, mapMutations } from 'vuex'
  let vm;
  export default {
    name: "personAdd",
    data() {
      return {
        // managerList: [],
        editState: true,
        markList: [],
        signedList: [],
        PMList: [],
        annexList: [],
        participantsList: [{value:'1', label:'王琪'},{value: '2', label: '柴方刚'}],
        form: {
          name: '',
          startTime: '',
          endTime: '',
          projectManagerId: '',
          budgetAmount: '',
          bonusAmount: '',
          saleTaskId: '',
          customerName: '',
          customerMobile: '',
          text: '',
          fileList: []
        },
        rules: {
          name: [{required: true, message: '请输入项目名称', trigger: 'blur'}],
          startTime: [{required: true, message: '请选择项目开始时间', trigger: 'blur'}],
          endTime: [{required: true, message: '请选择项目结束时间', trigger: 'blur'}],
          projectManagerId: [{required: true, message: '请选择项目PM', trigger: 'blur'}],
          budgetAmount: [{required: true, message: '请输入项目预算', trigger: 'blur'}],
          bonusAmount: [{required: true, message: '请输入项目奖金', trigger: 'blur'}],
          customerName: [{required: true, message: '请输入项目客户', trigger: 'blur'}],
          customerMobile: [{required: true, message: '请输入联系电话', trigger: 'blur'}],
          text: [{required: true, message: '请输入项目简介', trigger: 'blur'}],
          saleTaskId:[{required: true, message: '请选择关联销售任务', trigger: 'blur'}]
        }
      }
    },
    mounted() {
      vm = this
      this._getAllSigned()
      this._getPMList()
      this._projectTaskDetail()
    },
    computed: {
      ...mapGetters(['getprojectId'])
    },
    methods: {
      ...mapMutations([]),
      addMark() {
        let data = {
          name: '',
          startTime: '',
          endTime: '',
          desc: ''
        }
        console.log(this.markList)
        this.markList.push(data)
      },
      // 验证时间大小
      compare(startTime, endTime) {
        let time1 = new Date(startTime)
        time1 = time1.getTime()
        let time2 = new Date(endTime)
        time2 = time2.getTime()
        if (time1 >= time2) {
          vm.$message.error('时间选取有误')
          return false
        } else {
          return true
        }
      },
      // 提交表单
      submit () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.form.fileList = this.form.fileList.concat(this.annexList)
            editProjectTask(this.form).then(res => {
              res = res.data
              if (res.state == SUCCESS_OK) {
                this.MessageSuccess(res.message)
                this.$refs['upload'].clearFiles()
                this._projectTaskDetail()
                this.editState = true
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
      cancel () {
        this.editState = !this.editState
        this.$refs['upload'].clearFiles()
        this._projectTaskDetail()
      },
      changeState () {
        this.editState = !this.editState
      },
      delAnnex (index) {
        this.annexList.splice(index, 1)
      },
      // 获取项目的详情
      _projectTaskDetail () {
        projectTaskDetail({id: this.getprojectId}).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.form.id = this.getprojectId
            this.form.name = res.data.managerTaskBaseInfo.name
            this.form.startTime = res.data.managerTaskBaseInfo.startTime
            this.form.endTime = res.data.managerTaskBaseInfo.endTime
            this.form.projectManagerId = res.data.projectManager.id
            this.form.budgetAmount = res.data.managerTaskBudgets.pop().amount
            this.form.bonusAmount = res.data.managerTaskBonus.pop().amount
            this.form.customerName = res.data.customer.customerName
            this.form.customerMobile = res.data.customer.customerMobile
            this.form.text = res.data.managerTaskIntro.text
            this.annexList = res.data.managerTaskFiles.fileList
            this.form.saleTaskId = res.data.saleTask.id
          } else {
            this.MessageError(res.message)
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
      },
      handleSuccess (response, file, fileList) {
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
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .el-input,
  .el-select {
    width: 15rem !important;
  }
  .container {
    width: 100%;
    height: 100%;
    // background: #fafbfc;
    overflow-x: hidden;
    font-size: 18px;
    color: #000;
    .header {
      color: #4d4d4d;
      font-size: 22px;
      line-height: 70px;
      text-align: left;
      padding-left: 30px;
      width: 100%;
      height: 70px;
      background: rgba(244, 246, 247, 1);
      .not_current {
        color: #4d4d4d;
      }
      .current {
        color: #4d4d4d;
      }
    }
    .form {
      width: 98%;
      margin-top: 19px;
      padding-top: 52px;
      .form-row {
        margin-bottom: 20px;
        padding-left: 4rem;
        // .long-box {
        //   width: 940px !important;
        // }
        .row-title {
          width: 600px;
          color: #4d4d4d;
          font-size: 15px;
        .title {
          height: 55px;
          line-height: 55px;
        }
        .annex-list {
          height: 30px;
          // width: 100%;
          min-width: 60px;
          line-height: 30px;
          margin-bottom: 5px;
          font-size: 14px;
          background: #f5f7fa;
          .annex-value {
            display: inline-block;
            color: #7d7979;
            margin-right: 5px;
          }
          .annex-name {
            float: left;
            margin-left: 15px;
            max-width: 70%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .annex-path {
            cursor: pointer;
            float: right;
          }
          .annex-path:hover {
              color:green;
            }
          .annex-del {
            float: right;
            cursor: pointer;
          }
          .annex-del:hover {
            color: red;
          }
        }
        .desc {
          padding: 0 0 0 5px;
          line-height: 22px;
        }
      }
        .mark {
          width: 940px;
          height: 50px;
          margin-bottom: 15px;
          line-height: 50px;
          background: #FAFAFA;
          .keyword {
            margin-left: 5px;
            color: #C4C4C4;
          }
          .el-input {
            width: 180px !important;
          }
          .el-select {
            width: 130px !important;
          }
        }
      }
    }
  }
</style>
