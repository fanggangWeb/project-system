<template>
  <div class="container">
    <div class="header">
      <router-link to="#">首页&nbsp;></router-link>
      <router-link to="/home/follow">&nbsp;跟进&nbsp;>&nbsp;</router-link>
      <router-link to="#">跟进详情</router-link>
      <!-- <el-date-picker 
        v-model="searchTime"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="跟进时间">
      </el-date-picker> -->
      <el-button class="timeSearch" style="margin-right:20px" type="success" @click="add">添加</el-button>
    </div>
    <div class="content">
      <div class="top">
        <div class="name">项目名称：{{projectInfo.name}}</div>
        <div class="customer">项目客户：{{projectInfo.customer.customerName}}</div>
        <div class="customer">跟进人员：
          <span v-for="(item,index) in projectInfo.salesPersons" :key="index">&nbsp;{{item.name}}</span>
        </div>
      </div>
      <div class="bottom">
        {{projectInfo.demandDesc}}
      </div>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{textAlign: 'center'}"  :data="list" style="width:100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="createTime" align="center" label="跟进时间" width="180">
        </el-table-column>
        <el-table-column prop="record" align="center" label="跟进详情">
        </el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="edit(scope.row)">修改</el-button>
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
    <el-dialog :close-on-click-modal="false" :visible.sync="showState" width="50%" center>
      <el-form :model="form" ref="form" :rules="rules" label-width="120px">
        <!-- <el-form-item label="跟进时间" prop="time">
          <el-date-picker
            v-model="form.time"
            type="datetime"
            @change="timeSearch"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="跟进时间">
          </el-date-picker>
        </el-form-item> -->
        <el-form-item label="跟进详情" prop="desc">
          <el-input type="textarea" v-model="form.desc" placeholder="请输入跟进详情"></el-input>
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
  let vm
  const SUCCESS_OK = '200'
  import { followDetail, addTaskChedule, editTaskChedule, delTaskChedule, saleTaskDetail } from '@/api/request'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        page: 1,
        size: 10,
        searchTime: '',
        list: [{time: '2018-09-10', desc: ''}],
        status: {},
        totalElements: 10,
        projectName: '',
        showState: false,
        editStatus: 'add',
        rowId: '',
        form: {
          // time: '',
          desc: ''
        },
        rules: {
          desc:[{required: true, message: '请输入跟进详情', trigger: 'blur'}],
          // time:[{required: true, message: '请选择跟进时间', trigger: 'blur'}],
        },
        projectInfo: {
          customer: {
            customerName: ''
          }
        }
      }
    },
    mounted() {
      this._saleTaskDetail()
      this._followDetail()
    },
    computed: {
      ...mapGetters(['gettaskId'])
    },
    watch: {
      showState: function (val, oldval) {
        if (val == false) {
          this.$refs['form'].resetFields();
        }
      }
    },
    methods: {
      _saleTaskDetail () {
        saleTaskDetail({id: this.gettaskId}).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.projectInfo = res.data
          } else {
            this.MessageError(res.message)
          }
        })
      },
      _followDetail () { // 业务员跟进列表
        let data = {
          page: this.page,
          size: this.size,
          saleTaskId: this.gettaskId
        }
        followDetail(data).then(res => {
          res = res.data
          console.log(res)
          if (res.state == SUCCESS_OK) {
            this.totalElements = res.data.total
            this.list = res.data.rows
          } else {
            this.MessageError('连接错误')
          }
        })
      },
      add () {
        this.editStatus = 'add'
        this.form.desc = ''
        this.showState = true
      },
      handleCurrentChange() {
        console.log(this.page)
      },
      timeSearch(val) {
        // console.log(val)
      },
      edit (item) {
        this.rowId = item.id
        this.editStatus = 'edit'
        this.form.desc = item.record
        this.showState = true
      },
      del (item) {
        this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delTaskChedule(item.id).then(res => {
            res = res.data
            if (res.state == SUCCESS_OK) {
              this.MessageSuccess(res.message)
              this._followDetail()
            } else {
              this.MessageError(res.message)
            }
          })
        }).catch(() => {
        })
      },
      // 提交表单
      submit () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.editStatus == 'add') {
              const data = {
                record: this.form.desc,
                saleTask: {
                  id: this.gettaskId
                }
              }
              addTaskChedule(data).then(res => {
                res = res.data
                if (res.state == SUCCESS_OK) {
                  this.showState = false
                  this.MessageSuccess(res.message)
                  this._followDetail()
                } else {
                  this.MessageError(res.message)
                }
              })
            } else if (this.editStatus == 'edit') {
              const data = {
                record: this.form.desc,
                id: this.rowId
              }
              editTaskChedule(data).then(res => {
                res = res.data
                if (res.state == SUCCESS_OK) {
                  this.showState = false
                  this.MessageSuccess(res.message)
                  this._followDetail()
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
      align-items: center;
      .timeSearch {
        margin-left: auto;
        margin-right: 20px;
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
    .content {
      padding: 20px;
      width: 100%;
      box-sizing: border-box;
      color: rgb(144, 147, 153);
      .top {
        background: white;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
      }
      .name {
        float: left;
      }
      .customer {
        float: right;
        margin-left: 20px;
      }
      .bottom {
        line-height: 30px;
        padding: 10px 20px;
        background: white;
      }
    }
    .project-table {
      padding: 0px 20px 0 20px;
    }
    .project-paging {
      text-align: center;
      padding: 10px 20px 0 20px;
    } // .addProject:hover{
    //   opacity: .85;
    //   transition: .2s;
    // }
  }
</style>
