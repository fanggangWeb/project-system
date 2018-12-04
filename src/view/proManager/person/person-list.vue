<template>
  <div class="second-container">
    <div class="header">
      <el-input class="addPlan" size="small" placeholder="人员搜索" @change="nameSearch" style="margin-right:10px" v-model="personName">
      </el-input>
      <el-select  style="margin-right:20px" size="small" v-model="position" @change="positionSearch" clearable placeholder="岗位筛选">
        <el-option v-if="item" v-for="(item, index) in positionList" :key="index" :label="item" :value="item">
        </el-option>
      </el-select>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}"  :data="staffList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" align="center" label="名称">
        </el-table-column>
        <el-table-column prop="position" align="center" label="岗位">
        </el-table-column>
        <el-table-column prop="department.name" align="center" label="所属部门">
        </el-table-column>
        <el-table-column prop="userLevel.level" align="center" label="等级">
        </el-table-column>
        <el-table-column prop="positive" align="center" label="转正情况">
          <template slot-scope="scope">
            <span>{{positiveFil[scope.row.positive]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userStatus.text" align="center" label="任务状态">
        </el-table-column>
        <el-table-column prop="hiredDate" align="center" label="入职时间">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="detailGo(scope.row)">详情</el-button>
            <el-button type="success" size="small" @click="score(scope.row)">评分</el-button>
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
    <el-dialog :title="staffName+'的评分'" :close-on-click-modal="false" :visible.sync="showState" width="35%" center>
      <el-row style="margin-top:20px">
        <el-col :offset="5" :span="6">
          <span style="line-height:40px;font-size:16px;">请进行评分：</span>
        </el-col>
        <el-col :span="8">
          <el-input-number v-model="scoreAmount" :min="0" :max="30" label="评分"></el-input-number>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
          <el-button @click="showState = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  let vm
  import { mapGetters, mapMutations } from 'vuex'
  const SUCCESS_OK = '200'
  import { getDepartmentUsersList, allPosition, managerScore } from '@/api/request'
  export default {
    data() {
      return {
        scoreAmount: 30,
        showState: false,
        personName: '',
        otherUsers: [],
        userId: '',
        staffName: '',
        positionList: [],
        position: '',
        staffList: [], // 人员列表
        downUrl: '',
        positiveFil: {
          '0': '未转正',
          '1': '已转正'
        },
        moduleInput: '',
        form: {
          name: ''
        },
        page: 1,
        size: 10,
        totalElements: 0
      }
    },
    computed: {
      ...mapGetters([])
    },
    mounted() {
      vm = this
      this._allPosition()
      this._getDepartmentUsersList()
    },
    methods: {
      ...mapMutations(['staffId']),
      handleCurrentChange() {
        this._getDepartmentUsersList()
      },
      confirm () {
        const data = {
          userId: this.userId,
          score: this.scoreAmount
        }
        managerScore(data).then(res=> {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.MessageSuccess(res.message)
            this.showState = false
          } else {
            this.MessageError(res.message)
          }
        })
      },
      nameSearch () {
        this.page = 1
        this._getDepartmentUsersList()
      },
      positionSearch () {
        this.page = 1
        this._getDepartmentUsersList()
      },
      dataParams() {
        return {
          projectsId: this.getprojectId
        }
      },
      detailGo (item) {
        this.$router.push('/home/staffDetail')
        this.staffId(item.id)
      },
      score (item) {
        this.staffName = item.name
        this.userId = item.id
        this.showState = true
      },
      // 获取所有员工的列表
      _getDepartmentUsersList () {
        const data = {
          name: this.personName,
          page: this.page,
          size: this.size,
          position: this.position
        }
        getDepartmentUsersList(data).then(res => {
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
      padding: 10px 16px 10px 16px;
    }
    .hidenBtn:hover {
      opacity: .85;
      transition: .2s;
    }
  }
</style>