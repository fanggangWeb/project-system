<template>
  <div class="container">
    <div class="header">
      首页 > 升级审批
      <div class="searchContent">
        <div class="searchProject">
          <el-input placeholder="申请人搜索" v-model="personName" @change="conditionSearch" clearable>
          </el-input>
          <!-- <a href="" @click.prevent="nameSearch"><i class="el-icon-search"></i></a> -->
        </div>
        <!-- <el-select style="width:130px;margin-left:20px;" @change="departSearch" v-model="departmentId" clearable placeholder="选择部门">
          <el-option v-if="item.name" v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select> -->
        <el-date-picker
          style="margin:0 20px;"
          v-model="searchTime"
          type="date"
          value-format="yyyy-MM-dd"
          @change="conditionSearch"
          placeholder="申请时间">
        </el-date-picker>
      </div>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{textAlign: 'center'}"  :data="staffList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="userInfo.name" align="center" label="名称">
        </el-table-column>
        <el-table-column prop="userInfo.position" align="center" label="岗位">
        </el-table-column>
        <!-- <el-table-column prop="department.name" align="center" label="所属部门">
        </el-table-column> -->
        <el-table-column align="center" label="等级">
          <template slot-scope="scope">
            <span>{{scope.row.userInfo.userLevel.level}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="positive" align="center" label="转正情况">
          <template slot-scope="scope">
            <span>{{positiveFil[scope.row.userInfo.positive]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="applyTime" align="center" label="申请时间">
        </el-table-column>
        <el-table-column align="center" label="当前薪资" :render-header="renderHead">
          <template  slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="点击表头的眼睛查看薪资" placement="top">
              <span style="cursor:pointer;" v-if="salaryShow">{{scope.row.salaryBefore}}</span>
              <span style="cursor:pointer;" v-if="!salaryShow">******</span>
            </el-tooltip>      
          </template>
        </el-table-column>
        <el-table-column prop="salaryChange" align="center" label="薪资变化">
        </el-table-column>
        <el-table-column align="center" label="审核状态">
          <template slot-scope="scope">
            <span>{{reviewFil[scope.row.reviewStatus]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userInfo.hiredDate" align="center" label="入职时间">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="agree(scope.row, 1)">同意</el-button>
            <el-button type="danger" size="small" @click="refuse(scope.row, 2)">拒绝</el-button>
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
        <el-button type="success">评 分</el-button>
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
  import { approvalList, toApproval } from '@/api/request'
  export default {
    data () {
      return {
        page: 1,
        size: 10,
        score: 10,
        searchTime: '',
        staffList: [],
        titleName: '',
        saveId: '',
        totalElements: 0,
        salaryShow: false,
        personName: '',
        positiveFil: {
          '0': '未转正',
          '1': '已转正'
        },
        reviewFil: {
          '0': '待审核',
          '1': '已通过',
          '2': '拒绝'
        },
        showState: false,
        fileList: [], //上传文件列表
        downUrl: ''
      }
    },
    mounted() {
      this._approvalList()
    },
    methods: {
      ...mapMutations(['projectId', 'staffId']),
      renderHead(h, {column}) {
        return h('span', [
          h('span', column.label),
          h('i',
            {
              class: 'el-icon-view',
              style: 'margin-left: 5px;font-size:16px;cursor:pointer;',
              on: {
                click: this.change
              }
          })
        ])
      },
      change() {
        this.salaryShow = !this.salaryShow
      },
      // 丑拒
      refuse (item, type) {
        this.$confirm('此操作将拒绝该升级申请, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this._toApproval(item.id,type)
        }).catch(() => {
        })
      },
      // 欣然同意
      agree (item, type) {
        this.$confirm('此操作将同意该升级申请, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this._toApproval(item.id,type)
        }).catch(() => {
        })
      },
      _toApproval (id, type) {
        const data = {
          id: id,
          status: type
        }
        toApproval(data).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.MessageSuccess(res.message)
            this._approvalList()
          } else {
            this.MessageError(res.message)
          }
        })
      },
      _approvalList () {
        const data = {
          page: this.page,
          size: this.size,
          applyTime: this.searchTime,
          username: this.personName
        }
        approvalList(data).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.staffList = res.data.rows
            this.totalElements = res.data.total
          } else {
            this.MessageError(res.message)
          }
        })
      },
      conditionSearch () {
        this.page = 1
        if (this.searchTime == null) {
          this.searchTime = ''
        }
        this._approvalList()
      },
      handleCurrentChange() {
        this._approvalList()
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
