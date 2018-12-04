<template>
  <div class="container">
    <div class="header">
      首页 > 人员
      <div class="searchContent">
        <div class="searchProject">
          <el-input placeholder="人员搜索" v-model="personName" @change="nameSearch" clearable>
          </el-input>
          <!-- <a href="" @click.prevent="nameSearch"><i class="el-icon-search"></i></a> -->
        </div>
        <el-select style="width:130px;margin-left:20px;" @change="departSearch" v-model="departmentId" clearable placeholder="选择部门">
          <el-option v-if="item.name" v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-select style="width:130px;margin-left:20px;" @change="positionSearch" v-model="position" clearable placeholder="岗位筛选">
          <el-option v-if="item" v-for="(item,index) in positionList" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
        <el-select style="width:130px;margin-left:20px;" @change="positionSearch" v-model="gradeId" clearable placeholder="等级筛选">
          <el-option v-if="item" v-for="(item,index) in gradeList" :key="index" :label="item.level" :value="item.id">
          </el-option>
        </el-select>
        <el-date-picker
          style="margin:0 20px;"
          v-model="searchTime"
          type="date"
          value-format="yyyy-MM-dd"
          @change="timeQuery"
          placeholder="入职时间">
        </el-date-picker>
      </div>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{textAlign: 'center'}"  :data="staffList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" align="center" label="名称">
        </el-table-column>
        <el-table-column prop="position" align="center" label="岗位">
        </el-table-column>
        <el-table-column prop="department.name" align="center" label="所属部门">
        </el-table-column>
        <el-table-column align="center" label="等级">
          <template  v-if="scope.row.isManager!=null" slot-scope="scope">
            <span v-if="scope.row.isManager!=null&&scope.row.isManager==2">{{scope.row.userLevel.level}}</span>
            <span v-if="scope.row.isManager!=null&&scope.row.isManager==1">{{scope.row.projectManagerIntegral.integralGrade==null?'':scope.row.projectManagerIntegral.integralGrade.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="positive" align="center" label="转正情况">
          <template slot-scope="scope">
            <span>{{positiveFil[scope.row.positive]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="hiredDate" align="center" label="入职时间">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="detailGo(scope.row)">详情</el-button>
            <el-button type="success" v-if="scope.row.userLevel.value>0" size="small" @click="toScore(scope.row)">评分</el-button>
            <!-- <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="titleName+'的贡献分'" :visible.sync="showState" width="40%" center>
      <el-row>
        <el-col :offset="5" :span="4">
          <div style="text-align:center;line-height:40px;font-size:16px;">进行评分：</div>
        </el-col>
        <el-col :span="3">
          <el-input-number v-model="score" :min="0" :max="10" label="评分"></el-input-number>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="confirm">评 分</el-button>
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
  import { mapGetters, mapMutations } from 'vuex'
  import { groupMemberList, allPosition, allDepartment, delStaff, getAccessToken, chargeScore, userLevel } from '@/api/request'
  export default {
    data () {
      return {
        followList: [],
        projectStatus: '',
        position: '',
        positionList: [],
        departmentList: [],
        gradeList: [],
        gradeId: '',
        departmentId: '',
        page: 1,
        size: 10,
        score: 10,
        dingShow: true,
        searchTime: '',
        staffList: [],
        status: {},
        titleName: '',
        saveId: '',
        totalElements: 0,
        personName: '',
        positiveFil: {
          '0': '未转正',
          '1': '已转正'
        },
        showState: false,
        fileList: [], //上传文件列表
        downUrl: ''
      }
    },
    mounted() {
      this._allPosition()
      this._userLevel()
      this._allDepartment()
      this._groupMemberList()
    },
    methods: {
      ...mapMutations(['projectId', 'staffId']),
      handleSuccess (response, file, fileList) {
        console.log(response)
      },
      toScore (item) {
        this.showState = true
        this.titleName = item.name
        this.saveId = item.id
      },
      handleError (err, file, fileList){
        this.MessageError('上传附件失败')
      },
      // 同步钉钉数据
      dingTalk () {
        getAccessToken().then(res => {
          res = res.data
          if (res.state = SUCCESS_OK) {
            const token = res.data
            this.$alert('同步钉钉数据需要一分钟左右的时间，请勿重复点击同步按钮！', '提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            })
            this.dingShow = false
            setTimeout(() => {
              this.dingShow = true
            }, 60000)
            importUsers({accessToken: token}).then(res => {
            })
          } else {
            this.MessageError('同步失败')
          }
        })
      },
      confirm () {
        const data = {
          score: this.score,
          userId: this.saveId
        }
        chargeScore(data).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.MessageSuccess(res.message)
            this.showState = false
            this.score = 10
          } else {
            this.MessageError(res.message)
          }
        })
      },
      // 获取所有员工的列表
      _groupMemberList () {
        const data = {
          name: this.personName,
          page: this.page,
          size: this.size,
          position: this.position,
          departmentId: this.departmentId,
          hiredDate: this.searchTime,
          userLevelId: this.gradeId
        }
        groupMemberList(data).then(res => {
          res = res.data
          // console.log(res)
          if (res.state == SUCCESS_OK) {
            this.staffList = res.data.rows
            this.totalElements = res.data.total
          } else {
            this.MessageError(res.message)
          }

        })
      },
      // 获取所有岗位的列表
      _allPosition () {
        allPosition().then(res => {
          res = res.data
          // console.log(res)
          if (res.state = SUCCESS_OK) {
            this.positionList = res.data
          } else {
            this.MessageError(res.message)
          }
        })
      },
      // 获取等级列表
      _userLevel () {
        userLevel().then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.gradeList = res.data
          } else {
            this.MessageError(res.message)
          }
        })
      },
      // 获取所有部门的列表
      _allDepartment () {
        let data = {
          page: 1,
          size: 100
        }
        allDepartment(data).then(res => {
          res = res.data
          // console.log(res)
          if (res.state = SUCCESS_OK) {
            this.departmentList = res.data.rows
          } else {
            this.MessageError(res.message)
          }
        })
      },
      detailGo (item) {
        this.staffId(item.id)
        this.$router.push({path: '/home/superPersonDetail'})
      },
      del (item) {
        this.$confirm('此操作将永久删除该人员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          delStaff({id:item.id}).then(res => {
            res = res.data
            if (res.state == SUCCESS_OK) {
              this.MessageSuccess('操作成功')
              this._groupMemberList()
            } else {
              this.MessageError('删除失败')
            }
          })
        }).catch(() => {
        })
      },
      timeQuery () {
        // console.log(this.searchTime)
        this.page = 1
        if (this.searchTime == null) {
          this.searchTime = ''
        }
        this._groupMemberList()
      },
      nameSearch () {
        this.page = 1
        this._groupMemberList()
      },
      departSearch () {
        this.page = 1
        this._groupMemberList()
      },
      positionSearch () {
        this.page = 1
        this._groupMemberList()
      },
      jump (data) {
        this.$router.push(data)
      },
      handleCurrentChange() {
        this._groupMemberList()
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
