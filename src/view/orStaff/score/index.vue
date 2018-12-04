<template>
  <div class="container">
    <div class="header">
      首页 > 评分
      <div class="searchContent">
        <div class="searchProject">
          <el-input placeholder="人员搜索" v-model="personName" @change="nameSearch" clearable>
          </el-input>
          <!-- <a href="#" @click.prevent="nameSearch"><i class="el-icon-search"></i></a> -->
        </div>
        <div class="selectChoose">
          <el-select v-model="position" @change="nameSearch" clearable placeholder="岗位筛选">
            <el-option v-if="item" v-for="item in positionList" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign:'center'}"  :data="staffList" :stripe="true" style="width: 100%">
         <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" align="center" label="名称">
        </el-table-column>
        <el-table-column prop="position" align="center" label="岗位">
        </el-table-column>
        <el-table-column prop="department.name" align="center" label="所属部门">
        </el-table-column>
        <!-- <el-table-column prop="salaryMonth" align="center" label="薪资">
        </el-table-column> -->
        <el-table-column prop="positive" align="center" label="转正情况">
          <template slot-scope="scope">
            <span>{{positiveFil[scope.row.positive]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="hiredDate" align="center" label="入职时间">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="toScore(scope.row)">评分</el-button>
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
    <el-dialog :title="titleName+'的评分'" :visible.sync="showState" width="40%" center>
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
  </div>
</template>

<script>
  let vm
  import { mapGetters, mapMutations } from 'vuex'
  const SUCCESS_OK = '200'
  import { getDepartmentUsersList, allPosition, memberScore } from '@/api/request'
  export default {
    data() {
      return {
        positionList: [],
        position: '',
        page: 1,
        size: 10,
        score: 10,
        positiveFil: {
          '0': '未转正',
          '1': '已转正'
        },
        showState: false,
        staffList: [],
        status: {},
        totalElements: 10,
        personName: '',
        titleName: '',
        staffId: ''
      }
    },
    watch: {
      showState: function(val, oldval) {
        this.score = 10
      }
    },
    mounted() {
      this._allPosition()
      this._getDepartmentUsersList()
    },
    methods: {
      ...mapMutations([]),
      toScore (item) {
        this.showState = true
        this.titleName = item.name
        this.staffId = item.id
      },
      nameSearch () {
        this.page = 1
        this._getDepartmentUsersList()
      },
      jump (data) {
        this.$router.push(data)
      },
      confirm () {
        const data = {
          score: this.score,
          userId: this.staffId
        }
        memberScore(data).then(res => {
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
      handleCurrentChange() {
        this.page = 1
        this._getDepartmentUsersList()
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
      background: white;
    }
    .project-paging {
      background:white;
      text-align: center;
      padding: 20px 16px 20px 16px;
    } // .addProject:hover{
    //   opacity: .85;
    //   transition: .2s;
    // }
  }
</style>
