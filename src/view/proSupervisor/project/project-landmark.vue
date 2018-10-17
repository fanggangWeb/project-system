<template>
  <div class="second-container">
    <div class="tab-con">
      <div class="tab-list">
        <div class="tab" v-for="(item, index) in tabList" :class="{'active':current == index}" @click="changeTab(item, index)" :key="index">
          {{item.name}}
        </div>
        <!-- <el-button @click="addmark" type="primary" size="small">新增里程牌</el-button> -->
      </div>
    </div>
    <div class="desc">
      <p class="title">蓝莓app非常的优秀蓝莓app非常的优秀蓝莓app非常的优秀蓝莓app非常的优秀蓝莓app非常的优秀蓝莓app非常的优秀</p>
      <div class="time">
        <span>开始时间：2018-10-07</span>
        <span>结束时间：2018-10-30</span>
      </div>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}" :data="markList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" label="功能模块" style="width: 20%">
        </el-table-column>
        <el-table-column prop="job" label="描述" style="width: 20%">
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
            type="date"
            placeholder="开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            type="date"
            placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="版本描述" prop="desc">
          <el-input type="textarea"  v-model="form.desc" style="width:300px !important" placeholder="请输入描述"></el-input>
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
    <el-dialog title="上传计划列表" :visible.sync="showState" width="35%" center>
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
  export default {
    data() {
      return {
        current: 0,
        tabList: [{
          name: '版本1'
        }, {
          name: '版本2'
        }, {
          name: '版本3'
        }],
        showState: false,
        Visible: false,
        page: 1,
        size: 8,
        totalElements: 10,
        downUrl: '',
        markList: [1,2,3,4,5,1,1,1],
        uploadUrl: '',
        fileList: [],
        nextIndex: '',
        form: {
          startTime: '',
          endTime: '',
          desc: ''
        },
        rules: {
          startTime: [{required:true, message: '请选择开始时间', trigger: 'blur'}],
          endTime: [{required:true, message: '请选择结束时间', trigger: 'blur'}],
          desc: [{required:true, message: '请输入版本描述', trigger: 'blur'}]
        }
      }
    },
    methods: {
      changeTab(item, index) {
        this.current = index
      },
      dataParams() {
        return {
          projectsId: this.getprojectId
        }
      },
      addmark () {
        this.nextIndex = this.tabList.length + 1
        this.Visible = true
      },
      // 修改和新增的弹出框确认
      confirm () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            alert('submit!');
            this.Visible = false
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      handleCurrentChange() {
        console.log(this.page)
      },
      // 获取下载模板
      downTem() {},
      // 上传计划表格的成功回调函数
      isDemand(response, file, fileList) {
        if (response.code == 0) {
          this.MessageSuccess(response.msg)
          vm.planUploadState(1)
        } else {
          this.MessageError(response.msg)
          vm.planUploadState(0)
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
      padding: 20px 0 20px 20px;
      line-height: 30px;
      color: rgb(153,153,153);
      .time{
        span {
          margin-right: 20px;
        }
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
