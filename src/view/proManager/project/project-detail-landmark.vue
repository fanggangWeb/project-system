<template>
  <div class="second-container">
    <div class="tab-con">
      <div class="tab-list">
        <div class="tab" v-for="(item, index) in tabList" :class="{'active':current == index}" @click="changeTab(item, index)" :key="index">
          {{item.name}}
        </div>
        <el-button @click="addmark" type="primary" size="small">新增里程牌</el-button>
      </div>
    </div>
    <div class="desc">
      <p class="title">{{this.detail}}</p>
      <div class="time">
        <span>开始时间：{{this.startTime}}</span>
        <span>结束时间：{{this.endTime}}</span>
      </div>
    </div>
    <div class="header">
      <el-button size="small" type="success" class="hidenBtn" @click="showState = true">
        导入表格
      </el-button>
      <el-button size="small" @click="_exportXls" type="primary">导出表格</el-button>
      <el-button size="small" @click="insertPlan" type="info" style="margin-right:20px">新增计划</el-button>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}" :data="planList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="business" label="业务名称" align="center">
        </el-table-column>
        <el-table-column prop="module" label="模块名称" align="center">
        </el-table-column>
        <el-table-column prop="function" label="功能名称" align="center">
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" align="center">
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" align="center">
        </el-table-column>
        <el-table-column prop="detail" label="描述" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="updatePlan(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="'版本：'+nextIndex"
      :visible.sync="Visible"
      width="40%"
      left>
      <el-form :model="form" ref="form" label-position="right" label-width="100px" :rules="rules" class="demo-ruleForm">
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="版本描述" prop="detail">
          <el-input type="textarea"  v-model="form.detail" style="width:300px !important" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Visible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">提 交</el-button>
      </span>
    </el-dialog>
    <div class="project-paging">
      <el-pagination background layout="prev, pager, next" 
      :page-size="size" @current-change="handleCurrentChange"
      :current-page.sync="page"
      :total="totalElements">
      </el-pagination>
    </div>
    <el-dialog title="上传计划列表" :close-on-click-modal="false" :visible.sync="showState" width="35%" center>
      <el-row style="margin-top:20px">
        <el-col :offset="4" :span="8">
          <el-button type="primary" @click="downTem"><span style="color:white">下载excel模板</span></el-button>
        </el-col>
        <el-col :span="8">
          <el-upload :with-credentials='true' :action="this.HTTP+'/project/plan/importTemplate'" name="file" :file-list="fileList" :data="dataParams()" :on-success="isDemand" :show-file-list="false">
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
    <el-dialog :close-on-click-modal="false" :title="insertTitle" :visible.sync="planShowState" width="50%" center>
      <el-form :model="form1" ref="form1" :rules="rules1" label-width="120px">
        <el-form-item label="业务名称" prop="business">
          <el-input v-model="form1.business" placeholder="请输入业务名称"></el-input>
        </el-form-item>
        <el-form-item label="模块名称" prop="module">
          <el-input v-model="form1.module" placeholder="请输入模块名称"></el-input>
        </el-form-item>
        <el-form-item label="功能名称" prop="function">
          <el-input v-model="form1.function" placeholder="请输入功能名称"></el-input>
        </el-form-item>
        <el-form-item label="项目开始时间" prop="startTime">
          <el-date-picker
            v-model="form1.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="项目开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目结束时间" prop="endTime">
          <el-date-picker
            v-model="form1.endTime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="项目结束日期">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="项目PM" prop="projectManagerId">
          <el-select v-model="form1.projectManagerId" clearable placeholder="选择项目PM">
            <el-option v-for="item in PMList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="项目描述" prop="detail">
          <el-input type="textarea" v-model="form1.detail" placeholder="请输入项目描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="submit">提 交</el-button>
          <el-button @click="showState = false">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  const SUCCESS_OK = '200'
  import { milestoneList, milestoneDetail, addMileStone, mileStonePlanList, mileStoneXlsTem, exportXls, insertPlan, projectUpdatePlan } from '@/api/request'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        current: 0,
        tabList: [],
        showState: false,
        Visible: false,
        page: 1,
        size: 20,
        stoneId: '',
        planId: '',
        name: '',
        totalElements: 0,
        downUrl: '',
        detail: '',
        startTime: '',
        endTime: '',
        planList: [],
        uploadUrl: '',
        fileList: [],
        nextIndex: '',
        insertTitle: '新增计划',
        planShowState: false,
        planState: 'insert',
        form1: {
          business: '',
          module: '',
          function: '',
          startTime: '',
          endTime: '',
          detail: ''
        },
        rules1: {
          business:[{required: true, message: '请输入业务名称', trigger: 'blur'}],
          module:[{required: true, message: '请输入模块名称', trigger: 'blur'}],
          function:[{required: true, message: '请输入功能名称', trigger: 'blur'}],
          startTime:[{required: true, message: '请选择项目开始时间', trigger: 'blur'}],
          endTime:[{required: true, message: '请选择项目结束时间', trigger: 'blur'}],
          detail:[{required: true, message: '请输入项目描述', trigger: 'blur'}],
        },
        form: {
          startTime: '',
          endTime: '',
          detail: ''
        },
        rules: {
          startTime: [{required:true, message: '请选择开始时间', trigger: 'blur'}],
          endTime: [{required:true, message: '请选择结束时间', trigger: 'blur'}],
          detail: [{required:true, message: '请输入版本描述', trigger: 'blur'}]
        }
      }
    },
    watch: {
      Visible: function (val, oldval) {
        if (val == false) {
          this.$refs['form'].resetFields()
        }
      },
      planShowState: function (val, oldval) {
        if (val == false) {
          this.$refs['form1'].resetFields()
        }
      }
    },
    computed: {
      ...mapGetters(['getprojectId'])
    },
    mounted () {
      this._milestoneList()
    },
    methods: {
      insertPlan () {
        this.form1 = {
          business: '',
          module: '',
          function: '',
          startTime: '',
          endTime: '',
          detail: ''
        },
        this.planState = 'insert'
        this.planShowState = true
        this.insertTitle = '新增计划'
      },
      updatePlan (item) {
        this.planId = item.id
        this.form1 = {
          business: item.business,
          module: item.module,
          function: item.function,
          startTime: item.startTime,
          endTime: item.endTime,
          detail: item.detail
        },
        this.planState = 'edit'
        this.planShowState = true
        this.insertTitle = '修改计划'
      },
      changeTab(item, index) {
        this.current = index
        this.startTime = item.startTime
        this.endTime = item.endTime
        this.detail = item.detail
        this.stoneId = item.id
        this.name = item.name
        this._mileStonePlanList()
      },
      dataParams() {
        return {
          projectMilestoneId : this.stoneId
        }
      },
      // 计划列表的模板下载
      downTem () {
        mileStoneXlsTem().then(res => {
          let a = document.createElement('a')
          let url = window.URL.createObjectURL(new Blob([res.data]))
          a.href = url
          a.download = 'staff.xls'
          a.click()
          a.remove()
        })
      },
      // 里程碑列表导航栏
      _milestoneList () {
        milestoneList({projectId: this.getprojectId}).then(res => {
          res = res.data
          const data = res.data
          if (res.state == SUCCESS_OK) {
            // console.log(data)
            this.tabList = data
            this.detail = data[0].detail
            this.startTime = data[0].startTime
            this.endTime = data[0].endTime
            this.stoneId = data[0].id
            this.name = data[0].name
            this._mileStonePlanList()
          } else {
            this.MessageError(res.message)
          }
        })
      },
      // 里程碑计划列表
      _mileStonePlanList () {
        const data = {
          page: this.page,
          size: this.size,
          projectMilestoneId: this.stoneId
        }
        mileStonePlanList(data).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.planList = res.data.rows
            this.totalElements = res.data.total
            // console.log(res.data)
          } else {
            this.MessageError(res.message)
          }
        })
      },
      addmark () {
        this.nextIndex = this.tabList.length + 1
        this.Visible = true
      },
      // 修改和新增的弹出框确认
      confirm () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.form.name = '版本'+ this.nextIndex
            this.form.project = {
              id: this.getprojectId
            }
            addMileStone(this.form).then(res => {
              res = res.data
              if (res.state == SUCCESS_OK) {
                this.Visible = false
                this.MessageSuccess(res.message)
                this.current = 0
                this._milestoneList()
              } else {
                this.MessageError(res.message)
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 提交表单
      submit () {
        this.$refs['form1'].validate((valid) => {
          if (valid) {
            if (this.planState == 'insert') {
              this.form1.projectMilestoneId = this.stoneId
              insertPlan(this.form1).then(res => {
                res = res.data
                if (res.state == SUCCESS_OK) {
                  this.planShowState = false
                  this.MessageSuccess(res.message)
                  this._milestoneList()
                } else {
                  this.MessageError(res.message)
                }
              })
            } else if (this.planState == 'edit') {
              // 这里是修改里程碑的接口
              this.form1.projectMilestoneId = this.stoneId
              this.form1.id = this.planId
              projectUpdatePlan(this.form1).then(res => {
                res = res.data
                if (res.state == SUCCESS_OK) {
                  this.planShowState = false
                  this.MessageSuccess(res.message)
                  this._milestoneList()
                } else {
                  this.MessageError(res.message)
                }
              })
            }
          } else {
            console.log('error submit!!');
            return false
          }
        })
      },
      handleCurrentChange() {
        this._mileStonePlanList()
      },
      // 导出计划列表
      _exportXls () {
        const data = {
          projectMilestoneId: this.stoneId
        }
        // console.log(this.name)
        exportXls(data).then(res => {
          if (res.status == SUCCESS_OK) {
            let a = document.createElement('a')
            let url = window.URL.createObjectURL(new Blob([res.data]))
            a.href = url
            a.download = this.name + '.xls'
            a.click()
            a.remove()
          }
        })
      },
      // 上传计划表格的成功回调函数
      isDemand(response, file, fileList) {
        // console.log(response)
        if (response.state == SUCCESS_OK) {
          this.MessageSuccess(response.message)
          this.showState = false
          this._mileStonePlanList()
        } else {
          this.MessageError(response.message)
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .el-dialog__title {
    color: blue !important;
  }
  .second-container {
    height: 100%;
    width: 100%;
    padding: 0 0 20px 0;
    background: white;
    margin-top: 20px;
    box-sizing: border-box;
    .tab-con {
      width: 100%;
      height: 50px;
      background: #f4f6f7;
      font-size: 14px;
      color: #999999; // color: #7e8c8d;
      line-height: 50px;
      text-align: center;
      .tab-list {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        .tab {
          width: 80px;
          cursor: pointer;
          height: 100%;
          box-sizing: border-box;
        }
        .el-button {
          margin-left: auto;
          margin-right: 20px;
        }
        .active {
          color: #45B78D;
          background-color: white;
          border-bottom: 2px solid #45B78D;
        }
      }
    }
    .desc {
      padding: 20px 0 0px 20px;
      line-height: 30px;
      color: rgb(153,153,153);
      .time{
        span {
          margin-right: 20px;
        }
      }
    }
    .header {
      width: 100%;
      height: 60px;
      line-height: 60px;
      background: white;
      font-size: 22px;
      color: #4d4d4d;
      padding-left: 30px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      a {
        color: #4d4d4d;
      }
      .hidenBtn {
        margin-left: auto;
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
      overflow-y: auto;
    }
    .project-paging {
      text-align: center;
      padding: 10px 16px 15px 16px;
    }
  }
</style>
