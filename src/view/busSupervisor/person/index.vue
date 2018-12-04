<template>
  <div class="container">
    <div class="header">
      首页 > 人员
      <div class="searchContent">
        <div class="searchProject">
          <el-input placeholder="人员名称" v-model="personName" @change="nameSearch" clearable>
          </el-input>
          <!-- <a href="" @click.prevent="nameSearch"><i class="el-icon-search"></i></a> -->
        </div>
        <!-- <div class="selectChoose">
          <el-select v-model="projectStatus" clearable placeholder="岗位筛选">
            <el-option v-for="item in PMList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div> -->
        <!-- <el-date-picker
          v-model="searchTime"
          type="date"
          value-format="yyyy-MM-dd"
          style="margin-right:20px"
          placeholder="选择入职时间">
        </el-date-picker> -->
      </div>
    </div>
    <div class="project-table">
      <el-table :header-cell-style="{background:'#FAFAFA',textAlign: 'center'}"  :data="staffList" :stripe="true" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" align="center" label="名称">
        </el-table-column>
        <el-table-column prop="position" align="center" label="岗位">
        </el-table-column>
        <!-- <el-table-column prop="department.name" align="center" label="所属部门">
        </el-table-column> -->
        <el-table-column prop="salaryMonth" align="center" label="薪资">
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
            <!-- <el-button type="danger" size="small">删除</el-button> -->
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
</template>

<script>
  let vm
  import { mapGetters, mapMutations } from 'vuex'
  const SUCCESS_OK = '200'
  import { getDepartmentUsersList, allPosition } from '@/api/request'
  export default {
    data() {
      return {
        PMList: [],
        projectStatus: '',
        page: 1,
        size: 10,
        searchTime: '',
        staffList: [],
        status: {},
        totalElements: 10,
        personName: '',
        positiveFil: {
          '0': '未转正',
          '1': '已转正'
        },
        showState: false
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
      this._getDepartmentUsersList()
    },
    methods: {
      ...mapMutations(['staffId']),
      handleSuccess (response, file, fileList) {
        console.log(response)
      },
      handleError (err, file, fileList){
        this.MessageError('上传附件失败')
      },
      detailGo (item) {
        this.staffId(item.id)
        this.$router.push({path: '/home/busSuperpersonDetail'})
      },
      nameSearch () {
        this.page = 1
        this._getDepartmentUsersList()
      },
      jump (data) {
        this.$router.push(data)
      },
      handleCurrentChange() {
        this._getDepartmentUsersList()
      },
      // 获取所有员工的列表
      _getDepartmentUsersList () {
        const data = {
          name: this.personName,
          page: this.page,
          size: this.size
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
      // 提交表单
      submit () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            alert('submit!')
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
      justify-content: space-between;
      .searchContent {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: 20px;
        /*border: 1px solid;*/
        .searchProject {
          position: relative;
          .searchInput {
            width: 240px;
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
