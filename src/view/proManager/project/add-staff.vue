<template>
  <div class="container">
    <div class="header">
      首页&nbsp;>&nbsp;
      <a href="" @click.prevent="jump('/home/project', '')">项目</a>&nbsp;&gt;&nbsp;
      <a href="#" @click.prevent="jump('/home/projectDetail', '')">项目详情</a>&nbsp;&gt;&nbsp;
      <a href="#">添加项目人员</a>
      <el-button type="info" size="small" style="margin-left:20px;" @click="jump('/home/projectDetail/participants')">返回</el-button>
      <div class="searchContent">
        <div class="searchProject">
          <el-input placeholder="人员名称" v-model="staffName" @change="nameSearch" clearable>
          </el-input>
          <!-- <a href="" @click.prevent="nameSearch"><i class="el-icon-search"></i></a> -->
        </div>
        <div class="selectChoose">
          <el-select v-model="statusId" clearable @change="nameSearch" placeholder="目前状态">
            <el-option v-for="item in statusList" :key="item.isFree" :label="item.text" :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="details-content">
      <div class="details-menu">
        <ul>
          <li v-for="(item,index) in tabs" :key="index">
            <a @click.prevent="changeTab(item,index)" :class="{'active':currentIndex==index}">{{item.name}}</a>
          </li>
        </ul>
      </div>
      <div class="table-container">
        <div class="project-table">
          <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}"  :data="staffList" :stripe="true" style="width: 100%">
            <el-table-column type="index" align="center" label="序号" width="60">
            </el-table-column>
            <el-table-column prop="name" label="名称" align="center">
            </el-table-column>
            <el-table-column prop="jobnumber" align="center" label="工号">
            </el-table-column>
            <el-table-column prop="position" align="center" label="岗位">
            </el-table-column>
            <el-table-column prop="department.name" align="center" label="所属部门">
            </el-table-column>
            <el-table-column prop="positive" align="center" label="转正情况">
              <template slot-scope="scope">
                <span>{{scope.row.positive == 1 ? '已转正': '未转正'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="userStatus.text" align="center" label="状态">
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="success" size="small" v-if="scope.row.userStatus.id == 1" @click="add(scope.row)">添加</el-button>
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
      </div>
    </div>
  </div>
</template>
<script>
  let vm
  const SUCCESS_OK = '200'
  import { groupMember, allStaff, findUserStatus, addDeveloper } from '@/api/request'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        staffName: '',
        statusId: '',
        statusList: [],
        isCateShow: false,
        showState: false,
        userId: '',
        currentIndex: 0,
        staffList: [],
        tabValue: 0,
        page: 1,
        size: 10,
        totalElements: 10,
        tabs: [{name: '组员', value: 0}, {name: '全部人员', value: 1}]
      }
    },
    computed: {
      ...mapGetters(['getprojectId'])
    },
    watch: {
    },
    mounted() {
      vm = this
      this._findUserStatus()
      this._groupMember()
    },
    methods: {
      ...mapMutations([]),
      searchByPerson() {
      },
      changeTab (item, index) {
        this.staffList = []
        this.totalElements = 0
        this.currentIndex = index
        this.tabValue = item.value
        this.page = 1
        if (this.tabValue == 0) {
          // 进行组员的操作
          this._groupMember()
        } else {
          this._allStaff()
        }
      },
      nameSearch () {
        this.page = 1
        if (this.tabValue == 0) {
          // 进行组员的操作
          this._groupMember()
        } else {
          this._allStaff()
        }
      },
      add (item) {
        const data = {
          userInfoId: item.id,
          projectId: this.getprojectId
        }
        this.$confirm('此操作将添加'+item.name+'添加到当前项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          addDeveloper(data).then(res => {
            res = res.data
            if (res.state == SUCCESS_OK) {
              this.MessageSuccess(res.message)
              if (this.tabValue == 0) {
                // 进行组员的操作
                this._groupMember()
              } else {
                this._allStaff()
                console.log(this.tabValue)
              }
            } else {
              this.MessageError(res.message)
            }
          })
        }).catch(() => {
        })
      },
      // 所有人员的列表
      _allStaff () {
        const data = {
          page: this.page,
          size: this.size,
          name: this.staffName,
          statusId: this.statusId
        }
        allStaff(data).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.staffList = res.data.rows
            this.totalElements = res.data.total
          } else {
            this.MessageError(res.message)
          }
        })
      },
      // 所有组员的列表
       _groupMember () {
        const data = {
          page: this.page,
          size: this.size,
          name: this.staffName,
          statusId: this.statusId
        }
        groupMember(data).then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.staffList = res.data.rows
            this.totalElements = res.data.total
          } else {
            this.MessageError(res.message)
          }
        })
      },
      // 获取人员的状态
      _findUserStatus () {
        findUserStatus().then(res => {
          res = res.data
          if (res.state == SUCCESS_OK) {
            this.statusList = res.data
          } else {
            this.MessageError(res.message)
          }
        })
      },
      jump(url, id) {
        vm.$router.push(url)
      },
      handleCurrentChange () {
        if (this.tabValue == 0) {
          // 进行组员的操作
          this._groupMember()
        } else {
          this._allStaff()
        }
      }
    },
    destroyed() {}
  }
</script>

<style lang="less" type="text/less" scoped>
  .container {
    width: 100%;
    height: 100%;
    text-align: left;
    overflow: auto;
    background-color: #FAFBFC;
    .header {
      height: 70px;
      line-height: 70px;
      background: #f4f6f7;
      font-size: 22px;
      color: #4d4d4d;
      padding-left: 30px;
      display: flex;
      align-items: center;
      a {
        color: #4d4d4d;
      }
      .searchContent {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: 20px;
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
        }
      }
    }
    .details-content {
      padding: 20px 20px 0 20px;
      width: 100%;
      height: calc(100% - 70px);
      box-sizing: border-box;
      .table-container {
        height: calc(100% - 45px);
        background: white;
        width: 100%;
        overflow-y: hidden;
        .project-table {
          padding: 30px 16px 0 16px;
        }
        .project-paging {
          text-align: center;
          padding: 10px 16px 0 16px;
        }
      }
      .details-menu {
        ul li {
          color: #676767;
          display: inline-block;
          width: 95px;
          height: 45px;
          line-height: 45px;
          text-align: center;
          margin-right: 5px;
          font-size: 16px;
          background: rgba(255, 255, 255, 1);
          border-radius: 4px;
          a {
            display: inline-block;
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
          .active {
            background-color: #45B78D;
            color: white;
          }
        }
      }
    }
    .hidenBtn:hover {
      opacity: .85;
      transition: .2s;
    }
  }
</style>